"use client";

import { useInfiniteQuery } from "react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import Button from "./ui/button";
import { GetAllTopicsApiResponse } from "@/types/api";
import { BACKEND_URL } from "@/config/env";
import Link from "next/link";
import { cn } from "@/lib/utils";
import SearchedArticles from "./search/searched-articles";
import SearchedTopics from "./search/searched-topics";

const SearchFeed = ({ q, active }: { q: string; active: "" | "topics" }) => {
  const tabs = [
    {
      key: "",
      Component: SearchedArticles,
    },
    {
      key: "topics",
      Component: SearchedTopics,
    },
  ];

  return (
    <Tabs defaultValue={active ?? ""} className="relative w-full">
      <TabsList className="sticky top-[58px] z-[49] bg-background">
        {tabs.map(({ key }) => (
          <Link
            href={
              key === ""
                ? "/search?q=" + q
                : "/search/" + key.toLowerCase() + "?q=" + q
            }
            key={key}
            className="cursor-pointer"
          >
            <TabsTrigger className="pointer-events-none capitalize" value={key}>
              {key === "" ? "stories" : key}
            </TabsTrigger>
          </Link>
        ))}
      </TabsList>

      {(() => {
        const { Component, key } = tabs.filter(({ key }) => key === active)[0];

        if (Component) return <Component q={q} value={key} />;
      })()}
    </Tabs>
  );
};

export default SearchFeed;
