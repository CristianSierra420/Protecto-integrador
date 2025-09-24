import React, { useState, useEffect } from 'react';
import { getRecords, updateRecord } from '../services/recordService';
import { getRecords as getAllUsers } from '../services/userService'; // Assuming userService is refactored
import RecordsTable from '../components/RecordsTable';
import PDFExportButton from '../components/PDFExportButton';

const AdminDashboard = () => {
  const [allRecords, setAllRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const fetchRecords = async () => {
    const records = await getRecords();
    setAllRecords(records);
    setFilteredRecords(records);
  };

  const fetchUsers = async () => {
    // This is a placeholder. You would need to implement a service to get all users.
    // For now, I will extract users from the records.
    const records = await getRecords();
    const uniqueUsers = [...new Set(records.map(item => item.username))];
    setUsers(uniqueUsers.map(username => ({ username })));
  };

  useEffect(() => {
    fetchRecords();
    fetchUsers();
  }, []);

  const handleFilter = () => {
    let records = [...allRecords];

    if (selectedUser) {
      records = records.filter(r => r.username === selectedUser);
    }

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      records = records.filter(r => {
        const recordDate = new Date(r.timestamp);
        return recordDate >= start && recordDate <= end;
      });
    }

    setFilteredRecords(records);
  };

  const handleEdit = async (recordId, field, value) => {
    const data = { [field]: value };
    await updateRecord(recordId, data);
    fetchRecords();
  };

  const handleAddObservation = (recordId) => {
    const observation = prompt('Ingrese la observación:');
    if (observation) {
      handleEdit(recordId, 'observations', observation);
    }
  };

  const handleEditRecord = (recordId, currentTimestamp) => {
    const newTimestamp = prompt('Ingrese la nueva fecha y hora (YYYY-MM-DDTHH:mm:ss.sssZ):', currentTimestamp);
    if (newTimestamp) {
      handleEdit(recordId, 'timestamp', newTimestamp);
    }
  };

  return (
    <div>
      <h1>Panel de Administrador</h1>
      <hr />
      <h2>Filtros</h2>
      <select value={selectedUser} onChange={e => setSelectedUser(e.target.value)}>
        <option value="">Todos los usuarios</option>
        {users.map(u => <option key={u.username} value={u.username}>{u.username}</option>)}
      </select>
      <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
      <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
      <button onClick={handleFilter}>Filtrar</button>
      <hr />
      <h2>Todos los Registros</h2>
      <PDFExportButton from={startDate} to={endDate} />
      <RecordsTable 
        records={filteredRecords} 
        onAddObservation={handleAddObservation} 
        onEditRecord={handleEditRecord} 
      />
    </div>
  );
};

export default AdminDashboard;