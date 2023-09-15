"use client";

import { useState } from "react";
import Icon from "./icon";
import Button from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";

type ValueType = "articles" | "topics" | "users";

interface Props {
  value: ValueType;
  onValueChange?: (v: ValueType) => void;
  query: string;
}

const SearchDropdown = ({ value: selected, onValueChange, query }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="group flex min-w-[90px] select-none items-center justify-center gap-2 capitalize outline-none"
        >
          {selected}
          <Icon
            name="ArrowDown"
            className="text-[18px] transition-[transform] group-data-[state=open]:rotate-180"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent
          sideOffset={24}
          align="center"
          className="mx-4 min-w-[unset] p-3 font-medium"
        >
          {options.map(({ value, path }) => {
            if (query)
              return (
                <Link
                  href={`/search/${path ? path + "/" : ""}${query}`}
                  key={value}
                  className="w-full"
                >
                  <DropdownMenuItem key={value} asChild>
                    <Button
                      key={value}
                      block
                      color="foreground"
                      className={cn(
                        "capitalize",
                        value === selected
                          ? "bg-foreground/10"
                          : " hover:bg-transparent",
                      )}
                      variant="text"
                    >
                      {value}
                    </Button>
                  </DropdownMenuItem>
                </Link>
              );
            return (
              <DropdownMenuItem key={value} asChild>
                <Button
                  onClick={() => {
                    if (selected === value) return;

                    if (onValueChange) onValueChange(value);
                  }}
                  color="foreground"
                  className={cn(
                    "w-full capitalize",
                    value === selected
                      ? "bg-foreground/10"
                      : " hover:bg-transparent",
                  )}
                  variant="text"
                >
                  {value}
                </Button>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
};

export default SearchDropdown;

const options: {
  value: ValueType;
  path: string;
}[] = [
  {
    value: "articles",
    path: "",
  },
  {
    value: "topics",
    path: "topics",
  },
  {
    value: "users",
    path: "users",
  },
];
