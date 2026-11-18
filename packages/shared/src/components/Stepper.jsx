import React from 'react';
import { Check } from 'lucide-react';

/**
 * @notice Parcelo 3-Step Booking Wizard Stepper
 * @dev Visual progression indicator with step numbers, titles, and completion checkmarks.
 */
export function Stepper({
  steps = [
    { number: 1, title: 'Addresses' },
    { number: 2, title: 'Package' },
    { number: 3, title: 'Confirm' },
  ],
  currentStep = 1,
  className = '',
}) {
  return (
    <div className={`w-full max-w-xl mx-auto ${className}`}>
      <div className="flex items-center justify-between relative">
        {/* Connecting track */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#334155] -translate-y-1/2 z-0" />

        {steps.map((step) => {
          const isCompleted = currentStep > step.number;
          const isCurrent = currentStep === step.number;

          return (
            <div key={step.number} className="relative z-10 flex flex-col items-center">
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-heading font-bold text-sm transition-all duration-150 border-2 ${
                  isCompleted
                    ? 'bg-[#14B8A6] border-[#14B8A6] text-[#0F172A]'
                    : isCurrent
                    ? 'bg-[#0F172A] border-[#2DD4BF] text-[#2DD4BF] ring-4 ring-[#14B8A6]/20'
                    : 'bg-[#1E293B] border-[#334155] text-[#94A3B8]'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5 stroke-[2.5]" />
                ) : (
                  <span>{step.number}</span>
                )}
              </div>

              <span
                className={`text-xs font-body mt-1.5 transition-colors ${
                  isCurrent
                    ? 'text-[#F1F5F9] font-semibold'
                    : isCompleted
                    ? 'text-[#2DD4BF]'
                    : 'text-[#94A3B8]'
                }`}
              >
                {step.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
