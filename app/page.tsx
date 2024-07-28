import {
  Categories,
  Container,
  ProductsGroupList,
  SortPopup,
  Title,
  TopBar,
} from "@/components/shared";
import { Filters } from "@/components/shared/filters";
import { ProductCard } from "@/components/shared/product-card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>
      <TopBar />
      <Container className=" mt-10  pb-14">
        <div className="flex gap-[80px]">
          {/*Фильтрация */}
          <div className="w-[250px]">
            <Filters />
          </div>
          {/*Список товаров */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductsGroupList
                title="Пиццы"
                categoryId={1}
                items={[
                  {
                    id: 1,
                    name: "Пицца",
                    imageUrl:
                      "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg",
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 2,
                    name: "Пицца",
                    imageUrl:
                      "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg",
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 3,
                    name: "Пицца",
                    imageUrl:
                      "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg",
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 4,
                    name: "Пицца",
                    imageUrl:
                      "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg",
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 5,
                    name: "Пицца",
                    imageUrl:
                      "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg",
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 6,
                    name: "Пицца",
                    imageUrl:
                      "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg",
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 7,
                    name: "Пицца",
                    imageUrl:
                      "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg",
                    price: 550,
                    items: [{ price: 550 }],
                  },
                ]}
              />
              <ProductsGroupList
                title="Комбо"
                categoryId={2}
                items={[
                  {
                    id: 1,
                    name: "Пицца",
                    imageUrl:
                      "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg",
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 2,
                    name: "Пицца",
                    imageUrl:
                      "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg",
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 3,
                    name: "Пицца",
                    imageUrl:
                      "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg",
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 4,
                    name: "Пицца",
                    imageUrl:
                      "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg",
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 5,
                    name: "Пицца",
                    imageUrl:
                      "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg",
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 6,
                    name: "Пицца",
                    imageUrl:
                      "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg",
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 7,
                    name: "Пицца",
                    imageUrl:
                      "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg",
                    price: 550,
                    items: [{ price: 550 }],
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
