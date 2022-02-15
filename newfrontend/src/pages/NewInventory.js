import React, { useState, useEffect, Fragment } from "react";
import { Row, Form, Container, Table } from "react-bootstrap";
import TableRow from "../components/TableRow";
import EditableRow from "../components/EditableRow";
import SearchComponent from "../components/SearchComponent";
import THeadComponent from "../components/THeadComponent";
import ReactPaginate from "react-paginate";

const NewInventory = () => {
  const [pageCountNeeded, setPageCountNeeded] = useState(true);
  const [select, setSelect] = useState();
  const [search, setSearch] = useState();
  const [searchUrl, setSearchUrl] = useState();
  const [pageTotal, setPageTotal] = useState(0);
  const [sortConfig, setSortConfig] = useState({
    key: "id",
    field: "ascending",
  });

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

  if (sortConfig.key !== null) {
    data.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  }

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };
  const handlePageClick = (click) => {
    console.log(click);
    setPageCounter(click.selected);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let myLine = select + "=" + search;
    console.log(myLine);
    setSearchUrl(myLine);
  };

  const fetchData = () => {
    fetch(
      `http://localhost:5000/api/listgrapes?page=${pageCounter}&${searchUrl}`
    )
      .then((response) => response.json())
      .then((newdata) => {
        setData(newdata);
        if (!newdata[0].full_count) setPageCountNeeded(false);
        else setPageTotal(newdata[0].full_count);
        console.log("fetched new data", newdata);
      });
  };

  useEffect(() => {
    fetchData();
  }, [pageCounter, searchUrl]);

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
    <Container>
      <Row>
        <SearchComponent
          handleSubmit={handleSubmit}
          setSelect={setSelect}
          setSearch={setSearch}
        />
      </Row>
      <Form>
        <h1>NEW INVENTORY</h1>
        <Table bordered striped hover responsive>
          <THeadComponent requestSort={requestSort} sortConfig={sortConfig} />

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
      {pageCountNeeded && (
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          pageCount={Math.ceil(pageTotal / 5)}
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
      )}
    </Container>
  );
};

export default NewInventory;
