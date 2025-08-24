import React from "react";
import Sidebar from "../Common/sidebar"; // ✅ your sidebar component
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6">
        <Outlet /> {/* ✅ this will render nested route content */}
      </div>
    </div>
  );
};

export default Layout;
