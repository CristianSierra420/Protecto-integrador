import request from './api';

export const addRecord = async (cedula, type) => {
  return await request('/records', {
    method: 'POST',
    body: JSON.stringify({ cedula, type, hora: new Date().toISOString() }),
  });
};

export const getRecords = async (cedula = null) => {
  const endpoint = cedula ? `/records?cedula=${cedula}` : '/records';
  return await request(endpoint);
};

export const updateRecord = async (recordId, data) => {
  return await request(`/records/${recordId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};