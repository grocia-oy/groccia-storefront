'use client';

import {
  CubeIcon,
  UserCircleIcon,
  TruckIcon,
  CreditCardIcon,
  ArrowUpTrayIcon,
} from '@heroicons/react/24/outline';
import { useDictionary } from '@lib/context/dictionary-context';
import { conditionalClassNames } from '@lib/util/conditional-classname';
import { Customer } from '@medusajs/medusa';
import { signOut } from '@modules/account/actions';
import IconButton from '@modules/common/components/icon-button';
import { usePathname, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import AccountAvatar from '../account-avatar';

const getSidebarItems = (
  dictionary: Record<string, any>,
  options: { orderCount: number }
) => {
  const sideBar = dictionary.account.sideBar;

  return [
    {
      title: sideBar.order,
      href: 'order?status=all',
      icon: <CubeIcon className="w-6 h-6" />,
      count: options.orderCount,
    },
    {
      title: sideBar.profile,
      href: 'profile',
      icon: <UserCircleIcon className="w-6 h-6" />,
    },
  ];
};

const AccountNav = ({
  customer,
  orderCount,
}: {
  customer: Omit<Customer, 'password_hash'> | null;
  orderCount?: number;
}) => {
  const pathName = usePathname();
  const router = useRouter();
  const dictionary = useDictionary();
  const sideBarItems = getSidebarItems(dictionary, { orderCount });

  const splittedPath = useMemo(() => pathName.split('/'), [pathName]);

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="">
      <div className="flex space-x-4">
        <div className="relative w-24 h-24">
          <AccountAvatar name={customer?.first_name} />
        </div>
        <div>
          <span className="text-2xl font-raleway font-bold">
            {customer?.first_name} {customer?.last_name}
          </span>
        </div>
      </div>
      <div>
        <ul className="space-y-2 flex flex-col mt-8 pr-10">
          {sideBarItems.map((item) => (
            <IconButton
              icon={item.icon}
              key={item.href}
              onClick={() => router.push(item.href)}
              className={conditionalClassNames(
                'relative text-left font-semibold hover:text-primary-default hover:bg-neutral px-4',
                splittedPath[4] === item.href.split('?')[0] ? 'bg-neutral' : ''
              )}
            >
              <span>{item.title}</span>
              {item.count && (
                <span className="absolute bg-primary-500 w-6 h-6 text-center rounded-full text-white right-4">
                  {item.count}
                </span>
              )}
            </IconButton>
          ))}
          <IconButton
            icon={<ArrowUpTrayIcon className="w-6 h-6" />}
            onClick={handleLogout}
            className="text-left font-semibold hover:text-red-600 hover:bg-neutral"
          >
            {dictionary.account.sideBar.logout}
          </IconButton>
        </ul>
      </div>
      <div></div>
    </div>
  );
};

export default AccountNav;
