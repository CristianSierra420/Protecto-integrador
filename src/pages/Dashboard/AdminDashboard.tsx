import { useState, useEffect } from 'react';
import { Funnel } from 'react-bootstrap-icons';

// Types used in the component
type RecordItem = {
  id: string | number;
  username?: string;
  timestamp?: string;
  observations?: string;
  [key: string]: any;
};

type User = {
  username: string;
  [key: string]: any;
};

// Lightweight fallback implementations to avoid "module not found" compile errors.
// Replace these with the real imports from your project when those files are available.

const getRecords = async (): Promise<RecordItem[]> => {
  // default empty record list
  return [];
};

const updateRecord = async (id: string | number, data: Partial<RecordItem>): Promise<void> => {
  // no-op stub for updating a record
  return;
};

const getAllUsers = async (): Promise<User[]> => {
  // default empty users list
  return [];
};

const RecordsTable: React.FC<{
  records: RecordItem[];
  onAddObservation?: (id: string | number) => void;
  onEditRecord?: (id: string | number, timestamp?: string) => void;
}> = ({ records, onAddObservation, onEditRecord }) => {
  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>Registros</th>
            <th>Usuario</th>
            <th>Timestamp</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {(records || []).map((r, i) => (
            <tr key={String(r.id ?? i)}>
              <td>{JSON.stringify(r)}</td>
              <td>{r.username ?? '-'}</td>
              <td>{r.timestamp ?? '-'}</td>
              <td>
                <div className="d-flex gap-2">
                  <button className="btn btn-sm btn-outline-primary" onClick={() => onAddObservation?.(r.id)}>Observación</button>
                  <button className="btn btn-sm btn-outline-secondary" onClick={() => onEditRecord?.(r.id, r.timestamp)}>Editar</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const PDFExportButton: React.FC<{ from?: string; to?: string }> = ({ from, to }) => {
  return <button className="btn btn-outline-secondary">Exportar PDF</button>;
};

const ObservationModal: React.FC<{
  show: boolean;
  onHide: () => void;
  onSave?: (obs: string) => void;
}> = ({ show, onHide, onSave }) => {
  const [value, setValue] = useState('');
  if (!show) return null;
  return (
    <div className="modal d-block" tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content p-3">
          <h5>Agregar Observación</h5>
          <textarea className="form-control mb-2" value={value} onChange={e => setValue(e.target.value)} />
          <div className="d-flex gap-2">
            <button
              className="btn btn-primary"
              onClick={() => {
                onSave && onSave(value);
                onHide();
              }}
            >
              Guardar
            </button>
            <button className="btn btn-secondary" onClick={onHide}>Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const EditRecordModal: React.FC<{
  show: boolean;
  onHide: () => void;
  onSave?: (timestamp?: string) => void;
  currentTimestamp?: string;
}> = ({ show, onHide, onSave, currentTimestamp }) => {
  const [value, setValue] = useState(currentTimestamp ?? '');
  useEffect(() => setValue(currentTimestamp ?? ''), [currentTimestamp]);
  if (!show) return null;
  return (
    <div className="modal d-block" tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content p-3">
          <h5>Editar Timestamp</h5>
          <input type="datetime-local" className="form-control mb-2" value={value} onChange={e => setValue(e.target.value)} />
          <div className="d-flex gap-2">
            <button
              className="btn btn-primary"
              onClick={() => {
                onSave && onSave(value);
                onHide();
              }}
            >
              Guardar
            </button>
            <button className="btn btn-secondary" onClick={onHide}>Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard: React.FC = () => {
  const [allRecords, setAllRecords] = useState<RecordItem[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<RecordItem[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const [showObservationModal, setShowObservationModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] = useState<RecordItem | null>(null);

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
        const recordDate = new Date(r.timestamp ?? '');
        return !isNaN(recordDate.getTime()) && recordDate >= start && recordDate <= end;
      });
    }

    setFilteredRecords(records);
  };

  const handleEdit = async (recordId: string | number, field: keyof RecordItem, value: any) => {
    const data: Partial<RecordItem> = { [field]: value } as Partial<RecordItem>;
    await updateRecord(recordId, data);
    fetchRecords();
  };

  const handleAddObservationClick = (recordId: string | number) => {
    setSelectedRecord({ id: recordId } as RecordItem);
    setShowObservationModal(true);
  };

  const handleEditRecordClick = (recordId: string | number, currentTimestamp?: string) => {
    setSelectedRecord({ id: recordId, timestamp: currentTimestamp } as RecordItem);
    setShowEditModal(true);
  };

  const handleSaveObservation = (observation?: string) => {
    if (observation && selectedRecord) {
      handleEdit(selectedRecord.id, 'observations', observation);
    }
  };

  const handleSaveTimestamp = (timestamp?: string) => {
    if (timestamp && selectedRecord) {
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
          currentTimestamp={selectedRecord?.timestamp}
        />
      )}
    </div>
  );
};

export default AdminDashboard