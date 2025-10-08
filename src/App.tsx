import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import { getUser } from './services/auth.service';
import FormularioInicioSesion from './pages/Login/FormularioInicioSesion';
import RegisterForm from './pages/Login/RegisterForm';

const AdminDashboard: React.FC = () => {
  return <div>Admin Dashboard</div>;
};

const WorkerDashboard: React.FC = () => {
  return <div>Worker Dashboard</div>;
};

import { ToastContainer } from 'react-toastify';

type JwtPayload = { role: string; sub: string; iat: number; exp: number; };

const App = () => {
  const [user, setUser] = useState<JwtPayload | null>(getUser() as JwtPayload | null);

  const handleLogin = (loggedInUser: any) => {
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
          <Route path="/login" element={<FormularioInicioSesion />} />
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