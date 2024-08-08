import React from "react";
import { cn } from "@/shared/lib/utils";
import { Title } from "./title";
import { Button } from "../ui";
import { ProductWithRelations } from "@/@types/prisma";
import { PizzaImage } from "./pizza-image";
import { products } from "@/prisma/constants";
import { GroupVariants } from "./group-variants";
import {
  mapPizzaType,
  PizzaSize,
  pizzaSizes,
  pizzaType,
  PizzaType,
} from "@/shared/constance/pizza";
import { Ingredient, ProductVariations } from "@prisma/client";
import { IngredientItem } from ".";
import { useSet } from "react-use";

interface Props {
  className?: string;
  imageUrl: string;
  name: string;
  onClickAddCart?: VoidFunction;
  ingredients: Ingredient[];
  variations: ProductVariations[];
}

export const ChoosePizzaForm: React.FC<Props> = ({
  className,
  variations,
  onClickAddCart,
  imageUrl,
  name,
  ingredients,
}) => {
  const [size, setSize] = React.useState<PizzaSize>(20);
  const [type, setType] = React.useState<PizzaType>(1);
  const [selectedIngredients, { toggle: addIngredients }] = useSet(
    new Set<number>([])
  );

  const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((sum, obj) => obj.price + sum, 0);
  const pizzaPrice =
    variations.find((item) => item.size === size && item.pizzaType === type)
      ?.price || 0;

  const handleAddToCart = () => {
    onClickAddCart?.();
    console.log({ selectedIngredients, size, type });
  };

  const availablePizzas = variations.filter((item) => item.pizzaType === type);

  const availablePizzaSizes = pizzaSizes.map((item) => ({
    name: item.name,
    value: item.value,
    disabled: !availablePizzas.some(
      (pizza) => Number(pizza.size) === Number(item.value)
    ),
  }));

  React.useEffect(() => {
    const isAvailableSize = availablePizzaSizes?.find(
      (item) => Number(item.value) === size && !item.disabled
    );
    const availableSize = availablePizzaSizes?.find((item) => !item.disabled);
    if (!isAvailableSize && availableSize) {
      setSize(Number(availableSize.value) as PizzaSize);
    }
  }, [type]);

  const textDetaills = `${size} см, ${mapPizzaType[type]} тесто `;
  const totalPrice = pizzaPrice + totalIngredientsPrice;

  return (
    <div className={cn(className, "flex flex-1")}>
      <PizzaImage imageUrl={imageUrl} size={size} />
      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className="text-gray-400">{textDetaills}</p>

        <div className="flex flex-col gap-3 mt-5">
          <GroupVariants
            items={availablePizzaSize}
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
          onClick={handleAddToCart}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
        >
          Добавить в корзину за {totalPrice}
        </Button>
      </div>
    </div>
  );
};
