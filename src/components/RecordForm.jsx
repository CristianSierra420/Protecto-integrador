import React from 'react';
import { addRecord } from '../services/recordService';
import { getUser } from '../services/authService';

const RecordForm = ({ onRecordAdded }) => {
  const user = getUser();

  const handleRecord = async (type) => {
    try {
      const response = await addRecord(user.cedula, type);
      onRecordAdded(response.newRecord);
      if (response.tardinessMinutes > 0) {
        alert(`⚠️ Llegaste ${response.tardinessMinutes} minutos tarde.`);
      } else {
        alert('✅ Registro exitoso.');
      }
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div>
      <h2>Registrar Asistencia</h2>
      <p>Bienvenido, {user.username}.</p>
      <button onClick={() => handleRecord('entry')}>Registrar Entrada</button>
      <button onClick={() => handleRecord('exit')}>Registrar Salida</button>
    </div>
  );
};

export default RecordForm;