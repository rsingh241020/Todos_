import React from "react";
import { FaUsers, FaUserCheck, FaTasks, FaChartLine, FaClipboardList, FaPlus } from "react-icons/fa";
import dgirl from "../../assets/images/3dgirl.svg";
import { useNavigate } from "react-router-dom";

const ManagerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Manager Dashboard</h1>
        <div className="flex items-center space-x-4">
                <div className="relative">
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            <button className="text-gray-600">🔔</button>
                  </div>
          <div className="flex items-center space-x-2">
            <img src={dgirl} alt="profile" className="w-8 h-8 rounded-full" />
                <div>
              <p className="text-sm font-semibold">Mary Manager</p>
              <p className="text-xs text-gray-500">Team Manager</p>
                </div>
              </div>
            </div>
          </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
          <FaUsers className="text-blue-500 text-2xl" />
              <div>
            <p className="text-xl font-bold">12</p>
            <p className="text-gray-500 text-sm">Team Members</p>
                </div>
              </div>

        <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
          <FaUserCheck className="text-green-500 text-2xl" />
              <div>
            <p className="text-xl font-bold">9</p>
            <p className="text-gray-500 text-sm">Active Today</p>
                </div>
              </div>

        <div onClick={() => navigate("/tasks")} className="bg-white p-4 rounded-lg shadow flex items-center space-x-4 cursor-pointer hover:bg-gray-100">
          <FaTasks className="text-yellow-500 text-2xl" />
              <div>
            <p className="text-xl font-bold">21</p>
            <p className="text-gray-500 text-sm">Open Tasks</p>
              </div>
            </div>

        <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
          <FaChartLine className="text-purple-500 text-2xl" />
          <div>
            <p className="text-xl font-bold">92%</p>
            <p className="text-gray-500 text-sm">Team Health</p>
            </div>
          </div>
        </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Team Activity */}
        <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Team Activity</h2>
          <ul className="space-y-3">
            <li className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>Rahul completed Task #482</span>
            </div>
              <span className="text-xs text-gray-500">2m ago</span>
            </li>
            <li className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>Priya added a new task to Sprint</span>
          </div>
              <span className="text-xs text-gray-500">15m ago</span>
            </li>
            <li className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                <span>Rohan updated project timeline</span>
              </div>
              <span className="text-xs text-gray-500">1h ago</span>
            </li>
          </ul>
          </div>

        {/* Quick Actions */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="flex flex-col space-y-3">
            <button onClick={() => navigate("/employees")} className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center justify-center space-x-2">
              <FaClipboardList /> <span>Manage Team</span>
            </button>
            <button onClick={() => navigate("/tasks")} className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded flex items-center justify-center space-x-2">
              <FaPlus /> <span>Create Task</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
