import api from './client';
import type { ThemeSettings } from '../types';

export async function fetchTheme(): Promise<ThemeSettings> {
  const { data } = await api.get<ThemeSettings>('/theme');
  return data;
}

export async function updateTheme(payload: Partial<ThemeSettings>) {
  const { data } = await api.patch<ThemeSettings>('/theme', payload);
  return data;
}
