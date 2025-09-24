import React from 'react';
import { Link } from 'react-router-dom';
import { getUser, logout } from '../services/authService';

const Navbar = ({ onLogout }) => {
  const user = getUser();

  const handleLogout = () => {
    logout();
    onLogout();
  };

  return (
    <nav>
      <Link to="/">Inicio</Link>
      {user ? (
        <>
          <span>Bienvenido, {user.username} ({user.role})</span>
          <button onClick={handleLogout}>Cerrar Sesión</button>
        </>
      ) : (
        <Link to="/login">Iniciar Sesión</Link>
      )}
    </nav>
  );
}; 

export default Navbar;