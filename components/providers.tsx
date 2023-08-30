"use client";

import { ThemeProvider } from "next-themes";

import { PropsWithChildren } from "react";

import { QueryClientProvider, QueryClient } from "react-query";

const client = new QueryClient();

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider defaultTheme="system">
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </ThemeProvider>
  );
};

export default Providers;
