import { Metadata } from "next"
import localFont from "next/font/local"
import "styles/globals.css"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:8000"

// Fonts
const raleway = localFont({
  src: [
    {
      path: "../../public/fonts/Raleway/Raleway400.ttf",
      weight: "400",
    },
    {
      path: "../../public/fonts/Raleway/Raleway600.ttf",
      weight: "600",
    },
  ],
  variable: "--font-raleway",
})

const roboto = localFont({
  src: [
    {
      path: "../../public/fonts/Roboto/Roboto400.ttf",
      weight: "400",
    },
    { path: "../../public/fonts/Roboto/Roboto500.ttf", weight: "500" },
  ],
  variable: "--font-roboto",
})

const gotag = localFont({
  src: [{ path: "../../public/fonts/Gotag/Gotag.ttf", weight: "400" }],
  variable: "--font-gotag",
})

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-mode="light"
      className={`${raleway.variable} ${roboto.variable} ${gotag.variable}`}
    >
      <body>
        <main className="relative font-roboto">{props.children}</main>
      </body>
    </html>
  )
}
