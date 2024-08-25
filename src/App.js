import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './screens/Login';
import Home from './screens/Home';
import Register from './screens/Register';
import Employee from './screens/EmployeeRegistration';
import Error from './screens/AccessDenied.js';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/employeeregistration" element={<Employee/>} />

      </Routes>
    </Router>
  );
}
