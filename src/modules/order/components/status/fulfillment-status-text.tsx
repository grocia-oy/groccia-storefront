'use client';

import { useDictionary } from '@lib/context/dictionary-context';
import { FulfillmentStatus } from '@medusajs/medusa';
import clsx from 'clsx';
import React from 'react';

type Props = {
  status: FulfillmentStatus;
};

const FulfillmentStatusText = ({ status }: Props) => {
  const dictionary = useDictionary();

  return (
    <div className="flex items-center space-x-3">
      <div
        className={clsx({
          'w-2 h-2 rounded-full bg-black': true,
          'bg-status-success': status === 'fulfilled',
          'bg-status-warning':
            status === 'not_fulfilled' ||
            status === 'partially_fulfilled' ||
            status === 'partially_shipped' ||
            status === 'shipped',
          'bg-status-error': status === 'canceled',
        })}
      >
        &nbsp;
      </div>
      <h5>{dictionary.orderPage.fulfillmentStatus[status]}</h5>
    </div>
  );
};

export default FulfillmentStatusText;
