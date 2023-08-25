import React from "react";
import * as PopoverPrimitives from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";

const Popover = PopoverPrimitives.Root;

const PopoverTrigger = PopoverPrimitives.Trigger;

const PopoverPortal = PopoverPrimitives.Portal;

const PopoverClose = PopoverPrimitives.Close;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitives.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitives.Content>
>(({ className, ...props }, ref) => (
  <PopoverPrimitives.Content
    ref={ref}
    className={cn(
      "relative z-[999] slide-in-from-top-1 animate-in flex flex-col border bg-background border-border rounded shadow shadow-foreground/10 min-w-[200px] p-1 my-1",
      className
    )}
    {...props}
  />
));

PopoverContent.displayName = "@radix-ui/popover-content";

export { Popover, PopoverClose, PopoverContent, PopoverPortal, PopoverTrigger };
