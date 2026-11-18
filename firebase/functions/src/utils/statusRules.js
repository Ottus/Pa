/**
 * @notice Pure Shipment and Order Status Transition Matrix (Server copy)
 * @dev Must strictly match packages/shared/src/utils/statusRules.js
 */

export const SHIPMENT_STATUS = Object.freeze({
  PENDING: 'Pending',
  ASSIGNED: 'Assigned',
  IN_TRANSIT: 'In Transit',
  OUT_FOR_DELIVERY: 'Out for Delivery',
  DELIVERED: 'Delivered',
  FAILED: 'Failed',
  CANCELLED: 'Cancelled',
});

export const ORDER_STATUS = Object.freeze({
  PLACED: 'placed',
  CONFIRMED: 'confirmed',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
});

export const SHIPMENT_TRANSITIONS = Object.freeze({
  [SHIPMENT_STATUS.PENDING]: [
    SHIPMENT_STATUS.IN_TRANSIT,
    SHIPMENT_STATUS.CANCELLED,
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
    SHIPMENT_STATUS.OUT_FOR_DELIVERY,
  ],
  [SHIPMENT_STATUS.DELIVERED]: [],
  [SHIPMENT_STATUS.CANCELLED]: [],
});

export function canTransitionShipment(currentStatus, nextStatus) {
  if (!currentStatus || !nextStatus) return false;
  const allowed = SHIPMENT_TRANSITIONS[currentStatus] || [];
  return allowed.includes(nextStatus);
}

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
      return ORDER_STATUS.SHIPPED;
    default:
      return ORDER_STATUS.PLACED;
  }
}
