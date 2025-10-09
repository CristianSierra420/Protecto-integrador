import React, { useState } from 'react';
import '../../pages/Dashboard/dashboard-components.css';

const FiltersBar = ({ onFilter }) => {
  const [name, setName] = useState('');
  const [cedula, setCedula] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const handleFilter = () => {
    if (onFilter) onFilter({ name, cedula, from, to });
  };

  const handleClear = () => {
    setName(''); setCedula(''); setFrom(''); setTo('');
    if (onFilter) onFilter({});
  };

  return (
    <div className="filters-bar">
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Buscar por nombre..." />
      <input value={cedula} onChange={(e) => setCedula(e.target.value)} placeholder="Buscar por cédula..." />
      <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
      <span>a</span>
      <input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
  <button onClick={handleFilter} className="btn-control">Filtrar</button>
  <button onClick={handleClear} className="btn-ghost">Limpiar</button>
    </div>
  );
};

export default FiltersBar;
