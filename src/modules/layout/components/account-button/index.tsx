'use client';

import { useDictionary } from '@lib/context/dictionary-context';
import LocalizedClientLink from '@modules/common/components/localized-client-link';
import { memo } from 'react';

const AccountButton = memo(() => {
  const dictionary = useDictionary();

  return (
    <LocalizedClientLink href="/account/order?status=all">
      {dictionary.common.account}
    </LocalizedClientLink>
  );
});

export default AccountButton;
