import React from 'react';
import { exportToPDF } from '../services/pdfService';

import { FileEarmarkPdf } from 'react-bootstrap-icons';

import { toast } from 'react-toastify';

const PDFExportButton = ({ from, to }) => {
  const handleExport = async () => {
    try {
      await exportToPDF(from, to);
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    }
  };

  return (
    <button className="btn btn-secondary" onClick={handleExport} disabled={!from || !to}>
      <FileEarmarkPdf className="me-2"/>
      Exportar a PDF
    </button>
  );
};

export default PDFExportButton;