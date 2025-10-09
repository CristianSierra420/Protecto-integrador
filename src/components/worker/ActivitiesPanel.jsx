import React from 'react';
import '../../pages/Dashboard/dashboard-components.css';

const ActivitiesPanel = ({ onQuickRecord }) => {
  return (
    <div className="panel">
      <h3>Panel de Actividades</h3>
      <p className="muted">Accesos rápidos</p>
      <div style={{display:'flex', gap:10, marginTop:12}}>
        <button className="btn btn-primary btn-small" onClick={() => onQuickRecord && onQuickRecord('entry')}>Registrar Entrada</button>
        <button className="btn btn-secondary btn-small" onClick={() => onQuickRecord && onQuickRecord('exit')}>Registrar Salida</button>
      </div>
      <div style={{marginTop:12}}>
        <button className="btn btn-ghost">Ver historial</button>
      </div>
    </div>
  );
};

export default ActivitiesPanel;
