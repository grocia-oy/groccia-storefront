import { useDictionary } from '@lib/context/dictionary-context';
import { getLocalizedDate } from '@lib/util/get-localized-date';
import { formatAmount } from '@lib/util/prices';
import { Order } from '@medusajs/medusa';
import {
  Card,
  CardContent,
  CardHeader,
} from '@modules/common/components/ui/card';
import FulfillmentStatusText from '@modules/order/components/status/fulfillment-status-text';
import GeneralOrderStatusText from '@modules/order/components/status/general-status-text';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useCallback } from 'react';

type Props = {
  order: Order;
  showStatus: boolean;
  showFulfillmentStatus: boolean;
  showPaymentStatus: boolean;
};

const OrderSummaryCard = ({
  order,
  showFulfillmentStatus,
  showStatus,
  showPaymentStatus,
}: Props) => {
  const dictionary = useDictionary();
  const params = useParams<{ lang: string }>();

  const getAmount = useCallback(
    (amount: number) => {
      if (!amount) {
        return;
      }
      return formatAmount({
        amount,
        region: order.region,
        includeTaxes: false,
      });
    },
    [order.region]
  );

  return (
    <Card>
      <CardHeader className="py-3 flex-row bg-secondary rounded-t-lg">
        <div className="flex justify-between w-full">
          <div>
            <h4 className="font-bold text-lg">
              {dictionary.common.order} #{order.display_id}
            </h4>
            <h5>{getLocalizedDate(order.created_at, 'LLL', params.lang)}</h5>
          </div>
          <div>
            {showStatus && <GeneralOrderStatusText status={order.status} />}
            {showFulfillmentStatus && (
              <FulfillmentStatusText status={order.fulfillment_status} />
            )}
            {showPaymentStatus && <h4>{order.payment_status}</h4>}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex justify-between">
          <div className="flex space-x-3 items-center">
            {order.items.slice(0, 3).map((item) => (
              <div className="relative w-20 h-20 border-2 border-neutral shadow-sm rounded-lg">
                <Image
                  className="object-contain"
                  src={item.thumbnail}
                  fill
                  alt={item.title}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            ))}
            {order.items.length > 3 && (
              <div className="relative w-12 h-12 rounded-full bg-primary text-xl flex items-center justify-center text-primary-foreground">
                +{order.items.length - 3}
              </div>
            )}
          </div>
          <div>
            {dictionary.common.total}
            {': '}
            <span>{getAmount(order.total)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummaryCard;
