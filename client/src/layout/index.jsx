import React from "react";
import { Link, Outlet } from "react-router-dom";

import axios from "axios";

export default function Layout() {
  return (
    <div className="w-screen bg-gray-200">
      <div className="sticky top-0 flex items-center justify-between px-8 py-3 shadow-md bg-white">
        <Link
          to="/"
          className="font-pacifico text-3xl text-primary hover:scale-105 transition-all"
        >
          DocPlus
        </Link>
        {!user ? (
          <Link to="/auth" className="outline-btn ">
            Login
          </Link>
        ) : (
          <button
            className="outline-btn text-red-500 border-red-500"
            onClick={setLogout}
          >
            Logout
          </button>
        )}
      </div>
      <Outlet />
    </div>
  );
}
