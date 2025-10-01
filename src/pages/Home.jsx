import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mt-5 text-center">
      <h1 className="display-4 mb-4 text-primary">Bienvenido al Sistema de Registro de Horarios</h1>
      <p className="lead mb-5">Inicia sesión o regístrate para continuar.</p>
      <div>
        <Link to="/login" className="btn btn-primary btn-lg mx-2">Iniciar Sesión</Link>
        <Link to="/register" className="btn btn-secondary btn-lg mx-2">Registrar Trabajador</Link>
      </div>
    </div>
  );
};

export default Home;