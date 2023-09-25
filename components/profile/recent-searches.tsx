"use client";

import { useCustomFetch } from "@/hooks/use-custom-fetch";
import { useUser } from "@/hooks/use-user";
import { useQuery } from "react-query";
import Icon from "../icon";
import Scrollable from "../scrollable-tabs";
import { GetRecentSearchesApiResponse } from "@/types/api";
import Link from "next/link";

const RecentSearches = () => {
  const fetch = useCustomFetch();
  const { user, isLoading, isRefetching } = useUser();

  const recent = useQuery({
    queryKey: ["recent-searches", user?.id],
    queryFn: async () => {
      const res: GetRecentSearchesApiResponse = await fetch(
        `/api/users/${user?.id}/recent-searches`,
        {
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        },
      ).then((res) => res?.json());

      if (!res?.success) return null;

      return res.data;
    },
  });

  if (isLoading || recent.isLoading || (!user && isRefetching))
    return (
      <div className="relative mx-auto mb-8 w-full max-w-[800px] overflow-hidden px-4 sm:px-8">
        <Icon name="Spinner" className="mx-auto animate-spin text-[21px]" />
      </div>
    );

  if (!recent.data) return <></>;

  return (
    <div className="relative mx-auto mb-8 w-full max-w-[800px] px-4 sm:px-8">
      <Scrollable className="gap-4">
        <p className="whitespace-nowrap text-sm font-medium">
          Recent searches :
        </p>

        {recent.data?.searchKeywords.map(({ keyword }) => {
          return (
            <Link
              key={keyword}
              className="whitespace-nowrap font-medium text-foreground/75 transition-colors first-letter:uppercase hover:text-foreground"
              href={`/search/${keyword}`}
            >
              {keyword}
            </Link>
          );
        })}
      </Scrollable>
    </div>
  );
};

export default RecentSearches;
