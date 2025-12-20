import { useState } from 'react';
import { Menu, X, Rocket } from 'lucide-react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-purple-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">MetaSoft</span>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-gray-300 hover:text-white transition">Services</a>
            <a href="#portfolio" className="text-gray-300 hover:text-white transition">Portfolio</a>
            <a href="#team" className="text-gray-300 hover:text-white transition">About</a>
            <a href="#contact" className="text-gray-300 hover:text-white transition">Contact</a>
            <a href="/admin" className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition">
              Admin
            </a>
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-slate-900 border-t border-purple-500/10 p-4 space-y-3">
            <a href="#services" className="block text-gray-300 hover:text-white py-2">Services</a>
            <a href="#portfolio" className="block text-gray-300 hover:text-white py-2">Portfolio</a>
            <a href="#team" className="block text-gray-300 hover:text-white py-2">About</a>
            <a href="/admin" className="block w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-center">Admin</a>
          </div>
        )}
      </nav>

      <main className="pt-20">{children}</main>

      {/* Footer */}
      <footer className="border-t border-purple-500/10 bg-slate-950/50 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 text-center text-gray-400">
          <p>&copy; 2025 MetaSoft Studio. Premium digital solutions for tomorrow's tech.</p>
        </div>
      </footer>
    </div>
  );
}
