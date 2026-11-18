/**
 * @notice Pricing Calculation Engine
 * @dev Computes delivery fees based on distance, package weight, and volumetric size factor.
 * Formula: Math.round(((baseFee + perKm * distanceKm + perKg * weightKg) * sizeFactor) / 50) * 50
 * Test case: 12 km, 3 kg, medium = ₦3,900
 */
import { PACKAGE_SIZE } from '../constants/statuses.js';

export const DEFAULT_PRICING_SETTINGS = Object.freeze({
  baseFee: 1500,
  perKm: 120,
  perKg: 100,
  sizeFactors: {
    [PACKAGE_SIZE.SMALL]: 1.0,
    [PACKAGE_SIZE.MEDIUM]: 1.2,
    [PACKAGE_SIZE.LARGE]: 1.5,
  },
});

/**
 * @notice Calculates Haversine straight-line distance in kilometers between two GPS coordinates
 * @param {number} lat1
 * @param {number} lon1
 * @param {number} lat2
 * @param {number} lon2
 * @return {number} Distance in kilometers
 */
export function calculateHaversineDistance(lat1, lon1, lat2, lon2) {
  const toRad = (x) => (x * Math.PI) / 180;
  const R = 6371; // Earth's mean radius in km

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * @notice Computes estimated road distance from straight-line coordinates using 1.3 road multiplier
 * @param {number} lat1
 * @param {number} lon1
 * @param {number} lat2
 * @param {number} lon2
 * @return {number} Distance in km, rounded to 1 decimal place
 */
export function estimateRoadDistance(lat1, lon1, lat2, lon2) {
  const straightLine = calculateHaversineDistance(lat1, lon1, lat2, lon2);
  const roadEstimated = straightLine * 1.3;
  return Math.round(roadEstimated * 10) / 10;
}

/**
 * @notice Calculates the final quote price rounded to the nearest ₦50
 * @param {Object} params
 * @param {number} params.distanceKm Distance in kilometers
 * @param {number} params.weightKg Package weight in kilograms
 * @param {string} params.size Package size ('small', 'medium', 'large')
 * @param {Object} [settings] Optional custom pricing settings (defaults to DEFAULT_PRICING_SETTINGS)
 * @return {number} Total price in Naira
 */
export function calculatePrice({ distanceKm, weightKg, size }, settings = DEFAULT_PRICING_SETTINGS) {
  const baseFee = Number(settings.baseFee ?? DEFAULT_PRICING_SETTINGS.baseFee);
  const perKm = Number(settings.perKm ?? DEFAULT_PRICING_SETTINGS.perKm);
  const perKg = Number(settings.perKg ?? DEFAULT_PRICING_SETTINGS.perKg);
  const sizeFactor = Number(
    settings.sizeFactors?.[size] ?? DEFAULT_PRICING_SETTINGS.sizeFactors[size] ?? 1.0
  );

  const rawSubtotal = baseFee + perKm * distanceKm + perKg * weightKg;
  const rawTotal = rawSubtotal * sizeFactor;

  // Round to nearest ₦50
  const roundedPrice = Math.round(rawTotal / 50) * 50;
  return Math.max(roundedPrice, baseFee);
}
