/**
 * @notice System Lifecycle Statuses and Enums
 * @dev Statuses strictly adhere to Section 5 of the Parcelo Blueprint.
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

export const PAYMENT_STATUS = Object.freeze({
  UNPAID: 'unpaid',
  PENDING_TRANSFER: 'pending_transfer',
  PAID: 'paid',
});

export const PAYMENT_METHOD = Object.freeze({
  PAY_ON_DELIVERY: 'pay_on_delivery',
  BANK_TRANSFER: 'bank_transfer',
});

export const PACKAGE_SIZE = Object.freeze({
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
});

export const PACKAGE_SIZE_LABELS = Object.freeze({
  [PACKAGE_SIZE.SMALL]: 'Small (Up to 5 kg, e.g. document, shoebox)',
  [PACKAGE_SIZE.MEDIUM]: 'Medium (5–15 kg, e.g. microwave, carton)',
  [PACKAGE_SIZE.LARGE]: 'Large (15+ kg, e.g. large crate, furniture)',
});
