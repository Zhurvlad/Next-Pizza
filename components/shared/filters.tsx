"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Title } from "./title";
import { CheckboxFiltersGroup, FilterCheckbox } from ".";
import { Input, RangeSlider } from "../ui";
import { useFilterIngredients } from "@/hooks/useFiltersIngredients";

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const { ingredients, loading, onAddId, selectedIds } = useFilterIngredients();

  const ingredientsItem = ingredients.map((item) => ({
    value: String(item.id),
    text: item.name,
  }));

  console.log(ingredientsItem);

  return (
    <div className={cn(className)}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />
      <div className="flex flex-col gap-4">
        <FilterCheckbox name="qwe" text="Можно собирать" value="1" />
        <FilterCheckbox name="qwert" text="Новинка" value="2" />
      </div>
      <div className="mt-5 border-y border-y-neytral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            defaultValue={0}
          />
          <Input type="number" min={100} max={1000} placeholder="1000" />
        </div>
        <RangeSlider min={0} max={5000} step={10} value={[0, 5000]} />
      </div>
      <CheckboxFiltersGroup
        title="Ингредиенты"
        className="mt-5"
        limit={6}
        defaultItems={ingredientsItem.slice(0, 6)}
        items={ingredientsItem}
        loading={loading}
        onClickCheckbox={onAddId}
        selectedIds={selectedIds}
        name="ingredients"
      />
    </div>
  );
};
