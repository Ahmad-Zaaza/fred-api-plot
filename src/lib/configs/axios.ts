import axios from "axios";

export const httpClient = axios.create({
  // baseURL: "https://api.stlouisfed.org/fred",
  baseURL: "/",
  params: { api_key: process.env.API_KEY, file_type: "json" },
});
