import React from "react";
import { HiSortAscending, HiSortDescending } from "react-icons/hi";

const THeadComponent = ({ requestSort, sortConfig }) => {
  return (
    <thead>
      <tr>
        <th>
          <button type="button" onClick={() => requestSort("id")}>
            #{" "}
            {sortConfig.key === "id" &&
              (sortConfig.direction === "ascending" ? (
                <HiSortDescending />
              ) : (
                <HiSortAscending />
              ))}
          </button>{" "}
        </th>
        <th>
          <button type="button" onClick={() => requestSort("name")}>
            NAME{" "}
            {sortConfig.key === "name" &&
              (sortConfig.direction === "ascending" ? (
                <HiSortDescending />
              ) : (
                <HiSortAscending />
              ))}
          </button>{" "}
        </th>
        <th>
          <button type="button" onClick={() => requestSort("color")}>
            COLOR{" "}
            {sortConfig.key === "color" &&
              (sortConfig.direction === "ascending" ? (
                <HiSortDescending />
              ) : (
                <HiSortAscending />
              ))}
          </button>{" "}
        </th>
        <th>
          <button type="button" onClick={() => requestSort("wine")}>
            WINE{" "}
            {sortConfig.key === "wine" &&
              (sortConfig.direction === "ascending" ? (
                <HiSortDescending />
              ) : (
                <HiSortAscending />
              ))}
          </button>{" "}
        </th>
        <th>EDIT ROW</th>
      </tr>
    </thead>
  );
};

export default THeadComponent;
