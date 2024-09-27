import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma/prisma-client";

import { PaymentCallbackData } from "@/@types/yookassa";

import { sendEmail } from "@/shared/lib";

import { CartItemDTO } from "@/shared/services/dto/cart.dto";

import { OrderStatus } from "@prisma/client";

import { OrderSuccessTemplate } from "@/shared/components";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as PaymentCallbackData;

    const order = await prisma.order.findFirst({
      where: {
        id: Number(body.object.metadata.order_id),
      },
    });

    if (!order) {
      return NextResponse.json({ message: "Order not found" });
    }

    const isSucceeded = body.object.status === "succeeded";

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: isSucceeded ? OrderStatus.SUCCEEDED : OrderStatus.CANCELLED,
      },
    });

    const items = JSON.parse(order?.items as string) as CartItemDTO[];

    if (isSucceeded) {
      await sendEmail(
        order.email,
        "Next Pizza | Заказ оплачен",
        OrderSuccessTemplate({ orderId: order.id, items })
      );
    }
  } catch (error) {
    console.log("[Checkout Callback] Error: ", error);
    return NextResponse.json({ message: "Error" });
  }
}
