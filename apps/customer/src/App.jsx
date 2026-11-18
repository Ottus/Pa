import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from '@parcelo/shared/context/AuthContext.jsx';
import { ROLES } from '@parcelo/shared/constants/roles.js';
import { PublicLayout } from './layouts/PublicLayout.jsx';
import { CustomerLayout } from './layouts/CustomerLayout.jsx';
import { DesignSystemTestPage } from '@parcelo/shared/components/DesignSystemTestPage.jsx';
import { Button } from '@parcelo/shared/components/Button.jsx';
import { Package, ArrowRight, ShieldCheck, Layers, Compass } from 'lucide-react';
import { APP_URLS } from '@parcelo/shared/constants/appUrls.js';

function CustomerHome() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-6 sm:py-12">
      <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#1E293B] border border-[#334155] text-xs text-[#94A3B8] mb-6">
        <Layers className="w-4 h-4 text-[#14B8A6]" />
        <span>Step 2 Verified &middot; Shared Components &amp; Layouts Active</span>
      </div>

      <h1 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-[#F1F5F9] max-w-2xl mb-4">
        Next-Generation <span className="text-[#14B8A6]">Logistics & Delivery</span> Platform
      </h1>

      <p className="text-base sm:text-lg text-[#94A3B8] max-w-xl mb-8 font-body">
        Seamless package booking, real-time live tracking, and tamper-proof delivery verification across Nigeria.
      </p>

      <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto mb-10">
        <Link to="/design-system">
          <Button variant="primary" icon={<Layers className="w-4 h-4" />}>
            Open Component Showcase
          </Button>
        </Link>
        <a href={APP_URLS.OPS} target="_blank" rel="noreferrer">
          <Button variant="outline" icon={<Compass className="w-4 h-4" />}>
            Switch to Ops Dashboard
          </Button>
        </a>
      </div>

      {/* Quick Summary Card */}
      <div className="w-full max-w-xl bg-[#1E293B] border border-[#334155] rounded-card p-6 text-left">
        <h3 className="font-heading text-base font-semibold text-[#F1F5F9] mb-3 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#22C55E]" />
          <span>Step 2 Deliverables Active:</span>
        </h3>
        <ul className="space-y-2 text-sm text-[#94A3B8] font-body list-disc pl-5">
          <li>17 Shared Components in <code className="font-mono text-[#2DD4BF]">@parcelo/shared</code></li>
          <li>Authentication Context with custom claims and demo role switcher</li>
          <li>Responsive <code className="font-mono text-[#2DD4BF]">PublicLayout</code> and <code className="font-mono text-[#2DD4BF]">CustomerLayout</code></li>
          <li>Interactive Component Test Harness at <Link to="/design-system" className="text-[#14B8A6] underline">/design-system</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider defaultRole={ROLES.CUSTOMER}>
        <Routes>
          <Route
            path="/"
            element={
              <PublicLayout>
                <CustomerHome />
              </PublicLayout>
            }
          />
          <Route
            path="/design-system"
            element={
              <PublicLayout>
                <DesignSystemTestPage currentApp="customer" />
              </PublicLayout>
            }
          />
          <Route
            path="*"
            element={
              <PublicLayout>
                <CustomerHome />
              </PublicLayout>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
