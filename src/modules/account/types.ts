export const OrderStatus = {
  ALL: 'all',
  PENDING: 'pending',
  COMPLETED: 'completed',
  ARCHIVED: 'archived',
  CANCELED: 'canceled',
  REQUIRES_ACTION: 'requires_action',
} as const;

export const OrderStatuses = Object.values(OrderStatus);

export type OrderStatusType =
  | (typeof OrderStatus)[keyof typeof OrderStatus]
  | string;
