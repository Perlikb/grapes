import React, { useState, useEffect } from "react";
import Grape from "./Grape";

const Grapes = () => {
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
      {data.length > 0
        ? data.map((el) => <Grape key={el.id} el={el} />)
        : "Loading..."}
    </div>
  );
};

export default Grapes;
