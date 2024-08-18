"use client";

import React from "react";
import { cn } from "@/shared/lib/utils";
import { Title } from "./title";
import { Button } from "../ui";
import { PizzaImage } from "./pizza-image";
import { GroupVariants } from "./group-variants";
import { PizzaSize, pizzaType, PizzaType } from "@/shared/constance/pizza";
import { Ingredient, ProductVariations } from "@prisma/client";
import { IngredientItem } from ".";
import { usePizzaOptions } from "@/shared/hooks";
import { getPizzaDetails } from "@/shared/lib";

interface Props {
  className?: string;
  imageUrl: string;
  name: string;
  onClickAddCart: (itemId: number, ingredientsIds: number[]) => void;
  ingredients: Ingredient[];
  variations: ProductVariations[];
  loading?: boolean;
}

export const ChoosePizzaForm: React.FC<Props> = ({
  className,
  variations,
  onClickAddCart,
  imageUrl,
  name,
  ingredients,
  loading,
}) => {
  const {
    type,
    size,
    setSize,
    setType,
    selectedIngredients,
    addIngredients,
    availableSizes,
    currentVariationsId,
  } = usePizzaOptions(variations);

  const handleAddToCart = () => {
    if (currentVariationsId) {
      onClickAddCart(currentVariationsId, Array.from(selectedIngredients));
    }
  };

  const { textDetaills, totalPrice } = getPizzaDetails(
    type,
    size,
    variations,
    ingredients,
    selectedIngredients
  );

  return (
    <div className={cn(className, "flex flex-1")}>
      <PizzaImage imageUrl={imageUrl} size={size} />
      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className="text-gray-400">{textDetaills}</p>

        <div className="flex flex-col gap-3 mt-5">
          <GroupVariants
            items={availableSizes}
            value={String(size)}
            onClick={(value) => setSize(Number(value) as PizzaSize)}
          />
          <GroupVariants
            items={pizzaType}
            value={String(type)}
            onClick={(value) => setType(Number(value) as PizzaType)}
          />
          <div className="bg-gray p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
            <div className="grid grid-cols-3 gap-3">
              {ingredients.map((ingredient) => (
                <IngredientItem
                  key={ingredient.id}
                  name={ingredient.name}
                  price={ingredient.price}
                  imageUrl={ingredient.imageUrl}
                  active={selectedIngredients.has(ingredient.id)}
                  onClick={() => addIngredients(ingredient.id)}
                />
              ))}
            </div>
          </div>
        </div>
        <Button
          loading={loading}
          onClick={handleAddToCart}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
        >
          Добавить в корзину за {totalPrice}
        </Button>
      </div>
    </div>
  );
};
