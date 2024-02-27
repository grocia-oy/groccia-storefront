"use client"
import React, { Fragment, useEffect, useState } from "react"
import Link from "next/link"

type Props = {
  announcements: { url: string; text: string; openInNewTab: boolean }[]
}

export default function AnnouncementBar({ announcements }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (announcements) {
      const interval = setInterval(() => {
        setCurrentIndex(
          (currentIndex) => (currentIndex + 1) % announcements?.length
        )
      }, 10000)

      return () => clearInterval(interval)
    }
  }, [announcements, announcements?.length])

  if (!announcements || announcements.length === 0) {
    return <Fragment />
  }

  return (
    <div className="flex items-center justify-center w-full bg-primary h-9">
      <div className="container inline-flex justify-center">
        <Link
          href={announcements[currentIndex].url || "/"}
          target={announcements[currentIndex].openInNewTab ? "_blank" : ""}
        >
          <h3 className="font-medium text-white font-roboto text-lg">
            {announcements[currentIndex].text}
          </h3>
        </Link>
      </div>
    </div>
  )
}
