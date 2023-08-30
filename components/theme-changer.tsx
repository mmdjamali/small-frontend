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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="p-2 text-[21px] outline-none"
          variant="outlined"
          color="foreground"
        >
          {(() => {
            const icon = themes.filter(({ name }) => name === theme)[0]?.icon;

            return <Icon name={icon} />;
          })()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent align="end">
          {themes.map(({ name, icon }, idx) => (
            <DropdownMenuItem
              className="flex cursor-pointer items-center gap-2 text-[14px] hover:bg-foreground/10"
              onClick={() => {
                setTheme(name);
              }}
              key={idx}
            >
              <Icon name={icon} className="text-[16px]" />
              <p className="capitalize">{name}</p>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
}

export default ThemeChanger;

const themes: { name: string; icon: IconKeyType }[] = [
  { name: "light", icon: "Sun" },
  { name: "dark", icon: "Moon" },
  { name: "system", icon: "Macbook" },
];
