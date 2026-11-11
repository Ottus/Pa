import React from 'react';
import { LayoutDashboard, Package, Truck, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck, Clock } from 'lucide-react';

/**
 * @notice Step 1 Boot Screen for Parcelo Ops Admin Dashboard
 * @dev Validates dark dashboard theme, typography, responsive breakpoints, and monorepo shared packages.
 */
export default function App() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-[#F1F5F9] font-body flex flex-col justify-between">
      {/* Top Header Bar */}
      <header className="border-b border-[#334155] bg-[#1E293B]/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-[#3B82F6] flex items-center justify-center text-white shadow-none">
              <LayoutDashboard className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <span className="font-heading font-bold text-xl tracking-tight text-[#F1F5F9]">Parcelo Ops</span>
              <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-[#3B82F6]/10 text-[#60A5FA] border border-[#3B82F6]/30 font-medium">
                Admin Portal
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="http://localhost:3000"
              target="_blank"
              rel="noreferrer"
              className="text-xs sm:text-sm text-[#94A3B8] hover:text-[#2DD4BF] transition-colors flex items-center space-x-1"
            >
              <span>Switch to Customer App</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[#F1F5F9]">
              Operations & Shipment Command
            </h1>
            <p className="text-sm text-[#94A3B8] mt-1">
              Phase 1 Admin Console: Manual status transitions, rider assignments, and proof-of-delivery reviews.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs bg-[#1E293B] border border-[#334155] text-[#2DD4BF]">
              <span className="w-2 h-2 rounded-full bg-[#22C55E] mr-2 animate-pulse"></span>
              Admin Backend Ready
            </span>
          </div>
        </div>

        {/* 5 Status Count Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {/* Pending */}
          <div className="bg-[#1E293B] border border-[#334155] rounded-card p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase font-mono tracking-wider text-[#94A3B8]">Pending</span>
              <Clock className="w-4 h-4 text-[#F59E0B]" />
            </div>
            <p className="font-heading text-2xl font-bold text-[#F1F5F9]">0</p>
            <span className="text-xs text-[#94A3B8] mt-1 block">Awaiting confirmation</span>
          </div>

          {/* In Transit */}
          <div className="bg-[#1E293B] border border-[#334155] rounded-card p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase font-mono tracking-wider text-[#94A3B8]">In Transit</span>
              <Truck className="w-4 h-4 text-[#3B82F6]" />
            </div>
            <p className="font-heading text-2xl font-bold text-[#F1F5F9]">0</p>
            <span className="text-xs text-[#94A3B8] mt-1 block">En route to hub</span>
          </div>

          {/* Out for Delivery */}
          <div className="bg-[#1E293B] border border-[#334155] rounded-card p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase font-mono tracking-wider text-[#94A3B8]">Out for Delivery</span>
              <Package className="w-4 h-4 text-[#8B5CF6]" />
            </div>
            <p className="font-heading text-2xl font-bold text-[#F1F5F9]">0</p>
            <span className="text-xs text-[#94A3B8] mt-1 block">Rider dispatched</span>
          </div>

          {/* Delivered */}
          <div className="bg-[#1E293B] border border-[#334155] rounded-card p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase font-mono tracking-wider text-[#94A3B8]">Delivered</span>
              <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
            </div>
            <p className="font-heading text-2xl font-bold text-[#F1F5F9]">0</p>
            <span className="text-xs text-[#94A3B8] mt-1 block">Proof photo confirmed</span>
          </div>

          {/* Failed */}
          <div className="bg-[#1E293B] border border-[#334155] rounded-card p-4 col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase font-mono tracking-wider text-[#94A3B8]">Failed</span>
              <AlertTriangle className="w-4 h-4 text-[#EF4444]" />
            </div>
            <p className="font-heading text-2xl font-bold text-[#F1F5F9]">0</p>
            <span className="text-xs text-[#94A3B8] mt-1 block">Requires admin action</span>
          </div>
        </div>

        {/* Verification Details */}
        <div className="bg-[#1E293B] border border-[#334155] rounded-card p-6">
          <h2 className="font-heading text-lg font-semibold text-[#F1F5F9] mb-4 flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-[#22C55E]" />
            <span>Monorepo & Shared Preset Architecture</span>
          </h2>
          <p className="text-sm text-[#94A3B8] leading-relaxed mb-4">
            The Ops Dashboard imports shared design tokens, constants, and utilities directly from <code className="font-mono text-[#2DD4BF] bg-[#0F172A] px-2 py-0.5 rounded border border-[#334155]">@parcelo/shared</code>. Both apps run concurrently with zero cross-app network coupling.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-3 bg-[#0F172A] rounded border border-[#334155]">
              <span className="text-[#64748B] block mb-1">CUSTOMER APPLICATION</span>
              <span className="text-[#2DD4BF]">http://localhost:3000</span>
            </div>
            <div className="p-3 bg-[#0F172A] rounded border border-[#334155]">
              <span className="text-[#64748B] block mb-1">OPERATIONS DASHBOARD</span>
              <span className="text-[#60A5FA]">http://localhost:3001</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#334155] py-6 text-center text-xs text-[#64748B]">
        <p>Parcelo Ops Command &middot; Admin Role &middot; Strict Security Rules & Cloud Functions Backend</p>
      </footer>
    </div>
  );
}
