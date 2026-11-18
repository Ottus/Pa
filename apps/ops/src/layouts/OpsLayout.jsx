import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ListOrdered,
  Search,
  LogOut,
  Shield,
  Menu,
  X,
  ExternalLink,
  Layers,
} from 'lucide-react';
import { useAuth } from '@parcelo/shared/context/AuthContext.jsx';
import { Button } from '@parcelo/shared/components/Button.jsx';
import { APP_URLS } from '@parcelo/shared/constants/appUrls.js';

/**
 * @notice Parcelo Operations Admin Dashboard Layout
 * @dev Enforces dark sidebar, top bar, role-based navigation links, and mobile drawer.
 */
export function OpsLayout({ children }) {
  const { user, role, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [quickSearch, setQuickSearch] = useState('');

  const navItems = [
    { label: 'Overview', path: '/', icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: 'All Orders', path: '/orders', icon: <ListOrdered className="w-5 h-5" /> },
    { label: 'Component Showcase', path: '/design-system', icon: <Layers className="w-5 h-5" /> },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!quickSearch.trim()) return;
    const clean = quickSearch.trim().toUpperCase();
    navigate(`/orders?search=${encodeURIComponent(clean)}`);
    setQuickSearch('');
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-[#F1F5F9] font-body flex selection:bg-[#14B8A6] selection:text-[#0F172A]">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#1E293B] border-r border-[#334155] flex-shrink-0 justify-between">
        <div>
          {/* Logo Brand */}
          <div className="h-16 px-6 border-b border-[#334155] flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-[#3B82F6] flex items-center justify-center text-white shadow-none">
              <Package className="w-6 h-6 stroke-[2.3]" />
            </div>
            <div>
              <span className="font-heading font-bold text-xl tracking-tight text-[#F1F5F9]">Parcelo Ops</span>
              <span className="block text-[11px] text-[#94A3B8] font-mono">Phase 1 Admin</span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="p-4 space-y-1.5">
            <div className="px-3 py-2 text-[11px] font-mono uppercase tracking-wider text-[#64748B]">
              Core Operations
            </div>
            {navItems.map((item) => {
              const isActive =
                item.path === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-control text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#0F172A] text-[#2DD4BF] border border-[#334155]'
                      : 'text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#0F172A]/50'
                  }`}
                >
                  <span className={isActive ? 'text-[#14B8A6]' : 'text-[#94A3B8]'}>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer User Info */}
        <div className="p-4 border-t border-[#334155] space-y-3">
          <div className="flex items-center space-x-3 px-2">
            <div className="w-8 h-8 rounded-full bg-[#3B82F6]/20 border border-[#3B82F6]/40 flex items-center justify-center text-[#60A5FA]">
              <Shield className="w-4 h-4" />
            </div>
            <div className="flex-1 truncate">
              <p className="text-xs font-semibold text-[#F1F5F9] truncate">
                {user?.displayName || 'Admin'}
              </p>
              <p className="text-[11px] text-[#94A3B8] font-mono capitalize">
                Role: {role || 'admin'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 pt-1">
            <a
              href={APP_URLS.CUSTOMER}
              target="_blank"
              rel="noreferrer"
              className="flex-1 text-xs text-center py-2 px-2 rounded-control bg-[#0F172A] border border-[#334155] text-[#94A3B8] hover:text-[#2DD4BF] transition-colors flex items-center justify-center space-x-1"
            >
              <span>Customer Portal</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <Button
              variant="ghost"
              size="sm"
              icon={<LogOut className="w-4 h-4" />}
              onClick={logout}
              title="Sign Out"
              className="text-[#94A3B8] hover:text-[#EF4444] p-2"
            />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 bg-[#1E293B]/80 backdrop-blur border-b border-[#334155] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="lg:hidden p-2 rounded-control text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#0F172A] border border-[#334155]"
              aria-label="Toggle Navigation Drawer"
            >
              {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Quick Tracking Search Form */}
            <form onSubmit={handleSearchSubmit} className="relative hidden sm:block w-72">
              <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search TRK-... or order ID"
                value={quickSearch}
                onChange={(e) => setQuickSearch(e.target.value)}
                className="w-full h-9 pl-9 pr-3 rounded-control bg-[#0F172A] border border-[#334155] text-xs font-mono text-[#F1F5F9] placeholder-[#64748B] focus:outline-none focus:ring-1 focus:ring-[#2DD4BF]"
              />
            </form>
          </div>

          <div className="flex items-center space-x-3">
            <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-pill text-xs font-medium bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] mr-1.5 animate-pulse" />
              System Operational
            </span>

            <Button
              variant="outline"
              size="sm"
              icon={<LogOut className="w-3.5 h-3.5" />}
              onClick={logout}
              className="text-xs lg:hidden"
            >
              Log Out
            </Button>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileSidebarOpen && (
          <div className="lg:hidden bg-[#1E293B] border-b border-[#334155] px-4 py-4 space-y-3">
            <form onSubmit={handleSearchSubmit} className="relative w-full mb-3">
              <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search tracking # or order ID"
                value={quickSearch}
                onChange={(e) => setQuickSearch(e.target.value)}
                className="w-full h-9 pl-9 pr-3 rounded-control bg-[#0F172A] border border-[#334155] text-xs font-mono text-[#F1F5F9] focus:outline-none focus:ring-1 focus:ring-[#2DD4BF]"
              />
            </form>

            <nav className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileSidebarOpen(false)}
                  className="flex items-center space-x-3 px-3 py-2 rounded-control text-sm font-medium text-[#F1F5F9] hover:bg-[#0F172A]"
                >
                  <span className="text-[#14B8A6]">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            <div className="pt-3 border-t border-[#334155]">
              <a
                href={APP_URLS.CUSTOMER}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2 text-xs text-center text-[#2DD4BF] bg-[#0F172A] rounded-control border border-[#334155] flex items-center justify-center space-x-1"
              >
                <span>Switch to Customer App</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}

        {/* Main Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
