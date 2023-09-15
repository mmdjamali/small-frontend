"use client";

import { useState } from "react";
import Icon from "../icon";
import { useRouter, useSearchParams } from "next/navigation";
import SearchDropdown from "../search-dropdown";

const SearchInput = ({
  query,
  defaultSelected,
}: {
  query: string;
  defaultSelected?: "articles" | "topics" | "users";
}) => {
  const router = useRouter();

  const [selected, setSelected] = useState<"articles" | "topics" | "users">(
    defaultSelected ? defaultSelected : "articles",
  );

  return (
    <form
      onSubmit={(e: any) => {
        e.preventDefault();

        if (!e.target?.query || !e.target?.query?.value) return;

        router.push(
          `/search/${selected === "articles" ? "" : selected + "/"}${
            e.target.query.value
          }`,
        );
      }}
      className="relative mx-auto  flex w-[min(100%_,_750px)] items-center gap-3 rounded bg-background px-6 py-5 shadow-lg shadow-foreground/10"
    >
      <Icon name="Search" className="flex-shrink-0 text-[18px] text-primary" />

      <input
        defaultValue={decodeURIComponent(query)}
        name="query"
        placeholder="Search Small..."
        className="w-full bg-transparent outline-none"
      />

      <span className="flex h-[21px] w-0.5 flex-shrink-0 bg-primary" />

      <SearchDropdown
        query={query}
        value={selected}
        onValueChange={(v) => setSelected(v)}
      />
    </form>
  );
};

export default SearchInput;
