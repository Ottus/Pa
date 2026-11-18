import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * @notice Parcelo Standard Action Button Component
 * @dev Enforces 44px standard touch height, 8px rounded corners, electric teal accents,
 * 2px focus ring with 2px offset, and verb-first labeling convention.
 *
 * @param {Object} props
 * @param {string} [props.variant='primary'] 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline'
 * @param {string} [props.size='default'] 'default' (44px) | 'sm' (36px) | 'lg' (52px)
 * @param {boolean} [props.loading=false] Shows loading spinner and disables button
 * @param {boolean} [props.disabled=false]
 * @param {React.ReactNode} [props.icon] Optional leading icon
 * @param {React.ReactNode} props.children Button content (should begin with a verb)
 */
export function Button({
  children,
  variant = 'primary',
  size = 'default',
  loading = false,
  disabled = false,
  icon = null,
  className = '',
  type = 'button',
  onClick,
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium font-body transition-colors duration-150 rounded-control focus:outline-none focus:ring-2 focus:ring-[#2DD4BF] focus:ring-offset-2 focus:ring-offset-[#0F172A] disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

  const sizeStyles = {
    sm: 'h-9 px-3 text-sm gap-1.5',
    default: 'h-control px-5 text-base gap-2',
    lg: 'h-13 px-6 text-lg gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-[#14B8A6] text-[#0F172A] font-semibold hover:bg-[#2DD4BF] active:bg-[#0D9488]',
    secondary:
      'bg-transparent border border-[#14B8A6] text-[#14B8A6] hover:bg-[#14B8A6]/10 active:bg-[#14B8A6]/20',
    danger:
      'bg-[#EF4444] text-white font-semibold hover:bg-[#DC2626] active:bg-[#B91C1C] focus:ring-[#EF4444]',
    outline:
      'bg-transparent border border-[#334155] text-[#F1F5F9] hover:bg-[#1E293B] hover:border-[#475569]',
    ghost:
      'bg-transparent text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#1E293B]/60',
  };

  const currentSize = sizeStyles[size] || sizeStyles.default;
  const currentVariant = variantStyles[variant] || variantStyles.primary;

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyles} ${currentSize} ${currentVariant} ${className}`}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : icon ? (
        <span className="flex-shrink-0">{icon}</span>
      ) : null}
      <span>{children}</span>
    </button>
  );
}
