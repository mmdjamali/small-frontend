"use client";

import { useEffect, useRef } from "react";
import Icon from "../icon";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SearchInput = ({ defaultValue }: { defaultValue?: string }) => {
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

        router.push(`${pathname}?q=${e.target.query.value}`);
      }}
      className="relative mx-auto  flex w-[min(100%_,_750px)] items-center gap-3 rounded bg-background px-6 py-5 shadow-lg shadow-foreground/10"
    >
      <Icon name="Search" className="text-[18px] text-primary" />

      <input
        ref={ref}
        defaultValue={defaultValue}
        name="query"
        placeholder="Search Small..."
        className="w-full bg-transparent outline-none"
      />
    </form>
  );
};

export default SearchInput;
