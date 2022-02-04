import React, { useState, useEffect } from "react";
import { Button, Form, Container } from "react-bootstrap";

const Grape = ({ el }) => {
  const [formData, setFormData] = useState(el);
  const [name, setName] = useState(el.name);
  const [color, setColor] = useState(el.color);
  const [wine, setWine] = useState(el.wine);

  const handlePatch = (event) => {
    event.preventDefault();

    const newData = {
      name: name,
      color: color,
      wine: wine,
    };
    setFormData(newData);
  };
  //Not finished yet. Need to get rid of item without reloading page
  const handleDelete = () => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(`http://localhost:5000/api/deletegrape/${el.id}`, options)
      .then((response) => response.text())
      .then(() => {
        console.log("deleted");
      });
  };

  useEffect(() => {
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    fetch(`http://localhost:5000/api//updateitem/${el.id}`, requestOptions)
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
      });
  }, [formData]);

  return (
    <div>
      <Container>
        <Form>
          <Form.Group md={4}>
            <Form.Label>NAME</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </Form.Group>
          <Form.Group md={4}>
            <Form.Label>COLOR</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setColor(e.target.value)}
              value={color}
            />
          </Form.Group>
          <Form.Group md={4}>
            <Form.Label>WINE</Form.Label>
            <Form.Control
              type="text"
              value={wine}
              onChange={(e) => setWine(e.target.value)}
            />
          </Form.Group>
          <Button
            className="primary"
            type="submit"
            onClick={(e) => handlePatch(e)}
          >
            CHANGE ROW
          </Button>
          <Button onClick={handleDelete}>DELETE ROW</Button>
        </Form>
      </Container>
    </div>
  );
};

export default Grape;
