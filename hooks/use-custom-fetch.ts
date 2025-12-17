import { BACKEND_URL } from "@/config/env";
import { useEffect, useState, useCallback } from "react";

type State = string | undefined;

type CustomFetch = (
  input: RequestInfo | URL,
  init?: RequestInit | undefined,
) => Promise<Response>;

let initialState: State;

let listernes: Array<(state: State) => void> = [];

export const dispatch = (state: State) => {
  initialState = state;
  listernes.forEach((setState) => setState(initialState));
};

const refresh_token = async () => {
  const res = await fetch(BACKEND_URL + "/api/auth/refresh-token", {
    method: "POST",
    credentials: "include",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.status === 401) return "";

  const { data } = await res.json();

  if (!data?.accessToken) return;

  dispatch(data.accessToken);
  initialState = data.accessToken;
  return data.accessToken;
};

export const useCustomFetch = () => {
  const [state, setState] = useState<State>(initialState);

  useEffect(() => {
    listernes.push(setState);

    return () => {
      const idx = listernes.indexOf(setState);

      if (idx >= 0) listernes.splice(idx, 1);
    };
  }, [state]);

  const custom_fetch = useCallback(
    async (input: RequestInfo | URL, init?: RequestInit | undefined) => {
      try {
        const res = await fetch(
          (BACKEND_URL ?? "") + input,
          init
            ? {
              mode: "cors",
              credentials: "include",
              ...init,
              headers: init.headers
                ? {
                  ...init.headers,
                  Authorization: `Bearer ${state}`,
                }
                : {
                  Authorization: `Bearer ${state}`,
                },
            }
            : {
              mode: "cors",
              credentials: "include",
              headers: {
                Authorization: `Bearer ${state}`,
              },
            },
        );

        if (res.status !== 401) return res;

        const new_token = await refresh_token();

        if (!new_token) return res;

        return await fetch(
          (BACKEND_URL ?? "") + input,
          init
            ? {
              mode: "cors",
              credentials: "include",
              ...init,
              headers: init.headers
                ? {
                  ...init.headers,
                  Authorization: `Bearer ${new_token}`,
                }
                : {
                  Authorization: `Bearer ${new_token}`,
                },
            }
            : {
              mode: "cors",
              credentials: "include",
              headers: {
                Authorization: `Bearer ${new_token}`,
              },
            },
        );
      } catch (err) {
        return;
      }
    },
    [state],
  );

  return custom_fetch;
};
