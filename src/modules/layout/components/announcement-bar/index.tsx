import React, { Fragment } from 'react';
import Link from 'next/link';

type AnnouncementBarProps = {
  content: any;
};

export default function AnnouncementBar({ content }: AnnouncementBarProps) {
  if (!content) {
    return <Fragment />;
  }

  return (
    <div className="flex items-center justify-center w-full bg-primary h-9">
      <div className="container inline-flex justify-center">
        <Link href={content.url || '/'} target={content.target}>
          <h3 className="font-medium text-white font-poppins">
            {content.text}
          </h3>
        </Link>
      </div>
    </div>
  );
}
