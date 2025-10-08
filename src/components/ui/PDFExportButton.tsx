import React from 'react';
import { FileEarmarkPdf } from 'react-bootstrap-icons';

import { toast } from 'react-toastify';

const exportToPDF = async (from: string, to: string): Promise<void> => {
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

const PDFExportButton = ({ from, to }: { from: string; to: string }) => {
  const handleExport = async () => {
    try {
      await exportToPDF(from, to);
    } catch (err: any) {
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