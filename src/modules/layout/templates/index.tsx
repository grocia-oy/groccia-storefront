import React from 'react';
import AnnouncementBar from '@modules/layout/components/announcement-bar';
import Footer from '@modules/layout/templates/footer';
import Nav from '@modules/layout/templates/nav';
import FlyoutNav from './flyout-nav';
import { getCustomer } from '@lib/data/ecommerce';

const Layout: React.FC<{
  children: React.ReactNode;
  lang: string;
  locale: string;
}> = async (props) => {
  const customer = await getCustomer().catch(() => null);

  return (
    <div lang={props.lang}>
      <div className="sticky top-0 inset-x-0 z-10">
        <AnnouncementBar />
        <Nav lang={props.lang} customer={customer} />
        <FlyoutNav lang={props.lang} locale={props.locale} />
      </div>
      <div className="relative">{props.children}</div>
      <Footer lang={props.lang} locale={props.locale} />
    </div>
  );
};

export default Layout;
