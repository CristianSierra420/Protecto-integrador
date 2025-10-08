import request from '../api/auth.api';
import { jwtDecode } from 'jwt-decode';

interface CustomJwtPayload {
  role?: string;
  name?: string;
}

export const registerUser = async (username: string, cedula: string) => {
  return await request('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ username, cedula }),
  });
};

const TOKEN_KEY = 'token';

export const login = async (username: string, cedula: string) => {
  const { token } = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, cedula }),
  });
  localStorage.setItem(TOKEN_KEY, token);
  return getUser();
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const getUser = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return null;

  try {
    const decoded = jwtDecode<CustomJwtPayload>(token);
    return decoded;
  } catch (e) {
    return null;
  }
};

export const isAdmin = () => {
  const user = getUser();
  return user && user.role === 'admin';
};

export const getAllUsers = async () => {
  return await request('/users', {
    method: 'GET',
  });
};