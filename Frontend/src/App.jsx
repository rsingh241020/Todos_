import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Common/Layout";
import Login from "./Components/Auth/Login";
 import Dashboard from "./Components/Dashboard/Dashboard";
 import Employee from "./Components/Employement/Employee";
 import Task from "./Components/Dashboard/Task";
// import Profile from "./Pages/Profile";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Protected Routes inside Layout */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
          <Route path="/employees" element={<Employee/>}/>
          <Route path ="/tasks" element={<Task/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
