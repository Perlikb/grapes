import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";

const EditableRow = ({ editForm, handleGrapeUpdate, setIsEditedId }) => {
  const [rowName, setRowName] = useState(editForm.name);
  const [rowColor, setRowColor] = useState(editForm.color);
  const [rowWine, setRowWine] = useState(editForm.wine);

  const handlePatch = (event) => {
    const newData = {
      id: editForm.id,
      name: rowName,
      color: rowColor,
      wine: rowWine,
    };
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    };
    // console.log(formData);
    fetch(
      `http://localhost:5000/api//updateitem/${editForm.id}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((data) => handleGrapeUpdate(JSON.parse(data)));
  };

  return (
    <tr>
      <td>
        <p>{editForm.id}</p>
      </td>
      <td>
        <Form.Control
          type="text"
          name="rowName"
          onChange={(e) => setRowName(e.target.value)}
          value={rowName}
        />
      </td>

      <td>
        <Form.Control
          type="text"
          name="rowColor"
          onChange={(e) => setRowColor(e.target.value)}
          value={rowColor}
        />
      </td>
      <td>
        <Form.Control
          type="text"
          name="rowWine"
          onChange={(e) => setRowWine(e.target.value)}
          value={rowWine}
        />
      </td>
      <td>
        {" "}
        <Button
          size="sm"
          style={{ width: "80px", marginRight: "3px" }}
          onClick={handlePatch}
        >
          SAVE
        </Button>
        <Button
          size="sm"
          style={{ width: "80px", marginRight: "3px" }}
          onClick={() => setIsEditedId(null)}
        >
          CANCEL
        </Button>
      </td>
    </tr>
  );
};

export default EditableRow;
