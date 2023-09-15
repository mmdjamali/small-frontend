"use client";

import { useQuery } from "react-query";
import Scrollable from "./scrollable-tabs";
import {
  GetAllTopicsApiResponse,
  TopicSuggestionsApiResponse,
} from "@/types/api";
import { BACKEND_URL } from "@/config/env";
import Button from "./ui/button";
import Icon from "./icon";

const Topics = ({ q }: { q: string }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["search", "topics", q],
    queryFn: async () => {
      const res: TopicSuggestionsApiResponse = await fetch(
        `${BACKEND_URL}/api/topics/search?searchKeywords=${q}&PageSize=10`,
        {
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        },
      ).then((res) => res?.json());

      if (!res.success) return null;
      return res.data;
    },
    refetchOnWindowFocus: false,
  });

  if (!isLoading && !data?.items?.length) return <></>;

  return (
    <div className="relative mx-auto w-full max-w-[800px] px-8">
      <Scrollable className="flex w-full  gap-6 overflow-hidden">
        {isLoading ? (
          <Icon
            name="Spinner"
            className="mx-auto animate-spin text-[21px] text-primary"
          />
        ) : (
          <></>
        )}
        {data?.items.map(({ active, id, name }) => {
          return (
            <button
              className="whitespace-nowrap font-semibold text-foreground/75 transition-colors hover:text-foreground"
              key={id}
            >
              {name}
            </button>
          );
        })}
      </Scrollable>
    </div>
  );
};

export default Topics;
