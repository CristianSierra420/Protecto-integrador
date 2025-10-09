
import React, { useState } from 'react';
import { addRecord } from '../../services/record.service';
import { getUser } from '../../services/auth.service'; 
import { useNavigate } from 'react-router-dom';
import { BoxArrowInRight, BoxArrowRight } from 'react-bootstrap-icons';
import { toast } from 'react-toastify';
import './RecordForm.css';

const RecordForm = ({ onRecordAdded }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [lastSuccess, setLastSuccess] = useState(false);

  // Try to get user from token (auth.service). If null, try legacy localStorage 'user'.
  let user = getUser();
  if (!user) {
    try {
      const stored = localStorage.getItem('user');
      if (stored) {
        const parsed = JSON.parse(stored);
        user = parsed;
      }
    } catch (e) {
      user = null;
    }
  }

  const handleRecord = async (type) => {
    if (!user) {
      toast.error('Debes iniciar sesión para registrar asistencia.');
      navigate('/login');
      return;
    }

    if (!user.cedula) {
      toast.error('No se encontró número de cédula del usuario. Contacta al administrador.');
      return;
    }

    try {
      setIsLoading(true);
      const response = await addRecord(user.cedula, type);
      if (onRecordAdded && response && response.newRecord) onRecordAdded(response.newRecord);

      if (response && response.tardinessMinutes > 0) {
        toast.warn(`Llegaste ${response.tardinessMinutes} minutos tarde.`);
        // still consider it a successful record for UI
        setLastSuccess(true);
      } else {
        toast.success('Registro exitoso.');
        setLastSuccess(true);
      }
      if (lastSuccess) {
        // reset if already showing
        setTimeout(() => setLastSuccess(false), 1400);
      } else {
        setTimeout(() => setLastSuccess(false), 1400);
      }
    } catch (err) {
      toast.error(`Error: ${err.message || err}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
  <div className="card p-3 mb-4 record-form-card">
      <h2 className="text-center mb-3">Registrar Asistencia</h2>
      <p className="text-center">
        Bienvenido, <strong>{user ? user.username || user.role || 'Usuario' : 'Invitado'}</strong>.
      </p>

      {!user ? (
        <div className="text-center">
          <p>Debes iniciar sesión para registrar asistencia.</p>
          <button className="btn btn-primary" onClick={() => navigate('/login')}>Iniciar sesión</button>
        </div>
      ) : (
        <div className="d-grid gap-2">
          <button
            className="btn btn-success btn-lg"
            onClick={() => handleRecord('entry')}
            disabled={isLoading}
          >
            {isLoading ? (
              <svg className="btn-spinner" viewBox="0 0 50 50" aria-hidden="true">
                <circle cx="25" cy="25" r="20" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="4" />
                <path d="M45 25a20 20 0 0 0-20-20" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" />
              </svg>
            ) : lastSuccess ? (
              <>
                <svg className="btn-check" viewBox="0 0 24 24" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Hecho</span>
              </>
            ) : (
              <>
                <BoxArrowInRight className="me-2" />
                Registrar Entrada
              </>
            )}
          </button>

          <button
            className="btn btn-danger btn-lg"
            onClick={() => handleRecord('exit')}
            disabled={isLoading}
          >
            {isLoading ? (
              <svg className="btn-spinner" viewBox="0 0 50 50" aria-hidden="true">
                <circle cx="25" cy="25" r="20" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="4" />
                <path d="M45 25a20 20 0 0 0-20-20" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" />
              </svg>
            ) : lastSuccess ? (
              <>
                <svg className="btn-check" viewBox="0 0 24 24" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Hecho</span>
              </>
            ) : (
              <>
                <BoxArrowRight className="me-2" />
                Registrar Salida
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default RecordForm;
