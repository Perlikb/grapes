import React, { useState, useEffect } from "react";
import GrapesTableRow from "./GrapesTableRow";
import { Button, Form, Container, Table } from "react-bootstrap";
import EditRow from "./EditRow";
import "../App.css";

const GrapesTableComponent = ({ data, onUpdateRow }) => {
  const [isEdited, setIsEdited] = useState(false);
  const [editForm, setEditForm] = useState({
    id: "",
    name: "",
    color: "",
    wine: "",
  });
  //Could be simplified????
  function changeEditState(grape) {
    if (grape.id === editForm.id) {
      setIsEdited((isEdited) => !isEdited); // hides the form
    } else if (isEdited === false) {
      setIsEdited((isEdited) => !isEdited); // shows the form
    }
  }

  function captureEdit(clickedGrape) {
    let filtered = data.filter((grape) => grape.id === clickedGrape.id);
    setEditForm(filtered[0]);
  }

  function handleChange(e) {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  }

  function handleGrapeUpdate(updatedGrape) {
    setIsEdited(false);
    onUpdateRow(updatedGrape);
  }

  return (
    <div>
      {isEdited && (
        <EditRow
          editForm={editForm}
          handleChange={handleChange}
          handleGrapeUpdate={handleGrapeUpdate}
        />
      )}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>NAME</th>
            <th>COLOR</th>
            <th>WINE</th>
            <th>MODIFICATIONS</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 &&
            data.map((el) => (
              <GrapesTableRow
                key={el.id}
                el={el}
                captureEdit={captureEdit}
                changeEditState={changeEditState}
              />
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default GrapesTableComponent;
