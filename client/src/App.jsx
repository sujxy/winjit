import { useState } from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Layout from "./layout";
import ChatPage from "./ChatPage/index.jsx";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />} />

        {/* <Route index element={<Layout />} /> */}
        <Route path={"/chat"} element={<ChatPage />} />
      </Routes>
    </div>
  );
}

export default App;
