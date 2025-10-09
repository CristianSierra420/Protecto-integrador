import React from 'react';
import '../../pages/Dashboard/dashboard-components.css';

const AdminSummary = () => {
    // Dummy data
    const summaryData = {
        totalWorkers: 50,
        lateToday: 5,
        pendingRecords: 2,
    };

    return (
        <div className="admin-summary">
            <h2>Resumen General</h2>
            <div className="summary-items">
                <div className="summary-item">
                    <span>Total Trabajadores</span>
                    <strong>{summaryData.totalWorkers}</strong>
                </div>
                <div className="summary-item">
                    <span>Tardanzas Hoy</span>
                    <strong>{summaryData.lateToday}</strong>
                </div>
                <div className="summary-item">
                    <span>Registros Pendientes</span>
                    <strong>{summaryData.pendingRecords}</strong>
                </div>
            </div>
        </div>
    );
};

export default AdminSummary;
