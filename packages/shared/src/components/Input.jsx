import React, { forwardRef } from 'react';
import { AlertCircle } from 'lucide-react';

/**
 * @notice Parcelo Text Input Component
 * @dev Enforces 8px rounded corners, dark container styling (#0F172A on #1E293B surface),
 * 1px #334155 border, electric teal focus ring, and actionable error messages.
 */
export const Input = forwardRef(function Input(
  {
    label,
    error,
    hint,
    icon = null,
    className = '',
    containerClassName = '',
    id,
    type = 'text',
    disabled = false,
    required = false,
    ...props
  },
  ref
) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={`w-full flex flex-col space-y-1.5 ${containerClassName}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-medium font-body uppercase tracking-wider text-[#94A3B8] flex items-center justify-between"
        >
          <span>
            {label}
            {required && <span className="text-[#EF4444] ml-1">*</span>}
          </span>
        </label>
      )}

      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-3.5 pointer-events-none text-[#94A3B8]">
            {icon}
          </div>
        )}

        <input
          ref={ref}
          id={inputId}
          type={type}
          disabled={disabled}
          className={`w-full h-control rounded-control bg-[#0F172A] border text-base text-[#F1F5F9] font-body transition-colors duration-150 placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#2DD4BF] focus:ring-offset-2 focus:ring-offset-[#0F172A] disabled:opacity-50 disabled:bg-[#1E293B] disabled:cursor-not-allowed ${
            icon ? 'pl-11 pr-4' : 'px-4'
          } ${
            error
              ? 'border-[#EF4444] focus:border-[#EF4444] focus:ring-[#EF4444]'
              : 'border-[#334155] focus:border-[#14B8A6]'
          } ${className}`}
          {...props}
        />
      </div>

      {error ? (
        <p className="text-xs text-[#EF4444] flex items-center gap-1 font-body mt-1">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{error}</span>
        </p>
      ) : hint ? (
        <p className="text-xs text-[#94A3B8] font-body mt-0.5">{hint}</p>
      ) : null}
    </div>
  );
});
