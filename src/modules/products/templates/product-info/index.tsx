import { Heading, Text } from '@medusajs/ui';
import LocalizedClientLink from '@modules/common/components/localized-client-link';
import { ExpandedPricedProduct } from 'types/medusa';

type ProductInfoProps = {
  product: ExpandedPricedProduct;
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
        <div className="flex flex-col text-poppins gap-2">
          {product.description && (
            <div>
              <Text className="font-bold">Description</Text>
              <Text>{product.description}</Text>
            </div>
          )}
          {product.metadata?.allergy && (
            <div>
              <Text className="font-bold">Allergy information</Text>
              <Text>{product.metadata.allergy}</Text>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
