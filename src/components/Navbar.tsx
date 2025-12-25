import { useMemo, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { fetchSiteSettings, fetchNavbarMenu } from '../api/cms';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const { isAuthed, logout } = useAuth();
  const { pathname } = useLocation();
  const isAdmin = useMemo(() => pathname.startsWith('/admin'), [pathname]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
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
    { id: 'contact', label: 'Contact', path: '/contact' },
  ];

  const displayMenuItems = menuItems && menuItems.length > 0 ? menuItems : defaultMenuItems;

  return (
    <nav 
      className="sticky top-0 z-40 border-b border-gray-200"
      style={{ backgroundColor: navbarBg, color: navbarText }}
    >
      <div className="px-4 sm:px-6 py-3 sm:py-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="font-bold text-base sm:text-xl hover:opacity-80 transition flex items-center gap-2 sm:gap-3"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            {settings?.logoUrl && (
              <img src={settings.logoUrl} alt="Logo" className="h-10 sm:h-14 md:h-16 w-auto" />
            )}
            <div className="hidden sm:block">
              <span style={{ color: '#1D1D35' }}>METASOFT INFO</span>
              {' '}
              <span style={{ color: '#6C5DD3' }}>SOLUTION</span>
            </div>
            <div className="sm:hidden text-xs">
              <div><span style={{ color: '#1D1D35' }}>METASOFT INFO</span></div>
              <div><span style={{ color: '#6C5DD3' }}>SOLUTION</span></div>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6">
            {!isAdmin && (
              <>
                {displayMenuItems.map((item: any) => (
                  <a
                    key={item.id}
                    href={item.path}
                    className="hover:opacity-70 transition text-sm font-medium"
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
                  className="px-4 py-2 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition text-sm"
                >
                  Back to Site
                </Link>
                {isAuthed && (
                  <button 
                    onClick={logout} 
                    className="hover:opacity-70 transition font-semibold text-sm"
                    style={{ color: navbarText }}
                  >
                    Logout
                  </button>
                )}
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X size={24} style={{ color: navbarText }} />
            ) : (
              <Menu size={24} style={{ color: navbarText }} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            {!isAdmin && (
              <div className="flex flex-col space-y-3">
                {displayMenuItems.map((item: any) => (
                  <a
                    key={item.id}
                    href={item.path}
                    className="hover:opacity-70 transition text-base font-medium py-2"
                    style={{ color: navbarText }}
                    target={item.openInNewTab ? '_blank' : undefined}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            )}
            {isAdmin && (
              <div className="flex flex-col space-y-3">
                <Link 
                  to="/" 
                  className="px-4 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Back to Site
                </Link>
                {isAuthed && (
                  <button 
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="hover:opacity-70 transition font-semibold text-base py-2"
                    style={{ color: navbarText }}
                  >
                    Logout
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
