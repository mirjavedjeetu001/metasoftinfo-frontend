import api from './client';
import type { Project, ServiceOffering, Testimonial } from '../types';

export async function fetchServices(): Promise<ServiceOffering[]> {
  const { data } = await api.get<ServiceOffering[]>('/services');
  return data;
}

export async function fetchProjects(): Promise<Project[]> {
  const { data } = await api.get<Project[]>('/projects');
  return data;
}

export async function fetchProjectBySlug(slug: string): Promise<Project | null> {
  const { data } = await api.get<Project | null>(`/projects/slug/${slug}`);
  return data;
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  const { data } = await api.get<Testimonial[]>('/testimonials');
  return data;
}

export async function createService(payload: Partial<ServiceOffering>) {
  const { data } = await api.post<ServiceOffering>('/services', payload);
  return data;
}

export async function createProject(payload: Partial<Project>) {
  const { data } = await api.post<Project>('/projects', payload);
  return data;
}

export async function createTestimonial(payload: Partial<Testimonial>) {
  const { data } = await api.post<Testimonial>('/testimonials', payload);
  return data;
}

export async function updateService(id: string, payload: Partial<ServiceOffering>) {
  const { data } = await api.put<ServiceOffering>(`/services/${id}`, payload);
  return data;
}

export async function deleteService(id: string) {
  await api.delete(`/services/${id}`);
}

export async function updateProject(id: string, payload: Partial<Project>) {
  const { data } = await api.put<Project>(`/projects/${id}`, payload);
  return data;
}

export async function deleteProject(id: string) {
  await api.delete(`/projects/${id}`);
}

export async function updateTestimonial(id: string, payload: Partial<Testimonial>) {
  const { data } = await api.put<Testimonial>(`/testimonials/${id}`, payload);
  return data;
}

export async function deleteTestimonial(id: string) {
  await api.delete(`/testimonials/${id}`);
}
