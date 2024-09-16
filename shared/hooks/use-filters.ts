import React from "react";
import { useSet } from "react-use";
import { useSearchParams } from "next/navigation";

interface PriceRangeProps {
  priceFrom?: number;
  priceTo?: number;
}

interface QueryFilters extends PriceRangeProps {
  ingredients: string;
  sizes: string;
  pizzaTypes: string;
}

export interface Filters {
  sizes: Set<string>;
  pizzaTypes: Set<string>;
  prices: PriceRangeProps;
  selectedIngredients: Set<string>;
}

interface ReturnProps extends Filters {
  setPrices: (name: keyof PriceRangeProps, value: number) => void;
  setPizzaType: (value: string) => void;
  setPizzaSize: (value: string) => void;
  setIngredients: (value: string) => void;
  updatePrice: (name: keyof PriceRangeProps, value: number) => void;
}

export const useFilters = (): ReturnProps => {
  const searchParams = useSearchParams() as unknown as Map<
    keyof QueryFilters,
    string
  >;

  /* Достаём при первом рендере Query параметры и если они есть то вшиваем их в стейт */

  /*Фильтр ингредиентов */
  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
    new Set<string>(searchParams.get("ingredients")?.split(","))
  );

  /*Фильтр цены */
  const [prices, setPrices] = React.useState<PriceRangeProps>({
    priceFrom: Number(searchParams.get("priceFrom")) || undefined,
    priceTo: Number(searchParams.get("priceTo")) || undefined,
  });

  /*Фильтр размеров */
  const [sizes, { toggle: toggleSizes }] = useSet(
    new Set<string>(
      searchParams.has("sizes") ? searchParams.get("sizes")?.split(",") : []
    )
  );

  /*Фильтр ьтпов */
  const [pizzaTypes, { toggle: togglePizzaType }] = useSet(
    new Set<string>(
      searchParams.has("pizzaTypes")
        ? searchParams.get("pizzaTypes")?.split(",")
        : []
    )
  );

  const updatePrice = (name: keyof PriceRangeProps, value: number) => {
    setPrices((prev) => ({ ...prev, [name]: value }));
  };

  return React.useMemo(
    () => ({
      sizes,
      pizzaTypes,
      prices,
      selectedIngredients,
      setPrices: updatePrice,
      setPizzaType: togglePizzaType,
      setPizzaSize: toggleSizes,
      setIngredients: toggleIngredients,
      updatePrice,
    }),
    [sizes, pizzaTypes, prices, selectedIngredients]
  );
};
