import React from 'react';
import { Package, ShieldCheck, Compass, ArrowRight, Layers } from 'lucide-react';

/**
 * @notice Step 1 Boot Screen for Parcelo Customer App
 * @dev Validates dark dashboard theme, typography, responsive breakpoints, and monorepo shared packages.
 */
export default function App() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-[#F1F5F9] font-body flex flex-col justify-between">
      {/* Top Navigation Bar */}
      <header className="border-b border-[#334155] bg-[#1E293B]/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-[#14B8A6] flex items-center justify-center text-[#0F172A] shadow-none">
              <Package className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <span className="font-heading font-bold text-xl tracking-tight text-[#F1F5F9]">Parcelo</span>
              <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-[#14B8A6]/10 text-[#2DD4BF] border border-[#14B8A6]/30 font-medium">
                Customer App
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="http://localhost:3001"
              target="_blank"
              rel="noreferrer"
              className="text-xs sm:text-sm text-[#94A3B8] hover:text-[#2DD4BF] transition-colors flex items-center space-x-1"
            >
              <span>Switch to Ops Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12 flex flex-col items-center justify-center text-center">
        {/* Step 1 Scaffold Pill */}
        <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#1E293B] border border-[#334155] text-xs text-[#94A3B8] mb-6">
          <Layers className="w-4 h-4 text-[#14B8A6]" />
          <span>Step 1 Verified &middot; Monorepo Scaffolding & Shared Dark Theme Active</span>
        </div>

        {/* Hero Title */}
        <h1 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-[#F1F5F9] max-w-2xl mb-4">
          Next-Generation <span className="text-[#14B8A6]">Logistics & Delivery</span> Platform
        </h1>

        <p className="text-base sm:text-lg text-[#94A3B8] max-w-xl mb-8">
          Reliable package delivery with 3-step instant booking, real-time live tracking, and tamper-proof verification.
        </p>

        {/* Theme & Typography Verification Card */}
        <div className="w-full max-w-xl bg-[#1E293B] border border-[#334155] rounded-card p-6 text-left mb-8">
          <h2 className="font-heading text-lg font-semibold text-[#F1F5F9] mb-4 flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-[#22C55E]" />
            <span>Theme & Typography Verification Checklist</span>
          </h2>

          <div className="space-y-3 text-sm text-[#94A3B8]">
            <div className="flex items-center justify-between p-2 rounded bg-[#0F172A] border border-[#334155]">
              <span className="font-medium text-[#F1F5F9]">Headings (Space Grotesk)</span>
              <span className="font-heading font-bold text-[#14B8A6]">Space Grotesk 700</span>
            </div>

            <div className="flex items-center justify-between p-2 rounded bg-[#0F172A] border border-[#334155]">
              <span className="font-medium text-[#F1F5F9]">Body Text (IBM Plex Sans)</span>
              <span className="font-body text-[#94A3B8]">IBM Plex Sans 400</span>
            </div>

            <div className="flex items-center justify-between p-2 rounded bg-[#0F172A] border border-[#334155]">
              <span className="font-medium text-[#F1F5F9]">Tracking ID (IBM Plex Mono)</span>
              <span className="font-mono text-[#2DD4BF] bg-[#14B8A6]/10 px-2 py-0.5 rounded">
                TRK-ABC789XYZ2
              </span>
            </div>

            {/* Status Color Pills */}
            <div className="pt-2">
              <span className="text-xs uppercase tracking-wider text-[#64748B] block mb-2 font-mono">
                Status Palette
              </span>
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 rounded-pill text-xs font-semibold bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/30">
                  Pending
                </span>
                <span className="px-2.5 py-1 rounded-pill text-xs font-semibold bg-[#3B82F6]/20 text-[#3B82F6] border border-[#3B82F6]/30">
                  In Transit
                </span>
                <span className="px-2.5 py-1 rounded-pill text-xs font-semibold bg-[#8B5CF6]/20 text-[#8B5CF6] border border-[#8B5CF6]/30">
                  Out for Delivery
                </span>
                <span className="px-2.5 py-1 rounded-pill text-xs font-semibold bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/30">
                  Delivered
                </span>
                <span className="px-2.5 py-1 rounded-pill text-xs font-semibold bg-[#EF4444]/20 text-[#EF4444] border border-[#EF4444]/30">
                  Failed
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button Preview */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button className="h-control px-6 rounded-control bg-[#14B8A6] hover:bg-[#2DD4BF] active:bg-[#0D9488] text-[#0F172A] font-semibold text-base transition-colors flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-[#2DD4BF] focus:ring-offset-2 focus:ring-offset-[#0F172A]">
            <span>Book a Delivery</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href="http://localhost:3001"
            className="h-control px-6 rounded-control bg-transparent hover:bg-[#1E293B] border border-[#14B8A6] text-[#14B8A6] font-semibold text-base transition-colors flex items-center justify-center space-x-2"
          >
            <Compass className="w-4 h-4" />
            <span>Open Ops Dashboard</span>
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#334155] py-6 text-center text-xs text-[#64748B]">
        <p>Parcelo Logistics Suite &middot; Phase 1 React + Vite Monorepo &middot; Built phone-first (360px+)</p>
      </footer>
    </div>
  );
}

