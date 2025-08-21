import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';
import { FaExternalLinkAlt } from 'react-icons/fa';

const NewsCard = ({ article }) => {
  const { title, description, url, publishedAt, source } = article;
  
  // Format timestamp
  const formattedDate = publishedAt ? 
    formatDistanceToNow(new Date(publishedAt), { addSuffix: true, locale: id }) : 
    'Waktu tidak tersedia';

  // Tentukan warna badge berdasarkan sumber berita
  const getBadgeColor = (sourceName) => {
    if (!sourceName) return 'primary';
    
    const sourceNameLower = sourceName.toLowerCase();
    if (sourceNameLower.includes('guardian')) return 'success';
    if (sourceNameLower.includes('gnews')) return 'warning';
    return 'info';
  };

  return (
    <Card className="news-card mb-4">
      {article.urlToImage && (
        <div className="card-img-wrapper">
          <Card.Img 
            variant="top" 
            src={article.urlToImage} 
            alt={title}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/300x200?text=Hari+ini+News';
            }}
          />
        </div>
      )}
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Badge bg={getBadgeColor(source?.name)}>{source?.name || 'Sumber tidak diketahui'}</Badge>
          <small className="text-muted fst-italic">{formattedDate}</small>
        </div>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <a href={url} className="btn btn-outline-primary btn-sm d-flex align-items-center justify-content-center gap-2" target="_blank" rel="noopener noreferrer">
          Baca Selengkapnya <FaExternalLinkAlt size={12} />
        </a>
      </Card.Body>
    </Card>
  );
};

export default NewsCard;