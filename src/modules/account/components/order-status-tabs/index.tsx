'use client';

import { useDictionary } from '@lib/context/dictionary-context';
import { Order } from '@medusajs/medusa';
import { OrderStatus, OrderStatusType } from '@modules/account/types';
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from '@modules/common/components/ui/tabs';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import OrderTabContent from '../order-tab-content';

type Props = {
  orders: Order[];
};

const getOrderTabs = (dictionary: Record<string, any>) => {
  const tabs = dictionary.account.order.statusTabs;

  return [
    { title: tabs.all, status: OrderStatus.ALL },
    { title: tabs.pending, status: OrderStatus.PENDING },
    { title: tabs.completed, status: OrderStatus.COMPLETED },
    { title: tabs.canceled, status: OrderStatus.CANCELED },
    { title: tabs.archived, status: OrderStatus.ARCHIVED },
  ];
};

export default function OrderStatusTabs({ orders }: Props) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const intendedStatus = searchParams.get('status') as OrderStatusType;
  const dictionary = useDictionary();
  const statusTabs = getOrderTabs(dictionary);

  const getQueryParams = useCallback(
    (status: OrderStatusType) => {
      const params = new URLSearchParams(searchParams);
      params.set('status', status);
      return params.toString();
    },
    [searchParams]
  );

  const onTabClick = (status: OrderStatusType) => {
    const queryParams = getQueryParams(status);
    router.replace(`${pathName}?${queryParams}`);
  };

  return (
    <Tabs value={intendedStatus} onValueChange={onTabClick} className="mt-4">
      <TabsList className="rounded-lg bg-accent space-x-4">
        {statusTabs.map((tab) => (
          <TabsTrigger
            key={tab.status}
            value={tab.status}
            className="rounded-lg w-[100px] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            {tab.title}
          </TabsTrigger>
        ))}
      </TabsList>
      <div className="mt-5">
        <OrderTabContent orders={orders} status={OrderStatus.ALL} showStatus />
        <OrderTabContent
          orders={orders}
          status={OrderStatus.PENDING}
          showFulfillmentStatus
        />
        <OrderTabContent
          orders={orders}
          status={OrderStatus.COMPLETED}
          showFulfillmentStatus
        />
        <OrderTabContent
          orders={orders}
          status={OrderStatus.CANCELED}
          showFulfillmentStatus
        />
        <OrderTabContent
          orders={orders}
          status={OrderStatus.ARCHIVED}
          showFulfillmentStatus
        />
      </div>
    </Tabs>
  );
}
