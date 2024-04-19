import { Order } from '@medusajs/medusa';
import { Heading } from '@medusajs/ui';
import { cookies } from 'next/headers';

import CartTotals from '@modules/common/components/cart-totals';
import Help from '@modules/order/components/help';
import Items from '@modules/order/components/items';
import OnboardingCta from '@modules/order/components/onboarding-cta';
import OrderDetails from '@modules/order/components/order-details';
import ShippingDetails from '@modules/order/components/shipping-details';
import PaymentDetails from '@modules/order/components/payment-details';
import { getDictionary } from 'app/[lang]/dictionaries';

type OrderCompletedTemplateProps = {
  order: Order;
  lang: string;
};

export default async function OrderCompletedTemplate({
  order,
  lang,
}: OrderCompletedTemplateProps) {
  const dictionary = await getDictionary(lang);
  const dictionaryOrderPage = dictionary.orderPage;

  const isOnboarding = cookies().get('_medusa_onboarding')?.value === 'true';

  return (
    <div className="py-6 min-h-[calc(100vh-64px)]">
      <div className="content-container flex flex-col justify-center items-center gap-y-10 max-w-4xl h-full w-full">
        {isOnboarding && <OnboardingCta orderId={order.id} />}
        <div className="flex flex-col gap-4 max-w-4xl h-full bg-white w-full py-10">
          <Heading
            level="h1"
            className="flex flex-col gap-y-3 text-ui-fg-base text-3xl mb-4"
          >
            <span>{dictionaryOrderPage.thankYou}</span>
            <span>{dictionaryOrderPage.orderDescription}.</span>
          </Heading>
          <OrderDetails order={order} dictionary={dictionary} />
          <Heading level="h2" className="flex flex-row text-3xl-regular">
            {dictionaryOrderPage.summary}
          </Heading>
          <Items items={order.items} region={order.region} />
          <CartTotals data={order} />
          <ShippingDetails order={order} dictionary={dictionary} />
          <PaymentDetails order={order} dictionary={dictionary} />
          <Help dictionary={dictionary} />
        </div>
      </div>
    </div>
  );
}
