import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from './Button.jsx';

/**
 * @notice Parcelo Error State Component
 * @dev Enforces actionable error messages that explain what happened and what to do next,
 * accompanied by a mandatory Retry action.
 */
export function ErrorState({
  title = 'Unable to load data',
  message = 'A network or system error occurred. Please check your internet connection and try again.',
  actionLabel = 'Retry loading',
  onRetry = null,
  compact = false,
  className = '',
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center bg-[#1E293B]/40 border border-[#EF4444]/30 rounded-card ${
        compact ? 'p-4' : 'p-8 sm:p-10'
      } ${className}`}
      role="alert"
    >
      <div className="w-12 h-12 rounded-full bg-[#EF4444]/15 border border-[#EF4444]/30 flex items-center justify-center text-[#EF4444] mb-3">
        <AlertTriangle className="w-6 h-6 stroke-[1.8]" />
      </div>

      <h4 className="font-heading text-base font-semibold text-[#F1F5F9] mb-1">
        {title}
      </h4>

      <p className="text-sm text-[#94A3B8] max-w-md font-body mb-5">
        {message}
      </p>

      {onRetry && (
        <Button
          variant="outline"
          size="sm"
          icon={<RefreshCw className="w-3.5 h-3.5" />}
          onClick={onRetry}
          className="border-[#EF4444]/50 text-[#F1F5F9] hover:bg-[#EF4444]/10"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
