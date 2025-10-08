const API_URL = 'http://localhost:3001';

const getAuthToken = (): string | null => {
  return localStorage.getItem('token');
};

const request = async (endpoint: string, options: RequestInit = {}): Promise<any> => {
  const url = `${API_URL}${endpoint}`;
  const token = getAuthToken();

  const headers = new Headers(options.headers);
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const config: RequestInit = {
    ...options,
    headers,
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    const error: { message?: string } = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }

  if (response.headers.get('Content-Type')?.includes('application/pdf')) {
    return response.blob();
  }

  return response.json();
};

export default request;