import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import FormPage from "./pages/FormPage";
import Inventory from "./pages/Inventory";
import Error from "./pages/Error";

function App() {
  return (
    <div className="App">
      <Router>
        <Nav className="navbar navbar-expand-lg" />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/form" element={<FormPage />} />
          <Route exact path="/inventory" element={<Inventory />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
