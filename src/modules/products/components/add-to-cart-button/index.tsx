'use client';

import React from 'react';
import { PricedVariant } from '@medusajs/medusa/dist/types/pricing';
import { Region } from '@medusajs/medusa';
import { addToCart } from '@modules/cart/actions';
import { IconButton } from '@medusajs/ui';
import { Plus } from '@medusajs/icons';

interface Props {
  variant: PricedVariant;
  region: Region;
  countryCode: string;
  inStock: boolean | undefined;
}

function AddToCartButton({ variant, region, countryCode, inStock }: Props) {
  const [isAdding, setIsAdding] = React.useState(false);

  const handleAddToCart = async (event: any) => {
    event.preventDefault();

    if (!variant?.id) return;

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
        disabled={!inStock || !variant || isAdding}
        variant="primary"
        isLoading={isAdding}
        className="absolute top-2 right-2 rounded-full bg-primary-default hover:bg-primary-700 p-0 text-white"
        size={'xlarge'}
      >
        <Plus />
      </IconButton>
    </>
  );
}

export default AddToCartButton;
