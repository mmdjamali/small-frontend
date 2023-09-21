"use client";

import { cn } from "../../lib/utils";
import * as AvatarPrimitives from "@radix-ui/react-avatar";
import React from "react";
import { Icons } from "../icons";

interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitives.Root> {
  size: "sm" | "md" | "lg";
}

export const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitives.Root>,
  AvatarProps
>(({ className, size, ...props }, ref) => {
  const sizes: Record<typeof size, string> = {
    sm: "w-7 h-7",
    md: "w-9 h-9",
    lg: "w-11 h-11",
  };

  return (
    <AvatarPrimitives.Root
      ref={ref}
      className={cn(
        "relative flex shrink-0 select-none overflow-hidden rounded-full",
        sizes[size],
        className,
      )}
      {...props}
    />
  );
});

Avatar.displayName = "@radix-ui/avatar";

export const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitives.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitives.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitives.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
));

AvatarImage.displayName = "@radix-ui/avatar-image";

export const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitives.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitives.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitives.Fallback
    ref={ref}
    className={cn(
      "grid aspect-square h-full w-full place-items-center rounded bg-foreground/10",
      className,
    )}
    {...props}
  >
    <Icons.User className="text-[22px] text-foreground/25" />
  </AvatarPrimitives.Fallback>
));

AvatarFallback.displayName = "@radix-ui/avatar-fallback";
