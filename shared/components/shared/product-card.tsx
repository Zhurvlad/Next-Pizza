import React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

import { Ingredient } from "@prisma/client";

import { Title } from ".";
import { Button } from "../ui";

interface Props {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  ingredients: Ingredient[];
  className?: string;
}

export const ProductCard: React.FC<Props> = ({
  className,
  imageUrl,
  id,
  name,
  price,
  ingredients,
}) => {
  return (
    <div className={className}>
      <Link href={`/product/${id}`}>
        <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
          <img className="w-[215px] h-[215px]" src={imageUrl} alt={name} />
        </div>
        <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />
        <p className="text-sm text-gray-400">
          {ingredients.map((i) => i.name).join(", ")}
        </p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-[20px]">
            от <b>{price}₽</b>
          </span>

          <Button className="text-base fond-bold" variant="secondary">
            <Plus size={20} className="mr-1" />
            Добавить
          </Button>
        </div>
      </Link>
    </div>
  );
};
