import React, { useState, useEffect } from 'react';
import { getRecords, updateRecord } from '../services/recordService';
import { getAllUsers } from '../services/authService';
import RecordsTable from '../components/RecordsTable';
import PDFExportButton from '../components/PDFExportButton';

import ObservationModal from '../components/ObservationModal';
import EditRecordModal from '../components/EditRecordModal';

import { Funnel } from 'react-bootstrap-icons';

const AdminDashboard = () => {
  const [allRecords, setAllRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [showObservationModal, setShowObservationModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const fetchRecords = async () => {
    const records = await getRecords();
    setAllRecords(records);
    setFilteredRecords(records);
  };

  const fetchUsers = async () => {
    const userList = await getAllUsers();
    setUsers(userList);
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

  const handleAddObservationClick = (recordId) => {
    setSelectedRecord({ id: recordId });
    setShowObservationModal(true);
  };

  const handleEditRecordClick = (recordId, currentTimestamp) => {
    setSelectedRecord({ id: recordId, timestamp: currentTimestamp });
    setShowEditModal(true);
  };

  const handleSaveObservation = (observation) => {
    if (observation) {
      handleEdit(selectedRecord.id, 'observations', observation);
    }
  };

  const handleSaveTimestamp = (timestamp) => {
    if (timestamp) {
      handleEdit(selectedRecord.id, 'timestamp', timestamp);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Panel de Administrador</h1>
      
      <div className="card p-3 mb-4">
        <h2 className="mb-3">Filtros</h2>
        <div className="row g-3">
          <div className="col-md-4">
            <select className="form-select" value={selectedUser} onChange={e => setSelectedUser(e.target.value)}>
              <option value="">Todos los usuarios</option>
              {users.map(u => <option key={u.username} value={u.username}>{u.username}</option>)}
            </select>
          </div>
          <div className="col-md-3">
            <input type="date" className="form-control" value={startDate} onChange={e => setStartDate(e.target.value)} />
          </div>
          <div className="col-md-3">
            <input type="date" className="form-control" value={endDate} onChange={e => setEndDate(e.target.value)} />
          </div>
          <div className="col-md-2">
            <button className="btn btn-primary w-100" onClick={handleFilter}>
              <Funnel className="me-2"/>
              Filtrar
            </button>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Todos los Registros</h2>
        <PDFExportButton from={startDate} to={endDate} />
      </div>

      <RecordsTable 
        records={filteredRecords} 
        onAddObservation={handleAddObservationClick} 
        onEditRecord={handleEditRecordClick} 
      />

      <ObservationModal 
        show={showObservationModal}
        onHide={() => setShowObservationModal(false)}
        onSave={handleSaveObservation}
      />

      {selectedRecord && (
        <EditRecordModal 
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          onSave={handleSaveTimestamp}
          currentTimestamp={selectedRecord.timestamp}
        />
      )}
    </div>
  );
};

export default AdminDashboard;