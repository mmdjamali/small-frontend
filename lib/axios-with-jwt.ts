import axios from "axios";

import { custom_axios } from "@/lib/custom-axios";
import { BACKEND_URL } from "@/config/env";

export const getAxios = (access_token: string, refresh_token: string) => {
  const axios_with_jwt = axios.create({
    baseURL: BACKEND_URL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

  axios_with_jwt.interceptors.request.use((req) => {
    if (!req.headers["Authorization"]) {
      req.headers["Authorization"] = `Bearer ${access_token}`;
      return req;
    }
    return req;
  });

  axios_with_jwt.interceptors.response.use(
    (res) => res,
    async (err) => {
      const previousRequest = err.config;

      if (err?.response?.status === 403 && !previousRequest.sent) {
        previousRequest.sent = true;
        const new_token = await refresh(refresh_token);

        previousRequest.headers["Authorization"] = `Bearer ${new_token}`;

        return axios_with_jwt(previousRequest);
      }
      return Promise.reject(err);
    }
  );

  return axios_with_jwt;
};

export const refresh = async (refresh_token: string) => {
  return (
    await custom_axios.post("/api/auth/refresh", {
      refresh_token,
    })
  ).data.data;
};
