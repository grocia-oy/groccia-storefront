import { getCustomer, listCustomerOrders } from '@lib/data/ecommerce';
import AccountLayout from '@modules/account/templates/account-layout';

export default async function AccountPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const customer = await getCustomer();
  const customerOrders = await listCustomerOrders().catch((error) => {});

  return (
    <AccountLayout customer={customer} orderCount={customerOrders?.count}>
      {children}
    </AccountLayout>
  );
}
