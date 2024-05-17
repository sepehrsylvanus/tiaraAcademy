import axios from "axios";

export const Axios = axios.create({
  baseURL: "/api",
  headers: {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
  },
});
