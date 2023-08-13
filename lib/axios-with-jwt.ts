import axios from "axios";

export const getAxios = (access_token: string, refresh_token: string) => {
  const axios_with_jwt = axios.create({
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
        console.log("trying to get new token");
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
    await axios.post("http://localhost:3001/auth/refresh", {
      refresh_token,
    })
  ).data.data;
};
