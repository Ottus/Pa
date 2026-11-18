/**
 * @notice Formatting Utilities for Parcelo Logistics Platform
 * @dev Standardizes currency (NGN ₦), distances, weights, and dates across all applications.
 */

/**
 * @notice Formats a numeric price into Nigerian Naira currency
 * @param {number} amount Price in Naira
 * @return {string} Formatted string, e.g. "₦3,900"
 */
export function formatCurrency(amount) {
  if (typeof amount !== 'number' || isNaN(amount)) return '₦0';
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount).replace('NGN', '₦').trim();
}

/**
 * @notice Formats a distance in kilometers
 * @param {number} distanceKm Distance in kilometers
 * @return {string} Formatted string, e.g. "12.0 km"
 */
export function formatDistance(distanceKm) {
  if (typeof distanceKm !== 'number' || isNaN(distanceKm)) return '0.0 km';
  return `${distanceKm.toFixed(1)} km`;
}

/**
 * @notice Formats a package weight in kilograms
 * @param {number} weightKg Weight in kg
 * @return {string} Formatted string, e.g. "3.5 kg"
 */
export function formatWeight(weightKg) {
  if (typeof weightKg !== 'number' || isNaN(weightKg)) return '0.0 kg';
  return `${weightKg.toFixed(1)} kg`;
}

/**
 * @notice Formats a Firestore or JS timestamp into a friendly human-readable date and time
 * @param {Date|Object|number|string} date Input date
 * @return {string} Formatted string, e.g. "18 Nov 2026, 12:30 PM"
 */
export function formatDateTime(date) {
  if (!date) return '—';
  
  let d;
  if (typeof date?.toDate === 'function') {
    d = date.toDate();
  } else if (date instanceof Date) {
    d = date;
  } else if (typeof date === 'number' || typeof date === 'string') {
    d = new Date(date);
  } else if (date?.seconds) {
    d = new Date(date.seconds * 1000);
  } else {
    return '—';
  }

  if (isNaN(d.getTime())) return '—';

  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(d);
}

/**
 * @notice Normalizes tracking number (uppercase and trimmed)
 * @param {string} trackingNumber Raw tracking number
 * @return {string} Normalized tracking number
 */
export function normalizeTrackingNumber(trackingNumber) {
  if (!trackingNumber || typeof trackingNumber !== 'string') return '';
  return trackingNumber.trim().toUpperCase();
}
