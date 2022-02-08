import React, { useState, useEffect } from "react";
import "../App.css";
import { Button, Form, Container, Table } from "react-bootstrap";

const GrapesTableRow = ({ el, captureEdit, setIsEdited }) => {
  const [show, setShow] = useState(true);

  const editCustomer = () => {
    captureEdit(el);
    setIsEdited(true);
  };

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
        setShow(false);
      });
  };

  return (
    <tr key={el.id} style={{ display: !show && "none" }}>
      <td>{el.id}</td>
      <td>{el.name}</td>
      <td>{el.color}</td>
      <td>{el.wine}</td>
      <td>
        <Button className="primary" onClick={editCustomer}>
          EDIT
        </Button>
        <Button
          style={{ background: "teal" }}
          /*className="danger"*/ onClick={handleDelete}
        >
          DELETE
        </Button>
      </td>
    </tr>
  );
};

export default GrapesTableRow;
