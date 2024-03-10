import { Metadata } from 'next';
import Hero from '@modules/home/components/hero';
import { getRegion } from 'app/actions';
import { getHomePageFull, getHomepageSeo } from '@lib/data/content';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params: { lang },
}: {
  params: { locale: string; lang: string };
}): Promise<Metadata> {
  // read route params
  const homepage = await getHomepageSeo(lang);
  const seo = homepage?.data?.seo;

  return {
    title: seo?.metaTitle,
    keywords: seo?.keywords,
    description: seo?.metaDescription,
    robots: seo?.metaRobots,
  };
}

export default async function Home({
  params: { locale, lang },
}: {
  params: { locale: string; lang: string };
}) {
  const region = await getRegion(locale);
  const homepage = await getHomePageFull(lang);

  if (!region) {
    return notFound();
  }

  return (
    <>
      <Hero carousel={homepage?.data?.hero_carousel} />
    </>
  );
}
