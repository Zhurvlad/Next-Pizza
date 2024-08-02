import { Ingredient, Product } from "@prisma/client";
import { instance } from "./instance";
import { ApiRoutes } from "./constance";

export const getAll = async (): Promise<Ingredient[]> => {
  return (await instance.get<Ingredient[]>(ApiRoutes.SEARCH_PRODUCTS)).data;
};
