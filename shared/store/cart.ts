import { create } from "zustand";

import { getCartDetails } from "../lib";
import { CartStateItem } from "../lib/get-cart-details";

import { Api } from "../services/api-client";
import { CreateCartVariationsValues } from "../services/dto/cart.dto";

export interface CartState {
  loading: boolean;
  error: boolean;
  totalAmount: number;
  items: CartStateItem[];
  /*Получение товара из корзины */
  fetchCartItems: () => Promise<void>;
  /*Запрос на обновление товара из корзины */
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;
  /*Запрос на обновление количества товара из корзины */
  addCartItem: (value: any) => Promise<void>;
  /*Запрос на удаление товара из корзины */
  removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  error: false,
  loading: true,
  totalAmount: 0,

  fetchCartItems: async () => {
    try {
      set({ loading: true, error: false });
      // Проследить
      const data = await Api.cart.getCart();
      set(getCartDetails(data.items));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  updateItemQuantity: async (id, quantity) => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.updateItemQuantity(id, quantity);
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  removeCartItem: async (id) => {
    try {
      set((state) => ({
        ...state,
        loading: true,
        error: false,
        items: state.items.map((item) =>
          item.id === id ? { ...item, disabled: true } : item
        ),
      }));
      const data = await Api.cart.removeCartItem(id);
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set((state) => ({
        ...state,
        loading: false,
        items: state.items.map((item) => ({ ...item, disabled: false })),
      }));
    }
  },
  addCartItem: async (value: CreateCartVariationsValues) => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.addCartItem(value);
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
}));
