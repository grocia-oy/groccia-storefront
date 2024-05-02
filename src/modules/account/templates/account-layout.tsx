import React from 'react';
import AccountNav from '../components/account-nav';
import { Customer } from '@medusajs/medusa';

interface AccountLayoutProps {
  customer: Omit<Customer, 'password_hash'> | null;
  orderCount?: number;
  children: React.ReactNode;
}

const AccountLayout: React.FC<AccountLayoutProps> = ({
  customer,
  orderCount,
  children,
}) => {
  return (
    <div className="">
      <div className="">
        <div className="grid md:grid-cols-6 gap-10 py-12 content-container">
          <div className="col-span-full lg:col-span-2">
            <AccountNav customer={customer} orderCount={orderCount} />
          </div>
          <div className='col-span-full lg:col-span-4'>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AccountLayout;
