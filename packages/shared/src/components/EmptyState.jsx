import React from 'react';
import { PackageOpen } from 'lucide-react';
import { Button } from './Button.jsx';

/**
 * @notice Parcelo Empty State Component
 * @dev Displayed when lists or queries return zero results.
 */
export function EmptyState({
  icon = null,
  title = 'No items found',
  message = 'Get started by creating a new booking or modifying your filters.',
  actionLabel = null,
  onAction = null,
  compact = false,
  className = '',
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center ${
        compact ? 'py-6 px-4' : 'py-12 px-6'
      } ${className}`}
    >
      <div className="w-12 h-12 rounded-full bg-[#1E293B] border border-[#334155] flex items-center justify-center text-[#94A3B8] mb-3">
        {icon || <PackageOpen className="w-6 h-6 stroke-[1.5]" />}
      </div>

      <h4 className="font-heading text-base font-semibold text-[#F1F5F9] mb-1">
        {title}
      </h4>

      <p className="text-sm text-[#94A3B8] max-w-sm font-body mb-4">
        {message}
      </p>

      {actionLabel && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
