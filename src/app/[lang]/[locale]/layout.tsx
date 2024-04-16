import { Metadata } from 'next';
import Layout from '@modules/layout/templates';
import { LocaleLevelProviders } from '../providers';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://localhost:8000';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
};

export default async function PageLayout(props: {
  children: React.ReactNode;
  params: { lang: string; locale: string };
}) {
  return (
    <>
      <LocaleLevelProviders lang={props.params.lang}>
        <Layout lang={props.params.lang} locale={props.params.locale}>
          {props.children}
        </Layout>
      </LocaleLevelProviders>
    </>
  );
}
