import React from 'react';

/**
 * @notice Parcelo Surface Card Component
 * @dev Enforces 12px rounded corners, 1px #334155 border, zero drop shadow,
 * and responsive 16px/20px padding according to Section 4 of the Blueprint.
 */
export function Card({
  children,
  title,
  subtitle,
  action,
  className = '',
  bodyClassName = '',
  headerClassName = '',
  ...props
}) {
  const hasHeader = title || subtitle || action;

  return (
    <div
      className={`bg-[#1E293B] border border-[#334155] rounded-card overflow-hidden transition-colors ${className}`}
      {...props}
    >
      {hasHeader && (
        <div
          className={`px-4 sm:px-5 py-4 border-b border-[#334155] flex items-center justify-between gap-4 ${headerClassName}`}
        >
          <div>
            {title && (
              <h3 className="font-heading text-lg font-semibold text-[#F1F5F9] tracking-tight">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs sm:text-sm text-[#94A3B8] font-body mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
          {action && <div className="flex-shrink-0">{action}</div>}
        </div>
      )}

      <div className={`p-4 sm:p-5 ${bodyClassName}`}>{children}</div>
    </div>
  );
}
