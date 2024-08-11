import { Ingredient } from "@prisma/client";
import { PizzaType, PizzaSize, mapPizzaType } from "../constance/pizza";

export const getCartItemDetails = (
  pizzaType: PizzaType,
  pizzaSize: PizzaSize,
  ingredients: Ingredient[]
): string => {
  const details = [];

  if (pizzaSize && pizzaType) {
    const typeName = mapPizzaType[pizzaType];
    details.push(`${typeName}  ${pizzaSize} см`);
  }

  if (ingredients) {
    details.push(...ingredients.map((i) => i.name));
  }

  return details.join(", ");
};
