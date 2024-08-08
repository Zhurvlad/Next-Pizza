import { Ingredient, Product, ProductVariations } from "@prisma/client";

export type ProductWithRelations = Product & {
  ingredients: Ingredient[];
  variations: ProductVariations[];
};
