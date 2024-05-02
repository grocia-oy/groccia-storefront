import { listCustomerOrders } from '@lib/data/ecommerce';
import OrderStatusTabs from '@modules/account/components/order-status-tabs';
import { notFound } from 'next/navigation';

type Props = {
  params: {
    lang: string;
  };
};

export default async function OrderPage({ params }: Props) {
  const orderResponse = await listCustomerOrders().catch((error) => {
    console.log(error);
  });

  if (!orderResponse) return notFound();

  return (
    <section className='w-full'>
      <div>
        <h2 className="font-raleway font-bold text-2xl">Order</h2>
      </div>
      <div>
        <OrderStatusTabs orders={orderResponse.orders} />
      </div>
    </section>
  );
}
