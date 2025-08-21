import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { FaNewspaper } from 'react-icons/fa';

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand href="#home" className="d-flex align-items-center">
          <FaNewspaper className="me-2" size={28} />
          <span>Hari ini News</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Navbar.Text className="fw-bold">
            Berita Terkini dari Berbagai Sumber
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;