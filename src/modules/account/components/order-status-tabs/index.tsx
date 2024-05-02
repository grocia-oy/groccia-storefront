'use client';

import { useDictionary } from '@lib/context/dictionary-context';
import { conditionalClassNames } from '@lib/util/conditional-classname';
import { Order } from '@medusajs/medusa';
import { OrderStatusType } from '@modules/account/types';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

type Props = {
  orders: Order[];
};

const getOrderTabs = (dictionary: Record<string, any>) => {
  const tabs = dictionary.account.order.statusTabs;

  return [
    { title: tabs.all, status: OrderStatusType.ALL },
    { title: tabs.pending, status: OrderStatusType.PENDING },
    { title: tabs.completed, status: OrderStatusType.COMPLETED },
    { title: tabs.canceled, status: OrderStatusType.CANCELED },
    { title: tabs.archived, status: OrderStatusType.ARCHIVED },
  ];
};

export default function OrderStatusTabs({ orders }: Props) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const status = searchParams.get('status') as OrderStatusType;

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
    <div className="my-2 w-full">
      <div
        role="tablist"
        className="tabs tabs-boxed w-[450px] sm:w-[650px] md:w-full overflow-x-auto space-x-4"
      >
        {statusTabs.map((tab) => (
          <button
            key={tab.status}
            role="tab"
            className={conditionalClassNames(
              'tab w-32',
              status === tab.status ? 'text-white bg-primary-500' : 'bg-neutral'
            )}
            onClick={() => onTabClick(tab.status)}
          >
            {tab.title}
          </button>
        ))}
      </div>
    </div>
  );
}
