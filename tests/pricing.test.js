import { describe, it, expect } from 'vitest';
import { calculatePrice, DEFAULT_PRICING_SETTINGS } from '../packages/shared/src/utils/pricing.js';
import { canTransitionShipment, SHIPMENT_TRANSITIONS } from '../packages/shared/src/utils/statusRules.js';
import { canTransitionShipment as canTransitionServer, SHIPMENT_TRANSITIONS as SERVER_TRANSITIONS } from '../firebase/functions/src/utils/statusRules.js';
import { validateTrackingNumber } from '../packages/shared/src/utils/trackingNumber.js';

describe('Parcelo Phase 1 Business Rules', () => {
  it('correctly calculates price according to the formula: 12 km, 3 kg, medium = ₦3,900', () => {
    // Formula: (baseFee 1500 + 120 * 12 + 100 * 3) * 1.2 = (1500 + 1440 + 300) * 1.2 = 3240 * 1.2 = 3888 -> rounded to nearest 50 = 3900
    const price = calculatePrice({
      distanceKm: 12,
      weightKg: 3,
      size: 'medium',
    });

    expect(price).toBe(3900);
  });

  it('guarantees shared and server status rules are in 100% parity', () => {
    expect(SHIPMENT_TRANSITIONS).toEqual(SERVER_TRANSITIONS);

    // Verify Pending -> In Transit is allowed in Phase 1
    expect(canTransitionShipment('Pending', 'In Transit')).toBe(true);
    expect(canTransitionServer('Pending', 'In Transit')).toBe(true);

    // Verify skipping transitions is disallowed
    expect(canTransitionShipment('Pending', 'Delivered')).toBe(false);
    expect(canTransitionServer('Pending', 'Delivered')).toBe(false);
  });

  it('validates canonical tracking number regex format', () => {
    expect(validateTrackingNumber('TRK-ABC789XYZ2')).toBe(true);
    expect(validateTrackingNumber('TRK-9X4KM2P7WQ')).toBe(true);
    // Invalid checks
    expect(validateTrackingNumber('TRK-12345678')).toBe(false); // only 8 digits
    expect(validateTrackingNumber('INVALID')).toBe(false);
  });
});
