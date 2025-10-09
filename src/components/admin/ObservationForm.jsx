import React, { useState } from 'react';
import '../../pages/Dashboard/dashboard-components.css';

const ObservationForm = ({ recordId }) => {
    const [observation, setObservation] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to submit observation for recordId
        console.log(`Observación para registro ${recordId}:`, observation);
        setObservation('');
    };

    return (
        <form onSubmit={handleSubmit} className="observation-form">
            <h4>Agregar Observación</h4>
            <textarea
                value={observation}
                onChange={(e) => setObservation(e.target.value)}
                placeholder="Escribe una observación..."
                required
            ></textarea>
            <button type="submit">Guardar</button>
        </form>
    );
};

export default ObservationForm;
