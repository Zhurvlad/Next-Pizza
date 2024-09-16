import React from "react";
import qs from "qs";
import { useRouter } from "next/navigation";

import { Filters } from "./use-filters";

/*Достаём Query параметры и вшиваем их в браузерную строку */
export const useQueryFilters = (filters: Filters) => {
  const isMounted = React.useRef(true);
  const router = useRouter();

  React.useEffect(() => {
    if (isMounted.current) {
      const params = {
        ...filters.prices,
        ingredients: Array.from(filters.selectedIngredients),
        sizes: Array.from(filters.sizes),
        pizzaTypes: Array.from(filters.pizzaTypes),
      };

      const query = qs.stringify(params, {
        arrayFormat: "comma",
      });

      router.push(`?${query}`, { scroll: false });
    }
    isMounted.current = true;
  }, [filters]);
};
