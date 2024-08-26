import React from "react";
import { CheckoutItem, CheckoutItemSkeleton, WhiteBlock } from "..";
import { getCartItemDetails } from "@/shared/lib";
import { PizzaSize, PizzaType } from "@/shared/constance/pizza";
import { CartStateItem } from "@/shared/lib/get-cart-details";

interface Props {
  className?: string;
  items: CartStateItem[];
  loading?: boolean;
  removeCartItem: (id: number) => void;
  onClickCountButton: (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => void;
}

export const CheckoutCart: React.FC<Props> = ({
  className,
  items,
  removeCartItem,
  onClickCountButton,
  loading,
}) => {
  return (
    <WhiteBlock title="1. Корзина" className={className}>
      <div className="flex flex-col gap-5">
        {loading &&
          [...Array(4)].map((_, index) => <CheckoutItemSkeleton key={index} />)}
        {!loading &&
          items.length > 0 &&
          items.map((item) => (
            <CheckoutItem
              key={item.id}
              id={item.id}
              imageUrl={item.imageUrl}
              details={getCartItemDetails(
                item.ingredients,
                item.pizzaType as PizzaType,
                item.pizzaSize as PizzaSize
              )}
              name={item.name}
              disabled={item.disabled}
              price={item.price}
              quantity={item.quantity}
              onRemove={() => removeCartItem(item.id)}
              onClickCountButton={(type) =>
                onClickCountButton(item.id, item.quantity, type)
              }
            />
          ))}
      </div>
    </WhiteBlock>
  );
};
