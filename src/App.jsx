
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import CirculosRelacionamentos from "./CirculosRelacionamentos";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/circulos" element={<CirculosRelacionamentos />} />
      </Routes>
    </Router>
  );
}

export default App;
