import { Image as MedusaImage } from '@medusajs/medusa';
import { clx } from '@medusajs/ui';
import Image from 'next/image';
import React from 'react';

import PlaceholderImage from '@modules/common/icons/placeholder-image';
import { ThumbnailSize } from 'types/medusa';

type ThumbnailProps = {
  thumbnail?: string | null;
  images?: MedusaImage[] | null;
  size?: ThumbnailSize;
  isFeatured?: boolean;
  className?: string;
};

const Thumbnail: React.FC<ThumbnailProps> = ({
  thumbnail,
  images,
  size = ThumbnailSize.SMALL,
  isFeatured,
  className,
}) => {
  const initialImage = thumbnail || images?.[0]?.url;

  return (
    <div
      className={clx('relative w-full overflow-hidden rounded-md', className, {
        'aspect-[11/14]': isFeatured,
        'aspect-[9/16]': !isFeatured && size !== ThumbnailSize.SQUARE,
        'aspect-[1/1]': size === ThumbnailSize.SQUARE,
        'w-[180px]': size === ThumbnailSize.SMALL,
        'w-[290px]': size === ThumbnailSize.MEDIUM,
        'w-[440px]': size === ThumbnailSize.LARGE,
        'w-full': size === ThumbnailSize.FULL,
      })}
    >
      <ImageOrPlaceholder image={initialImage} size={size} />
    </div>
  );
};

const ImageOrPlaceholder = ({
  image,
  size,
}: Pick<ThumbnailProps, 'size'> & { image?: string }) => {
  return image ? (
    <Image
      src={image}
      alt="Thumbnail"
      className="absolute object-contain object-center"
      draggable={false}
      quality={50}
      fill
    />
  ) : (
    <div className="w-full h-full absolute inset-0 flex items-center justify-center">
      <PlaceholderImage size={size === ThumbnailSize.SMALL ? 16 : 24} />
    </div>
  );
};

export default Thumbnail;
