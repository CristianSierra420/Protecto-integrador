import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h2>Bienvenido al Sistema de Registro de Horarios</h2>
      <Link to="/login">
        <button>Iniciar Sesión</button>
      </Link>
      <Link to="/register">
        <button>Registrar Trabajador</button>
      </Link>
    </div>
  );
};

export default Home;