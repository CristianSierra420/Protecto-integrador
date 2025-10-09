import React, { useState } from 'react';
import './dashboard.css';
import AdminSummary from '../../components/admin/AdminSummary';
import RecordsTable from '../../components/common/RecordsTable';
import FiltersBar from '../../components/admin/FiltersBar';
import EditRecordModal from '../../components/ui/EditRecordModal';
import PDFExportButton from '../../components/ui/PDFExportButton';
import ObservationForm from '../../components/admin/ObservationForm';
import LogoutButton from '../../components/worker/LogoutButton';

const AdminDashboard = () => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  // Dummy handler for opening the modal
  const handleEdit = (record) => {
    setSelectedRecord(record);
    setEditModalOpen(true);
  };

  return (
  <div className="dashboard-container page-template">
      <div className="dashboard-header">
        <h1 className="text-2xl font-bold">Dashboard del Administrador</h1>
        <LogoutButton />
      </div>

      <div className="card-soft">
        <AdminSummary />
      </div>

      <div className="card-soft my-4">
        <h2 className="text-xl mb-2">Controles</h2>
        <div className="flex items-center gap-4">
            <FiltersBar />
            <PDFExportButton />
        </div>
      </div>

      <div className="card-soft records-table">
        {/* Pass a handler to the table to open the modal */}
        <RecordsTable onEdit={handleEdit} isAdmin={true} />
      </div>

      <div className="card-soft my-4">
        <ObservationForm />
      </div>
      {selectedRecord && (
        <EditRecordModal
          isOpen={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
          record={selectedRecord}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
