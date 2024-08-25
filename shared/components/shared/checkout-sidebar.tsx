import React from "react";
import { cn } from "@/shared/lib/utils";
import { CheckoutItemDetails, WhiteBlock } from ".";
import { ArrowRight, Package, Percent, Truck } from "lucide-react";
import { Button } from "../ui";

const VAT = 0.15;
const DELIVERY_PRICE = 250;

interface Props {
  className?: string;
  totalAmount: number;
}

export const CheckoutSidebar: React.FC<Props> = ({
  totalAmount,
  className,
}) => {
  const vatPrice = Math.round(totalAmount * VAT);
  const totalPrice = totalAmount + DELIVERY_PRICE;

  return (
    <WhiteBlock className={(cn("p-6 sticky top-4"), className)}>
      <div className="flex flex-col gap-1">
        <span className="text-xl">Итого:</span>
        <span className="text-[34px] font-extrabold">{totalPrice}</span>
      </div>
      <CheckoutItemDetails
        title={
          <div className="flex items-center ">
            <Package size={18} className="mr-2 text-gray-300" />
            Стоимость товаров:
          </div>
        }
        value={`${totalAmount}`}
      />

      <CheckoutItemDetails
        title={
          <div className="flex items-center ">
            <Percent size={18} className="mr-2 text-gray-300" />
            Налоги:
          </div>
        }
        value={`${vatPrice}`}
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center ">
            <Truck size={18} className="mr-2 text-gray-300" />
            Доставка:
          </div>
        }
        value={`${DELIVERY_PRICE}`}
      />
      <Button
        type="submit"
        className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
      >
        Перейдите к оплате
        <ArrowRight className="w-5 ml-2" />
      </Button>
    </WhiteBlock>
  );
};
