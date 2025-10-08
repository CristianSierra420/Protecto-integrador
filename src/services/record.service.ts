import request from '../api/auth.api';

export const addRecord = async (cedula: string, type: string): Promise<any> => {
  return await request('/records', {
    method: 'POST',
    body: JSON.stringify({ cedula, type, hora: new Date().toISOString() }),
  });
};

export const getRecords = async (cedula: string | null = null): Promise<any> => {
  const endpoint = cedula ? `/records?cedula=${cedula}` : '/records';
  return await request(endpoint);
};

export const updateRecord = async (recordId: string, data: any): Promise<any> => {
  return await request(`/records/${recordId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};