import { Ingredient } from "@prisma/client";
import { PizzaType, PizzaSize, mapPizzaType } from "../constance/pizza";
import { CartStateItem } from "./get-cart-details";

export const getCartItemDetails = (
  ingredients: CartStateItem["ingredients"],
  pizzaType?: PizzaType,
  pizzaSize?: PizzaSize
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
