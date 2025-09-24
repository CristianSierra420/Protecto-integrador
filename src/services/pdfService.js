import request from './api';

export const exportToPDF = async (from, to) => {
  const blob = await request(`/reports/pdf?from=${from}&to=${to}`);
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `reporte_${from}_${to}.pdf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
};