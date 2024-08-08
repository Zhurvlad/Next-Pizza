import { Product } from "@prisma/client";
import { instance } from "./instance";
import { ApiRoutes } from "./constance";

export const search = async (query: string): Promise<Product[]> => {
  return (
    await instance.get<Product[]>(ApiRoutes.SEARCH_PRODUCTS, {
      params: { query },
    })
  ).data;
};
