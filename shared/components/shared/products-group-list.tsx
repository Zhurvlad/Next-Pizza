"use client";
import React from "react";
import { cn } from "@/shared/lib/utils";
import { useIntersection } from "react-use";
import { ProductCard, Title } from ".";
import { useCategoryStore } from "@/shared/store/category";
import { ProductWithRelations } from "@/@types/prisma";

interface Props {
  className?: string;
  title: string;
  items: ProductWithRelations[];
  categoryId: number;
  listClassName?: string;
}

export const ProductsGroupList: React.FC<Props> = ({
  className,
  categoryId,
  items,
  title,
  listClassName,
}) => {
  const intersectionRef = React.useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  });

  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);

  React.useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId);
    }
  }, [intersection?.isIntersecting]);
  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />

      <div className={cn(" grid grid-cols-3 gap-[50px]", listClassName)}>
        {items.map((product, i) => (
          <ProductCard
            id={product.id}
            key={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.variations[0].price}
            ingredients={product.ingredients}
          />
        ))}
      </div>
    </div>
  );
};
