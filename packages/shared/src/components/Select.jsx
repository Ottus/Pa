import React, { forwardRef } from 'react';
import { AlertCircle, ChevronDown } from 'lucide-react';

/**
 * @notice Parcelo Custom Select Component
 * @dev Dark styled select matching 44px height, 8px radius, and 1px border tokens.
 */
export const Select = forwardRef(function Select(
  {
    label,
    error,
    hint,
    options = [],
    className = '',
    containerClassName = '',
    id,
    disabled = false,
    required = false,
    children,
    ...props
  },
  ref
) {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={`w-full flex flex-col space-y-1.5 ${containerClassName}`}>
      {label && (
        <label
          htmlFor={selectId}
          className="text-xs font-medium font-body uppercase tracking-wider text-[#94A3B8] flex items-center justify-between"
        >
          <span>
            {label}
            {required && <span className="text-[#EF4444] ml-1">*</span>}
          </span>
        </label>
      )}

      <div className="relative flex items-center">
        <select
          ref={ref}
          id={selectId}
          disabled={disabled}
          className={`w-full h-control appearance-none rounded-control bg-[#0F172A] border text-base text-[#F1F5F9] font-body transition-colors duration-150 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-[#2DD4BF] focus:ring-offset-2 focus:ring-offset-[#0F172A] disabled:opacity-50 disabled:cursor-not-allowed ${
            error
              ? 'border-[#EF4444] focus:border-[#EF4444] focus:ring-[#EF4444]'
              : 'border-[#334155] focus:border-[#14B8A6]'
          } ${className}`}
          {...props}
        >
          {children ||
            options.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-[#1E293B] text-[#F1F5F9]">
                {opt.label}
              </option>
            ))}
        </select>

        <div className="absolute right-3.5 pointer-events-none text-[#94A3B8]">
          <ChevronDown className="w-4 h-4" />
        </div>
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
