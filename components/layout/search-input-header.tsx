"use client";

import { usePathname, useRouter } from "next/navigation";
import Icon from "../icon";
import { useEffect, useRef } from "react";

const SearchInputHeader = () => {
  const pathname = usePathname();
  const router = useRouter();

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const path = pathname.split("/");

    if (path[1] !== "search") {
      ref.current.value = "";
      return;
    }

    if (path.length === 2) return;

    ref.current.value = decodeURIComponent(path[path.length - 1] ?? "");
  }, [pathname]);

  return (
    <form
      onSubmit={(e: any) => {
        e.preventDefault();

        if (!e.target?.query || !e.target?.query?.value) {
          router.push(`/search`);
          return;
        }

        router.push(`/search/${encodeURIComponent(e.target.query.value)}`);
      }}
      className="hidden w-56 items-center justify-start gap-2 overflow-hidden rounded-full border border-border px-4 py-2.5 sm:flex"
    >
      <Icon name="Search" className="flex-shrink-0 text-[18px] text-primary" />

      <input
        ref={ref}
        name="query"
        className="w-full flex-shrink bg-transparent caret-primary outline-none"
        placeholder="Search Small..."
      />
    </form>
  );
};

export default SearchInputHeader;
