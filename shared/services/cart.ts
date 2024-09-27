import { instance } from "./instance";

import { CartDTO, CreateCartVariationsValues } from "./dto/cart.dto";

export const getCart = async (): Promise<CartDTO> => {
  const { data } = await instance.get<CartDTO>("/cart");
  return data;
};

export const updateItemQuantity = async (
  itemId: number,
  quantity: number
): Promise<CartDTO> => {
  return (
    await instance.patch<CartDTO>(`/cart/${itemId}`, {
      quantity,
    })
  ).data;
};

export const removeCartItem = async (id: number): Promise<CartDTO> => {
  return (await instance.delete<CartDTO>(`/cart/${id}`)).data;
};

export const addCartItem = async (
  values: CreateCartVariationsValues
): Promise<CartDTO> => {
  return (await instance.post<CartDTO>(`/cart`, values)).data;
};
