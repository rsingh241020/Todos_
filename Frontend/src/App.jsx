import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Common/Layout";
import UserLayout from "./Common/UserLayout";
import Login from "./Components/Auth/Login";
import Dashboard from "./Components/Dashboard/Dashboard";
import ManagerDashboard from "./Components/Dashboard/ManagerDashboard";
import UserDashboard from "./Components/Dashboard/UserDashboard";
import UserManager from "./Components/Dashboard/UserManager";
import Employee from "./Components/Employement/Employee";
import Task from "./Components/Dashboard/Task";
import Register from "./Components/Auth/register";

// import Profile from "./Pages/Profile";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} /> 
        
        {/* Admin/Manager Routes inside Layout */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/manager-dashboard" element={<ManagerDashboard />} />
          <Route path="/employees" element={<Employee/>}/>
          <Route path ="/tasks" element={<Task/>}/>
        </Route>

        {/* User Routes inside UserLayout */}
        <Route element={<UserLayout />}>
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/user-profile" element={<UserManager />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
