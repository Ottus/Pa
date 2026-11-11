/**
 * @notice Firestore Collections Schema Mapping
 * @dev Consistent collection and subcollection names across client and Cloud Functions.
 */
export const COLLECTIONS = Object.freeze({
  USERS: 'users',
  QUOTES: 'quotes',
  ORDERS: 'orders',
  SHIPMENTS: 'shipments',
  SHIPMENT_EVENTS: 'events',
  PUBLIC_TRACKING: 'publicTracking',
  SETTINGS: 'settings',
});

export const SETTINGS_DOCS = Object.freeze({
  PRICING: 'pricing',
});

