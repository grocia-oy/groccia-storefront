'use client';

import { Heading } from '@medusajs/ui';

import Button from '@modules/common/components/button';
import CartTotals from '@modules/common/components/cart-totals';
import Divider from '@modules/common/components/divider';
import { CartWithCheckoutStep } from 'types/global';
import DiscountCode from '@modules/checkout/components/discount-code';
import LocalizedClientLink from '@modules/common/components/localized-client-link';
import { useDictionary } from '@lib/context/dictionary-context';

type SummaryProps = {
  cart: CartWithCheckoutStep;
};

const Summary = ({ cart }: SummaryProps) => {
  const dictionary = useDictionary();
  const dictionarySummary = dictionary.cartPage.summary;

  return (
    <div className="flex flex-col gap-y-4">
      <Heading level="h2" className="text-[2rem] leading-[2.75rem]">
        {dictionarySummary.heading}
      </Heading>
      <DiscountCode cart={cart} />
      <Divider />
      <CartTotals data={cart} />
      <LocalizedClientLink href={'/checkout?step=' + cart.checkout_step}>
        <Button className="w-full h-10 bg-primary hover:bg-primary">
          {dictionarySummary.goToCheckout}
        </Button>
      </LocalizedClientLink>
    </div>
  );
};

export default Summary;
