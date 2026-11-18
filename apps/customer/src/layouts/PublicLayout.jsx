import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Package, Menu, X, ArrowRight, Compass, Shield } from 'lucide-react';
import { Button } from '@parcelo/shared/components/Button.jsx';
import { useAuth } from '@parcelo/shared/context/AuthContext.jsx';
import { APP_URLS } from '@parcelo/shared/constants/appUrls.js';

/**
 * @notice Public Visitor Layout for Parcelo Customer App
 * @dev Top navigation bar with phone-first responsive hamburger menu.
 */
export function PublicLayout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, role, logout } = useAuth();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Track Parcel', path: '/track' },
    { label: 'Book Delivery', path: '/book' },
    { label: 'Component Showcase', path: '/design-system' },
  ];

  return (
    <div className="min-h-screen bg-[#0F172A] text-[#F1F5F9] font-body flex flex-col justify-between selection:bg-[#14B8A6] selection:text-[#0F172A]">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#1E293B]/90 backdrop-blur border-b border-[#334155]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-lg bg-[#14B8A6] flex items-center justify-center text-[#0F172A] transition-transform group-hover:scale-105">
              <Package className="w-6 h-6 stroke-[2.3]" />
            </div>
            <div>
              <span className="font-heading font-bold text-xl tracking-tight text-[#F1F5F9]">Parcelo</span>
              <span className="hidden sm:inline-block ml-2 px-2 py-0.5 text-[11px] rounded-pill bg-[#14B8A6]/10 text-[#2DD4BF] border border-[#14B8A6]/30 font-medium">
                Customer Portal
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`transition-colors py-1 ${
                    isActive ? 'text-[#14B8A6] font-semibold' : 'text-[#94A3B8] hover:text-[#F1F5F9]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-3">
                <Link
                  to="/orders"
                  className="text-xs text-[#94A3B8] hover:text-[#2DD4BF] px-3 py-1.5 rounded-control bg-[#0F172A] border border-[#334155]"
                >
                  My Orders
                </Link>
                <Button variant="ghost" size="sm" onClick={logout}>
                  Log Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Log In
                  </Button>
                </Link>
                <Link to="/book">
                  <Button variant="primary" size="sm">
                    Book Delivery
                  </Button>
                </Link>
              </div>
            )}

            <a
              href={APP_URLS.OPS}
              target="_blank"
              rel="noreferrer"
              title="Open Ops Dashboard"
              className="p-2 rounded-control text-[#94A3B8] hover:text-[#2DD4BF] hover:bg-[#0F172A] border border-transparent hover:border-[#334155] transition-colors"
            >
              <Compass className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-control text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#0F172A] border border-[#334155] focus:outline-none focus:ring-2 focus:ring-[#2DD4BF]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#1E293B] border-b border-[#334155] px-4 pt-3 pb-6 space-y-3">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-control text-sm font-medium text-[#F1F5F9] hover:bg-[#0F172A] hover:text-[#14B8A6]"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-3 border-t border-[#334155] flex flex-col space-y-2">
              {user ? (
                <>
                  <Link
                    to="/orders"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-2 text-sm text-[#2DD4BF] bg-[#0F172A] rounded-control border border-[#334155]"
                  >
                    View My Orders
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full justify-center"
                  >
                    Log Out
                  </Button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full justify-center">
                      Log In
                    </Button>
                  </Link>
                  <Link to="/book" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="primary" size="sm" className="w-full justify-center">
                      Book Now
                    </Button>
                  </Link>
                </div>
              )}

              <a
                href={APP_URLS.OPS}
                target="_blank"
                rel="noreferrer"
                className="pt-2 text-xs text-center text-[#94A3B8] hover:text-[#2DD4BF] flex items-center justify-center space-x-1"
              >
                <span>Switch to Ops Dashboard</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Main Page Slot */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#334155] bg-[#0F172A] py-8 text-center text-xs text-[#64748B]">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-heading font-bold text-[#F1F5F9]">Parcelo</span>
            <span>&middot; Next-Generation Logistics Platform</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/design-system" className="hover:text-[#2DD4BF]">
              Component Showcase
            </Link>
            <a href="https://openstreetmap.org/copyright" target="_blank" rel="noreferrer" className="hover:text-[#2DD4BF]">
              &copy; OpenStreetMap
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
