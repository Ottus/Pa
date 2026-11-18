import React from 'react';
import { CheckCircle2, Clock, Truck, Package, AlertCircle, XCircle } from 'lucide-react';
import { formatDateTime } from '../utils/formatters.js';

/**
 * @notice Parcelo Step-by-Step Status & Audit Timeline
 * @dev Displays chronological shipment events with state badges, timestamps, and notes.
 */
export function Timeline({ events = [], className = '' }) {
  if (!events || events.length === 0) {
    return (
      <p className="text-sm text-[#94A3B8] italic py-4">
        No tracking events recorded yet.
      </p>
    );
  }

  const getEventIcon = (status) => {
    const s = String(status).toLowerCase();
    if (s.includes('delivered')) return <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />;
    if (s.includes('out for delivery')) return <Package className="w-4 h-4 text-[#8B5CF6]" />;
    if (s.includes('transit')) return <Truck className="w-4 h-4 text-[#3B82F6]" />;
    if (s.includes('failed')) return <AlertCircle className="w-4 h-4 text-[#EF4444]" />;
    if (s.includes('cancelled')) return <XCircle className="w-4 h-4 text-[#94A3B8]" />;
    return <Clock className="w-4 h-4 text-[#F59E0B]" />;
  };

  return (
    <div className={`relative pl-6 space-y-6 ${className}`}>
      {/* Vertical line connecting events */}
      <div className="absolute top-2.5 bottom-2.5 left-[11px] w-0.5 bg-[#334155]" />

      {events.map((evt, idx) => {
        const isLatest = idx === 0;
        return (
          <div key={evt.id || idx} className="relative flex items-start group">
            {/* Event indicator node */}
            <div
              className={`absolute -left-6 w-6 h-6 rounded-full border-2 bg-[#0F172A] flex items-center justify-center z-10 ${
                isLatest ? 'border-[#14B8A6] ring-4 ring-[#14B8A6]/20' : 'border-[#334155]'
              }`}
            >
              {getEventIcon(evt.status)}
            </div>

            {/* Event Content */}
            <div className="ml-3 flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <span className="font-heading font-semibold text-sm sm:text-base text-[#F1F5F9]">
                  {evt.status}
                </span>
                <span className="text-xs text-[#94A3B8] font-mono">
                  {formatDateTime(evt.createdAt || evt.timestamp)}
                </span>
              </div>

              {evt.note && (
                <p className="text-xs sm:text-sm text-[#94A3B8] font-body mt-1 leading-relaxed">
                  {evt.note}
                </p>
              )}

              {evt.changedBy && (
                <span className="inline-block text-[11px] font-mono text-[#64748B] mt-1">
                  Updated by: {evt.changedBy}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
