import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

/**
 * @notice Parcelo Toast Notification Component
 * @dev Floats at top-right or bottom-center on mobile screens.
 */
export function Toast({
  type = 'info',
  message,
  onDismiss,
  className = '',
}) {
  if (!message) return null;

  const typeConfig = {
    success: {
      icon: <CheckCircle2 className="w-5 h-5 text-[#22C55E]" />,
      border: 'border-[#22C55E]/40',
      bg: 'bg-[#1E293B]',
    },
    error: {
      icon: <AlertCircle className="w-5 h-5 text-[#EF4444]" />,
      border: 'border-[#EF4444]/40',
      bg: 'bg-[#1E293B]',
    },
    info: {
      icon: <Info className="w-5 h-5 text-[#14B8A6]" />,
      border: 'border-[#14B8A6]/40',
      bg: 'bg-[#1E293B]',
    },
    warning: {
      icon: <AlertCircle className="w-5 h-5 text-[#F59E0B]" />,
      border: 'border-[#F59E0B]/40',
      bg: 'bg-[#1E293B]',
    },
  };

  const current = typeConfig[type] || typeConfig.info;

  return (
    <div
      role="status"
      className={`flex items-start gap-3 p-4 rounded-card border shadow-lg max-w-sm w-full ${current.bg} ${current.border} ${className}`}
    >
      <div className="flex-shrink-0 mt-0.5">{current.icon}</div>
      <div className="flex-1 text-sm font-body text-[#F1F5F9] leading-snug">
        {message}
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="text-[#94A3B8] hover:text-[#F1F5F9] transition-colors p-1 rounded focus:outline-none focus:ring-1 focus:ring-[#2DD4BF]"
          aria-label="Dismiss toast"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

/**
 * @notice Toast Container for positioning multiple active toasts
 */
export function ToastContainer({ toasts = [], onDismiss }) {
  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full px-4 sm:px-0 pointer-events-none">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <Toast
            type={toast.type}
            message={toast.message}
            onDismiss={() => onDismiss && onDismiss(toast.id)}
          />
        </div>
      ))}
    </div>
  );
}
