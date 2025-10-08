import request from '../api/auth.api';

export const exportToPDF = async (from: string, to: string): Promise<void> => {
  const blob: Blob = await request(`/reports/pdf?from=${from}&to=${to}`);
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `reporte_${from}_${to}.pdf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
};