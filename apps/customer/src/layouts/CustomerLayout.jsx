import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Package, PlusCircle, ListOrdered, LogOut, Compass, User } from 'lucide-react';
import { Button } from '@parcelo/shared/components/Button.jsx';
import { useAuth } from '@parcelo/shared/context/AuthContext.jsx';
import { APP_URLS } from '@parcelo/shared/constants/appUrls.js';

/**
 * @notice Logged-in Customer Layout
 * @dev Top bar for authenticated customers with direct navigation to booking and order tracking.
 */
export function CustomerLayout({ children }) {
  const { user, logout } = useAuth();
  const location = useLocation();

  const links = [
    { label: 'My Orders', path: '/orders', icon: <ListOrdered className="w-4 h-4" /> },
    { label: 'Book Delivery', path: '/book', icon: <PlusCircle className="w-4 h-4" /> },
    { label: 'Track Parcel', path: '/track', icon: <Package className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#0F172A] text-[#F1F5F9] font-body flex flex-col justify-between selection:bg-[#14B8A6] selection:text-[#0F172A]">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#1E293B]/90 backdrop-blur border-b border-[#334155]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/orders" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-[#14B8A6] flex items-center justify-center text-[#0F172A]">
              <Package className="w-6 h-6 stroke-[2.3]" />
            </div>
            <div>
              <span className="font-heading font-bold text-xl tracking-tight text-[#F1F5F9]">Parcelo</span>
              <span className="hidden sm:inline-block ml-2 px-2 py-0.5 text-[11px] rounded-pill bg-[#14B8A6]/10 text-[#2DD4BF] border border-[#14B8A6]/30 font-medium">
                Customer Portal
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden sm:flex items-center space-x-4">
            {links.map((link) => {
              const isActive = location.pathname.startsWith(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-control text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#0F172A] text-[#14B8A6] border border-[#334155]'
                      : 'text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#0F172A]/50'
                  }`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User info & Sign out */}
          <div className="flex items-center space-x-3">
            <div className="hidden md:flex flex-col text-right">
              <span className="text-xs font-semibold text-[#F1F5F9] truncate max-w-[160px]">
                {user?.displayName || 'Customer'}
              </span>
              <span className="text-[11px] text-[#94A3B8] truncate max-w-[160px]">
                {user?.email}
              </span>
            </div>

            <Button
              variant="ghost"
              size="sm"
              icon={<LogOut className="w-4 h-4" />}
              onClick={logout}
              title="Sign Out"
              className="text-[#94A3B8] hover:text-[#EF4444]"
            >
              <span className="hidden sm:inline">Log Out</span>
            </Button>
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="sm:hidden flex items-center justify-around border-t border-[#334155] bg-[#0F172A] px-2 py-1.5">
          {links.map((link) => {
            const isActive = location.pathname.startsWith(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex flex-col items-center py-1 px-3 text-xs font-medium rounded ${
                  isActive ? 'text-[#14B8A6]' : 'text-[#94A3B8]'
                }`}
              >
                {link.icon}
                <span className="mt-0.5 text-[11px]">{link.label}</span>
              </Link>
            );
          })}
        </div>
      </header>

      {/* Main Page Slot */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#334155] py-6 text-center text-xs text-[#64748B]">
        <p>Parcelo Customer Portal &middot; Real-Time Order Tracking &amp; Delivery Management</p>
      </footer>
    </div>
  );
}
