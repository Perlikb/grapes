import React, { useState, useEffect, Fragment } from "react";
import { Button, Form, Container, Table } from "react-bootstrap";
import TableRow from "../components/TableRow";
import EditableRow from "../components/EditableRow";
import ReactPaginate from "react-paginate";

const NewInventory = () => {
  const [pageCounter, setPageCounter] = useState(0);
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [isEditedId, setIsEditedId] = useState(null);
  const [editForm, setEditForm] = useState({
    id: "",
    name: "",
    color: "",
    wine: "",
  });

  const handlePageClick = (click) => {
    console.log(click);
    setPageCounter(click.selected);
  };

  const fetchData = () => {
    fetch(`http://localhost:5000/api/listgrapes/?page=${pageCounter}`)
      .then((response) => response.json())
      .then((newdata) => {
        setData(newdata);
        console.log("fetched new data");
      });
  };

  useEffect(() => {
    fetchData();
  }, [pageCounter]);

  const onUpdateRow = (upDatedRow) => {
    const upDatedRows = data.map((grapeRow) => {
      if (grapeRow.id === upDatedRow.id * 1) {
        console.log("updated:", typeof grapeRow.id, typeof upDatedRow.id);
        return upDatedRow;
      } else {
        return grapeRow;
      }
    });
    setData(upDatedRows);
    setShow(false);
  };

  function captureEdit(clickedGrape) {
    setIsEditedId(clickedGrape.id);
    let filtered = data.find((grape) => grape.id === clickedGrape.id);

    setEditForm(filtered);
    setShow(true);
  }

  function handleGrapeUpdate(updatedGrape) {
    onUpdateRow(updatedGrape);
  }

  const handleDelete = (row) => {
    const newData = [...data];
    const index = data.findIndex((el) => el.id === row.id);
    newData.splice(index, 1);

    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(`http://localhost:5000/api/deletegrape/${row.id}`, options)
      .then((response) => response.text())
      .then(() => {
        console.log("deleted");
        setData(newData);
      });
  };

  return (
    <div>
      <Form>
        <h1>NEW INVENTORY</h1>
        <Table bordered striped hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>NAME</th>
              <th>COLOR</th>
              <th>WINE</th>
              <th>EDIT ROW</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 &&
              data.map((el) => (
                <Fragment key={el.id}>
                  {isEditedId === el.id && show ? (
                    <EditableRow
                      editForm={editForm}
                      handleGrapeUpdate={handleGrapeUpdate}
                      setIsEditedId={setIsEditedId}
                    />
                  ) : (
                    <TableRow
                      key={el.id}
                      el={el}
                      captureEdit={captureEdit}
                      handleDelete={handleDelete}
                    />
                  )}
                </Fragment>
              ))}
          </tbody>
        </Table>
      </Form>
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={6}
        marginPagesDisplayed={1}
        pageRangeDisplayed={0}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default NewInventory;