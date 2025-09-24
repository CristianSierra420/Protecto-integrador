const API_URL = 'http://localhost:3001';

const getAuthToken = () => {
  return localStorage.getItem('token');
};

const request = async (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint}`;
  const token = getAuthToken();

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }

  if (response.headers.get('Content-Type')?.includes('application/pdf')) {
    return response.blob();
  }

  return response.json();
};

export default request;