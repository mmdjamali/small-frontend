import { useState, useEffect } from "react";

// for using this hook in the input just use
// the register function like this
// <input {...register()}/>

export const useDebouncedValue = (
  initialValue: string,
  delay: number = 500,
  patterns?: {
    pattern: RegExp;
    error_message: string;
  }[]
) => {
  const [value, setValue] = useState<string>(initialValue);
  const [error, setError] = useState<string>("");
  const [debouncedValue, setDebouncedValue] = useState<string>(initialValue);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setDebouncedValue(value);
      if (!patterns) return;

      if (!value) return setError("");

      if (!patterns || !patterns[0]) return;

      const isOk = patterns.every(({ error_message, pattern }) => {
        if (!pattern.test(value)) {
          setError(error_message);
          return false;
        }
        return true;
      });

      if (isOk) setError("");
    }, delay);

    return () => clearTimeout(timeOut);
  }, [delay, value, patterns]);

  const register = () => ({
    value: value,
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setValue(e.target.value);
    },
  });

  return [debouncedValue, register, error] as [
    typeof debouncedValue,
    typeof register,
    typeof error
  ];
};
