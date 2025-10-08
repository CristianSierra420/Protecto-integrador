import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import { getUser } from './services/auth.service';
import FormularioInicioSesion from './pages/Login/FormularioInicioSesion';
import RegisterForm from './pages/Login/RegisterForm';

const AdminDashboard = () => {
  return <div>Admin Dashboard</div>;
};

const WorkerDashboard = () => {
  return <div>Worker Dashboard</div>;
};

import { ToastContainer } from 'react-toastify';

const App = () => {
  const [user, setUser] = useState(getUser());

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <Navbar onLogout={handleLogout} />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          {/* <Route path="/home" element={<Home />} /> */}
          <Route path="/login" element={<FormularioInicioSesion onLogin={handleLogin} />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/admin" element={user && user.role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />} />
          <Route path="/worker" element={user && user.role === 'worker' ? <WorkerDashboard /> : <Navigate to="/login" />} />
        </Routes>
      </main>
      <ToastContainer />
    </Router>
  );
};

export default App;