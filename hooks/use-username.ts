import { useState, useEffect } from "react";
import { useDebounced } from "./use-debounced";
import { custom_fetch } from "@/lib/custom-fetch";
import { CheckUsernameApiResponse } from "@/types/api";

// for using this hook in the input just use
// the register function like this
// <input {...register()}/>

export const useUsername = (initialValue: string = "", delay: number = 500) => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [value, register] = useDebounced(initialValue, delay);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const isOk = patterns.every(({ error, pattern }) => {
      if (!pattern.test(value)) {
        setError(error);
        return false;
      }
      return true;
    });

    const abortController = new AbortController();

    if (!isOk) return;
    setError("");

    setLoading(true);
    const func = async () => {
      try {
        const res: CheckUsernameApiResponse = await custom_fetch(
          "/api/auth/check-username",
          {
            method: "POST",
            body: JSON.stringify({
              username: value,
            }),
            signal: abortController.signal,
          },
        ).then((res) => res?.json());

        if (!res?.success)
          throw new Error("Something went wrong with request!");

        if (!res.data.isAvailable) throw new Error("Username is not available");

        setSuccess(true);
        setLoading(false);
      } catch (err) {
        setLoading(false);

        if (typeof err !== "object" || !err) return;

        if ("name" in err && err.name === "AbortError") return;

        if ("message" in err && typeof err.message === "string")
          setError(err.message);
      }
    };
    func();

    return () => {
      abortController.abort();
    };
  }, [value]);

  return {
    username: value,
    registerUsername: register,
    usernameError: error,
    usernameLoading: loading,
    usernameSuccess: success,
  } as const;
};

const patterns: Array<{ pattern: RegExp; error: string }> = [
  {
    pattern: /^[A-Za-z].*/,
    error: "First character must be an english letter",
  },
  {
    pattern: /^.{3,20}$/,
    error: "Must be more than 2 and less than 21",
  },
  {
    pattern: /^[A-Za-z0-9]+$/,
    error: "Only english number and letters are valid",
  },
];
