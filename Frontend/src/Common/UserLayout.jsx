import React from "react";
import UserSidebar from "./UserSidebar";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* User Sidebar */}
      <div className="w-64 bg-gray-800 text-white">
        <UserSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
