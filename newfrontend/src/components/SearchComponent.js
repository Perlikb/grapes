import React from "react";
import { Button, Form, Col, Row, Container } from "react-bootstrap";
const SearchComponent = ({ handleSubmit, setSelect, setSearch }) => {
  return (
    <Container className="p-4">
      <Form onSubmit={handleSubmit}>
        <Row className="mb-2">
          <Col>
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => setSelect(e.target.value)}
            >
              <option>Open this select menu</option>
              <option value="name">NAME</option>
              <option value="color">COLOR</option>
              <option value="wine">WINE</option>
            </Form.Select>
          </Col>
          <Col>
            <Form.Control
              type="text"
              placeholder="SEARCH"
              onChange={(e) => setSearch(e.target.value)}
            />
          </Col>
        </Row>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default SearchComponent;
