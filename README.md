# Магазин пиццы Next Pizza

##О проекте

Клон Додо Пиццы.

## Что использовано

#### Frontend:

- ReactJs + хуки
- TypeScript
- NextJs
- Zod
- Zustand
- React-use
- React Hook Form
- NextAuth
- React-insta-stories
- Nextjs toploader
- Lucide React
- ShadCN
- React hot toast
- TailwindCSS
- Axios

#### Backend:

- Prisma
- PostgreSQL
- bcrypt

## Развертывание проекта

`npm i` - установка зависмостей; <br/>
`npm run dev ` - запуск фронтенда; <br/>
Создать .env и установить зависимости для: <br/>

Создать psql БД. И указать зависимость.<br/>
POSTGRES_URL= postgresql://USER:PASSWORD@HOST:PORT/DATABASE<br/>

Данная зависимость необходима если БД разворачивать не локально.<br/>
POSTGRES_URL_NON_POOLING=<br/>

После создания БД необходимо создать таблицы в БД. <br/>
Для этого прописывае "npx prisma db push".<br/>
Далее нам необходимо создать фейковые данные используя команду "npx prisma db seed".<br/>

NEXT_PUBLIC_API_URL= Указать "/api". <br/>
NEXTAUTH_SECRET= Указать любой ключ. Например "XgwHHoz3". <br/>
RESEND_API_KEY= Перейти на [https://resend.com/] зарегестрировать и прописать Api Key. <br/>

Для возможности фейковой оплаты. Перейти на [https://yookassa.ru/] зарегестрироваться и указать зависимости.<br/>
YOOKASSA_STORE_ID=<br/>
YOOKASSA_API_KEY=<br/>
YOOKASSA_CALLBACK_URL=[http://localhost:3000/?paid]<br/>

Для возможности регистрации и входа в аккаунт спомощью GitHub.<br/>
Необходимо перейти на [https://github.com] зайти в Settings-> Developer Settings-> OAuth Apps и создать новое приложение. <br/>
После того как создание пройдёт успешно, указать данные зависимости.<br/>
GITHUB_ID=<br/>
GITHUB_SECRET=<br/>
