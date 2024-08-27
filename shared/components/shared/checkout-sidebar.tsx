import React from "react";
import { cn } from "@/shared/lib/utils";
import { CheckoutItemDetails, WhiteBlock } from ".";
import { ArrowRight, Package, Percent, Truck } from "lucide-react";
import { Button, Skeleton } from "../ui";

const VAT = 0.15;
const DELIVERY_PRICE = 250;

interface Props {
  className?: string;
  totalAmount: number;
  loading?: boolean;
}

export const CheckoutSidebar: React.FC<Props> = ({
  totalAmount,
  className,
  loading,
}) => {
  const vatPrice = Math.round(totalAmount * VAT);
  const totalPrice = totalAmount + DELIVERY_PRICE;

  return (
    <WhiteBlock className={(cn("p-6 sticky top-4"), className)}>
      <div className="flex flex-col gap-1">
        <span className="text-xl">Итого:</span>
        {loading ? (
          <Skeleton className="w-48 h-11" />
        ) : (
          <span className="h-11 text-[34px] font-extrabold">
            {totalPrice} ₽
          </span>
        )}
      </div>
      <CheckoutItemDetails
        title={
          <div className="flex items-center ">
            <Package size={18} className="mr-2 text-gray-300" />
            Стоимость товаров:
          </div>
        }
        value={
          loading ? (
            <Skeleton className="w-16 h-6 rounded-[6px]" />
          ) : (
            `${totalAmount}  ₽`
          )
        }
      />

      <CheckoutItemDetails
        title={
          <div className="flex items-center ">
            <Percent size={18} className="mr-2 text-gray-300" />
            Налоги:
          </div>
        }
        value={
          loading ? (
            <Skeleton className="w-16 h-6 rounded-[6px]" />
          ) : (
            `${vatPrice}  ₽`
          )
        }
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center ">
            <Truck size={18} className="mr-2 text-gray-300" />
            Доставка:
          </div>
        }
        value={
          loading ? (
            <Skeleton className="w-16 h-6 rounded-[6px]" />
          ) : (
            `${DELIVERY_PRICE}  ₽`
          )
        }
      />
      <Button
        loading={loading}
        type="submit"
        className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
      >
        Перейдите к оплате
        <ArrowRight className="w-5 ml-2" />
      </Button>
    </WhiteBlock>
  );
};
