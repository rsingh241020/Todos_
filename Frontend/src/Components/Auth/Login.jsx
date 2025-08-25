import React, { useState } from 'react';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import API from "../../api";
import { useNavigate, Link } from "react-router-dom";

const TaskLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Attempting login with email:", email); // Debug: Login attempt
      const res = await API.post("/auth/login", { email, password });
      console.log("Full response from API:", res.data); // Debug: Full response

      localStorage.setItem("token", res.data.token);
      console.log("Token saved to localStorage:", res.data.token); // Debug: Token

      const roleRaw = res.data?.user?.role;
      const role = String(roleRaw || '').toLowerCase();
      console.log("Raw role from response:", roleRaw); // Debug: Raw role
      console.log("Processed role:", role); // Debug: Processed role

      localStorage.setItem("role", role);
      console.log("Role saved to localStorage:", localStorage.getItem("role")); // Debug: Saved role

      if (role === "admin") {
        console.log("Navigating to /dashboard for admin"); // Debug: Navigation
        navigate("/dashboard");
      } else if (role === "manager") {
        console.log("Navigating to /manager-dashboard for manager"); // Debug: Navigation
        navigate("/manager-dashboard");
      } else {
        console.log("Navigating to /user-dashboard for other roles"); // Debug: Navigation
        navigate("/user-dashboard");
      }
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message); // Debug: Error
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      {/* Top Icon */}
      <div className="flex justify-center pt-16 pb-8">
        <div className="w-16 h-16 bg-white rounded-xl shadow-lg flex items-center justify-center">
          <div className="grid grid-cols-4 gap-1">
            {[...Array(16)].map((_, index) => (
              <div key={index} className="w-2 h-2 bg-blue-600 rounded-sm"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Login Card */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl shadow-xl p-8">
            
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
              <p className="text-gray-600">Sign in to your account to continue</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <FiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <FiEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-sm text-blue-600 hover:text-blue-500 font-medium">
                  Forgot password?
                </a>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
              >
                Sign In
              </button>
            </form>

            {/* Divider */}
            <div className="mt-6 flex items-center justify-center">
              <span className="text-gray-400 text-sm">Or continue with</span>
            </div>

            {/* Social Buttons */}
            <div className="mt-4 flex justify-center space-x-4">
              <button className="flex items-center justify-center w-24 h-12 border border-gray-300 rounded-lg hover:bg-gray-100">
                <FaGoogle className="text-500 text-xl" />
              </button>
              <button className="flex items-center justify-center w-24 h-12 border border-gray-300 rounded-lg hover:bg-gray-100">
                <FaFacebook className="text-blue-600 text-xl" />
              </button>
            </div>

            {/* Sign Up Link */}
            <p className="mt-6 text-center text-sm text-gray-600">
              Don’t have an account?{" "}
              <Link to="/register" className="text-blue-600 hover:text-blue-500 font-medium">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskLogin;