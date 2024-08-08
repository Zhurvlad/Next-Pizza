import { Ingredient, ProductVariations } from "@prisma/client";
import { calcTotalPizzaPrice } from ".";
import { mapPizzaType, PizzaSize, PizzaType } from "../constance/pizza";

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
