import React from 'react';
import { Row, Col, Spinner, Alert } from 'react-bootstrap';
import NewsCard from './NewsCard';

const NewsList = ({ articles, loading, error }) => {
  if (loading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Memuat...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger">
        Error: {error}
      </Alert>
    );
  }

  if (!articles || articles.length === 0) {
    return (
      <Alert variant="info">
        Tidak ada berita yang ditemukan. Coba kata kunci lain.
      </Alert>
    );
  }

  return (
    <Row>
      {articles.map((article, index) => (
        <Col key={`${article.source?.id || ''}-${index}`} xs={12} md={6} lg={4}>
          <NewsCard article={article} />
        </Col>
      ))}
    </Row>
  );
};

export default NewsList;