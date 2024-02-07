import { Metadata } from "next"

import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav"
import AnnouncementBar from "@modules/layout/components/announcement-bar"
import { getGlobal } from "@lib/data/content"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:8000"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
}

export default async function PageLayout(props: {
  children: React.ReactNode
  params: { countryCode: string }
}) {
  const globalContent = await getGlobal(props.params.countryCode)

  return (
    <>
      <AnnouncementBar announcements={globalContent?.data.attributes?.announcement_bar} />
      <Nav />
      {props.children}
      <Footer />
    </>
  )
}
