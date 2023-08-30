"use client";

import { cn } from "@/lib/utils";
import * as TabsPrimitives from "@radix-ui/react-tabs";
import React from "react";

const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitives.Root>
>(({ className, ...props }, ref) => (
  <TabsPrimitives.Root
    ref={ref}
    className={cn("flex flex-col bg-background", className)}
    {...props}
  />
));
Tabs.displayName = "@radix-ui/react-tabs";

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitives.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitives.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitives.List
    ref={ref}
    className={cn("flex shrink-0  gap-4 border-b border-border", className)}
    {...props}
  />
));
TabsList.displayName = "@radix-ui/react-tabs-list";

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitives.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitives.Trigger>
>(({ className, children, ...props }, ref) => (
  <div className="group/container">
    <TabsPrimitives.Trigger
      ref={ref}
      className={cn(
        "group/trigger flex h-12 shrink-0 items-center justify-center border-border bg-background text-sm text-foreground/75 group-hover/container:text-foreground data-[state=active]:translate-y-[1px] data-[state=active]:border-b data-[state=active]:border-foreground data-[state=active]:pb-[1px] data-[state=active]:font-medium data-[state=active]:text-foreground",
        className,
      )}
      {...props}
    >
      <span className="rounded px-2 py-1 group-hover/container:bg-foreground/10">
        {children}
      </span>
    </TabsPrimitives.Trigger>
  </div>
));
TabsTrigger.displayName = "@radix-ui/react-tabs-trigger";

const TabsContent = TabsPrimitives.TabsContent;

export { Tabs, TabsContent, TabsList, TabsTrigger };
