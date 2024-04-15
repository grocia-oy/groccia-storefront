import React, { ReactNode } from 'react';

/**
 * Use this component to create a Next.js `<Link />` that persists the current country code in the url,
 * without having to explicitly pass it as a prop.
 */
const LocalizedServerLink = ({
  lang,
  locale,
  children,
  linkProps,
}: {
  lang: string;
  locale: string;
  children: ReactNode;
  linkProps: React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >;
}) => {
  const { href, ...props } = linkProps;
  const correctedHref = href?.startsWith('http')
    ? href
    : `/${lang}/${locale}${href}`;

  return (
    <a href={correctedHref} {...props}>
      {children}
    </a>
  );
};

export default LocalizedServerLink;
