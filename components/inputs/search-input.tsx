"use client";

import Icon from "../icon";
import { usePathname, useRouter } from "next/navigation";

const SearchInput = ({ defaultValue }: { defaultValue?: string }) => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <form
      onSubmit={(e: any) => {
        e.preventDefault();

        if (!e.target?.query || !e.target?.query?.value) return;

        router.push(`${pathname}?q=${e.target.query.value}`);
      }}
      className="mb-6 flex w-full items-center gap-2 rounded-xl border border-foreground/10 px-4 py-2.5 sm:hidden"
    >
      <Icon name="Search" className="text-[18px]" />

      <input
        defaultValue={defaultValue}
        name="query"
        placeholder="Search Small..."
        className="bg-transparent outline-none"
      />
    </form>
  );
};

export default SearchInput;
