import React, { useState } from 'react';
import { registerUser } from '../services/userService';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [cedula, setCedula] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const { success, message } = registerUser(username, cedula);
    setMessage(message);
    if (success) {
      setUsername('');
      setCedula('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registrar Nuevo Usuario</h2>
      {message && <p>{message}</p>}
      <input
        type="text"
        placeholder="Nombre de usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Cédula"
        value={cedula}
        onChange={(e) => setCedula(e.target.value)}
        required
      />
      <button type="submit">Registrar</button>
    </form>
  );
};

export default RegisterForm;