"use client";

import React, { useEffect, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import Button from "./ui/button";
import { useTheme } from "next-themes";
import { Icons } from "./icons";
import Icon from "./icon";
import { IconKeyType } from "@/types";

function ThemeChanger() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;

  return (
    <Button
      onClick={() => {
        setTheme(theme === "dark" ? "light" : "dark");
      }}
      className="p-2 text-[21px] outline-none"
      variant="text"
    >
      {(() => {
        const icon = themes.filter(({ name }) => name === theme)[0]?.icon;

        return <Icon name={icon} />;
      })()}
    </Button>
  );
}

export default ThemeChanger;

const themes: { name: string; icon: IconKeyType }[] = [
  { name: "light", icon: "Sun" },
  { name: "dark", icon: "Moon" },
];
