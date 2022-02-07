import React, { useState, useEffect } from "react";
import GrapesTableComponent from "../components/GrapesTableComponent";
import "../App.css";

const GrapesTable = () => {
  const [data, setData] = useState([]);
  const fetchData = () => {
    fetch(`http://localhost:5000/api/listgrapes`)
      .then((response) => response.json())
      .then((newdata) => {
        setData(newdata);
      });
  };
  useEffect(() => {
    fetchData();
    console.log("fetched");
  }, []);

  const onUpdateRow = (upDatedRow) => {
    const upDatedRows = data.map((grapeRow) => {
      console.log(upDatedRow.id, grapeRow.id);
      if (grapeRow.id == upDatedRow.id) {
        console.log("updated:", upDatedRow);
        return upDatedRow;
      } else {
        return grapeRow;
      }
    });
    setData(upDatedRows);
  };

  return (
    <div>
      <h1>GRAPESTABLE</h1>
      <GrapesTableComponent data={data} onUpdateRow={onUpdateRow} />
    </div>
  );
};

export default GrapesTable;
