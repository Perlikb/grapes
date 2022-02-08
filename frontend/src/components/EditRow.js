import React from "react";
import { Button, Form, Container, Modal } from "react-bootstrap";

const EditRow = ({
  editForm,
  handleChange,
  handleGrapeUpdate,
  setIsEdited,
  isEdited,
}) => {
  let { id, name, color, wine } = editForm;
  const handlePatch = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editForm),
    };

    fetch(
      `http://localhost:5000/api//updateitem/${editForm.id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        handleGrapeUpdate(data);
      });
  };

  return (
    <Modal show={isEdited}>
      <Modal.Header>
        <Modal.Title>Editing row</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handlePatch}>
        <Form.Group>
          <Form.Label>NAME</Form.Label>
          <Form.Control
            type="text"
            name="name"
            onChange={handleChange}
            value={name}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>COLOR</Form.Label>
          <Form.Control
            type="text"
            name="color"
            onChange={handleChange}
            value={color}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>WINE</Form.Label>
          <Form.Control
            type="text"
            name="wine"
            value={wine}
            onChange={handleChange}
          />
        </Form.Group>
        <Button className="primary" type="submit">
          CHANGE ROW
        </Button>
      </Form>
      <Modal.Footer>
        <Button variant="danger" onClick={() => setIsEdited(false)}>
          CLOSE WITHOUT CHANGES
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditRow;
