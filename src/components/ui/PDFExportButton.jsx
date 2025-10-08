import React from 'react';
import { FileEarmarkPdf } from 'react-bootstrap-icons';
import { toast } from 'react-toastify';

const exportToPDF = async (from, to) => {
  const content = `Report from ${from} to ${to}`;
  const blob = new Blob([content], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `report_${from}_${to}.pdf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};

const PDFExportButton = ({ from, to }) => {
  const handleExport = async () => {
    try {
      await exportToPDF(from, to);
      toast.success('PDF exportado exitosamente');
    } catch (err) {
      toast.error(`Error: ${err.message || err}`);
    }
  };

  return (
    <button className="btn btn-secondary" onClick={handleExport} disabled={!from || !to}>
      <FileEarmarkPdf className="me-2" />
      Exportar a PDF
    </button>
  );
};

export default PDFExportButton;
