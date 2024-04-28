import { getFooter } from '@lib/data/content';
import LocalizedServerLink from '@modules/common/components/localized-server-link';
import { getDictionary } from 'app/[lang]/dictionaries';
import { StrapiLinkComponent } from 'types/strapi';

interface Props {
  lang: string;
  locale: string;
}

const headingClasses = 'mb-2 font-bold uppercase text-primary-foreground';
const linkClasses = 'text-primary-foreground';

export default async function Footer({ lang, locale }: Props) {
  const footerContent = await getFooter(lang);
  const dict = await getDictionary(lang).catch(() => {});

  return (
    <>
      <footer className="mt-5 w-full footer p-10 bg-primary">
        <nav>
          <h6 className={headingClasses}>
            {dict?.layout.footer.headings.aboutCompany}
          </h6>
          {footerContent &&
            footerContent.data?.footer?.about_company?.map(
              (element: StrapiLinkComponent) => (
                <LocalizedServerLink
                  lang={lang}
                  locale={locale}
                  linkProps={{
                    href: element.url,
                    target: element.target || '_self',
                    className: linkClasses,
                  }}
                >
                  {element.title}
                </LocalizedServerLink>
              )
            )}
        </nav>
        <nav>
          <h6 className={headingClasses}>
            {dict?.layout.footer.headings.storeList}
          </h6>
          {footerContent &&
            footerContent.data?.footer?.store_list?.map(
              (element: StrapiLinkComponent) => (
                <LocalizedServerLink
                  lang={lang}
                  locale={locale}
                  linkProps={{
                    href: element.url,
                    target: element.target || '_self',
                    className: linkClasses,
                  }}
                >
                  {element.title}
                </LocalizedServerLink>
              )
            )}
        </nav>
        <nav>
          <h6 className={headingClasses}>
            {dict?.layout.footer.headings.policyLinks}
          </h6>
          {footerContent &&
            footerContent.data?.footer?.policy_links?.map(
              (element: StrapiLinkComponent) => (
                <LocalizedServerLink
                  lang={lang}
                  locale={locale}
                  linkProps={{
                    href: element.url,
                    target: element.target || '_self',
                    className: linkClasses,
                  }}
                >
                  {element.title}
                </LocalizedServerLink>
              )
            )}
        </nav>
      </footer>
      <footer className="footer px-10 py-4 border-t-2 border-secondary-foreground bg-primary">
        <aside className="items-center grid-flow-col">
          <p className='text-primary-foreground'>
            <span className="font-gotag text-2xl">Groccia</span>
            <br />
            Fastest, convenient online Asian grocery market
            <br />
          </p>
        </aside>
      </footer>
    </>
  );
}
