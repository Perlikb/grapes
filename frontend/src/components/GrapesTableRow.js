import React from "react";
import "../App.css";
import { Button, Form, Container, Table } from "react-bootstrap";

const GrapesTableRow = ({ el, captureEdit, changeEditState }) => {
  const editCustomer = () => {
    captureEdit(el);
    changeEditState(el);
  };
  return (
    <tr key={el.id}>
      <td>{el.id}</td>
      <td>{el.name}</td>
      <td>{el.color}</td>
      <td>{el.wine}</td>
      <td>
        <Button className="primary" onClick={editCustomer}>
          EDIT
        </Button>
        <Button style={{ background: "teal" }} /*className="danger"*/>
          DELETE
        </Button>
      </td>
    </tr>
  );
};

export default GrapesTableRow;
