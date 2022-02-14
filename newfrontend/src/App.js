import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import NavComponent from "./components/NavComponent";
import Home from "./pages/Home";
import FormPage from "./pages/FormPage";
import NewInventory from "./pages/NewInventory";
//import Inventory from "./pages/Inventory";
import Error from "./pages/Error";

function App() {
  return (
    <div className="App">
      <Router>
        <NavComponent />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/form" element={<FormPage />} />
          <Route exact path="/newinventory" element={<NewInventory />} />
          {/* <Route exact path="/inventory" element={<Inventory />} />*/}

          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
