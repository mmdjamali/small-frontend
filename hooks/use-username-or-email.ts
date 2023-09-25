import { useEffect, useState } from "react";
import { useDebounced } from "./use-debounced";

export const useUsernameOrEmail = (
  initialValue: string = "",
  delay: number = 500,
) => {
  const [value, register] = useDebounced(initialValue, delay);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let message = "";

    const isEmail = email_patterns.every(({ error, pattern }) => {
      if (!pattern.test(value)) {
        if (!message) message = error;
        return false;
      }
      return true;
    });

    const isUserName = username_patterns.every(({ error, pattern }) => {
      if (!pattern.test(value)) {
        if (!message) message = error;
        return false;
      }
      return true;
    });

    if (!isUserName && !isEmail) {
      setError(message);
      return;
    }

    setError("");

    /*eslint-disable*/
  }, [value]);

  return [value, register, error] as const;
};

const username_patterns: Array<{ pattern: RegExp; error: string }> = [
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

const email_patterns: Array<{ pattern: RegExp; error: string }> = [
  { pattern: /^\S+@\S+\.\S+$/, error: "Email is invalid" },
];
