"use client";

import { cn } from "../../lib/utils";
import * as AvatarPrimitives from "@radix-ui/react-avatar";
import React from "react";
import { Icons } from "../icons";

export const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitives.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitives.Root
    ref={ref}
    className={cn(
      "relative flex h-9 w-9 shrink-0 select-none overflow-hidden rounded-full",
      className,
    )}
    {...props}
  />
));

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
      "grid aspect-square h-full w-full place-items-center rounded-full border border-border",
      className,
    )}
    {...props}
  >
    <Icons.User className="text-[22px] text-border" />
  </AvatarPrimitives.Fallback>
));

AvatarFallback.displayName = "@radix-ui/avatar-fallback";
