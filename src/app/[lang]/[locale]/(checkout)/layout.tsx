import LocalizedClientLink from '@modules/common/components/localized-client-link';
import ChevronDown from '@modules/common/icons/chevron-down';
import { getDictionary } from 'app/[lang]/dictionaries';

export default async function CheckoutLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const dictionary = await getDictionary(lang);
  const dictionaryCheckout = dictionary.checkout;

  return (
    <div className="w-full bg-white relative lg:min-h-screen">
      <div className="h-16 bg-white border-b ">
        <nav className="flex h-full items-center content-container justify-between">
          <LocalizedClientLink
            href="/cart"
            className="text-small-semi text-ui-fg-base flex items-center gap-x-2 uppercase flex-1 basis-0"
          >
            <ChevronDown className="rotate-90" size={16} />
            <span className="mt-px hidden lg:block txt-compact-plus text-ui-fg-subtle hover:text-ui-fg-base ">
              {dictionaryCheckout.backToCart}
            </span>
            <span className="mt-px block lg:hidden txt-compact-plus text-ui-fg-subtle hover:text-ui-fg-base">
              {dictionary.common.back}
            </span>
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/"
            className="txt-compact-xlarge-plus text-ui-fg-subtle hover:text-ui-fg-base uppercase"
          >
            Groccia
          </LocalizedClientLink>
          <div className="flex-1 basis-0" />
        </nav>
      </div>
      <div className="relative">{children}</div>
      <div className="py-4 w-full flex items-center justify-center"></div>
    </div>
  );
}
