import { getFooter } from '@lib/data/content';
import FooterNav from '@modules/layout/components/footer-nav';

interface FooterProps {
  lang: string;
  locale: string;
}

export default async function Footer({ lang, locale }: FooterProps) {
  const footerContent = await getFooter(lang);

  const navElements = [
    { heading: 'aboutCompany', footerHandler: 'about_company' },
    { heading: 'socialMedia', footerHandler: 'social_links' },
    { heading: 'storeList', footerHandler: 'store_list' },
    { heading: 'policyLinks', footerHandler: 'policy_links' },
  ];

  return (
    <>
      <footer className="mt-5 w-full footer p-10 bg-primary">
        {navElements.map((element) => (
          <FooterNav
            lang={lang}
            locale={locale}
            heading={element.heading}
            footerHandler={element.footerHandler}
          />
        ))}
      </footer>
      <footer className="footer px-10 py-4 border-t-2 border-secondary-foreground bg-primary">
        <aside className="items-center grid-flow-col">
          <p className="text-primary-foreground">
            <span className="font-gotag text-2xl">Groccia</span>
            <br />
            {footerContent && footerContent.data?.footer?.description}
            <br />
          </p>
        </aside>
      </footer>
    </>
  );
}
