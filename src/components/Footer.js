import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <Container className="text-center">
        <p className="mb-0">
          &copy; {year} Hari ini News. Berita untuk Hari ini dikerjakan .
        </p>
        <p className="small mt-2 text-muted">
          Powered by NewsAPI, Gnews, dan The Guardian API
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
