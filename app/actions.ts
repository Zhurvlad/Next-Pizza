"use server";

import { prisma } from "@/prisma/prisma-client";
import { PayOrderTemplate } from "@/shared/components";
import { CheckoutFormValues } from "@/shared/constance";
import { sendEmail } from "@/shared/lib";
import { OrderStatus } from "@prisma/client";
import { cookies } from "next/headers";

export async function createOrder(data: CheckoutFormValues) {
  try {
    const cookieStore = cookies();
    const cartToken = cookieStore.get("cartToken")?.value;

    if (!cartToken) {
      throw new Error("Cart token not found");
    }

    /* Находим корзину по токену */
    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productVariantions: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token: cartToken,
      },
    });

    /* Если корзину не найдена возвращаем ошибку */
    if (!userCart) {
      throw new Error("Cart not found");
    }

    /* Если корзину не найдена возвращаем ошибку */
    if (userCart?.totalAmount === 0) {
      throw new Error("Cart is empty");
    }

    /* Создаём заказ */
    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: data.firstName + " " + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items),
      },
    });

    /* Скидываем прайс на 0*/
    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });

    /* Очищаем корзину */
    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    await sendEmail(
      data.email,
      "Next Pizza / Оплатите заказ №" + order.id,
      PayOrderTemplate({
        orderId: order.id,
        totalAmount: order.totalAmount,
        paymentUrl: "https://example.com",
      })
    );
  } catch (error) {
    console.log("[CreateOrder] Server error", error);
  }
}
