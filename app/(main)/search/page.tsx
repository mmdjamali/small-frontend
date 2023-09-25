import EmptySearchFetch from "@/components/search/empty-search-feed";
import Icon from "@/components/icon";
import SearchInput from "@/components/inputs/search-input";
import SearchFeed from "@/components/search/search-feed";
import Topics from "@/components/topics";
import Image from "next/image";
import RecentSearches from "@/components/profile/recent-searches";

const Page = () => {
  return (
    <div className="relative flex w-full flex-col">
      <div className="relative h-[220px] w-full overflow-hidden sm:h-[280px]">
        <Image
          className="object-cover "
          alt="e"
          src={
            "https://cdn.discordapp.com/attachments/1138951142810845277/1151470342318067732/beautiful-cubism-graffiti.jpg"
          }
          unoptimized
          fill
        />
      </div>

      <div className="relative w-full -translate-y-7 px-4 sm:px-8">
        <SearchInput query={""} />
      </div>

      <RecentSearches />

      <div className="relative mx-auto mb-4 w-full max-w-[1300px] overflow-hidden px-4 sm:px-8">
        <p className="text-xl font-semibold">Trends</p>
      </div>

      <EmptySearchFetch />
    </div>
  );
};

export default Page;
