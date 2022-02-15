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
        <Button
          size="sm"
          style={{ width: "80px", marginRight: "3px" }}
          onClick={() => captureEdit(el)}
        >
          EDIT
        </Button>
        <Button
          size="sm"
          style={{ background: "teal", width: "80px" }}
          onClick={() => handleDelete(el)}
        >
          DELETE
        </Button>
      </td>
    </tr>
  );
};

export default TableRow;
