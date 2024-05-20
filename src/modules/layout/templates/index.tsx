import React from 'react';
import AnnouncementBar from '@modules/layout/components/announcement-bar';
import Footer from '@modules/layout/templates/footer';
import Nav from '@modules/layout/templates/nav';
import FlyoutNav from './flyout-nav';
import { getCustomer } from '@lib/data/ecommerce';
import { getGlobalAnnouncementBar } from '@lib/data/content';

const Layout: React.FC<{
  children: React.ReactNode;
  lang: string;
  locale: string;
}> = async (props) => {
  const customer = await getCustomer().catch(() => null);
  const content = await getGlobalAnnouncementBar(props.lang).then(
    (content) => content.data?.announcement_bar
  );

  return (
    <div lang={props.lang} className="flex flex-col min-h-screen">
      <div className="sticky top-0 inset-x-0 z-10">
        <AnnouncementBar content={content} />
        <div className="shadow-md">
          <Nav lang={props.lang} locale={props.locale} customer={customer} />
          <FlyoutNav lang={props.lang} locale={props.locale} />
        </div>
      </div>
      <div className="relative flex-1">{props.children}</div>
      <Footer lang={props.lang} locale={props.locale} />
    </div>
  );
};

export default Layout;
