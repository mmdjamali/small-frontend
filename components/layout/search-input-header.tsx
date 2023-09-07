"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Icon from "../icon";
import { useEffect, useRef, useState } from "react";

const SearchInputHeader = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    ref.current.value = searchParams.get("q") ?? "";
  }, [pathname, searchParams]);

  return (
    <form
      onSubmit={(e: any) => {
        e.preventDefault();

        if (!e.target?.query || !e.target?.query?.value) return;

        if (pathname.startsWith("/search")) {
          router.push(`${pathname}?q=${e.target.query.value}`);
        } else {
          router.push(`/search?q=${e.target.query.value}`);
        }
      }}
      className="hidden w-56 items-center justify-start gap-2 rounded bg-foreground/5 px-4 py-2 sm:flex"
    >
      <Icon name="Search" className="flex-shrink-0 text-[18px]" />

      <input
        ref={ref}
        name="query"
        defaultValue={searchParams.get("q") ?? ""}
        className="bg-transparent outline-none"
        placeholder="Search Small..."
      />
    </form>
  );
};

export default SearchInputHeader;
