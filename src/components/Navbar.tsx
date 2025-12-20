import { useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { fetchSiteSettings, fetchNavbarMenu } from '../api/cms';

export default function Navbar() {
  const { isAuthed, logout } = useAuth();
  const { pathname } = useLocation();
  const isAdmin = useMemo(() => pathname.startsWith('/admin'), [pathname]);
  const { data: settings } = useQuery({ 
    queryKey: ['site-settings'], 
    queryFn: fetchSiteSettings 
  });
  const { data: menuItems } = useQuery({
    queryKey: ['navbar-menu'],
    queryFn: fetchNavbarMenu
  });

  const navbarBg = settings?.navbarBgColor || '#ffffff';
  const navbarText = settings?.navbarTextColor || '#111827';

  // Default menu items if none in CMS
  const defaultMenuItems = [
    { id: 'services', label: 'Services', path: '/#services' },
    { id: 'projects', label: 'Projects', path: '/#projects' },
    { id: 'testimonials', label: 'Testimonials', path: '/#testimonials' },
  ];

  const displayMenuItems = menuItems && menuItems.length > 0 ? menuItems : defaultMenuItems;

  return (
    <nav 
      className="sticky top-0 z-40 border-b border-gray-200"
      style={{ backgroundColor: navbarBg, color: navbarText }}
    >
      <div className="px-4 sm:px-6 py-4 max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="font-bold text-lg hover:opacity-80 transition flex items-center gap-3"
          style={{ color: navbarText }}
        >
          {settings?.logoUrl && (
            <img src={settings.logoUrl} alt="Logo" className="h-8 w-auto" />
          )}
          {settings?.siteName || 'Metasoft Info'}
        </Link>
        <div className="flex items-center gap-6">
          {!isAdmin && (
            <>
              {displayMenuItems.map((item: any) => (
                <a
                  key={item.id}
                  href={item.path}
                  className="hover:opacity-70 transition"
                  style={{ color: navbarText }}
                  target={item.openInNewTab ? '_blank' : undefined}
                >
                  {item.label}
                </a>
              ))}
            </>
          )}
          {isAdmin && (
            <>
              <Link 
                to="/" 
                className="px-4 py-2 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition"
              >
                Back to Site
              </Link>
              {isAuthed && (
                <button 
                  onClick={logout} 
                  className="hover:opacity-70 transition font-semibold"
                  style={{ color: navbarText }}
                >
                  Logout
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
