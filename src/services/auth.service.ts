import request from './api';
import { jwtDecode } from 'jwt-decode';

export const registerUser = async (username, cedula) => {
  return await request('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ username, cedula }),
  });
};

const TOKEN_KEY = 'token';

export const login = async (username, cedula) => {
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
    const decoded = jwtDecode(token);
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