import React, { useEffect } from 'react';
import { X } from 'lucide-react';

/**
 * @notice Parcelo Modal Dialog Component
 * @dev Accessible modal with backdrop blur, dark surface container, and keyboard escape dismiss.
 */
export function Modal({
  isOpen = false,
  onClose,
  title,
  subtitle,
  children,
  footer,
  maxWidth = 'max-w-lg',
  className = '',
}) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0F172A]/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog Card */}
      <div
        role="dialog"
        aria-modal="true"
        className={`relative w-full ${maxWidth} bg-[#1E293B] border border-[#334155] rounded-card shadow-2xl z-10 overflow-hidden transform transition-all ${className}`}
      >
        {/* Header */}
        {(title || subtitle) && (
          <div className="px-5 py-4 border-b border-[#334155] flex items-center justify-between">
            <div>
              {title && (
                <h3 className="font-heading text-lg font-semibold text-[#F1F5F9]">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-xs sm:text-sm text-[#94A3B8] font-body mt-0.5">
                  {subtitle}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-control text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#0F172A] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2DD4BF]"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Body */}
        <div className="p-5 max-h-[75vh] overflow-y-auto font-body text-sm text-[#F1F5F9]">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="px-5 py-3.5 border-t border-[#334155] bg-[#0F172A]/40 flex items-center justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
