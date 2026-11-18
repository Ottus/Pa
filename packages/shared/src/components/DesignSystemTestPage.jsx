import React, { useState } from 'react';
import {
  Package,
  Truck,
  CheckCircle2,
  AlertTriangle,
  Info,
  MapPin,
  Search,
  RefreshCw,
  Eye,
  Shield,
  Layers,
  Send,
} from 'lucide-react';
import { Button } from './Button.jsx';
import { Input } from './Input.jsx';
import { Select } from './Select.jsx';
import { Card } from './Card.jsx';
import { StatusBadge } from './StatusBadge.jsx';
import { Table } from './Table.jsx';
import { Modal } from './Modal.jsx';
import { Toast, ToastContainer } from './Toast.jsx';
import { Tabs } from './Tabs.jsx';
import { Timeline } from './Timeline.jsx';
import { Stepper } from './Stepper.jsx';
import { MapView } from './MapView.jsx';
import { Skeleton } from './Skeleton.jsx';
import { EmptyState } from './EmptyState.jsx';
import { ErrorState } from './ErrorState.jsx';
import { RoleGuard } from './RoleGuard.jsx';
import { WrongAppNotice } from './WrongAppNotice.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { ROLES } from '../constants/roles.js';
import { SHIPMENT_STATUS } from '../constants/statuses.js';
import { formatCurrency, formatWeight, formatDistance } from '../utils/formatters.js';

/**
 * @notice Design System Component Showcase
 * @dev Live interactive test page rendering and asserting every single shared component.
 */
