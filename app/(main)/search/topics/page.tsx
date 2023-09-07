import Icon from "@/components/icon";
import SearchInput from "@/components/inputs/search-input";
import SearchFeed from "@/components/search-feed";

type PageProps = {
  searchParams: {
    q?: string;
  };
};
const Page = ({ searchParams: { q } }: PageProps) => {
  if (!q)
    return (
      <main className="mx-auto grid min-h-[calc(100vh_-_58px)] max-w-[1300px] grid-cols-1 px-4 md:grid-cols-[1fr_352px] md:gap-8 md:px-8 lg:gap-12">
        <div className="relative flex h-full w-full max-w-full flex-col pt-6">
          <SearchInput />

          <h2 className="mb-6 text-2xl font-semibold md:text-4xl">
            Recent searches
          </h2>

          <p>You have no recent searches</p>
        </div>

        <div className="hidden h-full w-full border-l border-border pl-8 md:flex"></div>
      </main>
    );

  return (
    <main className="mx-auto grid min-h-[calc(100vh_-_58px)] max-w-[1300px] grid-cols-1 px-4 md:grid-cols-[1fr_352px] md:gap-8 md:px-8 lg:gap-12">
      <div className="relative flex h-full w-full max-w-full flex-col pt-6 md:mt-10">
        <SearchInput defaultValue={q} />

        <h1 className="mb-4 text-2xl font-bold md:mb-6 md:text-4xl">
          <span className="text-foreground/60">Results for </span>
          {q}
        </h1>

        <SearchFeed q={q} active="topics" />
      </div>

      <div className="hidden h-full w-full border-l border-border pl-8 md:flex"></div>
    </main>
  );
};

export default Page;
