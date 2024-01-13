import React from "react";
import { Link, Outlet } from "react-router-dom";

import axios from "axios";

export default function Layout() {
  return (
    <div className="w-screen bg-gray-200">
      <div className="sticky top-0 flex items-center justify-between px-8 py-3 shadow-md bg-white">
        <Link to="/">
          <span className="font-yeseva text-3xl text-primary hover:scale-105 transition-all">
            Fin
          </span>
          <span className="font-yeseva text-3xl text-green hover:scale-105 transition-all">
            Astra
          </span>
        </Link>

        <Link to="/auth" className="outline-btn ">
          Login
        </Link>
      </div>
      <Outlet />
    </div>
  );
}
