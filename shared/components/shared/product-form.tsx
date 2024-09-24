"use client";
import React from "react";
import toast from "react-hot-toast";

import { useCartStore } from "@/shared/store";

import { ProductWithRelations } from "@/@types/prisma";

import { ChoosePizzaForm } from "./choose-pizza-form";
import { ChooseProductForm } from "./choose-product-form";

interface Props {
  product: ProductWithRelations;
  onSubmit?: VoidFunction;
}

export const ProductForm: React.FC<Props> = ({
  product,
  onSubmit: __onSubmit,
}) => {
  const [addCartItem, loading] = useCartStore((state) => [
    state.addCartItem,
    state.loading,
  ]);

  const firstItem = product.variations[0];
  const isPizzaForm = Boolean(firstItem.pizzaType);

  const onSubmit = async (
    productVariantId?: number,
    ingredients?: number[]
  ) => {
    try {
      const variantId = productVariantId ?? firstItem.id;

      await addCartItem({
        productVariationsId: variantId,
        ingredientsIds: ingredients,
      });

      toast.success(product.name + " добавлена в корзину");
      __onSubmit?.();
    } catch (error) {
      toast.error("Произошла ошибка при добавлении товара в корзину");
      console.log(error);
    }
  };

  if (isPizzaForm) {
    return (
      <ChoosePizzaForm
        imageUrl={product.imageUrl}
        name={product.name}
        ingredients={product.ingredients}
        variations={product.variations}
        onClickAddCart={onSubmit}
        loading={loading}
      />
    );
  }

  return (
    <ChooseProductForm
      imageUrl={product.imageUrl}
      name={product.name}
      onClickAdd={onSubmit}
      price={firstItem.price}
      loading={loading}
    />
  );
};
