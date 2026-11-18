import React from 'react';
import { SHIPMENT_STATUS, ORDER_STATUS, PAYMENT_STATUS } from '../constants/statuses.js';

/**
 * @notice Parcelo Status Badge Component
 * @dev Enforces pill shape, 12px SemiBold text, explicit status word, and blueprint palette.
 * Supports Shipment, Order, and Payment statuses.
 */
export function StatusBadge({ status, size = 'default', className = '' }) {
  if (!status) return null;

  // Normalized color lookup
  const normalized = String(status).toLowerCase().replace(/[\s_-]+/g, '');

  let badgeStyle = 'bg-[#64748B]/15 text-[#94A3B8] border-[#64748B]/30'; // default cancelled/neutral
  let dotColor = 'bg-[#94A3B8]';

  switch (normalized) {
    case 'pending':
    case 'placed':
    case 'pendingtransfer':
      badgeStyle = 'bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/30';
      dotColor = 'bg-[#F59E0B]';
      break;

    case 'intransit':
    case 'confirmed':
    case 'shipped':
    case 'assigned':
      badgeStyle = 'bg-[#3B82F6]/15 text-[#3B82F6] border-[#3B82F6]/30';
      dotColor = 'bg-[#3B82F6]';
      break;

    case 'outfordelivery':
      badgeStyle = 'bg-[#8B5CF6]/15 text-[#A78BFA] border-[#8B5CF6]/30';
      dotColor = 'bg-[#8B5CF6]';
      break;

    case 'delivered':
    case 'paid':
      badgeStyle = 'bg-[#22C55E]/15 text-[#22C55E] border-[#22C55E]/30';
      dotColor = 'bg-[#22C55E]';
      break;

    case 'failed':
    case 'unpaid':
      badgeStyle = 'bg-[#EF4444]/15 text-[#EF4444] border-[#EF4444]/30';
      dotColor = 'bg-[#EF4444]';
      break;

    case 'cancelled':
      badgeStyle = 'bg-[#64748B]/20 text-[#94A3B8] border-[#64748B]/30';
      dotColor = 'bg-[#64748B]';
      break;

    default:
      badgeStyle = 'bg-[#64748B]/15 text-[#94A3B8] border-[#64748B]/30';
      dotColor = 'bg-[#94A3B8]';
      break;
  }

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-[11px] gap-1',
    default: 'px-2.5 py-1 text-xs gap-1.5',
    lg: 'px-3.5 py-1.5 text-sm gap-2',
  };

  return (
    <span
      className={`inline-flex items-center font-semibold font-body rounded-pill border select-none ${badgeStyle} ${
        sizeStyles[size] || sizeStyles.default
      } ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor} flex-shrink-0`} />
      <span>{status}</span>
    </span>
  );
}
