import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

import { Person, Lock } from 'react-bootstrap-icons';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [cedula, setCedula] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const user = await login(username, cedula);
      onLogin(user);
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/worker');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4">
        <form onSubmit={handleSubmit}>
          <h2 className="text-center mb-4">Iniciar Sesión</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="input-group mb-3">
            <span className="input-group-text"><Person /></span>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text"><Lock /></span>
            <input
              type="password"
              className="form-control"
              id="cedula"
              placeholder="Cédula"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Acceder</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;