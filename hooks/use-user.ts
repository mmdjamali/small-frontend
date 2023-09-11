import { useCallback, useEffect, useState } from "react";
import { useCustomFetch } from "./use-custom-fetch";
import { GetProfileApiResponse } from "@/types/api";
import { UserType } from "@/types/user";

type State = UserType | null;

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
    const res: GetProfileApiResponse = await fetch("/api/profiles/me", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res?.json());

    if (!res?.success) {
      dispacth(null);
      setLoading(false);
      return;
    }

    dispacth(res?.data?.user);
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

  return [user, loading] as [typeof user, typeof loading];
};
