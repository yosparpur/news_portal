import React, { useState } from 'react';
import { Form, Button, InputGroup, Row, Col } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="search-container mb-4">
      <Form onSubmit={handleSubmit}>
        <Row className="align-items-center">
          <Col md={10} xs={12}>
            <InputGroup>
              <InputGroup.Text>
                <FaSearch />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Cari berita..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col md={2} xs={12} className="mt-3 mt-md-0">
            <Button variant="primary" type="submit" className="w-100">
              Cari
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default SearchBar;