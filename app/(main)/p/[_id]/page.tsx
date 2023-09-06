import UserAvatar from "@/components/user-avatar";
import { BACKEND_URL } from "@/config/env";
import { isJSON } from "@/lib/utils";
import { GetArticleApiResponse } from "@/types/api";
import { OutputBlockData } from "@editorjs/editorjs";
import edjsHTML from "editorjs-html";
import Link from "next/link";

const Page = async ({ params: { _id } }: { params: { _id: string } }) => {
  const res: GetArticleApiResponse = await fetch(
    BACKEND_URL + `/api/articles/${_id}`,
    {
      cache: "reload",
    },
  ).then((res) => res.json());

  if (!res?.success) return;

  const blocks: OutputBlockData[] = JSON.parse(
    isJSON(res.data.article.content) ? res.data.article.content : "[]",
  );

  const html = edjsHTML().parse({ blocks });

  return (
    <div className="relative mx-auto flex max-w-[600px] flex-col pb-8">
      <div className="my-8 flex flex-col items-start gap-4">
        <h1 className="text-4xl font-bold">{res.data?.article?.title}</h1>

        <div className="flex items-center justify-start gap-2">
          <UserAvatar size="lg" src="" />
          <div className="flex flex-col">
            <Link href="" className="text-[16px] hover:underline">
              {res.data.article.author.firstName}{" "}
              {res.data.article.author.firstName}
            </Link>
            <p className="text-foreground/90">Published at Aug, 26</p>
          </div>
        </div>
      </div>
      <div
        className="test flex w-full flex-col gap-6"
        dangerouslySetInnerHTML={{ __html: html.join("") }}
      />
    </div>
  );
};

export default Page;
