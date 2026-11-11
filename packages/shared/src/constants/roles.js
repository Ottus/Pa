/**
 * @notice System User Roles
 * @dev In Phase 1, only CUSTOMER and ADMIN are active.
 * DISPATCHER and DRIVER exist as constants only for future phases.
 */
export const ROLES = Object.freeze({
  CUSTOMER: 'customer',
  ADMIN: 'admin',
  DISPATCHER: 'dispatcher', // Phase 2 constant only
  DRIVER: 'driver',         // Phase 2 constant only
});

export const ROLE_LABELS = Object.freeze({
  [ROLES.CUSTOMER]: 'Customer',
  [ROLES.ADMIN]: 'Operations Admin',
  [ROLES.DISPATCHER]: 'Dispatcher',
  [ROLES.DRIVER]: 'Driver',
});

/**
 * @notice Checks if a given role has staff-level dashboard access
 * @param {string} role The user's custom claim role
 * @return {boolean} True if admin or dispatcher
 */
export function isStaffRole(role) {
  return role === ROLES.ADMIN || role === ROLES.DISPATCHER;
}
