import React, { useState } from 'react';

import { Person, PersonVcard } from 'react-bootstrap-icons';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [cedula, setCedula] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with:', { username, cedula });
    // The backend call has been removed.
    // We'll just clear the form for now.
    setUsername('');
    setCedula('');
  };

  return (
    <div className="container mt-5">
      <div className="card p-4">
        <form onSubmit={handleSubmit}>
          <h2 className="text-center mb-4">Registrar Nuevo Usuario</h2>
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
            <span className="input-group-text"><PersonVcard /></span>
            <input
              type="text"
              className="form-control"
              id="cedula"
              placeholder="Cédula"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Registrar</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
