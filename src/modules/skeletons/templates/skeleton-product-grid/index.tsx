import repeat from '@lib/util/repeat';
import SkeletonProductPreview from '@modules/skeletons/components/skeleton-product-preview';

const SkeletonProductGrid = () => {
  return (
    <ul className="grid grid-cols-2 w-full lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-6 gap-y-8">
      {repeat(8).map((index) => (
        <li key={index}>
          <SkeletonProductPreview />
        </li>
      ))}
    </ul>
  );
};

export default SkeletonProductGrid;
