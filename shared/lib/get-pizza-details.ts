import { Ingredient, ProductVariations } from "@prisma/client";

import { mapPizzaType, PizzaSize, PizzaType } from "../constance/pizza";

import { calcTotalPizzaPrice } from ".";

interface ReturnProps {
  textDetaills: string;
  totalPrice: number;
}

export const getPizzaDetails = (
  type: PizzaType,
  size: PizzaSize,
  variations: ProductVariations[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
): ReturnProps => {
  const totalPrice = calcTotalPizzaPrice(
    type,
    size,
    variations,
    ingredients,
    selectedIngredients
  );
  const textDetaills = `${size} см, ${mapPizzaType[type]} тесто `;

  return {
    totalPrice,
    textDetaills,
  };
};
