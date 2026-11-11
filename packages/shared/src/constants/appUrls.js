/**
 * @notice Application URLs for Routing and Cross-App Linking
 * @dev Read from environment variables with sensible defaults for local development.
 */
export const APP_URLS = Object.freeze({
  CUSTOMER: import.meta?.env?.VITE_CUSTOMER_APP_URL || 'http://localhost:3000',
  OPS: import.meta?.env?.VITE_OPS_APP_URL || 'http://localhost:3001',
});
