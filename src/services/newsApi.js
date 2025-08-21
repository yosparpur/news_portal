import axios from 'axios';

// Konfigurasi API keys
// Catatan: Anda perlu mendaftar untuk mendapatkan API keys dari layanan berikut
const NEWS_API_KEY = '4ffd6e84adc4496287e13a137e111b56';
const GNEWS_API_KEY = '0260de4a85949a5c90a14d3e9a6d2e66';
const GUARDIAN_API_KEY = '510c1450-8097-4a0f-baa9-8d570c1bab4f';

// Fungsi untuk mendapatkan berita dari NewsAPI
const fetchNewsApiArticles = async (query = 'artificial intelligence') => {
  try {
    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: query,
        apiKey: NEWS_API_KEY,
        language: 'en',
        sortBy: 'publishedAt',
        pageSize: 10
      }
    });
    return response.data.articles.map(article => ({
      ...article,
      source: { ...article.source, api: 'NewsAPI' }
    }));
  } catch (error) {
    console.error('Error fetching from NewsAPI:', error);
    return [];
  }
};

// Fungsi untuk mendapatkan berita dari GNews
const fetchGNewsArticles = async (query = 'artificial intelligence') => {
  try {
    const response = await axios.get('https://gnews.io/api/v4/search', {
      params: {
        q: query,
        token: GNEWS_API_KEY,
        lang: 'en',
        max: 10
      }
    });
    
    return response.data.articles.map(article => ({
      title: article.title,
      description: article.description,
      url: article.url,
      urlToImage: article.image,
      publishedAt: article.publishedAt,
      source: { name: article.source.name, api: 'GNews' }
    }));
  } catch (error) {
    console.error('Error fetching from GNews:', error);
    return [];
  }
};

// Fungsi untuk mendapatkan berita dari The Guardian
const fetchGuardianArticles = async (query = 'artificial intelligence') => {
  try {
    const response = await axios.get('https://content.guardianapis.com/search', {
      params: {
        q: query,
        'api-key': GUARDIAN_API_KEY,
        'show-fields': 'thumbnail,trailText',
        'page-size': 10
      }
    });
    
    return response.data.response.results.map(article => ({
      title: article.webTitle,
      description: article.fields?.trailText || '',
      url: article.webUrl,
      urlToImage: article.fields?.thumbnail || '',
      publishedAt: article.webPublicationDate,
      source: { name: 'The Guardian', api: 'Guardian' }
    }));
  } catch (error) {
    console.error('Error fetching from The Guardian:', error);
    return [];
  }
};

// Fungsi untuk mendapatkan berita dari semua sumber
const fetchAllArticles = async (query = 'artificial intelligence') => {
  try {
    const [newsApiArticles, gNewsArticles, guardianArticles] = await Promise.all([
      fetchNewsApiArticles(query),
      fetchGNewsArticles(query),
      fetchGuardianArticles(query)
    ]);
    
    // Gabungkan semua artikel dan urutkan berdasarkan tanggal publikasi (terbaru dulu)
    const allArticles = [...newsApiArticles, ...gNewsArticles, ...guardianArticles]
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
      
    return allArticles;
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
};

export { fetchAllArticles, fetchNewsApiArticles, fetchGNewsArticles, fetchGuardianArticles };