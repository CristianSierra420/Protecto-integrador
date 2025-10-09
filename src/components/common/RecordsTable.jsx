import React from 'react';
import { PlusCircle, Pencil } from 'react-bootstrap-icons';

const RecordsTable = ({ records = [], onAddObservation, onEditRecord }) => {
  return (
    <div className="records-table">
      <table className="table table-striped table-bordered">
      <thead className="table-dark">
        <tr>
          <th>ID</th>
          <th>Usuario</th>
          <th>Fecha y Hora</th>
          <th>Tipo</th>
          <th>Observaciones</th>
          {(onAddObservation || onEditRecord) && <th>Acciones</th>}
        </tr>
      </thead>
      <tbody>
        {records.length > 0 ? (
          records.map((record) => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{record.username}</td>
              <td>{new Date(record.timestamp).toLocaleString()}</td>
              <td>{record.type === 'entry' ? 'Entrada' : 'Salida'}</td>
              <td>{record.observations || '—'}</td>
              {(onAddObservation || onEditRecord) && (
                <td>
                  {onAddObservation && (
                    <button
                      className="btn btn-sm btn-info me-2"
                      onClick={() => onAddObservation(record.id)}
                    >
                      <PlusCircle className="me-1" />
                      Agregar Observación
                    </button>
                  )}
                  {onEditRecord && (
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() =>
                        onEditRecord(record.id, record.timestamp)
                      }
                    >
                      <Pencil className="me-1" />
                      Editar
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" className="text-center text-muted">
              No hay registros disponibles.
            </td>
          </tr>
        )}
      </tbody>
      </table>
    </div>
  );
};

export default RecordsTable;
