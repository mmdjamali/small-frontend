import EmptySearchFetch from "@/components/search/empty-search-feed";
import Icon from "@/components/icon";
import SearchInput from "@/components/inputs/search-input";
import SearchFeed from "@/components/search/search-feed";
import Image from "next/image";
import TopicSearchFeed from "@/components/search/topic-search-feed";

type PageProps = {
  params: {
    q: string;
  };
};
const Page = ({ params: { q } }: PageProps) => {
  return (
    <div className="relative flex w-full flex-col">
      <div className="relative h-[220px] w-full select-none overflow-hidden sm:h-[280px]">
        <Image
          className="object-cover "
          alt="e"
          src={"/beautiful-cubism-graffiti.jpg"}
          unoptimized
          fill
        />
      </div>

      <div className="relative w-full -translate-y-7 px-4 sm:px-8">
        <SearchInput query={q} defaultSelected="topics" />
      </div>

      <TopicSearchFeed q={q} />
    </div>
  );
};

export default Page;
