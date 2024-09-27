import { ProductVariations } from "@prisma/client";

import { pizzaSizes, PizzaType } from "../constance/pizza";

import { Variant } from "../components/shared/group-variants";

export const getAvailablePizzaSize = (
  type: PizzaType,
  variations: ProductVariations[]
): Variant[] => {
  const filteredPizzasByType = variations.filter(
    (item) => item.pizzaType === type
  );

  return pizzaSizes.map((item) => ({
    name: item.name,
    value: item.value,
    disabled: !filteredPizzasByType.some(
      (pizza) => Number(pizza.size) === Number(item.value)
    ),
  }));
};
