"use client";

import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCart } from "@/shared/hooks";
import {
  CheckoutAddressForm,
  CheckoutCart,
  CheckoutPersonalForm,
  CheckoutSidebar,
  Container,
  Title,
} from "@/shared/components";
import { checkoutFormSchema, CheckoutFormValues } from "@/shared/constance";
import { cn } from "@/shared/lib/utils";
import { createOrder } from "@/app/actions";
import toast from "react-hot-toast";
import React from "react";

export default function CheckoutPage() {
  const [submitting, setSubmitting] = React.useState(false);
  const { updateItemQuantity, items, totalAmount, removeCartItem, loading } =
    useCart();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      comment: "",
    },
  });

  const onSubmit: SubmitHandler<CheckoutFormValues> = async (data) => {
    try {
      setSubmitting(true);
      const url = await createOrder(data);

      toast.success("Заказ успешно оформлен! Переход на страницу оплаты...", {
        icon: "✅",
      });

      if (url) {
        location.href = url;
      }
    } catch (error) {
      console.log(error);
      toast.error("Произошла ошибка при оформлении заказа", { icon: "🚨" });
      setSubmitting(false);
    }
  };

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <Container className="mt-10">
      <Title
        text="Оформление заказа"
        className="font-extrabold mb-8 text-[36px]"
      />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-10">
            {/* Левая часть */}
            <div className="flex flex-col gap-10 flex-1 mb-20">
              <CheckoutCart
                removeCartItem={removeCartItem}
                onClickCountButton={onClickCountButton}
                items={items}
                loading={loading}
              />
              <CheckoutPersonalForm
                className={cn({ "opacity-40 pointer-events-none": loading })}
              />
              <CheckoutAddressForm
                className={cn({ "opacity-40 pointer-events-none": loading })}
              />
            </div>
            {/* Правая часть */}
            <div className="w-[450px]">
              <CheckoutSidebar
                totalAmount={totalAmount}
                loading={loading || submitting}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
