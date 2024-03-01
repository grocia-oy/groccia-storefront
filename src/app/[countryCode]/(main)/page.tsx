import { Metadata } from "next"
import Hero from "@modules/home/components/hero"
import { getRegion } from "app/actions"
import { getHomePage } from "@lib/data/content"

export const metadata: Metadata = {
  title: "Groccia: Best way to shop Asian groceries",
  description: "",
}

export default async function Home({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  const homepage = await getHomePage(countryCode)

  return (
    <>
      <Hero carousel={homepage.data.attributes.hero_carousel}/>
      <div className="py-12">
        <ul className="flex flex-col gap-x-6">
        </ul>
      </div>
    </>
  )
}
