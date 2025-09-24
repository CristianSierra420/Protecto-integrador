import React from 'react';

const RecordsTable = ({ records, onAddObservation, onEditRecord }) => {
  return (
    <table>
      <thead>
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
        {records.map(record => (
          <tr key={record.id}>
            <td>{record.id}</td>
            <td>{record.username}</td>
            <td>{new Date(record.timestamp).toLocaleString()}</td>
            <td>{record.type === 'entry' ? 'Entrada' : 'Salida'}</td>
            <td>{record.observations}</td>
            {(onAddObservation || onEditRecord) && (
              <td>
                {onAddObservation && <button onClick={() => onAddObservation(record.id)}>Agregar Observación</button>}
                {onEditRecord && <button onClick={() => onEditRecord(record.id, record.timestamp)}>Editar</button>}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RecordsTable;