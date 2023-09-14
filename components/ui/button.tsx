"use client";

import { cn } from "../../lib/utils";
import React from "react";
import { Icons } from "../icons";
import Icon from "../icon";

interface props extends React.ComponentPropsWithoutRef<"button"> {
  color?: "primary" | "foreground";
  variant?: "contained" | "outlined" | "text";
  block?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<React.ElementRef<"button">, props>(
  (
    {
      className,
      color = "primary",
      variant = "contained",
      block = false,
      loading = false,
      children,
      onClick,
      disabled,
      ...props
    },
    ref,
  ) => {
    const variants = {
      contained: {
        shared: "border",
        primary: "bg-primary border-primary text-white",
        foreground: "bg-foreground border-foreground text-background",
      },
      outlined: {
        shared: "border",
        primary: "border-primary/10 hover:bg-primary/10 text-primary",
        foreground:
          "border-foreground/10 hover:bg-foreground/10 text-foreground",
      },
      text: {
        shared: "",
        primary: "text-primary/80 hover:bg-primary/10 hover:text-primary",
        foreground:
          "text-foreground/80 hover:bg-foreground/10 hover:text-foreground",
      },
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          "relative flex items-center justify-center rounded transition-all",
          "text-h-sm px-4 py-2",
          block ? "w-full" : "",
          loading ? "pointer-events-none opacity-75" : "",
          disabled ? "pointer-events-none opacity-75" : "",
          variants[variant]["shared"],
          variants[variant][color],
          className,
        )}
        onClick={loading ? () => {} : onClick}
        {...props}
      >
        {children}
        {loading ? (
          <Icon
            name="Spinner"
            className="ml-2 animate-spin text-[21px] repeat-infinite"
          />
        ) : null}
      </button>
    );
  },
);

Button.displayName = "@1stmmd/Button";

export default Button;
