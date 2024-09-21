import React from "react";
import { useSet } from "react-use";

import { ProductVariations } from "@prisma/client";

import { PizzaSize, PizzaType } from "../constance/pizza";

import { getAvailablePizzaSize } from "../lib";

import { Variant } from "../components/shared/group-variants";

interface ReturnProps {
  size: PizzaSize;
  type: PizzaType;
  setSize: (size: PizzaSize) => void;
  setType: (type: PizzaType) => void;
  selectedIngredients: Set<number>;
  addIngredients: (id: number) => void;
  availableSizes: Variant[];
  currentVariationsId?: number;
}

export const usePizzaOptions = (
  variations: ProductVariations[]
): ReturnProps => {
  const [size, setSize] = React.useState<PizzaSize>(20);
  const [type, setType] = React.useState<PizzaType>(1);

  const currentVariationsId = variations.find(
    (item) => item.pizzaType === type && item.size === size
  )?.id;

  const [selectedIngredients, { toggle: addIngredients }] = useSet(
    new Set<number>([])
  );

  /*Проверяем существование вариации пиццы. Если такой нет то переключаем на существующую.*/
  const availableSizes = getAvailablePizzaSize(type, variations);

  React.useEffect(() => {
    const isAvailableSize = availableSizes?.find(
      (item) => Number(item.value) === size && !item.disabled
    );
    const availableSize = availableSizes?.find((item) => !item.disabled);
    if (!isAvailableSize && availableSize) {
      setSize(Number(availableSize.value) as PizzaSize);
    }
  }, [type]);

  return {
    size,
    type,
    setSize,
    setType,
    selectedIngredients,
    addIngredients,
    availableSizes,
    currentVariationsId,
  };
};
