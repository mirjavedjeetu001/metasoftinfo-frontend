import { Route, Routes, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchSiteSettings } from './api/cms';
import Navbar from './components/Navbar';
import Preloader from './components/Preloader';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import TestimonialsPage from './pages/TestimonialsPage';
import DynamicPage from './pages/DynamicPage';
import OurManagementPage from './pages/OurManagementPage';
import ContactPage from './pages/ContactPage';

function App() {
  const location = useLocation();
  const [showPreloader, setShowPreloader] = useState(false);
  const { data: settings } = useQuery({
    queryKey: ['site-settings'],
    queryFn: fetchSiteSettings,
  });

  useEffect(() => {
    // Show preloader only on home page
    if (location.pathname === '/') {
      setShowPreloader(true);
    } else {
      setShowPreloader(false);
    }
  }, [location.pathname]);

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
  };

  const preloaderEnabled = settings?.preloaderEnabled ?? true;
  const preloaderText = settings?.preloaderText || 'Metasoft Info';
  const preloaderDuration = settings?.preloaderDuration || 2000;

  if (showPreloader && preloaderEnabled && location.pathname === '/') {
    return (
      <Preloader
        text={preloaderText}
        duration={preloaderDuration}
        onComplete={handlePreloaderComplete}
      />
    );
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:id" element={<ServiceDetailPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:id" element={<ProjectDetailPage />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />
        <Route path="/our-management" element={<OurManagementPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/page/:slug" element={<DynamicPage />} />
      </Routes>
    </>
  );
}

export default App;
