import { Skeleton } from '@modules/common/components/ui/skeleton';

import { cn } from '@lib/util/ui-utils';
import { ThumbnailSize } from 'types/medusa';

type ThumbnailProps = {
  size?: ThumbnailSize;
  isFeatured?: boolean;
  className?: string;
};

const SkeletonThumbnail = ({
  size = ThumbnailSize.SMALL,
  isFeatured,
  className,
}: ThumbnailProps) => {
  return (
    <Skeleton
      className={cn('relative w-full overflow-hidden rounded-md', className, {
        'aspect-[11/14]': isFeatured,
        'aspect-[9/16]': !isFeatured && size !== ThumbnailSize.SQUARE,
        'aspect-[1/1]': size === ThumbnailSize.SQUARE,
        'w-[180px]': size === ThumbnailSize.SMALL,
        'w-[290px]': size === ThumbnailSize.MEDIUM,
        'w-[440px]': size === ThumbnailSize.LARGE,
        'w-full': size === ThumbnailSize.FULL,
      })}
    ></Skeleton>
  );
};

export default SkeletonThumbnail;
