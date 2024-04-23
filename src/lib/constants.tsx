import React from 'react';
import { CreditCardIcon } from '@heroicons/react/24/outline';

/* Map of payment provider_id to their title and icon. Add in any payment providers you want to use. */
export const paymentInfoMap: Record<
  string,
  { title: string; icon: React.JSX.Element }
> = {
  stripe: {
    title: 'Credit card',
    icon: <CreditCardIcon className="w-5 h-5" />,
  },
  // Add more payment providers here
};

export const LocalStorageKey = {
  POSTCODE: 'postcode',
} as const;

// Add currencies that don't need to be divided by 100
export const noDivisionCurrencies = [
  'krw',
  'jpy',
  'vnd',
  'clp',
  'pyg',
  'xaf',
  'xof',
  'bif',
  'djf',
  'gnf',
  'kmf',
  'mga',
  'rwf',
  'xpf',
  'htg',
  'vuv',
  'xag',
  'xdr',
  'xau',
];
