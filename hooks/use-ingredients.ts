import { Api } from "@/services/api-client";
import { Ingredient } from "@prisma/client";
import React from "react";

interface ReturnProps {
  ingredients: Ingredient[];
  loading: boolean;
}

export const useIngredients = (): ReturnProps => {
  const [loading, setLoading] = React.useState(true);

  const [ingredients, setIngredients] = React.useState<Ingredient[]>([]);

  React.useEffect(() => {
    async function fetchIngredients() {
      try {
        setLoading(true);
        const ingredients = await Api.ingredients.getAll();
        setIngredients(ingredients);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchIngredients();
  }, []);

  return { ingredients, loading };
};
