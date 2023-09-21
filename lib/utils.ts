import { twMerge } from "tailwind-merge";
import { ClassValue, clsx } from "clsx";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const isJSON = (s: any): boolean => {
  if (typeof s !== "string") return false;

  try {
    JSON.parse(s);
    return true;
  } catch (err) {
    return false;
  }
};

export const GetMonthName = (month: number) => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return monthNames[month];
};

export const stringifyNumber = (v?: number) => {
  if (!v) return "";
  return v.toString();
};
