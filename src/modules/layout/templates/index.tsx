import React from 'react';
import AnnouncementBar from '@modules/layout/components/announcement-bar';
import Footer from '@modules/layout/templates/footer';
import Nav from '@modules/layout/templates/nav';

const Layout: React.FC<{
  children: React.ReactNode;
  lang: string;
  locale: string;
}> = (props) => {
  return (
    <div>
      <AnnouncementBar />
      <Nav />
      <main className="relative">{props.children}</main>
      <Footer lang={props.lang} locale={props.locale} />
    </div>
  );
};

export default Layout;
