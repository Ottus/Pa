/**
 * @notice Client and Shared Validation Utilities
 * @dev Enforces validation rules at application boundaries. UX-level checks matching backend schemas.
 */

export const TRACKING_NUMBER_REGEX = /^TRK-[A-HJ-NP-Z2-9]{10}$/;
export const PHONE_REGEX = /^(?:\+234|0)[789][01]\d{8}$/;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * @notice Validates a tracking number format
 * @param {string} trackingNumber Input tracking number
 * @return {boolean}
 */
export function isValidTrackingNumber(trackingNumber) {
  if (!trackingNumber || typeof trackingNumber !== 'string') return false;
  return TRACKING_NUMBER_REGEX.test(trackingNumber.trim().toUpperCase());
}

/**
 * @notice Validates an email address
 * @param {string} email Input email
 * @return {boolean}
 */
export function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  return EMAIL_REGEX.test(email.trim());
}

/**
 * @notice Validates a Nigerian phone number
 * @param {string} phone Input phone
 * @return {boolean}
 */
export function isValidPhone(phone) {
  if (!phone || typeof phone !== 'string') return false;
  return PHONE_REGEX.test(phone.trim().replace(/[\s-]/g, ''));
}

/**
 * @notice Validates geographic coordinates
 * @param {number} lat Latitude (-90 to 90)
 * @param {number} lng Longitude (-180 to 180)
 * @return {boolean}
 */
export function isValidCoordinates(lat, lng) {
  return (
    typeof lat === 'number' &&
    typeof lng === 'number' &&
    !isNaN(lat) &&
    !isNaN(lng) &&
    lat >= -90 &&
    lat <= 90 &&
    lng >= -180 &&
    lng <= 180
  );
}

/**
 * @notice Validates package weight
 * @param {number} weightKg
 * @return {boolean}
 */
export function isValidWeight(weightKg) {
  return typeof weightKg === 'number' && !isNaN(weightKg) && weightKg >= 0.1 && weightKg <= 1000;
}
