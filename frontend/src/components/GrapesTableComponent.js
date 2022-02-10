import React, { useState, useEffect } from "react";
import GrapesTableRow from "./GrapesTableRow";
import { Button, Form, Container, Table } from "react-bootstrap";
import EditRow from "./EditRow";
import "../App.css";

const GrapesTableComponent = ({ data, setData }) => {
  const [isEdited, setIsEdited] = useState(false);
  const [editForm, setEditForm] = useState({
    id: "",
    name: "",
    color: "",
    wine: "",
  });

  const onUpdateRow = (upDatedRow) => {
    const upDatedRows = data.map((grapeRow) => {
      if (grapeRow.id == upDatedRow.id) {
        console.log("updated:", upDatedRow);
        return upDatedRow;
      } else {
        return grapeRow;
      }
    });
    setData(upDatedRows);
  };

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
      <EditRow
        editForm={editForm}
        handleChange={handleChange}
        handleGrapeUpdate={handleGrapeUpdate}
        setIsEdited={setIsEdited}
        isEdited={isEdited}
      />

      <Table bordered hover responsive>
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
                setIsEdited={setIsEdited}
              />
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default GrapesTableComponent;
