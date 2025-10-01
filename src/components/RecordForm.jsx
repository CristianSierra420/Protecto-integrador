import React from 'react';
import { addRecord } from '../services/recordService';
import { getUser } from '../services/authService';

import { BoxArrowInRight, BoxArrowRight } from 'react-bootstrap-icons';

import { toast } from 'react-toastify';

const RecordForm = ({ onRecordAdded }) => {
  const user = getUser();

  const handleRecord = async (type) => {
    try {
      const response = await addRecord(user.cedula, type);
      onRecordAdded(response.newRecord);
      if (response.tardinessMinutes > 0) {
        toast.warn(`Llegaste ${response.tardinessMinutes} minutos tarde.`);
      } else {
        toast.success('Registro exitoso.');
      }
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    }
  };

  return (
    <div className="card p-3 mb-4">
      <h2 className="text-center mb-3">Registrar Asistencia</h2>
      <p className="text-center">Bienvenido, <strong>{user.username}</strong>.</p>
      <div className="d-grid gap-2">
        <button className="btn btn-success btn-lg" onClick={() => handleRecord('entry')}>
          <BoxArrowInRight className="me-2"/>
          Registrar Entrada
        </button>
        <button className="btn btn-danger btn-lg" onClick={() => handleRecord('exit')}>
          <BoxArrowRight className="me-2"/>
          Registrar Salida
        </button>
      </div>
    </div>
  );
};

export default RecordForm;