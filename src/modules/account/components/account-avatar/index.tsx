import type { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { getNameInitial } from '@lib/util/get-name-initial';
import Image from 'next/image';
import React from 'react';

type Props = {
  src?: string | StaticImport;
  alt?: string;
  name?: string;
};

const AccountAvatar = ({ src, alt, name = '' }: Props) => {
  const initial = getNameInitial(name);

  return (
    <>
      {src ? (
        <Image
          src={src}
          alt={alt || ''}
          fill
          className="object-cover rounded-full"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      ) : (
        <div className="h-full w-full bg-primary rounded-full">
          <span className="absolute w-full h-full flex justify-center items-center font-raleway font-bold text-4xl text-white">
            {initial}
          </span>
        </div>
      )}
    </>
  );
};

export default React.memo(AccountAvatar, (prevProps, nextProps) => {
  return prevProps.src === nextProps.src && prevProps.name === nextProps.name;
});
