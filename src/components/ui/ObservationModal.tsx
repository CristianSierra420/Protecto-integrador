import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

interface ObservationModalProps {
 show: boolean;
 onHide: () => void;
 onSave: (observation: string) => void;
}
const ObservationModal = ({ show, onHide, onSave }: ObservationModalProps) => {
  const [observation, setObservation] = useState('');

  const handleSave = () => {
    onSave(observation);
    setObservation('');
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Observación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="observation">
            <Form.Label>Observación</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={3} 
              value={observation}
              onChange={(e) => setObservation(e.target.value)}
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

export default ObservationModal;