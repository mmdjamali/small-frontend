import { BACKEND_URL } from "@/config/env";
import axios from "axios";

export const axios_with_refresh_token = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export const axios_with_token = axios.create({
  baseURL: BACKEND_URL,
  headers: { "Content-Type": "application/json" },
});
