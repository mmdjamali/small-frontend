"use client";

import { ThemeProvider } from "next-themes";

import { PropsWithChildren } from "react";

const Providers = ({ children }: PropsWithChildren) => {
  return <ThemeProvider defaultTheme="system">{children}</ThemeProvider>;
};

export default Providers;
