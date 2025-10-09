import React, { useState } from 'react';
import { FileEarmarkPdf } from 'react-bootstrap-icons';
import { toast } from 'react-toastify';
import '../../pages/Dashboard/dashboard-components.css';

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
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    if (!from || !to) return;
    try {
      setIsExporting(true);
      await exportToPDF(from, to);
      toast.success('PDF exportado exitosamente');
    } catch (err) {
      toast.error(`Error: ${err.message || err}`);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button className={`btn-pdf`} onClick={handleExport} disabled={!from || !to || isExporting}>
      <FileEarmarkPdf className="me-2" />
      {isExporting ? 'Exportando...' : 'Exportar a PDF'}
    </button>
  );
};

export default PDFExportButton;
