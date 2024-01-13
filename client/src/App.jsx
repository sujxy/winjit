import { useState } from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Layout from "./layout";

function App() {
  return (
    <div>
      <Routes>
        <Route index element={<Layout />}>
          {/* <Route path={"/chat"} element={<ChatPage />} /> */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
