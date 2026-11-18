/**
 * @notice Tracking Number Canonical Generation and Validation
 * @dev Alphabet omits ambiguous characters: 0, O, 1, I.
 * Format: TRK- + 10 characters (50+ bits of entropy).
 */

export const TRACKING_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
export const TRACKING_REGEX = /^TRK-[A-HJ-NP-Z2-9]{10}$/;

/**
 * @notice Validates tracking number string against canonical regex
 * @param {string} trackingNumber
 * @return {boolean}
 */
export function validateTrackingNumber(trackingNumber) {
  if (!trackingNumber || typeof trackingNumber !== 'string') return false;
  return TRACKING_REGEX.test(trackingNumber.trim().toUpperCase());
}

/**
 * @notice Generates a client-side mock tracking number for testing and offline demo mode
 * @dev In production, all live tracking numbers are generated server-side with crypto.randomBytes.
 * @return {string} Canonical tracking number, e.g. "TRK-9X4KM2P7WQ"
 */
export function generateClientMockTrackingNumber() {
  let result = 'TRK-';
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * TRACKING_ALPHABET.length);
    result += TRACKING_ALPHABET[randomIndex];
  }
  return result;
}
