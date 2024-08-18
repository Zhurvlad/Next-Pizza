"use client";
import React from "react";
import { cn } from "@/shared/lib/utils";
import { ChooseProductForm, Title } from "..";
import { useRouter } from "next/navigation";
import { ProductWithRelations } from "@/@types/prisma";
import { ChoosePizzaForm } from "../choose-pizza-form";
import { Dialog, DialogContent } from "../../ui/dialog";
import { useCartStore } from "@/shared/store";
import toast from "react-hot-toast";

interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();
  const firstItem = product.variations[0];
  const isPizzaForm = Boolean(firstItem.pizzaType);
  const [addCartItem, loading] = useCartStore((state) => [
    state.addCartItem,
    state.loading,
  ]);

  // const onAddProduct = () => {
  //   addCartItem({
  //     productVariationId: firstItem.id,
  //   });
  // };

  // const onAddPizza = async (productItemId: number, ingredients: number[]) => {
  //   try {
  //     await addCartItem({
  //       productItemId,
  //       ingredients,
  //     });
  //     router.back();
  //     toast.success("Пицца добавлена в корзину");
  //   } catch (error) {
  //     toast.error("Произошла ошибка при добавлении в корзину");
  //     console.log(error);
  //   }
  // };

  const onSubmit = async (
    productVariantId?: number,
    ingredients?: number[]
  ) => {
    try {
      const variantId = productVariantId ?? firstItem.id;

      await addCartItem({
        productItemId: variantId,
        ingredients,
      });

      router.back();
      toast.success(product.name + " добавлена в корзину");
    } catch (error) {
      toast.error("Произошла ошибка при добавлении товара в корзину");
      console.log(error);
    }
  };

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          "p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden"
        )}
      >
        {isPizzaForm ? (
          <ChoosePizzaForm
            imageUrl={product.imageUrl}
            name={product.name}
            ingredients={product.ingredients}
            variations={product.variations}
            onClickAddCart={onSubmit}
            loading={loading}
          />
        ) : (
          <ChooseProductForm
            imageUrl={product.imageUrl}
            name={product.name}
            onClickAdd={onSubmit}
            price={firstItem.price}
            loading={loading}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
