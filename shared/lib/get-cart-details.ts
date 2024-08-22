import { Cart } from "@prisma/client";
import { CartDTO } from "../services/dto/cart.dto";
import { calcCartItemTotalPrice } from ".";

export type CartStateItem = {
  id: number;
  name: string;
  imageUrl: string;
  details?: string;
  price: number;
  quantity: number;
  disabled?: boolean;
  pizzaSize?: number | null;
  pizzaType?: number | null;
  ingredients: Array<{ name: string; price: number }>;
};

interface ReturnProps {
  items: CartStateItem[];
  totalAmount: number;
}

export const getCartDetails = (data: CartDTO): ReturnProps => {
  const items = data.items.map((item) => ({
    id: item.id,
    name: item.productVariantions.product.name,
    imageUrl: item.productVariantions.product.imageUrl,
    price: calcCartItemTotalPrice(item),
    pizzaSize: item.productVariantions.size,
    pizzaType: item.productVariantions.pizzaType,

    // details: getCartItemDetails(
    //   item.productVariantions.pizzaType,
    //   item.productVariantions.pizzaSize,
    //   item.ingredients
    // ),
    quantity: item.quantity,
    disabled: false,
    ingredients: item.ingredients.map((i) => ({
      name: i.name,
      price: i.price,
    })),
  })) as CartStateItem[];
  return {
    items,
    totalAmount: data.totalAmount,
  };
};
