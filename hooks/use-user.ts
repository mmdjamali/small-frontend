import { useCallback, useEffect, useState } from "react";
import { useCustomFetch } from "./use-custom-fetch";

type State = boolean;

let state: State;

let listeners: Array<(state: State) => void> = [];

const dispacth = (new_state: State) => {
  listeners.forEach((setState) => setState(new_state));
  state = new_state;
};

export const useUser = () => {
  const fetch = useCustomFetch();
  const [user, setUser] = useState<State>(state);
  const [loading, setLoading] = useState<boolean>(true);

  const handleFetch = useCallback(async () => {
    const data = await fetch("/api/auth/verify", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });

    dispacth(!!data?.ok ?? false);

    setLoading(false);

    /* eslint-disable */
  }, []);

  useEffect(() => {
    handleFetch();
  }, [handleFetch]);

  useEffect(() => {
    listeners.push(setUser);

    return () => {
      const idx = listeners.indexOf(setUser);

      if (idx >= 0) listeners.splice(idx, 1);
    };
  }, [user]);

  return [user, loading];
};
