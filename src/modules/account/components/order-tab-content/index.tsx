import { Order } from '@medusajs/medusa';
import { OrderStatusType } from '@modules/account/types';
import { TabsContent } from '@modules/common/components/ui/tabs';
import { memo, useMemo } from 'react';
import OrderSummaryCard from '../order-summary-card';

type Props = {
  orders: Order[];
  status: OrderStatusType;
  showStatus?: boolean;
  showFulfillmentStatus?: boolean;
  showPaymentStatus?: boolean;
};

const OrderTabContent = ({
  orders,
  status,
  showFulfillmentStatus = false,
  showStatus = false,
  showPaymentStatus = false,
}: Props) => {
  const filteredOrders = useMemo(() => {
    if (status === 'all') return orders;

    return orders.filter((order) => order.status === status);
  }, [orders, status]);

  return (
    <TabsContent value={status}>
      <div className="space-y-3">
        {filteredOrders.map((order) => (
          <OrderSummaryCard
            key={order.id}
            order={order}
            showStatus={showStatus}
            showFulfillmentStatus={showFulfillmentStatus}
            showPaymentStatus={showPaymentStatus}
          />
        ))}
      </div>
    </TabsContent>
  );
};

export default memo(OrderTabContent, (prevProps, nextProps) => {
  return (
    prevProps.status === nextProps.status &&
    prevProps.orders === nextProps.orders
  );
});
