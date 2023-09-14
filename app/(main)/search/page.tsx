import EmptySearchFetch from "@/components/empty-search-feed";
import Icon from "@/components/icon";
import SearchInput from "@/components/inputs/search-input";
import SearchFeed from "@/components/search-feed";
import Image from "next/image";

type PageProps = {
  searchParams: {
    q?: string;
  };
};
const Page = ({ searchParams: { q } }: PageProps) => {
  if (!q)
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
          <SearchInput />
        </div>

        <div className="relative mx-auto mb-8 w-full max-w-[800px] overflow-hidden px-4 sm:px-8">
          <p className="text-sm font-medium">Recent searches :</p>
        </div>

        <div className="relative mx-auto mb-4 w-full max-w-[1350px] overflow-hidden px-4 sm:px-8">
          <p className="text-xl font-semibold">Trends</p>
        </div>

        <EmptySearchFetch />
      </div>
    );

  return (
    <div className="relative flex w-full flex-col">
      <div className="relative h-[120px] w-full overflow-hidden sm:h-[180px]">
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
        <SearchInput />
      </div>

      <div className="relative mx-auto mb-8 w-full max-w-[800px] overflow-hidden px-4 sm:px-8">
        <p className="text-sm font-medium">Recent searches :</p>
      </div>

      <div className="relative mx-auto mb-4 w-full max-w-[1350px] overflow-hidden px-4 sm:px-8">
        <p className="text-xl font-semibold">Trends</p>
      </div>

      <EmptySearchFetch />
    </div>
  );
};

export default Page;
