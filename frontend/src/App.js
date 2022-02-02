import "./App.css";
import { useState, useEffect } from "react";
import {
  Image,
  Button,
  Card,
  Form,
  Container,
  Col,
  Row,
} from "react-bootstrap";
import React from "react";

function App() {
  const [formData, setFormData] = useState(null);
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [wine, setWine] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/tables")
      .then((response) => response.text())
      .then((data) => console.log(data));
  }, []);

  useEffect(() => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    //Post request sent, after that textareas reset to placeholders
    if (formData) {
      fetch("http://localhost:5000/insert", requestOptions)
        .then((response) => response.text())
        .then((data) => {
          setName("");
          setColor("");
          setWine("");
        });
    }
  }, [formData]);

  const handleClick = (event) => {
    event.preventDefault();

    const newData = {
      name,
      color,
      wine,
    };
    setFormData(newData);
  };

  return (
    <div className="App">
      <Form>
        <h1>GRAPES INVENTORY</h1>
      </Form>
      <Container>
        <Form>
          <Form.Group md={4}>
            <Form.Label>NAME</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <Form.Text className="text-muted">Enter the exact type.</Form.Text>
          </Form.Group>
          <Form.Group md={4}>
            <Form.Label>COLOR</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setColor(e.target.value)}
              value={color}
            />
            <Form.Text className="text-muted">
              Enter the shade of the grapes.
            </Form.Text>
          </Form.Group>
          <Form.Group md={4}>
            <Form.Label>WINE</Form.Label>
            <Form.Control
              type="text"
              value={wine}
              onChange={(e) => setWine(e.target.value)}
            />
            <Form.Text className="text-muted">
              Is it a wine grape? We would like to know the types of wines made
              from it.
            </Form.Text>
          </Form.Group>
          <Button className="primary" type="submit" onClick={handleClick}>
            SUBMIT
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default App;
