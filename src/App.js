import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './screens/Login';
import Home from './screens/Home';
import Register from './screens/Register';
import Employee from './screens/EmployeeRegistration';
import Error from './screens/AccessDenied.js';
import { AuthProvider } from './AuthContext';
import { useAuth } from './AuthContext.js';


export default function App() {

  const AdmPage = () => {
    const { state } = useAuth();

    if (state.isAuthenticated) {

      if (state.user.employeeType === 'Administrador') {
        return <Employee />;
      } else
        return <Error />;
    }
    return <Login />;
  };

  const MedicoPage = () => {
    const { state } = useAuth();

    if (state.isAuthenticated) {

      if (state.user.employeeType === 'Medico') {
        return <Home />;
      } else
        return <Error />;
    }
    return <Login />;
  };

  return (
    <AuthProvider>
      <Router>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<MedicoPage />} />
          <Route path="/homeAdm" element={<AdmPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/employeeregistration" element={<Employee />} />
          </Routes>

      </Router>
    </AuthProvider>
  );
}
