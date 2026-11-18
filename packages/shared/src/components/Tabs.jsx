import React from 'react';

/**
 * @notice Parcelo Navigation & Content Tabs
 * @dev Enforces 150ms transition and accessible tab navigation.
 */
export function Tabs({
  tabs = [],
  activeTab,
  onChange,
  className = '',
}) {
  return (
    <div className={`border-b border-[#334155] ${className}`}>
      <div className="flex space-x-6 overflow-x-auto no-scrollbar" role="tablist">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(tab.id)}
              className={`py-3 px-1 text-sm font-medium font-body transition-colors relative whitespace-nowrap focus:outline-none focus:text-[#2DD4BF] ${
                isActive
                  ? 'text-[#14B8A6] font-semibold'
                  : 'text-[#94A3B8] hover:text-[#F1F5F9]'
              }`}
            >
              <span>{tab.label}</span>
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#14B8A6] rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
