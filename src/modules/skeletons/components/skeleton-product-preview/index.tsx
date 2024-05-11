import { Skeleton } from '@modules/common/components/ui/skeleton';
import SkeletonThumbnail from '../skeleton-thumbnail';
import { ThumbnailSize } from 'types/medusa';

const SkeletonProductPreview = () => {
  return (
    <div className="relative">
      <div>
        <SkeletonThumbnail size={ThumbnailSize.SQUARE} />
      </div>
      <div className="mt-4 flex flex-col justify-between gap-1">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
      </div>
    </div>
  );
};

export default SkeletonProductPreview;
