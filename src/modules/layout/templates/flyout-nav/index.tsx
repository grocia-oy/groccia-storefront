import { getFlyoutNav } from '@lib/data/content';
import LocalizedServerLink from '@modules/common/components/localized-server-link';
import FlyoutDropdown from '@modules/layout/components/flyout-dropdown';
import React from 'react';
import { StrapiNestedLinkComponent } from 'types/strapi';

type Props = {
  lang: string;
  locale: string;
};

async function FlyoutNav({ lang, locale }: Props) {
  const content = (await getFlyoutNav(lang))?.data?.flyout_nav;

  return (
    <header className="hidden md:block bg-background">
      <nav className="content-container">
        <div className="py-1">
          <ul className="flex items-center font-raleway space-x-8">
            {content &&
              content.map((menu: StrapiNestedLinkComponent) => (
                <li>
                  {menu?.child && menu.child?.length > 0 ? (
                    <FlyoutDropdown menu={menu} />
                  ) : (
                    <LocalizedServerLink
                      linkProps={{
                        className: 'text-lg',
                        href: menu.url,
                      }}
                      locale={locale}
                      lang={lang}
                    >
                      {menu.title}
                    </LocalizedServerLink>
                  )}
                </li>
              ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default FlyoutNav;
