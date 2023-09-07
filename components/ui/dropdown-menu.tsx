"use client";

import * as React from "react";

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { cn } from "@/lib/utils";

const DropdownMenu = ({
  onOpenChange,
  ...props
}: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Root>) => (
  <DropdownMenuPrimitive.Root
    onOpenChange={(open) => {
      const bool = !/Mobi/i.test(navigator.userAgent);

      open
        ? bool
          ? document.body.classList.add("pr-[var(--margin-dropdown)]")
          : null
        : document.body.classList.remove("pr-[var(--margin-dropdown)]");

      onOpenChange ? onOpenChange(open) : null;
    }}
    {...props}
  />
);

DropdownMenu.displayName = "@1stmmd/dropdown-menu";

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Content
    ref={ref}
    className={cn(
      "relative z-[999] my-1 flex min-w-[200px] flex-col rounded border border-border bg-background p-1 shadow shadow-foreground/10 animate-in slide-in-from-top-1",
      className,
    )}
    {...props}
  />
));

DropdownMenuContent.displayName = "@radix-ui/dropdown-menu-content";

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-[14px] font-medium text-foreground/80 outline-none transition-all hover:bg-foreground/10 hover:text-foreground data-[disabled]:!pointer-events-none data-[disabled]:!cursor-pointer data-[disabled]:!bg-background data-[disabled]:!text-foreground/50",
      className,
    )}
    {...props}
  />
));

DropdownMenuItem.displayName = "@radix-ui/dropdown-menu-item";

export {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuSub,
  DropdownMenuTrigger,
};
