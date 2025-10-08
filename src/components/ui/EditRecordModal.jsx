import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditRecordModal = ({ show, onHide, onSave, currentTimestamp }) => {
  const [timestamp, setTimestamp] = useState('');

  useEffect(() => {
    if (currentTimestamp) {
      setTimestamp(new Date(currentTimestamp).toISOString().slice(0, 16));
    }
  }, [currentTimestamp]);

  const handleSave = () => {
    onSave(new Date(timestamp).toISOString());
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Fecha y Hora</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="timestamp">
            <Form.Label>Nueva Fecha y Hora</Form.Label>
            <Form.Control
              type="datetime-local"
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditRecordModal;