import React, { useState } from "react";
import { 
  FaTasks, 
  FaCheckCircle, 
  FaClock, 
  FaExclamationTriangle, 
  FaChartLine, 
  FaPlus, 
  FaCalendarAlt,
  FaUser,
  FaBell
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [newTodo, setNewTodo] = useState('');
  
  // Mock data for user todos
  const [todos, setTodos] = useState([
    { id: 1, title: "Complete project proposal", status: "pending", dueDate: "Today", completed: false },
    { id: 2, title: "Schedule team meeting", status: "completed", dueDate: "Yesterday", completed: true },
    { id: 3, title: "Review code changes", status: "pending", dueDate: "Tomorrow", completed: false },
    { id: 4, title: "Update documentation", status: "overdue", dueDate: "2 days ago", completed: false },
    { id: 5, title: "Prepare presentation slides", status: "pending", dueDate: "Next week", completed: false }
  ]);

  const addTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      const todo = {
        id: Date.now(),
        title: newTodo.trim(),
        status: "pending",
        dueDate: "Today",
        completed: false
      };
      setTodos([todo, ...todos]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id 
        ? { ...todo, completed: !todo.completed, status: !todo.completed ? "completed" : "pending" }
        : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Calculate stats
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const pendingTodos = todos.filter(todo => !todo.completed && todo.status !== "overdue").length;
  const overdueTodos = todos.filter(todo => todo.status === "overdue").length;
  const progress = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'overdue': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <FaCheckCircle className="w-4 h-4" />;
      case 'overdue': return <FaExclamationTriangle className="w-4 h-4" />;
      case 'pending': return <FaClock className="w-4 h-4" />;
      default: return <FaClock className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's your progress overview</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            <button className="text-gray-600 hover:text-gray-800">
              <FaBell className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <FaUser className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold">John User</p>
              <p className="text-xs text-gray-500">Regular User</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
          <FaTasks className="text-blue-500 text-2xl" />
          <div>
            <p className="text-xl font-bold">{totalTodos}</p>
            <p className="text-gray-500 text-sm">My Todos</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
          <FaCheckCircle className="text-green-500 text-2xl" />
          <div>
            <p className="text-xl font-bold">{completedTodos}</p>
            <p className="text-gray-500 text-sm">Completed</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
          <FaClock className="text-yellow-500 text-2xl" />
          <div>
            <p className="text-xl font-bold">{pendingTodos}</p>
            <p className="text-gray-500 text-sm">Pending</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
          <FaExclamationTriangle className="text-red-500 text-2xl" />
          <div>
            <p className="text-xl font-bold">{overdueTodos}</p>
            <p className="text-gray-500 text-sm">Overdue</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
          <FaChartLine className="text-purple-500 text-2xl" />
          <div>
            <p className="text-xl font-bold">{progress}%</p>
            <p className="text-gray-500 text-sm">Progress</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* My Todos Section */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold mb-4">My Todos</h2>
            
            {/* Add Todo Form */}
            <form onSubmit={addTodo} className="flex space-x-3 mb-4">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="+ Add new todo..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <FaPlus className="w-4 h-4" />
                <span>Add</span>
              </button>
            </form>

            {/* Todo List */}
            <div className="space-y-3">
              {todos.map(todo => (
                <div key={todo.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                      todo.completed 
                        ? 'bg-blue-600 border-blue-600 text-white' 
                        : 'border-gray-300 hover:border-blue-500'
                    }`}
                  >
                    {todo.completed && <FaCheckCircle className="w-3 h-3" />}
                  </button>
                  
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${
                      todo.completed ? 'text-gray-500 line-through' : 'text-gray-900'
                    }`}>
                      {todo.title}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <FaCalendarAlt className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-500">{todo.dueDate}</span>
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(todo.status)}`}>
                        {getStatusIcon(todo.status)}
                        <span className="ml-1 capitalize">{todo.status}</span>
                      </span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="text-gray-400 hover:text-red-600 p-1 rounded hover:bg-red-50"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button 
                onClick={() => navigate("/tasks")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2"
              >
                <FaTasks />
                <span>View All Tasks</span>
              </button>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2">
                <FaPlus />
                <span>Create Todo</span>
              </button>
              <button 
                onClick={() => navigate("/user-profile")}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2"
              >
                <FaUser />
                <span>Profile Settings</span>
              </button>
              <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg flex items-center justify-center space-x-2">
                <FaCalendarAlt />
                <span>Calendar View</span>
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <span className="text-green-500">✔</span>
                <p>Completed <span className="font-semibold">Project proposal</span></p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-blue-500">🆕</span>
                <p>Added new todo <span className="font-semibold">Code review</span></p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-500">⚡</span>
                <p>Updated <span className="font-semibold">Meeting schedule</span></p>
              </div>
            </div>
          </div>

          {/* Progress Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Progress Overview</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Completion Rate</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{completedTodos}/{totalTodos}</p>
                <p className="text-sm text-gray-500">Tasks Completed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
