import React, { useState } from 'react';
import { 
  FiBell, 
  FiSettings, 
  FiFilter,
  FiPlus,
  FiTrash2,
  FiCheck,
  FiClock,
  FiAlertTriangle,
  FiList
} from 'react-icons/fi';
import { FaSort } from 'react-icons/fa';

const TaskManagement = () => {
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([
    { id: 1, description: 'Review quarterly performance reports', status: 'In Progress', dueDate: 'Created 2 hours ago', completed: false },
    { id: 2, description: 'Update project documentation', status: 'Completed', dueDate: 'Completed yesterday', completed: true },
    { id: 3, description: 'Prepare presentation for client meeting', status: 'Overdue', dueDate: 'Due yesterday', completed: false },
    { id: 4, description: 'Schedule team meeting for next week', status: 'To Do', dueDate: 'Due in 3 days', completed: false },
    { id: 5, description: 'Review and approve budget proposal', status: 'In Review', dueDate: 'Due tomorrow', completed: false },
    { id: 6, description: 'Send monthly report to stakeholders', status: 'Completed', dueDate: 'Completed 2 days ago', completed: true }
  ]);

  const [sortAsc, setSortAsc] = useState(true);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-orange-100 text-orange-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      case 'To Do': return 'bg-gray-100 text-gray-800';
      case 'In Review': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed': return <FiCheck className="h-4 w-4" />;
      case 'In Progress': return <FiClock className="h-4 w-4" />;
      case 'Overdue': return <FiAlertTriangle className="h-4 w-4" />;
      case 'To Do': return <FiList className="h-4 w-4" />;
      case 'In Review': return <FiClock className="h-4 w-4" />;
      default: return <FiList className="h-4 w-4" />;
    }
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      const task = { id: Date.now(), description: newTask.trim(), status: 'To Do', dueDate: 'Created just now', completed: false };
      setTasks([task, ...tasks]);
      setNewTask('');
    }
  };

  const toggleTaskComplete = (taskId) => {
    setTasks(tasks.map(task => task.id === taskId
      ? { ...task, completed: !task.completed, status: !task.completed ? 'Completed' : 'To Do' }
      : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const remainingTasks = tasks.length - completedTasks;

  const handleSort = () => {
    const sortedTasks = [...tasks].sort((a, b) => {
      if (sortAsc) return a.description.localeCompare(b.description);
      return b.description.localeCompare(a.description);
    });
    setTasks(sortedTasks);
    setSortAsc(!sortAsc);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-500 rounded-lg"><FiBell className="h-6 w-6" /></button>
              <button className="p-2 text-gray-400 hover:text-gray-500 rounded-lg"><FiSettings className="h-6 w-6" /></button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">JA</span>
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">John Admin</p>
                  <p className="text-xs text-gray-500">Super Admin</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6 flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center"><FiList className="h-5 w-5 text-blue-600" /></div>
            <div className="ml-4">
              <p className="text-2xl font-bold">{tasks.length}</p>
              <p className="text-sm text-gray-500">Total Tasks</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-6 flex items-center">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center"><FiCheck className="h-5 w-5 text-green-600" /></div>
            <div className="ml-4">
              <p className="text-2xl font-bold">{completedTasks}</p>
              <p className="text-sm text-gray-500">Completed</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-6 flex items-center">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center"><FiClock className="h-5 w-5 text-orange-600" /></div>
            <div className="ml-4">
              <p className="text-2xl font-bold">{tasks.filter(task => task.status === 'In Progress').length}</p>
              <p className="text-sm text-gray-500">In Progress</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-6 flex items-center">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center"><FiAlertTriangle className="h-5 w-5 text-red-600" /></div>
            <div className="ml-4">
              <p className="text-2xl font-bold">{tasks.filter(task => task.status === 'Overdue').length}</p>
              <p className="text-sm text-gray-500">Overdue</p>
            </div>
          </div>
        </div>

        {/* My Tasks Section */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">My Tasks</h2>
              <p className="text-sm text-gray-500">Manage your personal to-do list</p>
            </div>
            <div className="flex items-center space-x-3 mt-4 sm:mt-0">
              <button className="inline-flex items-center px-3 py-2 border rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50" >
                <FiFilter className="h-4 w-4 mr-2" /> Filter
              </button>
              <button onClick={handleSort} className="inline-flex items-center px-3 py-2 border rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <FaSort className="h-4 w-4 mr-2" /> Sort
              </button>
            </div>
          </div>

          {/* Add Task Form */}
          <div className="px-6 py-4 border-b border-gray-200">
            <form onSubmit={handleAddTask} className="flex space-x-3">
              <input type="text" value={newTask} onChange={(e)=>setNewTask(e.target.value)} placeholder="+ Add new task..." className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Add Task</button>
            </form>
          </div>

          {/* Task List */}
          <div className="divide-y divide-gray-200">
            {tasks.map(task => (
              <div key={task.id} className="px-6 py-4 hover:bg-gray-50 flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1">
                  <button onClick={()=>toggleTaskComplete(task.id)} className={`w-5 h-5 rounded border-2 flex items-center justify-center ${task.completed?'bg-blue-600 border-blue-600 text-white':'border-gray-300 hover:border-blue-500'}`}>
                    {task.completed && <FiCheck className="h-3 w-3"/>}
                  </button>
                  <p className={`flex-1 text-sm font-medium ${task.completed?'text-gray-500 line-through':'text-gray-900'}`}>{task.description}</p>
                  <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(task.status)}`}>
                    {getStatusIcon(task.status)} <span className="ml-1">{task.status}</span>
                  </span>
                  <span className="text-xs text-gray-500 whitespace-nowrap">{task.dueDate}</span>
                </div>
                <button onClick={()=>deleteTask(task.id)} className="ml-4 text-gray-400 hover:text-red-600 p-1 rounded-lg hover:bg-red-50">
                  <FiTrash2 className="h-4 w-4"/>
                </button>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <p className="text-sm text-gray-500">{tasks.length} tasks total • {completedTasks} completed • {remainingTasks} remaining</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskManagement;
