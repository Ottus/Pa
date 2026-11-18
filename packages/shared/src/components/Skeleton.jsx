import React from 'react';

/**
 * @notice Parcelo Loading Skeleton Component
 * @dev High contrast slate placeholder with smooth pulse animation.
 */
export function Skeleton({ className = '', rounded = 'rounded-control' }) {
  return (
    <div
      className={`bg-[#334155]/60 animate-pulse ${rounded} ${className}`}
      aria-hidden="true"
    />
  );
}
