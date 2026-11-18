import React from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { Skeleton } from './Skeleton.jsx';
import { WrongAppNotice } from './WrongAppNotice.jsx';

/**
 * @notice Parcelo Role Guard Route Protector
 * @dev Client-side route and component guard based on Firebase custom claims.
 * (Note: Server-side Firestore rules and Cloud Functions provide true security boundaries).
 *
 * @param {Object} props
 * @param {string[]} props.allowedRoles Array of allowed roles (e.g. ['admin'])
 * @param {string} [props.expectedApp='customer'] 'customer' | 'ops'
 * @param {React.ReactNode} [props.fallback] Custom fallback component
 * @param {React.ReactNode} props.children
 */
export function RoleGuard({
  allowedRoles = [],
  expectedApp = 'customer',
  fallback = null,
  children,
}) {
  const { user, role, loading, logout } = useAuth();

  if (loading) {
    return (
      <div className="p-8 max-w-4xl mx-auto space-y-4">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  // If not signed in at all
  if (!user) {
    if (fallback) return fallback;
    return (
      <div className="min-h-[50vh] flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-[#94A3B8] font-body text-sm mb-4">
            You must be logged in to view this section.
          </p>
          <a
            href="/login"
            className="inline-flex h-control px-6 rounded-control bg-[#14B8A6] text-[#0F172A] font-semibold text-sm items-center justify-center hover:bg-[#2DD4BF]"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  // If role is not allowed
  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    if (fallback) return fallback;
    return (
      <WrongAppNotice
        userRole={role}
        expectedApp={expectedApp}
        onSignOut={logout}
      />
    );
  }

  return <>{children}</>;
}
