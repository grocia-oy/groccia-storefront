'use client';

import LocalizedClientLink from '@modules/common/components/localized-client-link';
import { memo } from 'react';

const AccountButton = memo(() => {
  return (
    <LocalizedClientLink href="/account/order?status=all">
      Account
    </LocalizedClientLink>
  );
});

export default AccountButton;
