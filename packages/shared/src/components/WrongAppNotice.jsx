import React from 'react';
import { AlertCircle, ExternalLink, ArrowRight } from 'lucide-react';
import { Button } from './Button.jsx';
import { APP_URLS } from '../constants/appUrls.js';

/**
 * @notice Wrong Application Notice Component
 * @dev Rendered when a customer accesses the Ops Dashboard, or an admin/staff logs into
 * the customer app, or when an unsupported role (e.g. dispatcher in Phase 1) signs in.
 */
export function WrongAppNotice({
  userRole = 'customer',
  expectedApp = 'ops', // 'ops' or 'customer'
  onSignOut,
}) {
  const isCustomerOnOps = userRole === 'customer' && expectedApp === 'ops';
  const isAdminOnCustomer = userRole === 'admin' && expectedApp === 'customer';
  const isDispatcher = userRole === 'dispatcher';

  let title = 'Access Restricted: Wrong Portal';
  let message =
    'You are logged in with an account that belongs to a different portal. Please navigate to the appropriate application.';
  let targetUrl = APP_URLS.CUSTOMER;
  let targetLabel = 'Go to Customer Portal';

  if (isCustomerOnOps) {
    title = 'Customer Account Detected';
    message =
      'You are currently signed in as a Customer. The Operations Dashboard is reserved exclusively for logistics personnel and administrators.';
    targetUrl = APP_URLS.CUSTOMER;
    targetLabel = 'Go to Customer Booking & Tracking';
  } else if (isAdminOnCustomer) {
    title = 'Staff Account Detected';
    message =
      'You are currently signed in with an Operations Admin account. Access the Operations Dashboard to manage orders, update statuses, and review proofs.';
    targetUrl = APP_URLS.OPS;
    targetLabel = 'Switch to Operations Dashboard';
  } else if (isDispatcher) {
    title = 'Role Available in Phase 2';
    message =
      'Dispatcher and driver workflows activate in Phase 2 of Parcelo. In Phase 1, all operations are managed by Operations Admins.';
    targetUrl = APP_URLS.CUSTOMER;
    targetLabel = 'Return to Public Portal';
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#1E293B] border border-[#334155] rounded-card p-6 sm:p-8 text-center shadow-xl">
        <div className="w-14 h-14 rounded-full bg-[#F59E0B]/15 border border-[#F59E0B]/30 text-[#F59E0B] flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-7 h-7 stroke-[2]" />
        </div>

        <h3 className="font-heading text-xl font-bold text-[#F1F5F9] mb-2">
          {title}
        </h3>

        <p className="text-sm text-[#94A3B8] font-body leading-relaxed mb-6">
          {message}
        </p>

        <div className="space-y-3">
          <a
            href={targetUrl}
            className="w-full h-control px-4 rounded-control bg-[#14B8A6] hover:bg-[#2DD4BF] active:bg-[#0D9488] text-[#0F172A] font-semibold text-sm transition-colors flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-[#2DD4BF]"
          >
            <span>{targetLabel}</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          {onSignOut && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onSignOut}
              className="w-full text-xs text-[#94A3B8] hover:text-[#EF4444]"
            >
              Sign Out of Current Account
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
