import { useState } from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Layout from "./layout";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />} />

        <Route path={"/chat"} element={<h1>hii</h1>} />
      </Routes>
    </div>
  );
}

export default App;
