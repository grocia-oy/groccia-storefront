import { Metadata } from "next"
import Layout from "@modules/layout/templates"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:8000"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
}

export default async function PageLayout(props: {
  children: React.ReactNode
}) {
  return (
    <>
      <Layout>{props.children}</Layout>
    </>
  )
}
