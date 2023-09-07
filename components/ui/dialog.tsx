"use client";

import React from "react";

import * as DialogPrimitives from "@radix-ui/react-dialog";
import { cn } from "../../lib/utils";

const Dialog = ({
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

const DialogTrigger = DialogPrimitives.Trigger;
const DialogPortal = DialogPrimitives.Portal;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitives.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitives.Content>
>(({ className, ...props }, ref) => (
  <DialogPrimitives.Content
    ref={ref}
    className={cn(
      "fixed inset-0 z-[51] m-auto w-[min(80%,600px)] rounded border border-border bg-background p-4 shadow",
      className,
    )}
    {...props}
  />
));

DialogContent.displayName = "@1stmmd/dialog-content";

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitives.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitives.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitives.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-[50] h-full w-full bg-background/75 backdrop-blur-[2px]",
      className,
    )}
    {...props}
  />
));

DialogOverlay.displayName = "@1stmmd/dialog-overlay";

const DialogClose = DialogPrimitives.Close;

export {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTrigger,
  DialogPortal,
  DialogClose,
};
