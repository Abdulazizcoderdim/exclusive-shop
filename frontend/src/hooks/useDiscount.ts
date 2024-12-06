import { ProductType } from '@/type';

export function useDiscount(product: ProductType) {
  return Math.round(
    ((product.price.originalPrice - product.price.currentPrice) /
      product.price.originalPrice) *
      100
  );
}
