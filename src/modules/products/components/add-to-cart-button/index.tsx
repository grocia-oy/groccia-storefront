'use client';

import PlusCircle from '@modules/common/icons/plus-circle';
import React from 'react';
import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';
import { Region } from '@medusajs/medusa';
import { addToCart } from '@modules/cart/actions';
import { IconButton } from '@medusajs/ui';

interface Props {
  buttonProps: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;
  product: PricedProduct;
  region: Region;
  countryCode: string;
}

function AddToCartButton({ buttonProps, product, region, countryCode }: Props) {
  const [isAdding, setIsAdding] = React.useState(false);

  const variant = product.variants[0];

  const handleAddToCart = async (event: any) => {
    event.preventDefault();

    if (!variant.id) return;
    setIsAdding(true);
    await addToCart({
      variantId: variant.id,
      quantity: 1,
      countryCode: countryCode,
    });
    setIsAdding(false);
  };

  return (
    <>
      <IconButton
        onClick={handleAddToCart}
        disabled={!variant}
        variant="transparent"
        isLoading={isAdding}
        {...buttonProps}
        asChild={true}
        size={'xlarge'}
      >
        <PlusCircle />
      </IconButton>
    </>
  );
}

export default AddToCartButton;
