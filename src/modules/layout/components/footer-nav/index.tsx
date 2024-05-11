import LocalizedServerLink from '@modules/common/components/localized-server-link';
import { getFooter } from '@lib/data/content';
import { getDictionary } from 'app/[lang]/dictionaries';
import { StrapiLinkComponent } from 'types/strapi';

type FooterNavProps = {
  lang: string;
  locale: string;
  heading: string;
  footerHandler: string;
};

const headingClasses = 'mb-2 font-bold uppercase text-primary-foreground';
const linkClasses = 'text-primary-foreground';

async function FooterNav({
  lang,
  locale,
  heading,
  footerHandler,
}: FooterNavProps) {
  const footerContent = await getFooter(lang);
  const dictionary = await getDictionary(lang).catch(() => {});

  return (
    <nav>
      <h6 className={headingClasses}>
        {dictionary?.layout.footer.headings[heading]}
      </h6>
      {footerContent &&
        footerContent.data?.footer?.[footerHandler]?.map(
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
  );
}

export default FooterNav;
