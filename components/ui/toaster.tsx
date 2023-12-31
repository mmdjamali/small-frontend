"use client";

import { Toaster as ToasterPrimitive } from "sonner";

export function Toaster() {
  return (
    <ToasterPrimitive
      closeButton
      richColors
      position="top-right"
      className="z-[9999]"
      //   toastOptions={{
      //     style: {
      //       background: "rgb(var(--background))",
      //       color: "rgb(var(--foreground))",
      //       border: "1px solid rgb(var(--border))",
      //     },
      //   }}
    />
  );
}
