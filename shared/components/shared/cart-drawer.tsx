"use client";

import React from "react";
import { cn } from "@/shared/lib/utils";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet";
import Link from "next/link";
import { Button } from "../ui";
import { ArrowRight } from "lucide-react";
import { CartDrawerItem } from ".";

interface Props {
  className?: string;
  items: any[];
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  children,
  items,
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-[#f4f1ee]">
        <SheetHeader>
          <SheetTitle>
            В корзине
            <span className="fint-bold">{items.length} товара</span>
          </SheetTitle>
        </SheetHeader>
        {/* <SheetClose /> */}

        <div className="-mx-6 mt-5 overflow-auto flex-1">
          <div className="mb-2">
            <CartDrawerItem
              id={1}
              imageUrl={
                "https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp"
              }
              details={
                "Цыпленок, моцарелла, сыр чеддер и пармезан, сырный соус, томаты, соус альфредо, чеснок"
              }
              name={"Омлет с ветчиной и грибами"}
              price={123}
              quantity={123}
            />
          </div>
        </div>
        <SheetFooter className="mx-6 bg-white p-8">
          <div className="w-full">
            <div className="flex mb-4">
              <span className="flex flex-1 text-lg text-neutral-500">
                Итого
                <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
              </span>
              <span className="font-bold text-lg">{"Прайс"}</span>
            </div>
            <Link href={"/cart"}>
              <Button type="submit" className="w-full h-12 text-base">
                Оформить заказ
                <ArrowRight className="w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
