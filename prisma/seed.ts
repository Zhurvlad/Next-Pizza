import { hashSync } from "bcrypt";
import { prisma } from "./prisma-client";
import { _ingredients, categories, products } from "./constants";
import { Prisma } from "@prisma/client";

const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

const genearteProductVariations = ({
  productId,
  pizzaType,
  size,
}: {
  productId: number;
  pizzaType?: 1 | 2;
  size?: 20 | 30 | 40;
}) => {
  return {
    productId,
    pizzaType,
    size,
    price: randomNumber(190, 600),
  } as Prisma.ProductVariationsUncheckedCreateInput;
};

async function up() {
  await prisma.user.createMany({
    data: [
      {
        fullName: "John Doe",
        email: "user@example.com",
        password: hashSync("12345678", 10),
        verified: new Date(),
        role: "USER",
      },
      {
        fullName: "Admin",
        email: "admin@example.com",
        password: hashSync("12345678", 10),
        verified: new Date(),
        role: "ADMIN",
      },
    ],
  });
  await prisma.category.createMany({
    data: categories,
  });

  await prisma.ingredient.createMany({
    data: _ingredients,
  });

  await prisma.product.createMany({
    data: products,
  });

  const pizza1 = await prisma.product.create({
    data: {
      name: "Пепперони фреш",
      imageUrl:
        "https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp",
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(0, 5),
      },
    },
  });

  const pizza2 = await prisma.product.create({
    data: {
      name: "Сырная",
      imageUrl:
        "https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp",
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(5, 10),
      },
    },
  });

  const pizza3 = await prisma.product.create({
    data: {
      name: "Чоризо фреш",
      imageUrl:
        "https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp",
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(10, 40),
      },
    },
  });

  await prisma.productVariations.createMany({
    data: [
      // Пицца "Пепперони фреш"
      genearteProductVariations({
        productId: pizza1.id,
        pizzaType: 1,
        size: 20,
      }),
      genearteProductVariations({
        productId: pizza1.id,
        pizzaType: 2,
        size: 30,
      }),
      genearteProductVariations({
        productId: pizza1.id,
        pizzaType: 2,
        size: 40,
      }),

      // Пицца "Сырная"
      genearteProductVariations({
        productId: pizza2.id,
        pizzaType: 1,
        size: 20,
      }),
      genearteProductVariations({
        productId: pizza2.id,
        pizzaType: 1,
        size: 30,
      }),
      genearteProductVariations({
        productId: pizza2.id,
        pizzaType: 1,
        size: 40,
      }),
      genearteProductVariations({
        productId: pizza2.id,
        pizzaType: 2,
        size: 20,
      }),
      genearteProductVariations({
        productId: pizza2.id,
        pizzaType: 2,
        size: 30,
      }),
      genearteProductVariations({
        productId: pizza2.id,
        pizzaType: 2,
        size: 40,
      }),

      // Пицца "Чоризо фреш"
      genearteProductVariations({
        productId: pizza3.id,
        pizzaType: 1,
        size: 20,
      }),
      genearteProductVariations({
        productId: pizza3.id,
        pizzaType: 2,
        size: 30,
      }),
      genearteProductVariations({
        productId: pizza3.id,
        pizzaType: 2,
        size: 40,
      }),

      // Остальные продукты
      genearteProductVariations({ productId: 1 }),
      genearteProductVariations({ productId: 2 }),
      genearteProductVariations({ productId: 3 }),
      genearteProductVariations({ productId: 4 }),
      genearteProductVariations({ productId: 5 }),
      genearteProductVariations({ productId: 6 }),
      genearteProductVariations({ productId: 7 }),
      genearteProductVariations({ productId: 8 }),
      genearteProductVariations({ productId: 9 }),
      genearteProductVariations({ productId: 10 }),
      genearteProductVariations({ productId: 11 }),
      genearteProductVariations({ productId: 12 }),
      genearteProductVariations({ productId: 13 }),
      genearteProductVariations({ productId: 14 }),
      genearteProductVariations({ productId: 15 }),
      genearteProductVariations({ productId: 16 }),
      genearteProductVariations({ productId: 17 }),
    ],
  });

  await prisma.cart.createMany({
    data: [
      {
        userId: 1,
        totalAmount: 0,
        token: "11111",
      },
      {
        userId: 2,
        totalAmount: 0,
        token: "222222",
      },
    ],
  });

  await prisma.cartItem.create({
    data: {
      productVariationsId: 1,
      cartId: 1,
      quantity: 2,
      ingredients: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
      },
    },
  });
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductVariations" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.log(e);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
