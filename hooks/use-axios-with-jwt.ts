import { BACKEND_URL } from "@/config/env";
import { axios_with_refresh_token, axios_with_token } from "@/lib/custom-axios";
import { useEffect, useState } from "react";

type State = string | undefined;

let initialState: State;

let listernes: Array<(state: State) => void> = [];

const dispatch = (state: State) => {
  initialState = state;
  listernes.forEach((setState) => setState(initialState));
};

const refresh_token = async () => {
  const res = await axios_with_refresh_token.post(
    BACKEND_URL + "/auth/refresh",
    null,
    {
      withCredentials: true,
    }
  );

  if (res.data.status === 401) return;

  if (!res?.data?.data?.access_token) return;

  dispatch(res.data.data.access_token);
  return res.data.data.access_token;
};

export const useJwtAxios = () => {
  const [state, setState] = useState<State>(initialState);

  useEffect(() => {
    listernes.push(setState);

    return () => {
      const idx = listernes.indexOf(setState);

      if (idx >= 0) listernes.splice(idx, 1);
    };
  }, [state]);

  useEffect(() => {
    const requestInterceptor = axios_with_token.interceptors.request.use(
      (req) => {
        if (!req.headers["Authorization"]) {
          req.headers["Authorization"] = `Bearer ${state}`;
          return req;
        }
        return req;
      }
    );

    const responseInterceptor = axios_with_token.interceptors.response.use(
      (res) => res,
      async (err) => {
        const previousRequest = err.config;

        if (err?.response.status === 403 && !previousRequest.sent) {
          previousRequest.sent = true;
          const new_token = await refresh_token();
          previousRequest.headers["Authorization"] = `Bearer ${new_token}`;
          return axios_with_token(previousRequest);
        }
        return Promise.reject(err);
      }
    );

    return () => {
      axios_with_token.interceptors.request.eject(requestInterceptor);
      axios_with_token.interceptors.response.eject(responseInterceptor);
    };
  }, [state]);

  return axios_with_token;
};
