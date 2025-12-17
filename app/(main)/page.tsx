import Feed from "@/components/feed";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
  redirect("/search");
  return (
    <div className="relative flex w-full flex-col">
      <div className="relative h-[480px] w-full overflow-hidden">
        <Image
          className="object-cover"
          alt="Beautiful cubism graffiti art"
          src={"/beautiful-cubism-graffiti.jpg"}
          unoptimized
          fill
        />
      </div>

      <main className="mx-auto grid min-h-[calc(100vh_-_58px)] max-w-[1300px] grid-cols-1 px-4 py-8 md:grid-cols-[1fr_352px] md:gap-8 md:px-8 lg:gap-12">
        <div className="relative flex h-full w-full max-w-full flex-col">
          <Feed active={""} />
        </div>

        <div className="hidden h-full w-full rounded-lg border border-border md:flex"></div>
      </main>
    </div>
  );
}
