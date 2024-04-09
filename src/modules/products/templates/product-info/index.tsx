import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';
import { Heading, Text } from '@medusajs/ui';
import LocalizedClientLink from '@modules/common/components/localized-client-link';

type ProductInfoProps = {
  product: PricedProduct;
};

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div id="product-info">
      <div className="flex flex-col gap-y-1">
        {product.collection && (
          <LocalizedClientLink
            href={`/collections/${product.collection.handle}`}
            className="text-medium text-poppins hover:text-ui-fg-subtle"
          >
            {product.collection.title}
          </LocalizedClientLink>
        )}
        <Heading level="h2" className="text-poppins text-3xl leading-10">
          {product.title}
        </Heading>

        <Text className="text-medium text-poppins">{product.description}</Text>
      </div>
    </div>
  );
};

export default ProductInfo;
