import React, { useState, useEffect } from "react";
import GrapesTableComponent from "../components/GrapesTableComponent";
import "../App.css";

//
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

  return (
    <div>
      <h1>GRAPESTABLE</h1>
      <GrapesTableComponent data={data} setData={setData} />
    </div>
  );
};

export default GrapesTable;
