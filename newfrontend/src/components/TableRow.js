import React, { useState } from "react";
import { Button } from "react-bootstrap";

const TableRow = ({ el, captureEdit, handleDelete }) => {
  return (
    <tr>
      <td>{el.id}</td>
      <td>{el.name}</td>
      <td>{el.color}</td>
      <td>{el.wine}</td>
      <td>
        <Button onClick={() => captureEdit(el)}>EDIT</Button>
        <Button style={{ background: "teal" }} onClick={() => handleDelete(el)}>
          DELETE
        </Button>
      </td>
    </tr>
  );
};

export default TableRow;
