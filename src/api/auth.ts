import api from './client';
import type { AuthResponse, User } from '../types';

export async function login(email: string, password: string): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>('/auth/login', { email, password });
  localStorage.setItem('accessToken', data.accessToken);
  return data;
}

export async function getProfile(): Promise<User> {
  const { data } = await api.get<User>('/auth/me');
  return data;
}

export function logout() {
  localStorage.removeItem('accessToken');
}
