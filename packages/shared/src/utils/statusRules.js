/**
 * @notice Pure Shipment and Order Status Transition Matrix
 * @dev Reused verbatim by Cloud Functions and Shared frontend.
 * In Phase 1, Assigned is disabled, so direct transition Pending -> In Transit is allowed.
 */
import { SHIPMENT_STATUS, ORDER_STATUS, PAYMENT_STATUS } from '../constants/statuses.js';

/**
 * @notice Complete status transition map for shipments
 * @dev Maps current status to array of permissible next statuses.
 */
export const SHIPMENT_TRANSITIONS = Object.freeze({
  [SHIPMENT_STATUS.PENDING]: [
    // Phase 1 shortcut: admin moves Pending directly to In Transit
    SHIPMENT_STATUS.IN_TRANSIT,
    SHIPMENT_STATUS.CANCELLED,
    // Phase 2 target (disabled in Phase 1 runtime checks):
    // SHIPMENT_STATUS.ASSIGNED,
  ],
  [SHIPMENT_STATUS.ASSIGNED]: [
    SHIPMENT_STATUS.IN_TRANSIT,
    SHIPMENT_STATUS.CANCELLED,
  ],
  [SHIPMENT_STATUS.IN_TRANSIT]: [
    SHIPMENT_STATUS.OUT_FOR_DELIVERY,
    SHIPMENT_STATUS.FAILED,
  ],
  [SHIPMENT_STATUS.OUT_FOR_DELIVERY]: [
    SHIPMENT_STATUS.DELIVERED,
    SHIPMENT_STATUS.FAILED,
  ],
  [SHIPMENT_STATUS.FAILED]: [
    // Can retry delivery from Failed back to Out for Delivery
    SHIPMENT_STATUS.OUT_FOR_DELIVERY,
  ],
  [SHIPMENT_STATUS.DELIVERED]: [],
  [SHIPMENT_STATUS.CANCELLED]: [],
});

/**
 * @notice Checks whether a shipment status transition is legally permitted
 * @param {string} currentStatus Current status
 * @param {string} nextStatus Desired next status
 * @return {boolean}
 */
export function canTransitionShipment(currentStatus, nextStatus) {
  if (!currentStatus || !nextStatus) return false;
  const allowed = SHIPMENT_TRANSITIONS[currentStatus] || [];
  return allowed.includes(nextStatus);
}

/**
 * @notice Returns allowable next transitions for a shipment
 * @param {string} currentStatus Current status
 * @return {string[]} Array of allowed next status strings
 */
export function getAvailableShipmentTransitions(currentStatus) {
  return SHIPMENT_TRANSITIONS[currentStatus] || [];
}

/**
 * @notice Order status corresponding to shipment status changes
 * @param {string} shipmentStatus
 * @return {string} Corresponding ORDER_STATUS
 */
export function mapShipmentToOrderStatus(shipmentStatus) {
  switch (shipmentStatus) {
    case SHIPMENT_STATUS.PENDING:
      return ORDER_STATUS.PLACED;
    case SHIPMENT_STATUS.IN_TRANSIT:
    case SHIPMENT_STATUS.OUT_FOR_DELIVERY:
      return ORDER_STATUS.SHIPPED;
    case SHIPMENT_STATUS.DELIVERED:
      return ORDER_STATUS.DELIVERED;
    case SHIPMENT_STATUS.CANCELLED:
      return ORDER_STATUS.CANCELLED;
    case SHIPMENT_STATUS.FAILED:
      return ORDER_STATUS.SHIPPED; // Remains shipped/active while handling failure
    default:
      return ORDER_STATUS.PLACED;
  }
}
