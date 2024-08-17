import {
  Cart,
  CartItem,
  Ingredient,
  Product,
  ProductVariations,
} from "@prisma/client";

export type CartItemDTO = CartItem & {
  productVariantions: ProductVariations & {
    product: Product;
  };
  ingredients: Ingredient[];
};

export interface CartDTO extends Cart {
  items: CartItemDTO[];
}

export interface CreateCartVariationsValues {
  productVariationId: number;
  ingredientsIds?: number[];
  quantity: number;
}
