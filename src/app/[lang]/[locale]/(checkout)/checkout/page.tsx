import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { LineItem } from '@medusajs/medusa';

import { enrichLineItems, retrieveCart } from '@modules/cart/actions';
import Wrapper from '@modules/checkout/components/payment-wrapper';
import CheckoutForm from '@modules/checkout/templates/checkout-form';
import CheckoutSummary from '@modules/checkout/templates/checkout-summary';

export const metadata: Metadata = {
  title: 'Checkout',
};

const fetchCart = async () => {
  const cart = await retrieveCart();

  if (cart?.items.length) {
    const enrichedItems = await enrichLineItems(cart?.items, cart?.region_id);
    cart.items = enrichedItems as LineItem[];
  }

  return cart;
};

interface CheckoutProps {
  params: { lang: string; locale: string };
}

export default async function Checkout({
  params: { lang, locale },
}: CheckoutProps) {
  const cartId = cookies().get('_medusa_cart_id')?.value;

  if (!cartId) {
    return notFound();
  }

  const cart = await fetchCart();

  if (!cart) {
    return notFound();
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_416px] content-container gap-x-40 py-12">
      <Wrapper cart={cart}>
        <CheckoutForm />
      </Wrapper>
      <CheckoutSummary lang={lang} />
    </div>
  );
}
