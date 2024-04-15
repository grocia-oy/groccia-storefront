import { LineItem } from "@medusajs/medusa"

import { enrichLineItems, retrieveCart } from "@modules/cart/actions"

import CartDropdown from "../cart-dropdown"
import { getDictionary } from 'app/[lang]/dictionaries';

const fetchCart = async () => {
  const cart = await retrieveCart()

  if (cart?.items.length) {
    const enrichedItems = await enrichLineItems(cart?.items, cart?.region_id)
    cart.items = enrichedItems as LineItem[]
  }

  return cart
}

export default async function CartButton({ lang }: { lang: string }) {
  const cart = await fetchCart();
  const dict = await getDictionary(lang).catch(() => {});

  return <CartDropdown cart={cart} dict={dict} />;
}
