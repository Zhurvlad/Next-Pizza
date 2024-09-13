import axios from "axios";

/*Надо указывать NEXT_PUBLIC а дальше что угодно */
export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
