import React from 'react';
import { Skeleton } from './Skeleton.jsx';
import { EmptyState } from './EmptyState.jsx';

/**
 * @notice Parcelo Clean Dark Data Table
 * @dev Enforces 1px divider lines, zero row backgrounds, 12px uppercase headers,
 * and built-in empty/loading states.
 */
export function Table({
  columns = [],
  data = [],
  keyExtractor = (item, index) => item.id || index,
  loading = false,
  emptyTitle = 'No records found',
  emptyMessage = 'There are no items matching the current filter.',
  onRowClick,
  className = '',
}) {
  return (
    <div className={`w-full overflow-x-auto ${className}`}>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-[#334155]">
            {columns.map((col, idx) => (
              <th
                key={col.key || idx}
                className={`py-3 px-4 text-xs font-medium font-body uppercase tracking-wider text-[#94A3B8] ${
                  col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'
                } ${col.headerClassName || ''}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#334155] font-body text-sm text-[#F1F5F9]">
          {loading ? (
            Array.from({ length: 4 }).map((_, rIdx) => (
              <tr key={rIdx}>
                {columns.map((col, cIdx) => (
                  <td key={cIdx} className="py-4 px-4">
                    <Skeleton className="h-4 w-3/4" />
                  </td>
                ))}
              </tr>
            ))
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="py-8 px-4 text-center">
                <EmptyState title={emptyTitle} message={emptyMessage} compact />
              </td>
            </tr>
          ) : (
            data.map((row, rIdx) => (
              <tr
                key={keyExtractor(row, rIdx)}
                onClick={() => onRowClick && onRowClick(row)}
                className={`transition-colors duration-150 hover:bg-[#1E293B]/60 ${
                  onRowClick ? 'cursor-pointer' : ''
                }`}
              >
                {columns.map((col, cIdx) => (
                  <td
                    key={col.key || cIdx}
                    className={`py-3.5 px-4 ${
                      col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'
                    } ${col.cellClassName || ''}`}
                  >
                    {col.render ? col.render(row, rIdx) : row[col.accessor || col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
