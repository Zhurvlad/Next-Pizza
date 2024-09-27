"use client";
import React from "react";

import { useFilters, useIngredients, useQueryFilters } from "@/shared/hooks";

import { cn } from "@/shared/lib/utils";

import { CheckboxFiltersGroup } from ".";
import { Input, RangeSlider } from "../ui";
import { Title } from "./title";

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const { ingredients, loading } = useIngredients();

  const filters = useFilters();

  useQueryFilters(filters);

  const ingredientsItem = ingredients.map((item) => ({
    value: String(item.id),
    text: item.name,
  }));

  const updatePrices = (prices: number[]) => {
    filters.setPrices("priceFrom", prices[0]);
    filters.setPrices("priceTo", prices[1]);
  };

  return (
    <div className={cn(className)}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

      <CheckboxFiltersGroup
        title="Типы пиццы"
        name="pizzaType"
        className="mb-5"
        onClickCheckbox={filters.setPizzaType}
        selected={filters.pizzaTypes}
        items={[
          { text: "Тонкое", value: "1" },
          { text: "Толстое", value: "2" },
        ]}
      />

      <CheckboxFiltersGroup
        title="Размеры"
        name="sizes"
        className="mb-5"
        onClickCheckbox={filters.setPizzaSize}
        selected={filters.sizes}
        items={[
          { text: "20 см", value: "20" },
          { text: "30 см", value: "30" },
          { text: "40 см", value: "40" },
        ]}
      />

      <div className="mt-5 border-y border-y-neytral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            onChange={(e) =>
              filters.setPrices("priceFrom", Number(e.target.value))
            }
            value={filters.prices.priceFrom}
          />
          <Input
            type="number"
            min={100}
            max={1000}
            placeholder="1000"
            value={filters.prices.priceTo}
            onChange={(e) =>
              filters.setPrices("priceTo", Number(e.target.value))
            }
          />
        </div>
        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[
            filters.prices.priceFrom || 0,
            filters.prices.priceTo || 1000,
          ]}
          onValueChange={updatePrices}
        />
      </div>
      <CheckboxFiltersGroup
        title="Ингредиенты"
        className="mt-5"
        limit={4}
        defaultItems={ingredientsItem.slice(0, 4)}
        items={ingredientsItem}
        loading={loading}
        onClickCheckbox={filters.setIngredients}
        selected={filters.selectedIngredients}
        name="ingredients"
      />
    </div>
  );
};
