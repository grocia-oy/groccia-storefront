import { fetchCart } from '@modules/cart/actions';

import CartDropdown from '../cart-dropdown';
import { getDictionary } from 'app/[lang]/dictionaries';

export default async function CartButton({ lang }: { lang: string }) {
  const cart = await fetchCart();
  const dict = await getDictionary(lang).catch(() => {});

  return <CartDropdown cart={cart} dict={dict} />;
}
