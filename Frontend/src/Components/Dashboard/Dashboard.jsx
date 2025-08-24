import React from "react";
import { FaUsers, FaUserCheck, FaTasks, FaChartLine, FaPlus, FaDownload } from "react-icons/fa"; 
import dgirl from "../../assets/images/3dgirl.svg";
import { useNavigate } from "react-router-dom"; // ✅ import useNavigate

const Dashboard = () => {
  const navigate = useNavigate(); // ✅ initialize navigate

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            <button className="text-gray-600">🔔</button>
          </div>
          <div className="flex items-center space-x-2">
            <img
              src={dgirl}
              alt="profile"
              className="w-8 h-8 rounded-full"
            />
            <div>
              <p className="text-sm font-semibold">John Admin</p>
              <p className="text-xs text-gray-500">Super Admin</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
          <FaUsers className="text-blue-500 text-2xl" />
          <div>
            <p className="text-xl font-bold">24</p>
            <p className="text-gray-500 text-sm">Total Employees</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
          <FaUserCheck className="text-green-500 text-2xl" />
          <div>
            <p className="text-xl font-bold">18</p>
            <p className="text-gray-500 text-sm">Active Users</p>
          </div>
        </div>

        {/* ✅ Pending Tasks Card with onClick */}
        <div
          onClick={() => navigate("/tasks")} // navigate to Task.jsx
          className="bg-white p-4 rounded-lg shadow flex items-center space-x-4 cursor-pointer hover:bg-gray-100"
        >
          <FaTasks className="text-yellow-500 text-2xl" />
          <div>
            <p className="text-xl font-bold">12</p>
            <p className="text-gray-500 text-sm">Pending Tasks</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
          <FaChartLine className="text-purple-500 text-2xl" />
          <div>
            <p className="text-xl font-bold">89%</p>
            <p className="text-gray-500 text-sm">Productivity</p>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center space-x-2">
              <span className="text-blue-500">🆕</span>
              <p>New employee added: <span className="font-semibold">Sarah Johnson</span> <span className="text-gray-500">· 2 hours ago</span></p>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-green-500">✔</span>
              <p>Task completed by <span className="font-semibold">Mike Davis</span> <span className="text-gray-500">· 4 hours ago</span></p>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-yellow-500">⚡</span>
              <p>Employee role updated: <span className="font-semibold">Lisa Chen</span> <span className="text-gray-500">· 1 day ago</span></p>
            </li>
          </ul>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="flex flex-col space-y-3">
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center justify-center space-x-2">
              <FaUsers /> <span>Add New Employee</span>
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded flex items-center justify-center space-x-2">
              <FaPlus /> <span>Add New Task</span>
            </button>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded flex items-center justify-center space-x-2">
              <FaDownload /> <span>Export Report</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