export function DesignSystemTestPage({ currentApp = 'customer' }) {
  const { user, role, switchDemoRole } = useAuth();

  // Component state toggles
  const [modalOpen, setModalOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [activeTab, setActiveTab] = useState('components');
  const [activeStep, setActiveStep] = useState(2);
  const [tableLoading, setTableLoading] = useState(false);
  const [inputVal, setInputVal] = useState('TRK-9X4KM2P7WQ');
  const [inputError, setInputError] = useState('');
  const [roleGuardMode, setRoleGuardMode] = useState(role || ROLES.CUSTOMER);

  const addToast = (type, message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Mock table sample data
  const sampleTableData = [
    {
      id: 'ORD-101',
      trackingNumber: 'TRK-ABC789XYZ2',
      destination: 'Lekki Phase 1, Lagos',
      price: 3900,
      status: SHIPMENT_STATUS.IN_TRANSIT,
    },
    {
      id: 'ORD-102',
      trackingNumber: 'TRK-XYZ1234567',
      destination: 'Ikeja GRA, Lagos',
      price: 2400,
      status: SHIPMENT_STATUS.DELIVERED,
    },
    {
      id: 'ORD-103',
      trackingNumber: 'TRK-9900AABBCC',
      destination: 'Victoria Island, Lagos',
      price: 5100,
      status: SHIPMENT_STATUS.PENDING,
    },
  ];

  const tableColumns = [
    { header: 'Order ID', key: 'id', render: (r) => <span className="font-mono text-xs">{r.id}</span> },
    {
      header: 'Tracking Number',
      key: 'trackingNumber',
      render: (r) => (
        <span className="font-mono text-xs text-[#2DD4BF] bg-[#14B8A6]/10 px-2 py-0.5 rounded">
          {r.trackingNumber}
        </span>
      ),
    },
    { header: 'Destination', key: 'destination', accessor: 'destination' },
    { header: 'Price', key: 'price', render: (r) => <span className="font-semibold">{formatCurrency(r.price)}</span> },
    {
      header: 'Status',
      key: 'status',
      render: (r) => <StatusBadge status={r.status} />,
    },
  ];

  const mockTimelineEvents = [
    {
      id: 'evt-3',
      status: 'Out for Delivery',
      timestamp: new Date(Date.now() - 3600000),
      note: 'Driver assigned. Package dispatched from Ikeja Central Hub.',
      changedBy: 'Admin (manual)',
    },
    {
      id: 'evt-2',
      status: 'In Transit',
      timestamp: new Date(Date.now() - 14400000),
      note: 'Package received at transit sorting center.',
      changedBy: 'System',
    },
    {
      id: 'evt-1',
      status: 'Pending',
      timestamp: new Date(Date.now() - 86400000),
      note: 'Delivery booked by customer. Payment on delivery selected.',
      changedBy: 'Customer',
    },
  ];

  return (
    <div className="space-y-12 pb-16">
      {/* Header Banner */}
      <div className="border-b border-[#334155] pb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-[#14B8A6]/10 text-[#2DD4BF] border border-[#14B8A6]/30 text-xs font-mono mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>Step 2 Verification &middot; Shared Design System Test Harness</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#F1F5F9]">
            Parcelo Component Suite & Design System
          </h1>
          <p className="text-sm text-[#94A3B8] font-body mt-1">
            Validating every design token, UI control, responsive state, and role boundary.
          </p>
        </div>

        {/* Demo Role Switcher Toolbar */}
        <div className="bg-[#1E293B] border border-[#334155] rounded-card p-3 flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono uppercase text-[#94A3B8] flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-[#14B8A6]" />
            <span>Active Role:</span>
          </span>
          <Button
            variant={role === ROLES.CUSTOMER ? 'primary' : 'outline'}
            size="sm"
            onClick={() => switchDemoRole(ROLES.CUSTOMER)}
          >
            Customer
          </Button>
          <Button
            variant={role === ROLES.ADMIN ? 'primary' : 'outline'}
            size="sm"
            onClick={() => switchDemoRole(ROLES.ADMIN)}
          >
            Admin
          </Button>
          <Button
            variant={role === ROLES.DISPATCHER ? 'primary' : 'outline'}
            size="sm"
            onClick={() => switchDemoRole(ROLES.DISPATCHER)}
          >
            Dispatcher (P2)
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => switchDemoRole(null)}
            className="text-xs text-[#EF4444]"
          >
            Guest (Sign Out)
          </Button>
        </div>
      </div>

      {/* 1. BUTTONS SECTION */}
      <section className="space-y-4">
        <h2 className="font-heading text-xl font-semibold text-[#F1F5F9] border-b border-[#334155] pb-2">
          1. Buttons (44px height, 8px radius, verb-first)
        </h2>
        <div className="flex flex-wrap gap-3 items-center">
          <Button variant="primary">Confirm booking</Button>
          <Button variant="secondary">View tracking</Button>
          <Button variant="danger">Cancel shipment</Button>
          <Button variant="outline">Print receipt</Button>
          <Button variant="ghost">Close window</Button>
          <Button variant="primary" loading>
            Saving quote...
          </Button>
          <Button variant="primary" disabled>
            Disabled action
          </Button>
          <Button variant="primary" size="sm">
            Small (36px)
          </Button>
          <Button variant="primary" size="lg">
            Large (52px)
          </Button>
        </div>
      </section>

      {/* 2. FORM INPUTS & CONTROLS */}
      <section className="space-y-4">
        <h2 className="font-heading text-xl font-semibold text-[#F1F5F9] border-b border-[#334155] pb-2">
          2. Form Controls (Input &amp; Select)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Input
            label="Tracking Number"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            hint="Format: TRK- followed by 10 characters"
            icon={<Search className="w-4 h-4" />}
          />

          <Input
            label="Pickup Address"
            placeholder="e.g. 15 Admiralty Way, Lekki"
            error={inputError || 'Please enter a valid street address'}
            icon={<MapPin className="w-4 h-4" />}
          />

          <Select
            label="Package Size"
            hint="Determines vehicle and size factor"
            options={[
              { value: 'small', label: 'Small (Up to 5 kg)' },
              { value: 'medium', label: 'Medium (5–15 kg)' },
              { value: 'large', label: 'Large (15+ kg)' },
            ]}
          />
        </div>
      </section>

      {/* 3. STATUS BADGES */}
      <section className="space-y-4">
        <h2 className="font-heading text-xl font-semibold text-[#F1F5F9] border-b border-[#334155] pb-2">
          3. Status Badges (Pill-shaped, word + dot)
        </h2>
        <div className="flex flex-wrap gap-3 items-center">
          <StatusBadge status="Pending" />
          <StatusBadge status="In Transit" />
          <StatusBadge status="Out for Delivery" />
          <StatusBadge status="Delivered" />
          <StatusBadge status="Failed" />
          <StatusBadge status="Cancelled" />
          <StatusBadge status="Paid" />
          <StatusBadge status="Unpaid" />
        </div>
      </section>

      {/* 4. CARDS & SURFACE PANELS */}
      <section className="space-y-4">
        <h2 className="font-heading text-xl font-semibold text-[#F1F5F9] border-b border-[#334155] pb-2">
          4. Surface Cards (12px radius, 1px border #334155, zero shadow)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card
            title="Instant Delivery Quote"
            subtitle="Guaranteed for 15 minutes"
            action={<Button size="sm" variant="secondary">Recalculate</Button>}
          >
            <div className="space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-sm text-[#94A3B8]">Calculated Price:</span>
                <span className="font-heading font-bold text-3xl text-[#14B8A6]">
                  ₦3,900
                </span>
              </div>
              <p className="text-xs text-[#94A3B8]">
                Based on 12.0 km estimated road distance and 3.0 kg medium package factor.
              </p>
            </div>
          </Card>

          <Card title="Quick Order Summary">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">Weight:</span>
                <span className="font-mono text-[#F1F5F9]">{formatWeight(3.0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">Est. Distance:</span>
                <span className="font-mono text-[#F1F5F9]">{formatDistance(12.0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">Payment Method:</span>
                <span className="text-[#F1F5F9]">Pay on Delivery</span>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* 5. TABLE WITH SKELETON & EMPTY TOGGLES */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#334155] pb-2">
          <h2 className="font-heading text-xl font-semibold text-[#F1F5F9]">
            5. Data Table (Dividers, uppercase header, states)
          </h2>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setTableLoading(!tableLoading)}
          >
            {tableLoading ? 'Show Loaded Table' : 'Toggle Skeleton State'}
          </Button>
        </div>
        <Card bodyClassName="p-0">
          <Table
            columns={tableColumns}
            data={sampleTableData}
            loading={tableLoading}
          />
        </Card>
      </section>

      {/* 6. STEPPER WIZARD */}
      <section className="space-y-4">
        <h2 className="font-heading text-xl font-semibold text-[#F1F5F9] border-b border-[#334155] pb-2">
          6. Booking Stepper (3-step visual progress)
        </h2>
        <div className="p-6 bg-[#1E293B] border border-[#334155] rounded-card space-y-6">
          <Stepper currentStep={activeStep} />
          <div className="flex justify-center gap-3 pt-2">
            <Button
              size="sm"
              variant="outline"
              disabled={activeStep === 1}
              onClick={() => setActiveStep((s) => Math.max(1, s - 1))}
            >
              Previous Step
            </Button>
            <Button
              size="sm"
              variant="primary"
              disabled={activeStep === 3}
              onClick={() => setActiveStep((s) => Math.min(3, s + 1))}
            >
              Next Step
            </Button>
          </div>
        </div>
      </section>

      {/* 7. INTERACTIVE LEAFLET MAP VIEW */}
      <section className="space-y-4">
        <h2 className="font-heading text-xl font-semibold text-[#F1F5F9] border-b border-[#334155] pb-2">
          7. MapView (Leaflet + Dark Tiles + Pins + Polyline)
        </h2>
        <Card bodyClassName="p-3">
          <MapView
            center={[6.5244, 3.3792]}
            zoom={11}
            pickupCoords={[6.4474, 3.4723]} // Lekki
            dropoffCoords={[6.6018, 3.3515]} // Ikeja
            height="340px"
          />
          <p className="text-xs text-[#94A3B8] font-body mt-2 text-center">
            Demonstrating Pickup (Teal Pin) and Drop-off (Purple Pin) connected by route polyline.
          </p>
        </Card>
      </section>

      {/* 8. TIMELINE */}
      <section className="space-y-4">
        <h2 className="font-heading text-xl font-semibold text-[#F1F5F9] border-b border-[#334155] pb-2">
          8. Shipment Timeline (Chronological Audit Trail)
        </h2>
        <Card>
          <Timeline events={mockTimelineEvents} />
        </Card>
      </section>

      {/* 9. MODAL, TOASTS & TABS */}
      <section className="space-y-4">
        <h2 className="font-heading text-xl font-semibold text-[#F1F5F9] border-b border-[#334155] pb-2">
          9. Interactive Dialogs &amp; Feedback (Modal &amp; Toast)
        </h2>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary" onClick={() => setModalOpen(true)}>
            Open Sample Modal
          </Button>
          <Button
            variant="outline"
            onClick={() => addToast('success', 'Booking confirmed! Tracking number TRK-9X4KM2P7WQ.')}
          >
            Trigger Success Toast
          </Button>
          <Button
            variant="outline"
            onClick={() => addToast('error', 'Quote expired after 15 minutes. Please refresh.')}
          >
            Trigger Error Toast
          </Button>
          <Button
            variant="outline"
            onClick={() => addToast('info', 'Package status updated to Out for Delivery.')}
          >
            Trigger Info Toast
          </Button>
        </div>

        {/* Modal Instance */}
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Confirm Delivery Booking"
          subtitle="Quote valid for 15 minutes"
          footer={
            <>
              <Button variant="ghost" size="sm" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setModalOpen(false);
                  addToast('success', 'Booking confirmed successfully!');
                }}
              >
                Confirm booking
              </Button>
            </>
          }
        >
          <p className="text-[#94A3B8] leading-relaxed mb-4">
            You are about to book a package delivery from Lekki to Ikeja. Total fee is <strong className="text-[#14B8A6]">₦3,900</strong> payable on delivery.
          </p>
          <div className="p-3 bg-[#0F172A] rounded border border-[#334155] font-mono text-xs text-[#2DD4BF]">
            Quote ID: QTE-992817462
          </div>
        </Modal>
      </section>

      {/* 10. EMPTY STATE & ERROR STATE */}
      <section className="space-y-4">
        <h2 className="font-heading text-xl font-semibold text-[#F1F5F9] border-b border-[#334155] pb-2">
          10. List States (Empty State &amp; Error State with Retry)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <EmptyState
              title="No shipments found"
              message="You haven't placed any delivery requests yet. Start your first delivery now."
              actionLabel="Book a delivery"
              onAction={() => addToast('info', 'Redirecting to booking...')}
            />
          </Card>

          <ErrorState
            title="Failed to fetch quote"
            message="Server pricing service was temporarily unreachable. Check your network connection."
            actionLabel="Retry quote calculation"
            onRetry={() => addToast('info', 'Retrying pricing calculation...')}
          />
        </div>
      </section>

      {/* 11. ROLE GUARD & WRONG APP NOTICE PREVIEW */}
      <section className="space-y-4">
        <h2 className="font-heading text-xl font-semibold text-[#F1F5F9] border-b border-[#334155] pb-2">
          11. Security Boundary Guards (RoleGuard &amp; WrongAppNotice)
        </h2>
        <Card title="Live Portal Boundary Guard">
          <p className="text-sm text-[#94A3B8] mb-4">
            Current user role is: <strong className="text-[#2DD4BF] uppercase">{role || 'None (Guest)'}</strong>.
            The panel below enforces role protection:
          </p>

          <RoleGuard
            allowedRoles={[ROLES.ADMIN]}
            expectedApp={currentApp}
          >
            <div className="p-4 bg-[#22C55E]/10 border border-[#22C55E]/30 rounded text-sm text-[#22C55E]">
              ✔ Access Granted: You possess the <strong>ADMIN</strong> custom claim. Protected administrative controls are visible.
            </div>
          </RoleGuard>
        </Card>
      </section>

      {/* Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}
