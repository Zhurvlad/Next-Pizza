import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

import { prisma } from "@/prisma/prisma-client";

import { CreateCartVariationsValues } from "@/shared/services/dto/cart.dto";

import { findOrCreateCart, updateCartTotalAmount } from "@/shared/lib";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("cartToken")?.value;

    if (!token) {
      return NextResponse.json({ totalAmount: 0, items: [] });
    }

    const userCart = await prisma.cart.findFirst({
      where: {
        OR: [
          {
            token,
          },
        ],
      },
      include: {
        items: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            productVariantions: {
              include: {
                product: true,
              },
            },
            ingredients: true,
          },
        },
      },
    });

    return NextResponse.json({ items: userCart });
  } catch (error) {
    console.log("[CART_GET] Server error", error);
    return NextResponse.json(
      { message: "Не удалось получить корзину" },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get("cartToken")?.value;

    if (!token) {
      token = crypto.randomUUID();
    }

    const userCart = await findOrCreateCart(token);

    const data = (await req.json()) as CreateCartVariationsValues;

    const findCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        productVariationsId: data.productVariationsId,
        ingredients: {
          every: {
            id: { in: data.ingredientsIds },
          },
        },
      },
    });

    //Если товар был найден делаем +1
    if (findCartItem) {
      await prisma.cartItem.update({
        where: {
          id: findCartItem.id,
        },
        data: {
          quantity: findCartItem.quantity + 1,
        },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productVariationsId: data.productVariationsId,
          quantity: 1,
          ingredients: { connect: data.ingredientsIds?.map((id) => ({ id })) },
        },
      });
    }

    const updateUserCart = await updateCartTotalAmount(token);

    const resp = NextResponse.json(updateUserCart);

    resp.cookies.set("cartToken", token);

    return resp;
  } catch (error) {
    console.log("[CART_POST] Server error", error);
    return NextResponse.json(
      { message: "Не удалось создать корзину" },
      {
        status: 500,
      }
    );
  }
}
