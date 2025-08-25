import React, { useState } from 'react';
import { 
  FiSearch, 
  FiBell, 
  FiSettings, 
  FiPlus, 
  FiEdit2, 
  FiTrash2,
  FiChevronDown,
  FiX
} from 'react-icons/fi';

const EmployeeManagement = () => {
  const role = localStorage.getItem('role') || 'user';
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All Roles');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: ''
  });

  const employees = [
    {
      id: 1,
      name: 'Sarah Johnson',
      position: 'Marketing Manager',
      email: 'sarah.johnson@company.com',
      role: 'Manager',
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Mike Davis',
      position: 'Software Developer',
      email: 'mike.davis@company.com',
      role: 'Employee',
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 3,
      name: 'Lisa Chen',
      position: 'HR Specialist',
      email: 'lisa.chen@company.com',
      role: 'Employee',
      status: 'Inactive',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Inactive':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Manager':
        return 'bg-purple-100 text-purple-800';
      case 'Employee':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add user logic here
    console.log('Form submitted:', formData);
    // Reset form and close modal
    setFormData({
      fullName: '',
      email: '',
      password: '',
      role: ''
    });
    setShowModal(false);
  };

  const handleCancel = () => {
    setFormData({
      fullName: '',
      email: '',
      password: '',
      role: ''
    });
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Employee Management</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg">
                <FiBell className="h-6 w-6" />
              </button>
              
              {/* Settings */}
              <button className="p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg">
                <FiSettings className="h-6 w-6" />
              </button>
              
              {/* User Profile */}
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
        {/* Controls Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              {/* Search Bar */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              
              {/* Role Filter */}
              <div className="relative">
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm appearance-none bg-white"
                >
                  <option>All Roles</option>
                  <option>Manager</option>
                  <option>Employee</option>
                  <option>Admin</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <FiChevronDown className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
            
            {/* Add New User Button (hidden for normal users) */}
            {role !== 'user' && (
              <button 
                onClick={() => setShowModal(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                <FiPlus className="h-4 w-4 mr-2" />
                + Add New User
              </button>
            )}
          </div>
        </div>

        {/* Employee Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {employees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={employee.avatar}
                            alt={employee.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {employee.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {employee.position}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{employee.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(employee.role)}`}>
                        {employee.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(employee.status)}`}>
                        {employee.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        {(role === 'admin' || role === 'manager') && (
                          <button className="text-blue-600 hover:text-blue-900 p-1 rounded-lg hover:bg-blue-50 transition-colors duration-200">
                            <FiEdit2 className="h-4 w-4" />
                          </button>
                        )}
                        {role === 'admin' && (
                          <button className="text-red-600 hover:text-red-900 p-1 rounded-lg hover:bg-red-50 transition-colors duration-200">
                            <FiTrash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                
                {/* Empty rows for spacing */}
                {[...Array(5)].map((_, index) => (
                  <tr key={`empty-${index}`} className="h-16">
                    <td className="px-6 py-4"></td>
                    <td className="px-6 py-4"></td>
                    <td className="px-6 py-4"></td>
                    <td className="px-6 py-4"></td>
                    <td className="px-6 py-4"></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
                 </div>
       </div>

       {/* Add New User Modal */}
       {showModal && (
         <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 overflow-y-auto h-full w-full z-50">
           <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
             <div className="mt-3">
               {/* Modal Header */}
               <div className="flex items-center justify-between mb-6">
                 <h3 className="text-lg font-semibold text-gray-900">Add New User</h3>
                 <button
                   onClick={handleCancel}
                   className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                 >
                   <FiX className="h-6 w-6" />
                 </button>
               </div>

               {/* Modal Form */}
               <form onSubmit={handleSubmit} className="space-y-4">
                 {/* Full Name */}
                 <div>
                   <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                     Full Name
                   </label>
                   <input
                     type="text"
                     id="fullName"
                     name="fullName"
                     value={formData.fullName}
                     onChange={handleInputChange}
                     placeholder="Enter full name"
                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                     required
                   />
                 </div>

                 {/* Email Address */}
                 <div>
                   <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                     Email Address
                   </label>
                   <input
                     type="email"
                     id="email"
                     name="email"
                     value={formData.email}
                     onChange={handleInputChange}
                     placeholder="Enter email address"
                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                     required
                   />
                 </div>

                 {/* Password */}
                 <div>
                   <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                     Password
                   </label>
                   <input
                     type="password"
                     id="password"
                     name="password"
                     value={formData.password}
                     onChange={handleInputChange}
                     placeholder="Enter password"
                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                     required
                   />
                 </div>

                 {/* Role */}
                 <div>
                   <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                     Role
                   </label>
                   <select
                     id="role"
                     name="role"
                     value={formData.role}
                     onChange={handleInputChange}
                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                     required
                   >
                     <option value="">Select Role</option>
                     <option value="Manager">Manager</option>
                     <option value="Employee">Employee</option>
                     <option value="Admin">Admin</option>
                   </select>
                 </div>

                 {/* Action Buttons */}
                 <div className="flex justify-end space-x-3 pt-4">
                   <button
                     type="button"
                     onClick={handleCancel}
                     className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors duration-200"
                   >
                     Cancel
                   </button>
                   <button
                     type="submit"
                     className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
                   >
                     Add User
                   </button>
                 </div>
               </form>
             </div>
           </div>
         </div>
       )}
     </div>
  );
};

export default EmployeeManagement;
