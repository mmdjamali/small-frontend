"use client";

import React from "react";

import * as DialogPrimitives from "@radix-ui/react-dialog";

import { cn } from "../../lib/utils";

const Drawer = ({
  onOpenChange,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitives.Root>) => (
  <DialogPrimitives.Root
    onOpenChange={(open) => {
      const bool = !/Mobi/i.test(navigator.userAgent);

      open
        ? bool
          ? document.body.classList.add("pr-[17px]")
          : null
        : document.body.classList.remove("pr-[17px]");

      onOpenChange ? onOpenChange(open) : null;
    }}
    {...props}
  />
);

const DrawerTrigger = DialogPrimitives.Trigger;

const DrawerPortal = DialogPrimitives.Portal;

const DrawerClose = DialogPrimitives.Close;

interface DrawerContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitives.Content> {
  side: "top" | "bottom" | "left" | "right";
}

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitives.Content>,
  DrawerContentProps
>(({ side, className, ...props }, ref) => {
  const variant = {
    top: "top-0",
    right:
      "right-0 inset-y-0 data-[state=open]:slide-in-from-right-full  data-[state=closed]:slide-out-to-right-full",
    bottom: "bottom-0",
    left: "left-0 inset-y-0 data-[state=open]:slide-in-from-left-full  data-[state=closed]:slide-out-to-left-full",
  };

  return (
    <DialogPrimitives.Content
      ref={ref}
      className={cn(
        "animate-duration-200 animate-ease-linear fixed z-[999] h-full w-full overflow-auto bg-background shadow-md shadow-foreground/50 data-[state=open]:animate-in data-[state=closed]:animate-out	",
        variant[side],
        className,
      )}
      {...props}
    />
  );
});

DrawerContent.displayName = "@1stmmd/drawer-content";

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitives.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitives.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitives.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-[50] h-full w-full backdrop-blur-[2px] data-[state=closed]:bg-transparent data-[state=open]:bg-background/75 data-[state=open]:animate-in data-[state=closed]:animate-out",
      className,
    )}
    {...props}
  />
));

DrawerOverlay.displayName = "@1stmmd/drawer-overlay";

export {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerPortal,
  DrawerClose,
  DrawerOverlay,
};
