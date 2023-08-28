import { useCallback, useEffect, useState } from "react";
import { useCustomFetch } from "./use-custom-fetch";

export const useUser = () => {
  const fetch = useCustomFetch();
  const [user, setUser] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const handleFetch = useCallback(async () => {
    const data = await fetch("/api/auth/verify", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });

    setUser(!!data?.ok ?? false);

    setLoading(false);

    /* eslint-disable */
  }, []);

  useEffect(() => {
    handleFetch();
  }, [handleFetch]);

  return [user, loading];
};
