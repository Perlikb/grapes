import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import "../App.css";

const Inventory = () => {
  const [data, setData] = useState([]);
  const fetchData = () => {
    fetch(`http://localhost:5000/api/listgrapes`)
      .then((response) => response.json())
      .then((newdata) => {
        setData(newdata);
        console.log(data);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      dataField: "id",
      text: "#",
      sort: true,
    },
    {
      dataField: "name",
      text: "NAME",
      sort: true,
    },
    {
      dataField: "color",
      text: "COLOR",
      sort: true,
    },
    {
      dataField: "wine",
      text: "WINE",
      sort: true,
    },
    {
      text: "EDIT",

      sort: true,
    },
  ];

  return (
    <div>
      {data ? (
        <BootstrapTable
          keyField="id"
          data={data}
          columns={columns}
          striped
          hover
          condensed
          pagination={paginationFactory()}
        />
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default Inventory;
