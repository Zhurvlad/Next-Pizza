import { Ingredient, ProductVariations } from "@prisma/client";
import { PizzaSize, PizzaType } from "../constance/pizza";

/**
 * Функция подсчёта общей стоимости пиццы
 * @param type -  тип теста выбранной пиццы
 * @param size - размер выбранной пиццы
 * @param variations - список вариаций пицц
 * @param ingredients - список ингредиентов для пиццы
 * @param selectedIngredients - выбранные ингредиенты
 * @return - общая стоимость пиццы
 *
 * @return - number общая стоимость пиццы
 * **/

export const calcTotalPizzaPrice = (
  type: PizzaType,
  size: PizzaSize,
  variations: ProductVariations[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
) => {
  const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((sum, obj) => obj.price + sum, 0);

  const pizzaPrice =
    variations.find((item) => item.size === size && item.pizzaType === type)
      ?.price || 0;

  return pizzaPrice + totalIngredientsPrice;
};
