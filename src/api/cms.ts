const API_BASE = `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api`;

interface HeroSection {
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

export const fetchHero = async (): Promise<HeroSection> => {
  const res = await fetch(`${API_BASE}/hero`);
  if (!res.ok) throw new Error('Failed to fetch hero');
  return res.json();
};

export const updateHero = async (data: Partial<HeroSection>): Promise<HeroSection> => {
  const token = localStorage.getItem('accessToken');
  const res = await fetch(`${API_BASE}/hero`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update hero');
  return res.json();
};

export const fetchProcessSteps = async (): Promise<any[]> => {
  const res = await fetch(`${API_BASE}/process`);
  if (!res.ok) throw new Error('Failed to fetch process steps');
  return res.json();
};

export const createProcessStep = async (data: Partial<any>): Promise<any> => {
  const token = localStorage.getItem('accessToken');
  const res = await fetch(`${API_BASE}/process`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create process step');
  return res.json();
};

export const updateProcessStep = async (id: string, data: Partial<any>): Promise<any> => {
  const token = localStorage.getItem('accessToken');
  const res = await fetch(`${API_BASE}/process/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update process step');
  return res.json();
};

export const deleteProcessStep = async (id: string): Promise<void> => {
  const token = localStorage.getItem('accessToken');
  const res = await fetch(`${API_BASE}/process/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to delete process step');
};

export const fetchWhyChooseUs = async (): Promise<any[]> => {
  const res = await fetch(`${API_BASE}/why-choose-us`);
  if (!res.ok) throw new Error('Failed to fetch why choose us');
  return res.json();
};

export const createWhyChooseUs = async (data: Partial<any>): Promise<any> => {
  const token = localStorage.getItem('accessToken');
  const res = await fetch(`${API_BASE}/why-choose-us`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create why choose us item');
  return res.json();
};

export const updateWhyChooseUs = async (id: string, data: Partial<any>): Promise<any> => {
  const token = localStorage.getItem('accessToken');
  const res = await fetch(`${API_BASE}/why-choose-us/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update why choose us item');
  return res.json();
};

export const deleteWhyChooseUs = async (id: string): Promise<void> => {
  const token = localStorage.getItem('accessToken');
  const res = await fetch(`${API_BASE}/why-choose-us/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to delete why choose us item');
};

export const fetchSiteSettings = async (): Promise<any> => {
  const res = await fetch(`${API_BASE}/site-settings`);
  if (!res.ok) throw new Error('Failed to fetch site settings');
  return res.json();
};

export const updateSiteSettings = async (data: Partial<any>): Promise<any> => {
  const token = localStorage.getItem('accessToken');
  const res = await fetch(`${API_BASE}/site-settings`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update site settings');
  return res.json();
};

export const fetchHeroSlides = async (): Promise<any[]> => {
  const res = await fetch(`${API_BASE}/hero-slides`);
  if (!res.ok) throw new Error('Failed to fetch hero slides');
  return res.json();
};

export const createHeroSlide = async (data: Partial<any>): Promise<any> => {
  const token = localStorage.getItem('accessToken');
  const res = await fetch(`${API_BASE}/hero-slides`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create hero slide');
  return res.json();
};

export const updateHeroSlide = async (id: string, data: Partial<any>): Promise<any> => {
  const token = localStorage.getItem('accessToken');
  const res = await fetch(`${API_BASE}/hero-slides/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update hero slide');
  return res.json();
};

export const deleteHeroSlide = async (id: string): Promise<void> => {
  const token = localStorage.getItem('accessToken');
  const res = await fetch(`${API_BASE}/hero-slides/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to delete hero slide');
};

// Navbar Menu API
export const fetchNavbarMenu = async (): Promise<any[]> => {
  const res = await fetch(`${API_BASE}/navbar-menu`);
  if (!res.ok) throw new Error('Failed to fetch navbar menu');
  return res.json();
};

export const createNavbarMenuItem = async (data: Partial<any>): Promise<any> => {
  const token = localStorage.getItem('accessToken');
  const res = await fetch(`${API_BASE}/navbar-menu`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create menu item');
  return res.json();
};

export const deleteNavbarMenuItem = async (id: string): Promise<void> => {
  const token = localStorage.getItem('accessToken');
  const res = await fetch(`${API_BASE}/navbar-menu/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to delete menu item');
};

// Pages API
export const fetchPages = async (): Promise<any[]> => {
  const res = await fetch(`${API_BASE}/pages`);
  if (!res.ok) throw new Error('Failed to fetch pages');
  return res.json();
};

export const fetchPageBySlug = async (slug: string): Promise<any> => {
  const res = await fetch(`${API_BASE}/pages/${slug}`);
  if (!res.ok) throw new Error('Failed to fetch page');
  return res.json();
};

export const createPage = async (data: Partial<any>): Promise<any> => {
  const token = localStorage.getItem('accessToken');
  const res = await fetch(`${API_BASE}/pages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create page');
  return res.json();
};

export const updatePage = async (id: string, data: Partial<any>): Promise<any> => {
  const token = localStorage.getItem('accessToken');
  const res = await fetch(`${API_BASE}/pages/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update page');
  return res.json();
};

export const deletePage = async (id: string): Promise<void> => {
  const token = localStorage.getItem('accessToken');
  const res = await fetch(`${API_BASE}/pages/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to delete page');
};

// Partners API
export const fetchPartners = async (): Promise<any[]> => {
  const res = await fetch(`${API_BASE}/partners`);
  if (!res.ok) throw new Error('Failed to fetch partners');
  return res.json();
};

export const createPartner = async (data: Partial<any>): Promise<any> => {
  const token = localStorage.getItem('accessToken');
  const res = await fetch(`${API_BASE}/partners`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create partner');
  return res.json();
};

export const updatePartner = async (id: string, data: Partial<any>): Promise<any> => {
  const token = localStorage.getItem('accessToken');
  const res = await fetch(`${API_BASE}/partners/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update partner');
  return res.json();
};

export const deletePartner = async (id: string): Promise<void> => {
  const token = localStorage.getItem('accessToken');
  const res = await fetch(`${API_BASE}/partners/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to delete partner');
};

// Users API
export const fetchUsers = async (): Promise<any[]> => {
  const token = localStorage.getItem('accessToken');
  const res = await fetch(`${API_BASE}/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
};

export const createUser = async (data: Partial<any>): Promise<any> => {
  const token = localStorage.getItem('accessToken');
  const res = await fetch(`${API_BASE}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create user');
  return res.json();
};

export const updateUser = async (id: number, data: Partial<any>): Promise<any> => {
  const token = localStorage.getItem('accessToken');
  const res = await fetch(`${API_BASE}/users/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update user');
  return res.json();
};

export const deleteUser = async (id: number): Promise<void> => {
  const token = localStorage.getItem('accessToken');
  const res = await fetch(`${API_BASE}/users/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to delete user');
};

// Team Members API
export const fetchTeamMembers = async (): Promise<any[]> => {
  const res = await fetch(`${API_BASE}/team`);
  if (!res.ok) throw new Error('Failed to fetch team members');
  return res.json();
};

export const fetchTeamMembersByCategory = async (category: string): Promise<any[]> => {
  const res = await fetch(`${API_BASE}/team/category/${category}`);
  if (!res.ok) throw new Error('Failed to fetch team members by category');
  return res.json();
};

export const fetchTeamCategories = async (): Promise<string[]> => {
  const res = await fetch(`${API_BASE}/team/categories`);
  if (!res.ok) throw new Error('Failed to fetch team categories');
  return res.json();
};

export const createTeamMember = async (data: Partial<any>): Promise<any> => {
  const token = localStorage.getItem('accessToken');
  const res = await fetch(`${API_BASE}/team`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create team member');
  return res.json();
};

export const updateTeamMember = async (id: number, data: Partial<any>): Promise<any> => {
  const token = localStorage.getItem('accessToken');
  const res = await fetch(`${API_BASE}/team/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update team member');
  return res.json();
};

export const deleteTeamMember = async (id: number): Promise<void> => {
  const token = localStorage.getItem('accessToken');
  const res = await fetch(`${API_BASE}/team/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to delete team member');
};
