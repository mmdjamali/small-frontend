import EmptySearchFetch from "@/components/search/empty-search-feed";
import Icon from "@/components/icon";
import SearchInput from "@/components/inputs/search-input";
import SearchFeed from "@/components/search/search-feed";
import Topics from "@/components/topics";
import Image from "next/image";

type PageProps = {
  params: {
    q: string;
  };
};
const Page = ({ params: { q } }: PageProps) => {
  return (
    <div className="relative flex w-full flex-col">
      <div className="relative h-[120px] w-full select-none overflow-hidden sm:h-[180px]">
        <Image
          draggable="false"
          className="object-cover "
          alt="e"
          src={"/beautiful-cubism-graffiti.jpg"}
          unoptimized
          fill
        />
      </div>

      <div className="relative w-full -translate-y-7 px-4 sm:px-8">
        <SearchInput query={q} />
      </div>

      <div className="mb-8 w-full">
        <Topics q={q} />
      </div>

      <SearchFeed q={q} />
    </div>
  );
};

export default Page;
