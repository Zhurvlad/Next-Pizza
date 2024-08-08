import React from "react";
import { cn } from "@/shared/lib/utils";
import { PizzaImage } from "./pizza-image";
import { Title } from "./title";
import { Button } from "../ui";
import { ProductWithRelations } from "@/@types/prisma";

interface Props {
  className?: string;
  imageUrl: string;
  name: string;
  onClickAdd?: VoidFunction;
  ingredients?: ProductWithRelations[];
  variations?: ProductWithRelations[];
}

export const ChooseProductForm: React.FC<Props> = ({
  className,
  onClickAdd,
  imageUrl,
  name,
}) => {
  const textDetaills = "30 см, традиционное тесто 30, 590 г";
  const totalPrice = 350;
  return (
    <div className={cn(className, "flex flex-1")}>
      <div className="flex items-center justify-center flex-1 relative w-full">
        <img
          src={imageUrl}
          className="relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]"
          alt={name}
        />
      </div>
      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className="text-gray-400">{textDetaills}</p>
        <Button className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
          Добавить в корзину за {totalPrice}
        </Button>
      </div>
    </div>
  );
};
