import React, { useState, useEffect } from 'react';
import { getUser } from '../services/authService';
import { getRecords } from '../services/recordService';
import RecordForm from '../components/RecordForm';
import RecordsTable from '../components/RecordsTable';

const WorkerDashboard = () => {
  const [records, setRecords] = useState([]);
  const user = getUser();

  const fetchRecords = async () => {
    if (user) {
      const userRecords = await getRecords(user.cedula);
      setRecords(userRecords);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [user]);

  const handleRecordAdded = (newRecord) => {
    setRecords([...records, newRecord]);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Panel de Trabajador</h1>
      <RecordForm onRecordAdded={handleRecordAdded} />
      <hr className="my-4" />
      <h2 className="mb-3">Mis Registros</h2>
      <RecordsTable records={records} />
    </div>
  );
};

export default WorkerDashboard;