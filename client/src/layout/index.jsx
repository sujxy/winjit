import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

import axios from "axios";

export default function Layout() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/chat");
  };
  return (
    <div className="w-screen futuristic-gradient bg-gradient-to-r from-primary to-green    ">
      <div className="flex items-center justify-between px-16 py-8 text-white backdrop-blur-lg bg-opacity-30">
        <Link to="/">
          <span className="font-poppins text-4xl font-light  hover:scale-105 transition-all">
            Fin
          </span>
          <span className="font-yeseva  text-4xl  hover:scale-105 transition-all">
            Astra
          </span>
        </Link>
        <div className="flex gap-4 text-lg">
          <Link to="/auth" className="outline-btn ">
            Login
          </Link>
          <Link to="/chat" className="outline-btn ">
            Chat
          </Link>
        </div>
      </div>

      <div className=" min-h-[720px] w-screen flex justify-center items-center  ">
        <div>
          <h1 className="text-white text-6xl font-black font-poppins w-2/3">
            No need to remember those Finance Jargons
          </h1>
          <button
            onClick={handleClick}
            className="px-4  my-6 py-2 rounded-md text-white bg-transparent border border-white hover:bg-white hover:text-black"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
