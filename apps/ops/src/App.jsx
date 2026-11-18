import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from '@parcelo/shared/context/AuthContext.jsx';
import { ROLES } from '@parcelo/shared/constants/roles.js';
import { OpsLayout } from './layouts/OpsLayout.jsx';
import { DesignSystemTestPage } from '@parcelo/shared/components/DesignSystemTestPage.jsx';
import { Card } from '@parcelo/shared/components/Card.jsx';
import { Button } from '@parcelo/shared/components/Button.jsx';
import { StatusBadge } from '@parcelo/shared/components/StatusBadge.jsx';
import {
  Clock,
  Truck,
  Package,
  CheckCircle2,
  AlertTriangle,
  Layers,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { APP_URLS } from '@parcelo/shared/constants/appUrls.js';

function OpsOverview() {
  return (
    <div className="space-y-8">
      {/* Overview Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[#F1F5F9]">
            Operations Command Center
          </h1>
          <p className="text-sm text-[#94A3B8] font-body mt-1">
            Phase 1 Admin Portal: Manual status transitions, rider assignments, and proof verification.
          </p>
        </div>

        <Link to="/design-system">
          <Button variant="outline" size="sm" icon={<Layers className="w-4 h-4" />}>
            Open Component Showcase
          </Button>
        </Link>
      </div>

      {/* Status Count Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="bg-[#1E293B] border border-[#334155] rounded-card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase font-mono tracking-wider text-[#94A3B8]">Pending</span>
            <Clock className="w-4 h-4 text-[#F59E0B]" />
          </div>
          <p className="font-heading text-2xl font-bold text-[#F1F5F9]">0</p>
          <span className="text-xs text-[#94A3B8] mt-1 block font-body">Awaiting confirmation</span>
        </div>

        <div className="bg-[#1E293B] border border-[#334155] rounded-card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase font-mono tracking-wider text-[#94A3B8]">In Transit</span>
            <Truck className="w-4 h-4 text-[#3B82F6]" />
          </div>
          <p className="font-heading text-2xl font-bold text-[#F1F5F9]">0</p>
          <span className="text-xs text-[#94A3B8] mt-1 block font-body">En route to hub</span>
        </div>

        <div className="bg-[#1E293B] border border-[#334155] rounded-card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase font-mono tracking-wider text-[#94A3B8]">Out for Delivery</span>
            <Package className="w-4 h-4 text-[#8B5CF6]" />
          </div>
          <p className="font-heading text-2xl font-bold text-[#F1F5F9]">0</p>
          <span className="text-xs text-[#94A3B8] mt-1 block font-body">Rider on way</span>
        </div>

        <div className="bg-[#1E293B] border border-[#334155] rounded-card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase font-mono tracking-wider text-[#94A3B8]">Delivered</span>
            <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
          </div>
          <p className="font-heading text-2xl font-bold text-[#F1F5F9]">0</p>
          <span className="text-xs text-[#94A3B8] mt-1 block font-body">Proof confirmed</span>
        </div>

        <div className="bg-[#1E293B] border border-[#334155] rounded-card p-4 col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase font-mono tracking-wider text-[#94A3B8]">Failed</span>
            <AlertTriangle className="w-4 h-4 text-[#EF4444]" />
          </div>
          <p className="font-heading text-2xl font-bold text-[#F1F5F9]">0</p>
          <span className="text-xs text-[#94A3B8] mt-1 block font-body">Requires reason</span>
        </div>
      </div>

      {/* Step 2 Architecture Verification Card */}
      <Card
        title="Step 2 Architecture &amp; Component Verification"
        subtitle="All shared components, layout frames, and role guards operational"
        action={
          <a href={APP_URLS.CUSTOMER} target="_blank" rel="noreferrer">
            <Button variant="secondary" size="sm" icon={<ExternalLink className="w-3.5 h-3.5" />}>
              Open Customer App
            </Button>
          </a>
        }
      >
        <div className="space-y-4 text-sm text-[#94A3B8] font-body">
          <p>
            The Ops Dashboard layout features a role-reactive sidebar, top bar with tracking search, and shared theme presets from <code className="font-mono text-[#2DD4BF] bg-[#0F172A] px-1.5 py-0.5 rounded border border-[#334155]">@parcelo/shared</code>.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-[#0F172A] border border-[#334155] rounded-card">
              <h4 className="font-heading text-sm font-semibold text-[#F1F5F9] mb-2 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
                <span>Security Boundaries Enforced:</span>
              </h4>
              <ul className="text-xs space-y-1 list-disc pl-4 text-[#94A3B8]">
                <li>Role checks consume custom claims (<code className="font-mono text-[#14B8A6]">role: admin</code>).</li>
                <li>Wrong-app logins trigger <code className="font-mono text-[#14B8A6]">WrongAppNotice</code>.</li>
                <li>All destructive status transitions audited in append-only timeline.</li>
              </ul>
            </div>

            <div className="p-4 bg-[#0F172A] border border-[#334155] rounded-card">
              <h4 className="font-heading text-sm font-semibold text-[#F1F5F9] mb-2 flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#14B8A6]" />
                <span>UI Components Verified:</span>
              </h4>
              <ul className="text-xs space-y-1 list-disc pl-4 text-[#94A3B8]">
                <li>Buttons, Inputs, Selects, Cards, Tables</li>
                <li>Modal Dialogs, Toasts, Tabs, Steppers</li>
                <li>MapView (Leaflet) with OpenStreetMap dark tiles</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider defaultRole={ROLES.ADMIN}>
        <Routes>
          <Route
            path="/"
            element={
              <OpsLayout>
                <OpsOverview />
              </OpsLayout>
            }
          />
          <Route
            path="/design-system"
            element={
              <OpsLayout>
                <DesignSystemTestPage currentApp="ops" />
              </OpsLayout>
            }
          />
          <Route
            path="*"
            element={
              <OpsLayout>
                <OpsOverview />
              </OpsLayout>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
