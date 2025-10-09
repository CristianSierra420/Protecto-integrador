import React from 'react';
import '../../pages/Dashboard/dashboard-components.css';

const SummaryCard = () => {
  // Dummy data
  const summaryData = {
    lateArrivals: 3,
    accumulatedMinutes: 45,
  };

  return (
  <div className="summary-card">
      <h3>Resumen Personal</h3>
      <p>Tardanzas este mes: {summaryData.lateArrivals}</p>
      <p>Minutos acumulados: {summaryData.accumulatedMinutes}</p>
    </div>
  );
};

export default SummaryCard;
