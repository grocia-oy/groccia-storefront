import { Region as MedusaRegion, ProductVariant } from '@medusajs/medusa';
import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';

export type Variant = Omit<ProductVariant, 'beforeInsert'>;

export interface Region extends Omit<MedusaRegion, 'beforeInsert'> {}

export type CalculatedVariant = ProductVariant & {
  calculated_price: number;
  calculated_price_type: 'sale' | 'default';
  original_price: number;
};

export type ExpandedPricedProduct = PricedProduct & {
  metadata: {
    allergy?: string;
  };
};
