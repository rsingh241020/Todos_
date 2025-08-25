import React from "react";
import {
  FaTachometerAlt,
  FaTasks,
  FaCalendarAlt,
  FaSignOutAlt,
  FaUser,
  FaChartLine,
  FaCog
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UserSidebar = ({ activePage }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logout clicked");
    // Clear local storage and navigate to login
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col">
      {/* Branding/Header */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-gray-700">
        <div className="p-2 bg-blue-600 rounded-lg">
          <FaUser size={28} />
        </div>
        <div>
          <h1 className="text-lg font-bold">UserHub</h1>
          <p className="text-xs text-gray-300">Regular User</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4">
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => navigate("/user-dashboard")}
              className={`flex items-center gap-3 w-full px-3 py-2 rounded-md transition ${
                activePage === "user-dashboard"
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-700"
              }`}
            >
              <FaTachometerAlt />
              <span>Dashboard</span>
            </button>
          </li>

          <li>
            <button
              onClick={() => navigate("/tasks")}
              className={`flex items-center gap-3 w-full px-3 py-2 rounded-md transition ${
                activePage === "tasks"
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-700"
              }`}
            >
              <FaTasks />
              <span>My Tasks</span>
            </button>
          </li>

          <li>
            <button
              onClick={() => navigate("/user-profile")}
              className={`flex items-center gap-3 w-full px-3 py-2 rounded-md transition ${
                activePage === "user-profile"
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-700"
              }`}
            >
              <FaUser />
              <span>Profile</span>
            </button>
          </li>

          <li>
            <button
              onClick={() => navigate("/calendar")}
              className={`flex items-center gap-3 w-full px-3 py-2 rounded-md transition ${
                activePage === "calendar"
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-700"
              }`}
            >
              <FaCalendarAlt />
              <span>Calendar</span>
            </button>
          </li>

          <li>
            <button
              onClick={() => navigate("/progress")}
              className={`flex items-center gap-3 w-full px-3 py-2 rounded-md transition ${
                activePage === "progress"
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-700"
              }`}
            >
              <FaChartLine />
              <span>Progress</span>
            </button>
          </li>

          <li>
            <button
              onClick={() => navigate("/settings")}
              className={`flex items-center gap-3 w-full px-3 py-2 rounded-md transition ${
                activePage === "settings"
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-700"
              }`}
            >
              <FaCog />
              <span>Settings</span>
            </button>
          </li>
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="px-2 py-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white transition"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default UserSidebar;
