import React from 'react';
import { exportToPDF } from '../services/pdfService';

const PDFExportButton = ({ from, to }) => {
  const handleExport = async () => {
    try {
      await exportToPDF(from, to);
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <button onClick={handleExport} disabled={!from || !to}>
      Exportar a PDF
    </button>
  );
};

export default PDFExportButton;