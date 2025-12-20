export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR';

export interface User {
  id: number;
  email: string;
  fullName?: string;
  role: UserRole;
}

export interface ServiceOffering {
  id: number;
  title: string;
  summary: string;
  description: string;
  iconKey?: string;
  category?: string;
  featured: boolean;
  displayOrder: number;
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  coverImage?: string;
  tags?: string;
  liveUrl?: string;
  repoUrl?: string;
  displayOrder: number;
  publishedAt?: string;
}

export interface Testimonial {
  id: number;
  clientName: string;
  clientTitle?: string;
  message: string;
  rating: number;
  avatarUrl?: string;
  company?: string;
  displayOrder: number;
}

export interface ThemeSettings {
  id: number;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  surfaceColor: string;
  neutralColor: string;
  darkMode: boolean;
  updatedBy?: string;
  updatedAt: string;
}

export interface HeroSection {
  id: string;
  title: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
  stat1Value: number;
  stat1Label: string;
  stat2Value: number;
  stat2Label: string;
  stat3Value: number;
  stat3Label: string;
  updatedAt: Date;
  updatedBy?: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}
