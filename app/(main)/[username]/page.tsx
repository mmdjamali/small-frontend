import Link from "next/link";

type PageProps = {
  params: {
    username?: string;
  };
};
const Page = ({ params }: PageProps) => {
  const username = decodeURIComponent(params?.username ?? "");

  if (!username || !username.startsWith("@")) return;

  return (
    <main className="lg:gap-13 mx-auto grid min-h-[calc(100vh_-_58px)] max-w-[1300px] grid-cols-1 px-4 md:grid-cols-[1fr_302px] md:gap-8 md:px-8 lg:grid-cols-3">
      <div className="relative flex h-full w-full max-w-full flex-col pt-6 md:pt-16 lg:col-span-2">
        {username}
      </div>

      <div className="hidden h-full w-full flex-col items-start justify-start border-l border-border p-10 md:flex lg:col-span-1">
        <h2 className="mt-3 text-[16px] font-semibold">Mohammad Jamali</h2>

        <Link
          href="/me/edit"
          className="mt-4 text-[13px] capitalize text-primary"
        >
          edit profile
        </Link>
      </div>
    </main>
  );
};

export default Page;
