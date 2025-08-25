import React from "react";
import {
  FaTachometerAlt,
  FaUsers,
  FaTasks,
  FaSignOutAlt,
  FaUserShield,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminSidebar = ({ activePage }) => {
  const navigate = useNavigate();

  // ✅ Logout Function
  const handleLogout = () => {
    console.log("Logout clicked");

    // 🔹 Clear all saved data (token, role, user etc.)
    localStorage.clear();

    // 🔹 Redirect user to Login page
    navigate("/");
  };

  // ✅ Reusable Nav Item
  const NavItem = ({ to, icon: Icon, label }) => (
    <li>
      <button
        onClick={() => navigate(to)}
        className={`flex items-center gap-3 w-full px-3 py-2 rounded-md transition ${
          activePage === label.toLowerCase()
            ? "bg-blue-600 text-white"
            : "text-gray-300 hover:bg-gray-700"
        }`}
      >
        <Icon />
        <span>{label}</span>
      </button>
    </li>
  );

  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col shadow-lg">
      {/* Sidebar Header / Branding */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-gray-700">
        <div className="p-2 bg-blue-600 rounded-lg shadow-md">
          <FaUserShield size={28} />
        </div>
        <div>
          <h1 className="text-lg font-bold">AdminHub</h1>
          <p className="text-xs text-gray-300">Super Admin</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4">
        <ul className="space-y-2">
          <NavItem to="/dashboard" icon={FaTachometerAlt} label="Dashboard" />
          <NavItem to="/employees" icon={FaUsers} label="Employees" />
          <NavItem to="/todo" icon={FaTasks} label="Todo" />
        </ul>
      </nav>

      {/* Logout */}
      <div className="px-2 py-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2 rounded-md text-gray-300 hover:bg-red-600 hover:text-white transition"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
