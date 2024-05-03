'use client';

import { useDictionary } from '@lib/context/dictionary-context';
import { OrderStatus } from '@medusajs/medusa';
import clsx from 'clsx';
import React from 'react';

type Props = {
  status: OrderStatus;
};

const GeneralOrderStatusText = ({ status }: Props) => {
  const dictionary = useDictionary();

  return (
    <div className="flex items-center space-x-3">
      <div
        className={clsx({
          'w-2 h-2 rounded-full bg-black': true,
          'bg-status-success': status === 'completed',
          'bg-status-warning': status === 'pending',
          'bg-status-error':
            status === 'canceled' || status === 'requires_action',
        })}
      >
        &nbsp;
      </div>
      <h5>{dictionary.orderPage.generalStatus[status]}</h5>
    </div>
  );
};

export default GeneralOrderStatusText;
