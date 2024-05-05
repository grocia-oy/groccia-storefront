import { listCustomerOrders } from '@lib/data/ecommerce';
import OrderStatusTabs from '@modules/account/components/order-status-tabs';
import { getDictionary } from 'app/[lang]/dictionaries';
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
  const dictionary = await getDictionary(params.lang);

  if (!orderResponse) return notFound();

  return (
    <section className="w-full">
      <div>
        <h2 className="font-raleway font-bold text-2xl">
          {dictionary.common.order}
        </h2>
      </div>
      <OrderStatusTabs orders={orderResponse.orders} />
    </section>
  );
}
