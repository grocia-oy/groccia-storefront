import { Metadata } from "next"
import Hero from "@modules/home/components/hero"
import { getRegion } from "app/actions"
import { getHomePage } from "@lib/data/content"
import { notFound } from "next/navigation"

export async function generateMetadata({
  params,
}: {
  params: { countryCode: string }
}): Promise<Metadata> {
  // read route params
  const countryCode = params.countryCode
  const homepage = await getHomePage(countryCode, ["seo"])
  const seo = homepage?.data?.seo

  return {
    title: seo?.metaTitle,
    keywords: seo?.keywords,
    description: seo?.metaDescription,
    robots: seo?.metaRobots
  }
}

export default async function Home({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  const region = await getRegion(countryCode)
  const homepage = await getHomePage(countryCode, [
    "hero_carousel.image",
    "hero_carousel.buttons",
  ])

  if (!region) {
    return notFound()
  }

  return (
    <>
      <Hero carousel={homepage?.data?.hero_carousel} />
    </>
  )
}
