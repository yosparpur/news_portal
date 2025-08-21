import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Komponen
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import NewsList from './components/NewsList';
import Footer from './components/Footer';

// Layanan API
import { fetchAllArticles } from './services/newsApi';

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('artificial intelligence');

  useEffect(() => {
    const getArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchAllArticles(searchQuery);
        setArticles(data);
      } catch (err) {
        setError('Gagal memuat berita. Silakan coba lagi nanti.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getArticles();
  }, [searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query || 'artificial intelligence');
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <Container className="flex-grow-1">
        <h1 className="text-center mb-4">Hari ini News</h1>
        <SearchBar onSearch={handleSearch} />
        <NewsList 
          articles={articles} 
          loading={loading} 
          error={error} 
        />
      </Container>
      <Footer />
    </div>
  );
}

export default App;
