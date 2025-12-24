import { useState, type FormEvent } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../auth/AuthProvider';
import { useThemeContext } from '../theme/ThemeProvider';
import { updateTheme } from '../api/theme';
import {
  createService,
  createProject,
  createTestimonial,
  fetchServices,
  fetchProjects,
  fetchTestimonials,
  updateService,
  updateProject,
  updateTestimonial,
  deleteService,
  deleteProject,
  deleteTestimonial,
} from '../api/content';
import {
  fetchHero,
  updateHero,
  fetchProcessSteps,
  createProcessStep,
  updateProcessStep,
  deleteProcessStep,
  fetchWhyChooseUs,
  createWhyChooseUs,
  updateWhyChooseUs,
  deleteWhyChooseUs,
  fetchSiteSettings,
  updateSiteSettings,
  fetchHeroSlides,
  createHeroSlide,
  deleteHeroSlide,
  fetchPartners,
  createPartner,
  deletePartner,
  fetchPages,
  createPage,
  updatePage,
  deletePage,
  fetchNavbarMenu,
  createNavbarMenuItem,
  deleteNavbarMenuItem,
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
  fetchTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from '../api/cms';
import { LogOut, Plus, X, Trash2, Edit2 } from 'lucide-react';

type AdminTab = 'dashboard' | 'hero' | 'process' | 'why-choose-us' | 'site-settings' | 'services' | 'projects' | 'testimonials' | 'partners' | 'pages' | 'navbar-menu' | 'users' | 'team' | 'theme';

export default function AdminPage() {
  const { isAuthed, login, logout, user } = useAuth();
  const { theme, refresh: refreshTheme } = useThemeContext();
  const qc = useQueryClient();
  const [email, setEmail] = useState('admin@metasoftinfo.com');
  const [password, setPassword] = useState('ChangeMe123!');
  const [status, setStatus] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [editingService, setEditingService] = useState<any>(null);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<any>(null);
  const [editingProcess, setEditingProcess] = useState<any>(null);
  const [editingWhy, setEditingWhy] = useState<any>(null);
  const [editingPage, setEditingPage] = useState<any>(null);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [editingTeamMember, setEditingTeamMember] = useState<any>(null);

  // Fetch all data
  const heroQuery = useQuery({ queryKey: ['hero'], queryFn: fetchHero, enabled: isAuthed });
  const processQuery = useQuery({ queryKey: ['process'], queryFn: fetchProcessSteps, enabled: isAuthed });
  const whyQuery = useQuery({ queryKey: ['why-choose-us'], queryFn: fetchWhyChooseUs, enabled: isAuthed });
  const settingsQuery = useQuery({ queryKey: ['site-settings'], queryFn: fetchSiteSettings, enabled: isAuthed });  const slidesQuery = useQuery({ queryKey: ['hero-slides'], queryFn: fetchHeroSlides, enabled: isAuthed });  const servicesQuery = useQuery({ queryKey: ['services'], queryFn: fetchServices, enabled: isAuthed });
  const projectsQuery = useQuery({ queryKey: ['projects'], queryFn: fetchProjects, enabled: isAuthed });
  const testimonialsQuery = useQuery({ queryKey: ['testimonials'], queryFn: fetchTestimonials, enabled: isAuthed });
  const partnersQuery = useQuery({ queryKey: ['partners'], queryFn: fetchPartners, enabled: isAuthed });
  const pagesQuery = useQuery({ queryKey: ['pages'], queryFn: fetchPages, enabled: isAuthed });
  const navbarMenuQuery = useQuery({ queryKey: ['navbarMenu'], queryFn: fetchNavbarMenu, enabled: isAuthed });
  const usersQuery = useQuery({ queryKey: ['users'], queryFn: fetchUsers, enabled: isAuthed });
  const teamQuery = useQuery({ queryKey: ['team-members'], queryFn: fetchTeamMembers, enabled: isAuthed });

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('Signing in...');
    try {
      await login(email, password);
      setStatus('Authenticated ✓');
      setTimeout(() => setStatus(null), 2000);
    } catch (err) {
      setStatus('Login failed');
    }
  };

  const handleHeroSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setStatus('Saving hero section...');
    try {
      await updateHero({
        title: form.get('title') as string,
        subtitle: form.get('subtitle') as string,
        primaryCta: form.get('primaryCta') as string,
        secondaryCta: form.get('secondaryCta') as string,
        stat1Value: parseInt(form.get('stat1Value') as string),
        stat1Label: form.get('stat1Label') as string,
        stat2Value: parseInt(form.get('stat2Value') as string),
        stat2Label: form.get('stat2Label') as string,
        stat3Value: parseInt(form.get('stat3Value') as string),
        stat3Label: form.get('stat3Label') as string,
        updatedBy: user?.email,
      });
      await qc.invalidateQueries({ queryKey: ['hero'] });
      setStatus('Hero section updated ✓');
      setTimeout(() => setStatus(null), 3000);
    } catch (err) {
      setStatus('Failed to update hero');
    }
  };

  const handleProcessAdd = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setStatus('Creating process step...');
    try {
      const steps = processQuery.data || [];
      await createProcessStep({
        order: steps.length + 1,
        title: form.get('title'),
        description: form.get('description'),
        updatedBy: user?.email,
      });
      await qc.invalidateQueries({ queryKey: ['process'] });
      setStatus('Process step added ✓');
      setTimeout(() => setStatus(null), 3000);
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setStatus('Failed to add process step');
    }
  };

  const handleProcessDelete = async (id: string) => {
    if (!window.confirm('Delete this process step?')) return;
    setStatus('Deleting...');
    try {
      await deleteProcessStep(id);
      await qc.invalidateQueries({ queryKey: ['process'] });
      setStatus('Process step deleted ✓');
      setTimeout(() => setStatus(null), 3000);
    } catch (err) {
      setStatus('Failed to delete');
    }
  };

  const handleWhyAdd = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setStatus('Creating item...');
    try {
      const items = whyQuery.data || [];
      await createWhyChooseUs({
        order: items.length + 1,
        title: form.get('title'),
        description: form.get('description'),
        updatedBy: user?.email,
      });
      await qc.invalidateQueries({ queryKey: ['why-choose-us'] });
      setStatus('Item added ✓');
      setTimeout(() => setStatus(null), 3000);
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setStatus('Failed to add item');
    }
  };

  const handleWhyDelete = async (id: string) => {
    if (!window.confirm('Delete this item?')) return;
    setStatus('Deleting...');
    try {
      await deleteWhyChooseUs(id);
      await qc.invalidateQueries({ queryKey: ['why-choose-us'] });
      setStatus('Item deleted ✓');
      setTimeout(() => setStatus(null), 3000);
    } catch (err) {
      setStatus('Failed to delete');
    }
  };

  const handleSettingsSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setStatus('Saving settings...');
    try {
      await updateSiteSettings({
        siteName: form.get('siteName'),
        siteDescription: form.get('siteDescription'),
        footerText: form.get('footerText'),
        companyEmail: form.get('companyEmail'),
        companyPhone: form.get('companyPhone'),
        companyAddress: form.get('companyAddress'),
        socialFacebook: form.get('socialFacebook'),
        socialLinkedin: form.get('socialLinkedin'),
        socialTwitter: form.get('socialTwitter'),
        logoUrl: form.get('logoUrl'),
        navbarBgColor: form.get('navbarBgColor'),
        navbarTextColor: form.get('navbarTextColor'),
        preloaderEnabled: form.get('preloaderEnabled') === 'on',
        preloaderText: form.get('preloaderText'),
        preloaderDuration: parseInt(form.get('preloaderDuration') as string),
        updatedBy: user?.email,
      });
      await qc.invalidateQueries({ queryKey: ['site-settings'] });
      setStatus('Settings updated ✓');
      setTimeout(() => setStatus(null), 3000);
    } catch (err) {
      setStatus('Failed to update settings');
    }
  };

  const handleThemeSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setStatus('Saving theme...');
    try {
      await updateTheme({
        primaryColor: form.get('primaryColor') as string,
        secondaryColor: form.get('secondaryColor') as string,
        accentColor: form.get('accentColor') as string,
        surfaceColor: form.get('surfaceColor') as string,
        neutralColor: form.get('neutralColor') as string,
        darkMode: form.get('darkMode') === 'on',
        updatedBy: user?.email,
      });
      await refreshTheme();
      setStatus('Theme updated ✓');
      setTimeout(() => setStatus(null), 3000);
    } catch (err) {
      setStatus('Failed to update theme');
    }
  };

  const handleQuickAdd = async (
    kind: 'service' | 'project' | 'testimonial',
    payload: Record<string, unknown>,
  ) => {
    setStatus(`Creating ${kind}...`);
    try {
      if (kind === 'service') await createService(payload);
      if (kind === 'project') await createProject(payload);
      if (kind === 'testimonial') await createTestimonial(payload);
      await qc.invalidateQueries();
      setStatus(`${kind} created ✓`);
      setTimeout(() => setStatus(null), 3000);
    } catch (err) {
      setStatus(`Failed to create ${kind}`);
    }
  };

  const handleSlideAdd = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setStatus('Adding slide...');
    try {
      const slides = slidesQuery.data || [];
      await createHeroSlide({
        order: slides.length + 1,
        imageUrl: form.get('imageUrl'),
        caption: form.get('caption'),
        isActive: true,
        updatedBy: user?.email,
      });
      await qc.invalidateQueries({ queryKey: ['hero-slides'] });
      setStatus('Slide added ✓');
      setTimeout(() => setStatus(null), 3000);
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setStatus('Failed to add slide');
    }
  };

  const handleSlideDelete = async (id: string) => {
    if (!window.confirm('Delete this slide?')) return;
    setStatus('Deleting slide...');
    try {
      await deleteHeroSlide(id);
      await qc.invalidateQueries({ queryKey: ['hero-slides'] });
      setStatus('Slide deleted ✓');
      setTimeout(() => setStatus(null), 3000);
    } catch (err) {
      setStatus('Failed to delete slide');
    }
  };

  const handleServiceDelete = async (id: string) => {
    if (!window.confirm('Delete this service?')) return;
    setStatus('Deleting service...');
    try {
      await deleteService(id);
      await qc.invalidateQueries({ queryKey: ['services'] });
      setStatus('Service deleted ✓');
      setTimeout(() => setStatus(null), 3000);
    } catch (err) {
      setStatus('Failed to delete service');
    }
  };

  const handleProjectDelete = async (id: string) => {
    if (!window.confirm('Delete this project?')) return;
    setStatus('Deleting project...');
    try {
      await deleteProject(id);
      await qc.invalidateQueries({ queryKey: ['projects'] });
      setStatus('Project deleted ✓');
      setTimeout(() => setStatus(null), 3000);
    } catch (err) {
      setStatus('Failed to delete project');
    }
  };

  const handleTestimonialDelete = async (id: string) => {
    if (!window.confirm('Delete this testimonial?')) return;
    setStatus('Deleting testimonial...');
    try {
      await deleteTestimonial(id);
      await qc.invalidateQueries({ queryKey: ['testimonials'] });
      setStatus('Testimonial deleted ✓');
      setTimeout(() => setStatus(null), 3000);
    } catch (err) {
      setStatus('Failed to delete testimonial');
    }
  };

  const handleServiceEdit = async (e: any) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setStatus('Updating service...');
    try {
      await updateService(editingService.id, {
        title: form.get('title') as string,
        summary: form.get('summary') as string,
        description: form.get('description') as string,
      });
      await qc.invalidateQueries({ queryKey: ['services'] });
      setStatus('Service updated ✓');
      setEditingService(null);
      setTimeout(() => setStatus(null), 3000);
    } catch (err) {
      setStatus('Failed to update service');
    }
  };

  const handleProjectEdit = async (e: any) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setStatus('Updating project...');
    try {
      await updateProject(editingProject.id, {
        title: form.get('title') as string,
        summary: form.get('summary') as string,
        tags: form.get('tags') as string,
        liveUrl: form.get('liveUrl') as string,
        repoUrl: form.get('repoUrl') as string,
      });
      await qc.invalidateQueries({ queryKey: ['projects'] });
      setStatus('Project updated ✓');
      setEditingProject(null);
      setTimeout(() => setStatus(null), 3000);
    } catch (err) {
      setStatus('Failed to update project');
    }
  };

  const handleTestimonialEdit = async (e: any) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setStatus('Updating testimonial...');
    try {
      await updateTestimonial(editingTestimonial.id, {
        clientName: form.get('clientName') as string,
        company: form.get('company') as string,
        message: form.get('message') as string,
        rating: parseInt(form.get('rating') as string),
      });
      await qc.invalidateQueries({ queryKey: ['testimonials'] });
      setStatus('Testimonial updated ✓');
      setEditingTestimonial(null);
      setTimeout(() => setStatus(null), 3000);
    } catch (err) {
      setStatus('Failed to update testimonial');
    }
  };

  const handleProcessEdit = async (e: any) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setStatus('Updating process step...');
    try {
      await updateProcessStep(editingProcess.id, {
        title: form.get('title') as string,
        description: form.get('description') as string,
        updatedBy: user?.email,
      });
      await qc.invalidateQueries({ queryKey: ['process'] });
      setStatus('Process step updated ✓');
      setEditingProcess(null);
      setTimeout(() => setStatus(null), 3000);
    } catch (err) {
      setStatus('Failed to update process step');
    }
  };

  const handleWhyEdit = async (e: any) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setStatus('Updating benefit...');
    try {
      await updateWhyChooseUs(editingWhy.id, {
        title: form.get('title') as string,
        description: form.get('description') as string,
        updatedBy: user?.email,
      });
      await qc.invalidateQueries({ queryKey: ['why'] });
      setStatus('Benefit updated ✓');
      setEditingWhy(null);
      setTimeout(() => setStatus(null), 3000);
    } catch (err) {
      setStatus('Failed to update benefit');
    }
  };

  const handlePartnerAdd = async (e: any) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setStatus('Adding partner...');
    try {
      const partners = partnersQuery.data || [];
      await createPartner({
        order: partners.length + 1,
        name: form.get('name'),
        logoUrl: form.get('logoUrl'),
        websiteUrl: form.get('websiteUrl'),
        isActive: true,
        updatedBy: user?.email,
      });
      await qc.invalidateQueries({ queryKey: ['partners'] });
      setStatus('Partner added ✓');
      setTimeout(() => setStatus(null), 3000);
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setStatus('Failed to add partner');
    }
  };

  const handlePartnerDelete = async (id: string) => {
    if (!window.confirm('Delete this partner?')) return;
    setStatus('Deleting partner...');
    try {
      await deletePartner(id);
      await qc.invalidateQueries({ queryKey: ['partners'] });
      setStatus('Partner deleted ✓');
      setTimeout(() => setStatus(null), 3000);
    } catch (err) {
      setStatus('Failed to delete partner');
    }
  };

  const handlePageAdd = async (e: any) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setStatus('Creating page...');
    try {
      await createPage({
        title: form.get('title'),
        slug: form.get('slug'),
        content: form.get('content'),
        isPublished: true,
        updatedBy: user?.email,
      });
      await qc.invalidateQueries({ queryKey: ['pages'] });
      setStatus('Page created ✓');
      setTimeout(() => setStatus(null), 3000);
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setStatus('Failed to create page');
    }
  };

  const handlePageEdit = async (e: any) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setStatus('Updating page...');
    try {
      await updatePage(editingPage.id, {
        title: form.get('title'),
        slug: form.get('slug'),
        content: form.get('content'),
        updatedBy: user?.email,
      });
      await qc.invalidateQueries({ queryKey: ['pages'] });
      setStatus('Page updated ✓');
      setEditingPage(null);
      setTimeout(() => setStatus(null), 3000);
    } catch (err) {
      setStatus('Failed to update page');
    }
  };

  const handlePageDelete = async (id: string) => {
    if (!window.confirm('Delete this page?')) return;
    setStatus('Deleting page...');
    try {
      await deletePage(id);
      await qc.invalidateQueries({ queryKey: ['pages'] });
      setStatus('Page deleted ✓');
      setTimeout(() => setStatus(null), 3000);
    } catch (err) {
      setStatus('Failed to delete page');
    }
  };

  const handleNavbarMenuAdd = async (e: any) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setStatus('Adding menu item...');
    try {
      const menuItems = navbarMenuQuery.data || [];
      await createNavbarMenuItem({
        label: form.get('label'),
        path: form.get('path'),
        order: menuItems.length + 1,
        updatedBy: user?.email,
      });
      await qc.invalidateQueries({ queryKey: ['navbarMenu'] });
      setStatus('Menu item added ✓');
      setTimeout(() => setStatus(null), 3000);
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setStatus('Failed to add menu item');
    }
  };

  const handleNavbarMenuDelete = async (id: string) => {
    if (!window.confirm('Delete this menu item?')) return;
    setStatus('Deleting menu item...');
    try {
      await deleteNavbarMenuItem(id);
      await qc.invalidateQueries({ queryKey: ['navbarMenu'] });
      setStatus('Menu item deleted ✓');
      setTimeout(() => setStatus(null), 3000);
    } catch (err) {
      setStatus('Failed to delete menu item');
    }
  };

  const handleSeedPages = async () => {
    if (!window.confirm('Create default page (About Us)? This only works if no pages exist.')) return;
    setStatus('Creating default page...');
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/pages/seed`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      await qc.invalidateQueries({ queryKey: ['pages'] });
      setStatus(data.message + ' ✓');
      setTimeout(() => setStatus(null), 3000);
    } catch (err) {
      setStatus('Failed to seed pages');
    }
  };

  const handleSeedNavbarMenu = async () => {
    if (!window.confirm('Create default menu items (About Us, Services, Projects, Testimonials)? This only works if no menu items exist.')) return;
    setStatus('Creating default menu...');
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/navbar-menu/seed`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      await qc.invalidateQueries({ queryKey: ['navbarMenu'] });
      setStatus(data.message + ' ✓');
      setTimeout(() => setStatus(null), 3000);
    } catch (err) {
      setStatus('Failed to seed menu');
    }
  };

  const handleUserAdd = async (e: any) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setStatus('Creating user...');
    try {
      await createUser({
        email: form.get('email'),
        password: form.get('password'),
        fullName: form.get('fullName'),
        role: form.get('role'),
      });
      await qc.invalidateQueries({ queryKey: ['users'] });
      setStatus('User created ✓');
      setTimeout(() => setStatus(null), 3000);
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setStatus('Failed to create user');
    }
  };

  const handleUserEdit = async (e: any) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setStatus('Updating user...');
    try {
      const updateData: any = {
        email: form.get('email'),
        fullName: form.get('fullName'),
        role: form.get('role'),
      };
      const newPassword = form.get('password');
      if (newPassword) {
        updateData.password = newPassword;
      }
      await updateUser(editingUser.id, updateData);
      await qc.invalidateQueries({ queryKey: ['users'] });
      setStatus('User updated ✓');
      setEditingUser(null);
      setTimeout(() => setStatus(null), 3000);
    } catch (err) {
      setStatus('Failed to update user');
    }
  };

  const handleUserDelete = async (id: number) => {
    if (!window.confirm('Delete this user? This action cannot be undone.')) return;
    setStatus('Deleting user...');
    try {
      await deleteUser(id);
      await qc.invalidateQueries({ queryKey: ['users'] });
      setStatus('User deleted ✓');
      setTimeout(() => setStatus(null), 3000);
    } catch (err) {
      setStatus('Failed to delete user');
    }
  };

  // Team Member Handlers
  const handleTeamMemberAdd = async (e: any) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setStatus('Creating team member...');
    try {
      await createTeamMember({
        name: form.get('name'),
        designation: form.get('designation'),
        category: form.get('category'),
        imageUrl: form.get('imageUrl'),
        email: form.get('email'),
        linkedin: form.get('linkedin'),
        twitter: form.get('twitter'),
        facebook: form.get('facebook'),
        instagram: form.get('instagram'),
        bio: form.get('bio'),
        displayOrder: Number(form.get('displayOrder')) || 0,
      });
      await qc.invalidateQueries({ queryKey: ['team-members'] });
      setStatus('Team member created ✓');
      setTimeout(() => setStatus(null), 3000);
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setStatus('Failed to create team member');
    }
  };

  const handleTeamMemberEdit = async (e: any) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setStatus('Updating team member...');
    try {
      await updateTeamMember(editingTeamMember.id, {
        name: form.get('name'),
        designation: form.get('designation'),
        category: form.get('category'),
        imageUrl: form.get('imageUrl'),
        email: form.get('email'),
        linkedin: form.get('linkedin'),
        twitter: form.get('twitter'),
        facebook: form.get('facebook'),
        instagram: form.get('instagram'),
        bio: form.get('bio'),
        displayOrder: Number(form.get('displayOrder')) || 0,
      });
      await qc.invalidateQueries({ queryKey: ['team-members'] });
      setStatus('Team member updated ✓');
      setEditingTeamMember(null);
      setTimeout(() => setStatus(null), 3000);
    } catch (err) {
      setStatus('Failed to update team member');
    }
  };

  const handleTeamMemberDelete = async (id: number) => {
    if (!window.confirm('Delete this team member? This action cannot be undone.')) return;
    setStatus('Deleting team member...');
    try {
      await deleteTeamMember(id);
      await qc.invalidateQueries({ queryKey: ['team-members'] });
      setStatus('Team member deleted ✓');
      setTimeout(() => setStatus(null), 3000);
    } catch (err) {
      setStatus('Failed to delete team member');
    }
  };

  if (!isAuthed) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin CMS Panel</h1>
              <p className="text-gray-600">Sign in to manage your website</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-gray-400 focus:outline-none transition"
                  placeholder="admin@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-gray-400 focus:outline-none transition"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition"
              >
                Sign In
              </button>
            </form>
            {status && <p className="mt-4 text-center text-gray-600">{status}</p>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Premium CMS Dashboard</h1>
            <p className="text-sm text-gray-600 mt-1">{user?.email}</p>
          </div>
          <button
            onClick={() => logout()}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex gap-2 mb-8 overflow-x-auto border-b border-gray-200 pb-2">
          {[
            { id: 'dashboard', label: '📊 Dashboard' },
            { id: 'hero', label: '🚀 Hero Section' },
            { id: 'process', label: '⚙️ Process Steps' },
            { id: 'why-choose-us', label: '✨ Why Choose Us' },
            { id: 'services', label: '💼 Services' },
            { id: 'projects', label: '📁 Projects' },
            { id: 'testimonials', label: '💬 Testimonials' },
            { id: 'partners', label: '🤝 Partners' },
            { id: 'pages', label: '📄 Pages' },
            { id: 'navbar-menu', label: '🔗 Navbar Menu' },
            { id: 'team', label: '👨‍💼 Team Members' },
            { id: 'users', label: '👥 Users' },
            { id: 'site-settings', label: '⚙️ Site Settings' },
            { id: 'theme', label: '🎨 Theme' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as AdminTab)}
              className={`px-4 py-3 font-semibold whitespace-nowrap transition rounded-t-lg ${
                activeTab === tab.id
                  ? 'text-gray-900 bg-white border-b-2 border-gray-900'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Status Message */}
        {status && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-700 flex items-center justify-between shadow-sm">
            <span className="font-medium">{status}</span>
            <button onClick={() => setStatus(null)} className="text-emerald-700 hover:text-emerald-900 transition">
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h2>
              <p className="text-gray-600">Manage all aspects of your website from one place</p>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
                <div className="text-4xl font-bold text-gray-900 mb-2">{servicesQuery.data?.length || 0}</div>
                <div className="text-gray-600 font-medium">Services</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
                <div className="text-4xl font-bold text-gray-900 mb-2">{projectsQuery.data?.length || 0}</div>
                <div className="text-gray-600 font-medium">Projects</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
                <div className="text-4xl font-bold text-gray-900 mb-2">{testimonialsQuery.data?.length || 0}</div>
                <div className="text-gray-600 font-medium">Testimonials</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
                <div className="text-4xl font-bold text-gray-900 mb-2">{partnersQuery.data?.length || 0}</div>
                <div className="text-gray-600 font-medium">Partners</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
                <div className="text-4xl font-bold text-gray-900 mb-2">{pagesQuery.data?.length || 0}</div>
                <div className="text-gray-600 font-medium">Custom Pages</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
                <div className="text-4xl font-bold text-gray-900 mb-2">{processQuery.data?.length || 0}</div>
                <div className="text-gray-600 font-medium">Process Steps</div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-2">✨ Full CMS Access</h3>
              <p className="text-gray-700">Use the tabs above to dynamically edit every section of your website. All changes are saved instantly to the database and reflect on your live site immediately.</p>
            </div>
          </div>
        )}

        {/* Hero Section Tab */}
        {activeTab === 'hero' && heroQuery.data && (
          <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Hero Section - Landing Page</h2>
            <form onSubmit={handleHeroSave} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Main Title</label>
                  <input
                    type="text"
                    name="title"
                    defaultValue={heroQuery.data.title}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-gray-500 focus:outline-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Subtitle / Description</label>
                  <textarea
                    name="subtitle"
                    defaultValue={heroQuery.data.subtitle}
                    rows={3}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-gray-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Primary Button Text</label>
                  <input
                    type="text"
                    name="primaryCta"
                    defaultValue={heroQuery.data.primaryCta}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-gray-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Secondary Button Text</label>
                  <input
                    type="text"
                    name="secondaryCta"
                    defaultValue={heroQuery.data.secondaryCta}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-gray-500 focus:outline-none"
                  />
                </div>
              </div>
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistics</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Stat 1 Value</label>
                    <input
                      type="number"
                      name="stat1Value"
                      defaultValue={heroQuery.data.stat1Value}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-gray-500 focus:outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Stat 1 Label</label>
                    <input
                      type="text"
                      name="stat1Label"
                      defaultValue={heroQuery.data.stat1Label}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-gray-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Stat 2 Value</label>
                    <input
                      type="number"
                      name="stat2Value"
                      defaultValue={heroQuery.data.stat2Value}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-gray-500 focus:outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Stat 2 Label</label>
                    <input
                      type="text"
                      name="stat2Label"
                      defaultValue={heroQuery.data.stat2Label}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-gray-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Stat 3 Value</label>
                    <input
                      type="number"
                      name="stat3Value"
                      defaultValue={heroQuery.data.stat3Value}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-gray-500 focus:outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Stat 3 Label</label>
                    <input
                      type="text"
                      name="stat3Label"
                      defaultValue={heroQuery.data.stat3Label}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-gray-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="px-8 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition shadow-md"
              >
                Save Hero Section
              </button>
            </form>

            {/* Hero Slides Section */}
            <div className="border-t border-gray-200 pt-8 mt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Hero Slides - Background Images</h3>
              <form onSubmit={handleSlideAdd} className="mb-8 pb-8 border-b border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Add New Slide</h4>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Image URL</label>
                    <input
                      type="url"
                      name="imageUrl"
                      placeholder="https://i.imgur.com/yourimage.jpg"
                      required
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-gray-500 focus:outline-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">Use Imgur, Cloudinary, or similar hosting</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Caption (Optional)</label>
                    <input
                      type="text"
                      name="caption"
                      placeholder="Slide description..."
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-gray-500 focus:outline-none"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition flex items-center gap-2"
                >
                  <Plus size={18} />
                  Add Slide
                </button>
              </form>

              {/* Slides List */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Current Slides</h4>
                {slidesQuery.data && slidesQuery.data.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-4">
                    {slidesQuery.data.map((slide: any, idx: number) => (
                      <div
                        key={slide.id}
                        className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                      >
                        <div className="flex items-start gap-4">
                          <img
                            src={slide.imageUrl}
                            alt={slide.caption || `Slide ${idx + 1}`}
                            className="w-24 h-24 object-cover rounded-lg border border-gray-300"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="px-2 py-1 bg-gray-200 text-gray-900 text-xs font-semibold rounded">
                                Order: {slide.order}
                              </span>
                            </div>
                            {slide.caption && (
                              <p className="text-sm text-gray-700 mb-2">{slide.caption}</p>
                            )}
                            <p className="text-xs text-gray-500 truncate">{slide.imageUrl}</p>
                          </div>
                          <button
                            onClick={() => handleSlideDelete(slide.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                            title="Delete slide"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
                    No slides yet. Add your first background image above.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Process Steps Tab */}
        {activeTab === 'process' && (
          <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Process Steps - How You Work</h2>
            <form onSubmit={handleProcessAdd} className="mb-8 pb-8 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Step</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  name="title"
                  placeholder="Step Title"
                  required
                  className="px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-gray-500 focus:outline-none"
                />
                <input
                  type="text"
                  name="description"
                  placeholder="Step Description"
                  required
                  className="px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-gray-500 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition"
              >
                <Plus className="w-4 h-4" />
                Add Step
              </button>
            </form>
            <div className="space-y-4">
              {processQuery.data?.map((step: any) => (
                <div key={step.id} className="p-6 bg-gray-50 border border-gray-200 rounded-lg hover:shadow-md transition">
                  {editingProcess?.id === step.id ? (
                    <form onSubmit={handleProcessEdit} className="space-y-4">
                      <div className="inline-block px-3 py-1 bg-gray-200 text-gray-700 font-semibold rounded mb-2 text-sm">
                        Step {step.order}
                      </div>
                      <input
                        type="text"
                        name="title"
                        defaultValue={step.title}
                        placeholder="Step Title"
                        required
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900"
                      />
                      <input
                        type="text"
                        name="description"
                        defaultValue={step.description}
                        placeholder="Step Description"
                        required
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900"
                      />
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingProcess(null)}
                          className="px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="inline-block px-3 py-1 bg-gray-200 text-gray-700 font-semibold rounded mb-2 text-sm">
                          Step {step.order}
                        </div>
                        <h4 className="font-bold text-gray-900 text-lg mb-2">{step.title}</h4>
                        <p className="text-gray-600">{step.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingProcess(step)}
                          className="text-blue-600 hover:text-blue-700 transition p-2 hover:bg-blue-50 rounded-lg"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleProcessDelete(step.id)}
                          className="text-red-600 hover:text-red-700 transition p-2 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Why Choose Us Tab */}
        {activeTab === 'why-choose-us' && (
          <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Us - Key Benefits</h2>
            <form onSubmit={handleWhyAdd} className="mb-8 pb-8 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Benefit</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  name="title"
                  placeholder="Benefit Title"
                  required
                  className="px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-gray-500 focus:outline-none"
                />
                <input
                  type="text"
                  name="description"
                  placeholder="Benefit Description"
                  required
                  className="px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-gray-500 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition"
              >
                <Plus className="w-4 h-4" />
                Add Benefit
              </button>
            </form>
            <div className="grid md:grid-cols-2 gap-4">
              {whyQuery.data?.map((item: any) => (
                <div key={item.id} className="p-6 bg-gray-50 border border-gray-200 rounded-lg hover:shadow-md transition">
                  {editingWhy?.id === item.id ? (
                    <form onSubmit={handleWhyEdit} className="space-y-4">
                      <input
                        type="text"
                        name="title"
                        defaultValue={item.title}
                        placeholder="Benefit Title"
                        required
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900"
                      />
                      <input
                        type="text"
                        name="description"
                        defaultValue={item.description}
                        placeholder="Benefit Description"
                        required
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900"
                      />
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingWhy(null)}
                          className="px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h4>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingWhy(item)}
                          className="text-blue-600 hover:text-blue-700 transition p-2 hover:bg-blue-50 rounded-lg"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleWhyDelete(item.id)}
                          className="text-red-600 hover:text-red-700 transition p-2 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Site Settings Tab */}
        {activeTab === 'site-settings' && settingsQuery.data && (
          <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Site Settings - General Information</h2>
            <form onSubmit={handleSettingsSave} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Site Name</label>
                  <input
                    type="text"
                    name="siteName"
                    defaultValue={settingsQuery.data.siteName}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-gray-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Site Description</label>
                  <input
                    type="text"
                    name="siteDescription"
                    defaultValue={settingsQuery.data.siteDescription}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-gray-500 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Footer Text</label>
                <input
                  type="text"
                  name="footerText"
                  defaultValue={settingsQuery.data.footerText}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-gray-500 focus:outline-none"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
                  <input
                    type="email"
                    name="companyEmail"
                    defaultValue={settingsQuery.data.companyEmail}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-gray-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Phone</label>
                  <input
                    type="text"
                    name="companyPhone"
                    defaultValue={settingsQuery.data.companyPhone}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-gray-500 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Address</label>
                <input
                  type="text"
                  name="companyAddress"
                  defaultValue={settingsQuery.data.companyAddress}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-gray-500 focus:outline-none"
                />
              </div>
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Navbar Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Logo URL (Image Link)</label>
                    <input
                      type="url"
                      name="logoUrl"
                      defaultValue={settingsQuery.data.logoUrl || ''}
                      placeholder="https://example.com/logo.png"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-gray-500 focus:outline-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">Upload your logo to a hosting service (Imgur, Cloudinary, etc.) and paste the URL here</p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Navbar Background Color</label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          name="navbarBgColor"
                          defaultValue={settingsQuery.data.navbarBgColor || '#ffffff'}
                          className="w-20 h-12 rounded-lg cursor-pointer border-2 border-gray-300"
                        />
                        <input
                          type="text"
                          defaultValue={settingsQuery.data.navbarBgColor || '#ffffff'}
                          placeholder="#ffffff"
                          className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-gray-500 focus:outline-none font-mono text-sm"
                          readOnly
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Navbar Text Color</label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          name="navbarTextColor"
                          defaultValue={settingsQuery.data.navbarTextColor || '#111827'}
                          className="w-20 h-12 rounded-lg cursor-pointer border-2 border-gray-300"
                        />
                        <input
                          type="text"
                          defaultValue={settingsQuery.data.navbarTextColor || '#111827'}
                          placeholder="#111827"
                          className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-gray-500 focus:outline-none font-mono text-sm"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Social Media Links</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Facebook URL</label>
                    <input
                      type="url"
                      name="socialFacebook"
                      defaultValue={settingsQuery.data.socialFacebook}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-gray-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">LinkedIn URL</label>
                    <input
                      type="url"
                      name="socialLinkedin"
                      defaultValue={settingsQuery.data.socialLinkedin}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-gray-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Twitter URL</label>
                    <input
                      type="url"
                      name="socialTwitter"
                      defaultValue={settingsQuery.data.socialTwitter}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-gray-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Preloader Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      name="preloaderEnabled"
                      id="preloaderEnabled"
                      defaultChecked={settingsQuery.data.preloaderEnabled ?? true}
                      className="w-5 h-5 rounded border-gray-300 text-gray-900 focus:ring-gray-500"
                    />
                    <label htmlFor="preloaderEnabled" className="text-sm font-semibold text-gray-900">
                      Enable Preloader (shows on first page load)
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Preloader Text</label>
                    <input
                      type="text"
                      name="preloaderText"
                      defaultValue={settingsQuery.data.preloaderText || 'Metasoft Info'}
                      placeholder="Metasoft Info"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-gray-500 focus:outline-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">This text will appear in the preloader animation</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Preloader Duration (milliseconds)</label>
                    <input
                      type="number"
                      name="preloaderDuration"
                      defaultValue={settingsQuery.data.preloaderDuration || 2000}
                      min="1000"
                      max="5000"
                      step="100"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-gray-500 focus:outline-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">Recommended: 2000-3000ms (2-3 seconds)</p>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="px-8 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition shadow-md"
              >
                Save Settings
              </button>
            </form>
          </div>
        )}

        {/* Services Tab */}
        {activeTab === 'services' && (
          <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Services - What You Offer</h2>
              <button
                onClick={() => {
                  const title = prompt('Service Title:');
                  const summary = prompt('Service Summary:');
                  if (title && summary) {
                    handleQuickAdd('service', {
                      title,
                      summary,
                      description: 'Edit in content management',
                      updatedBy: user?.email,
                    });
                  }
                }}
                className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition"
              >
                <Plus className="w-4 h-4" />
                Add Service
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {servicesQuery.data?.map((service: any) => (
                <div key={service.id} className="p-6 bg-gray-50 border border-gray-200 rounded-lg hover:shadow-md transition">
                  {editingService?.id === service.id ? (
                    <form onSubmit={handleServiceEdit} className="space-y-3">
                      <input
                        name="title"
                        defaultValue={service.title}
                        placeholder="Service Title"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        required
                      />
                      <textarea
                        name="summary"
                        defaultValue={service.summary}
                        placeholder="Summary"
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        required
                      />
                      <textarea
                        name="description"
                        defaultValue={service.description}
                        placeholder="Full Description"
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                      <div className="flex gap-2">
                        <button type="submit" className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingService(null)}
                          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-gray-900 text-lg">{service.title}</h4>
                        <div className="flex gap-1">
                          <button
                            onClick={() => setEditingService(service)}
                            className="p-2 text-gray-600 hover:bg-gray-200 rounded transition"
                            title="Edit service"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleServiceDelete(service.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                            title="Delete service"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-3">{service.summary}</p>
                      <p className="text-xs text-gray-500">ID: {service.id}</p>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Projects - Portfolio Showcase</h2>
              <button
                onClick={() => {
                  const title = prompt('Project Title:');
                  const summary = prompt('Project Summary:');
                  if (title && summary) {
                    handleQuickAdd('project', {
                      title,
                      summary,
                      tags: 'web-development',
                      updatedBy: user?.email,
                    });
                  }
                }}
                className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition"
              >
                <Plus className="w-4 h-4" />
                Add Project
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {projectsQuery.data?.map((project: any) => (
                <div key={project.id} className="p-6 bg-gray-50 border border-gray-200 rounded-lg hover:shadow-md transition">
                  {editingProject?.id === project.id ? (
                    <form onSubmit={handleProjectEdit} className="space-y-3">
                      <input
                        name="title"
                        defaultValue={project.title}
                        placeholder="Project Title"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        required
                      />
                      <textarea
                        name="summary"
                        defaultValue={project.summary}
                        placeholder="Summary"
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        required
                      />
                      <input
                        name="tags"
                        defaultValue={project.tags}
                        placeholder="Tags (e.g., web-development)"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                      <input
                        name="liveUrl"
                        defaultValue={project.liveUrl}
                        placeholder="Live URL"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                      <input
                        name="repoUrl"
                        defaultValue={project.repoUrl}
                        placeholder="Repository URL"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                      <div className="flex gap-2">
                        <button type="submit" className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingProject(null)}
                          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-gray-900 text-lg">{project.title}</h4>
                        <div className="flex gap-1">
                          <button
                            onClick={() => setEditingProject(project)}
                            className="p-2 text-gray-600 hover:bg-gray-200 rounded transition"
                            title="Edit project"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleProjectDelete(project.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                            title="Delete project"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-3">{project.summary}</p>
                      <div className="flex gap-3">
                        {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-blue-600 text-sm hover:underline">View Live →</a>}
                        {project.repoUrl && <a href={project.repoUrl} target="_blank" rel="noreferrer" className="text-blue-600 text-sm hover:underline">Repo →</a>}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Testimonials Tab */}
        {activeTab === 'testimonials' && (
          <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Testimonials - Client Feedback</h2>
              <button
                onClick={() => {
                  const clientName = prompt('Client Name:');
                  const company = prompt('Company:');
                  const message = prompt('Testimonial Message:');
                  if (clientName && company && message) {
                    handleQuickAdd('testimonial', {
                      clientName,
                      company,
                      message,
                      rating: 5,
                      updatedBy: user?.email,
                    });
                  }
                }}
                className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition"
              >
                <Plus className="w-4 h-4" />
                Add Testimonial
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {testimonialsQuery.data?.map((t: any) => (
                <div key={t.id} className="p-6 bg-gray-50 border border-gray-200 rounded-lg hover:shadow-md transition relative">
                  {editingTestimonial?.id === t.id ? (
                    <form onSubmit={handleTestimonialEdit} className="space-y-3">
                      <input
                        name="clientName"
                        defaultValue={t.clientName}
                        placeholder="Client Name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        required
                      />
                      <input
                        name="company"
                        defaultValue={t.company}
                        placeholder="Company"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        required
                      />
                      <textarea
                        name="message"
                        defaultValue={t.message}
                        placeholder="Testimonial Message"
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        required
                      />
                      <select
                        name="rating"
                        defaultValue={t.rating}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      >
                        <option value="5">5 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="2">2 Stars</option>
                        <option value="1">1 Star</option>
                      </select>
                      <div className="flex gap-2">
                        <button type="submit" className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingTestimonial(null)}
                          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <div className="absolute top-4 right-4 flex gap-1">
                        <button
                          onClick={() => setEditingTestimonial(t)}
                          className="p-2 text-gray-600 hover:bg-gray-200 rounded transition"
                          title="Edit testimonial"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleTestimonialDelete(t.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                          title="Delete testimonial"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="flex gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < t.rating ? 'text-yellow-400 text-lg' : 'text-gray-300 text-lg'}>★</span>
                        ))}
                      </div>
                      <p className="text-gray-700 mb-3 italic">"{t.message}"</p>
                      <p className="font-semibold text-gray-900">{t.clientName}</p>
                      <p className="text-sm text-gray-600">{t.company}</p>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Partners Tab */}
        {activeTab === 'partners' && (
          <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Partners & Clients - Trusted By</h2>
            <form onSubmit={handlePartnerAdd} className="mb-8 pb-8 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Partner</h3>
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Partner Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Company Name"
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-gray-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Logo URL</label>
                  <input
                    type="url"
                    name="logoUrl"
                    placeholder="https://example.com/logo.png"
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-gray-500 focus:outline-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">Use transparent PNG for best results</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Website URL (Optional)</label>
                  <input
                    type="url"
                    name="websiteUrl"
                    placeholder="https://example.com"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-gray-500 focus:outline-none"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="px-6 py-2 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition flex items-center gap-2"
              >
                <Plus size={18} />
                Add Partner
              </button>
            </form>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Partners</h3>
              {partnersQuery.data && partnersQuery.data.length > 0 ? (
                <div className="grid md:grid-cols-4 gap-4">
                  {partnersQuery.data.map((partner: any) => (
                    <div
                      key={partner.id}
                      className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition relative"
                    >
                      <button
                        onClick={() => handlePartnerDelete(partner.id)}
                        className="absolute top-2 right-2 p-2 text-red-600 hover:bg-red-50 rounded transition"
                        title="Delete partner"
                      >
                        <Trash2 size={16} />
                      </button>
                      <div className="h-16 flex items-center justify-center mb-3">
                        <img src={partner.logoUrl} alt={partner.name} className="max-h-full max-w-full object-contain" />
                      </div>
                      <p className="text-sm font-semibold text-gray-900 text-center mb-1">{partner.name}</p>
                      {partner.websiteUrl && (
                        <a
                          href={partner.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 hover:underline text-center block truncate"
                        >
                          {partner.websiteUrl}
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
                  No partners yet. Add your first partner logo above.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Pages Tab */}
        {activeTab === 'pages' && (
          <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Custom Pages - Create & Manage</h2>
            <form onSubmit={handlePageAdd} className="mb-8 pb-8 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Page</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Page Title</label>
                  <input
                    type="text"
                    name="title"
                    placeholder="About Us"
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-gray-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">URL Slug</label>
                  <input
                    type="text"
                    name="slug"
                    placeholder="about-us"
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-gray-500 focus:outline-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">URL: /page/about-us</p>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-900 mb-2">Page Content (HTML)</label>
                <textarea
                  name="content"
                  placeholder="<h1>About Us</h1><p>Your content here...</p>"
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-gray-500 focus:outline-none font-mono text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">You can use HTML tags for formatting</p>
              </div>
              <button
                type="submit"
                className="px-6 py-2 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition flex items-center gap-2"
              >
                <Plus size={18} />
                Create Page
              </button>
            </form>

            <div className="mb-6 pb-6 border-b border-gray-200">
              <button
                onClick={handleSeedPages}
                className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                🌱 Create Default Page (About Us)
              </button>
              <p className="text-xs text-gray-500 mt-2">Creates an About Us page if no pages exist</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Existing Pages</h3>
              {pagesQuery.data && pagesQuery.data.length > 0 ? (
                <div className="space-y-4">
                  {pagesQuery.data.map((page: any) => (
                    <div key={page.id} className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
                      {editingPage?.id === page.id ? (
                        <form onSubmit={handlePageEdit} className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-semibold text-gray-900 mb-2">Page Title</label>
                              <input
                                type="text"
                                name="title"
                                defaultValue={page.title}
                                required
                                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-semibold text-gray-900 mb-2">URL Slug</label>
                              <input
                                type="text"
                                name="slug"
                                defaultValue={page.slug}
                                required
                                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">Page Content (HTML)</label>
                            <textarea
                              name="content"
                              defaultValue={page.content}
                              required
                              rows={6}
                              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 font-mono text-sm"
                            />
                          </div>
                          <div className="flex gap-2">
                            <button
                              type="submit"
                              className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingPage(null)}
                              className="px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      ) : (
                        <>
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <h4 className="text-lg font-bold text-gray-900 mb-1">{page.title}</h4>
                              <p className="text-sm text-blue-600">/page/{page.slug}</p>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => setEditingPage(page)}
                                className="text-blue-600 hover:text-blue-700 transition p-2 hover:bg-blue-50 rounded-lg"
                              >
                                <Edit2 size={18} />
                              </button>
                              <button
                                onClick={() => handlePageDelete(page.id)}
                                className="text-red-600 hover:text-red-700 transition p-2 hover:bg-red-50 rounded-lg"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </div>
                          <div className="text-sm text-gray-600 bg-white p-4 rounded border border-gray-200 max-h-40 overflow-y-auto">
                            <pre className="whitespace-pre-wrap font-mono text-xs">{page.content}</pre>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
                  No custom pages yet. Create your first page above (About Us, Services, etc.)
                </p>
              )}
            </div>
          </div>
        )}

        {/* Navbar Menu Tab */}
        {activeTab === 'navbar-menu' && (
          <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Navbar Menu - Customize Navigation</h2>
            <form onSubmit={handleNavbarMenuAdd} className="mb-8 pb-8 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Menu Item</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Menu Label</label>
                  <input
                    type="text"
                    name="label"
                    placeholder="About Us"
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-gray-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Link Path</label>
                  <input
                    type="text"
                    name="path"
                    placeholder="/page/about-us"
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-gray-500 focus:outline-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">Use /page/slug for custom pages, /services for services, etc.</p>
                </div>
              </div>
              <button
                type="submit"
                className="px-6 py-2 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition flex items-center gap-2"
              >
                <Plus size={18} />
                Add Menu Item
              </button>
            </form>

            <div className="mb-6 pb-6 border-b border-gray-200">
              <button
                onClick={handleSeedNavbarMenu}
                className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                🌱 Create Default Menu Items
              </button>
              <p className="text-xs text-gray-500 mt-2">Creates About Us, Services, Projects, Testimonials menu items if no menu exists</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Menu Items</h3>
              {navbarMenuQuery.data && navbarMenuQuery.data.length > 0 ? (
                <div className="space-y-3">
                  {navbarMenuQuery.data.map((item: any) => (
                    <div key={item.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-mono text-gray-500 bg-gray-200 px-2 py-1 rounded">#{item.order}</span>
                          <h4 className="font-bold text-gray-900">{item.label}</h4>
                        </div>
                        <p className="text-sm text-blue-600 mt-1 ml-12">{item.path}</p>
                      </div>
                      <button
                        onClick={() => handleNavbarMenuDelete(item.id)}
                        className="text-red-600 hover:text-red-700 transition p-2 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
                  No menu items yet. Add menu items above to customize your navbar.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Team Members Tab */}
        {activeTab === 'team' && (
          <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Team Members Management</h2>
            
            {/* Add/Edit Form */}
            <form onSubmit={editingTeamMember ? handleTeamMemberEdit : handleTeamMemberAdd} className="mb-8 pb-8 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {editingTeamMember ? 'Edit Team Member' : 'Add New Team Member'}
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Name *</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    defaultValue={editingTeamMember?.name}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-gray-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Designation *</label>
                  <input
                    type="text"
                    name="designation"
                    placeholder="CEO & Founder"
                    defaultValue={editingTeamMember?.designation}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-gray-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Category *</label>
                  <select
                    name="category"
                    defaultValue={editingTeamMember?.category || 'management'}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-gray-500 focus:outline-none"
                  >
                    <option value="management">Management</option>
                    <option value="tech">Tech Team</option>
                    <option value="design">Design Team</option>
                    <option value="marketing">Marketing Team</option>
                    <option value="sales">Sales Team</option>
                    <option value="support">Support Team</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Display Order</label>
                  <input
                    type="number"
                    name="displayOrder"
                    placeholder="0"
                    defaultValue={editingTeamMember?.displayOrder || 0}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-gray-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-900 mb-2">Image URL *</label>
                <input
                  type="text"
                  name="imageUrl"
                  placeholder="https://example.com/image.jpg"
                  defaultValue={editingTeamMember?.imageUrl}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-gray-500 focus:outline-none"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    defaultValue={editingTeamMember?.email}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-gray-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">LinkedIn URL</label>
                  <input
                    type="text"
                    name="linkedin"
                    placeholder="https://linkedin.com/in/johndoe"
                    defaultValue={editingTeamMember?.linkedin}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-gray-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Twitter URL</label>
                  <input
                    type="text"
                    name="twitter"
                    placeholder="https://twitter.com/johndoe"
                    defaultValue={editingTeamMember?.twitter}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-gray-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Facebook URL</label>
                  <input
                    type="text"
                    name="facebook"
                    placeholder="https://facebook.com/johndoe"
                    defaultValue={editingTeamMember?.facebook}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-gray-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Instagram URL</label>
                  <input
                    type="text"
                    name="instagram"
                    placeholder="https://instagram.com/johndoe"
                    defaultValue={editingTeamMember?.instagram}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-gray-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-900 mb-2">Bio</label>
                <textarea
                  name="bio"
                  placeholder="Brief bio about the team member..."
                  defaultValue={editingTeamMember?.bio}
                  rows={3}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-gray-500 focus:outline-none"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="px-8 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition shadow-md"
                >
                  {editingTeamMember ? 'Update Member' : 'Add Member'}
                </button>
                {editingTeamMember && (
                  <button
                    type="button"
                    onClick={() => setEditingTeamMember(null)}
                    className="px-6 py-3 bg-gray-200 text-gray-900 font-semibold rounded-lg hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>

            {/* Team Members List */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Members</h3>
              {teamQuery.data && teamQuery.data.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {teamQuery.data.map((member: any) => (
                    <div key={member.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                      <div className="flex items-start gap-4">
                        <img
                          src={member.imageUrl}
                          alt={member.name}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-gray-900 truncate">{member.name}</h4>
                          <p className="text-sm text-gray-600 truncate">{member.designation}</p>
                          <p className="text-xs text-purple-600 font-semibold mt-1 capitalize">{member.category}</p>
                          <p className="text-xs text-gray-500 mt-1">Order: {member.displayOrder}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => setEditingTeamMember(member)}
                          className="flex-1 px-3 py-2 bg-blue-50 text-blue-700 font-semibold rounded-lg hover:bg-blue-100 transition text-sm"
                        >
                          <Edit2 size={14} className="inline mr-1" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleTeamMemberDelete(member.id)}
                          className="flex-1 px-3 py-2 bg-red-50 text-red-700 font-semibold rounded-lg hover:bg-red-100 transition text-sm"
                        >
                          <Trash2 size={14} className="inline mr-1" />
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">No team members found. Add your first team member above.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">User Management - Access Control</h2>
            <form onSubmit={handleUserAdd} className="mb-8 pb-8 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New User</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="user@example.com"
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-gray-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-gray-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Min 8 characters"
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-gray-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Role</label>
                  <select
                    name="role"
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-gray-500 focus:outline-none"
                  >
                    <option value="SUPER_ADMIN">Super Admin (Full Access)</option>
                    <option value="ADMIN">Admin (Manage Content)</option>
                    <option value="EDITOR">Editor (View Only)</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="px-6 py-2 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition flex items-center gap-2"
              >
                <Plus size={18} />
                Add User
              </button>
            </form>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Users</h3>
              {usersQuery.data && usersQuery.data.length > 0 ? (
                <div className="space-y-4">
                  {usersQuery.data.map((usr: any) => (
                    <div key={usr.id} className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
                      {editingUser?.id === usr.id ? (
                        <form onSubmit={handleUserEdit} className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
                              <input
                                type="email"
                                name="email"
                                defaultValue={usr.email}
                                required
                                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name</label>
                              <input
                                type="text"
                                name="fullName"
                                defaultValue={usr.fullName}
                                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-semibold text-gray-900 mb-2">New Password (optional)</label>
                              <input
                                type="password"
                                name="password"
                                placeholder="Leave blank to keep current"
                                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-semibold text-gray-900 mb-2">Role</label>
                              <select
                                name="role"
                                defaultValue={usr.role}
                                required
                                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900"
                              >
                                <option value="SUPER_ADMIN">Super Admin</option>
                                <option value="ADMIN">Admin</option>
                                <option value="EDITOR">Editor</option>
                              </select>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              type="submit"
                              className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingUser(null)}
                              className="px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      ) : (
                        <>
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <h4 className="text-lg font-bold text-gray-900 mb-1">{usr.fullName || usr.email}</h4>
                              <p className="text-sm text-gray-600">{usr.email}</p>
                              <div className="mt-2">
                                <span className={`inline-block px-3 py-1 rounded text-sm font-semibold ${
                                  usr.role === 'SUPER_ADMIN' ? 'bg-purple-100 text-purple-700' :
                                  usr.role === 'ADMIN' ? 'bg-blue-100 text-blue-700' :
                                  'bg-gray-100 text-gray-700'
                                }`}>
                                  {usr.role === 'SUPER_ADMIN' ? '👑 Super Admin' :
                                   usr.role === 'ADMIN' ? '⚙️ Admin' :
                                   '📝 Editor'}
                                </span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => setEditingUser(usr)}
                                className="text-blue-600 hover:text-blue-700 transition p-2 hover:bg-blue-50 rounded-lg"
                              >
                                <Edit2 size={18} />
                              </button>
                              {usr.id !== user?.id && (
                                <button
                                  onClick={() => handleUserDelete(usr.id)}
                                  className="text-red-600 hover:text-red-700 transition p-2 hover:bg-red-50 rounded-lg"
                                >
                                  <Trash2 size={18} />
                                </button>
                              )}
                            </div>
                          </div>
                          <div className="text-xs text-gray-500">
                            Created: {new Date(usr.createdAt).toLocaleDateString()}
                            {usr.lastLoginAt && ` • Last login: ${new Date(usr.lastLoginAt).toLocaleDateString()}`}
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
                  No users found.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Theme Tab */}
        {activeTab === 'theme' && (
          <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Theme Colors - Brand Identity</h2>
            <form onSubmit={handleThemeSave} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Primary Color</label>
                  <input
                    type="color"
                    name="primaryColor"
                    defaultValue={theme?.primaryColor || '#3B82F6'}
                    className="w-full h-16 rounded-lg cursor-pointer border-2 border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Secondary Color</label>
                  <input
                    type="color"
                    name="secondaryColor"
                    defaultValue={theme?.secondaryColor || '#8B5CF6'}
                    className="w-full h-16 rounded-lg cursor-pointer border-2 border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Accent Color</label>
                  <input
                    type="color"
                    name="accentColor"
                    defaultValue={theme?.accentColor || '#EC4899'}
                    className="w-full h-16 rounded-lg cursor-pointer border-2 border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Surface Color</label>
                  <input
                    type="color"
                    name="surfaceColor"
                    defaultValue={theme?.surfaceColor || '#F3F4F6'}
                    className="w-full h-16 rounded-lg cursor-pointer border-2 border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Neutral Color</label>
                  <input
                    type="color"
                    name="neutralColor"
                    defaultValue={theme?.neutralColor || '#6B7280'}
                    className="w-full h-16 rounded-lg cursor-pointer border-2 border-gray-300"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="px-8 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition shadow-md"
              >
                Save Theme
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
