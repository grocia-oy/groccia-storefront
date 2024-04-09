import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';
import { Badge } from '@medusajs/ui';

type ProductTagsProps = {
  product: PricedProduct;
};

const ProductTags = ({ product }: ProductTagsProps) => {
  return (
    <div className="flex flex-row gap-2 mt-4">
      {product.tags?.map((tag) => (
        <Badge>{tag.value}</Badge>
      ))}
    </div>
  );
};

export default ProductTags;
