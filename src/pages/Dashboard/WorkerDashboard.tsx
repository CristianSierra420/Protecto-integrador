import { useState, useEffect } from 'react';
// @ts-ignore: module may be missing during development
import { getUser } from '../services/authService';
// @ts-ignore: module may be missing during development
import { getRecords } from '../services/recordService';
// @ts-ignore: module may be missing during development
import RecordForm from '../components/RecordForm';
// @ts-ignore: module may be missing during development
import RecordsTable from '../components/RecordsTable';

const WorkerDashboard = () => {
  const [records, setRecords] = useState<any[]>([]);
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

  const handleRecordAdded = (newRecord: any) => {
    setRecords((prevRecords) => [...prevRecords, newRecord]);
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