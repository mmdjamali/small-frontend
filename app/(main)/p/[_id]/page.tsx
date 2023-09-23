import ArticleActionBar from "@/components/article-action-bar";
import UserAvatar from "@/components/user-avatar";
import { BACKEND_URL } from "@/config/env";
import { GetMonthName, isJSON } from "@/lib/utils";
import { GetArticleApiResponse } from "@/types/api";
import { OutputBlockData } from "@editorjs/editorjs";
import edjsHTML from "editorjs-html";
import Link from "next/link";
import { notFound } from "next/navigation";

const Page = async ({ params: { _id } }: { params: { _id: string } }) => {
  try {
    const res: GetArticleApiResponse = await fetch(
      BACKEND_URL + `/api/articles/${_id}`,
      {
        cache: "no-cache",
      },
    ).then((res) => res.json());

    if (!res?.success) return;

    const blocks: OutputBlockData[] = JSON.parse(
      isJSON(res.data.article.content) ? res.data.article.content : "[]",
    );

    const html = edjsHTML().parse({ blocks });

    return (
      <div className="relative mx-auto flex max-w-[700px] flex-col px-4 pb-8">
        <div className="my-8 flex flex-col items-start gap-8">
          <h1 className="text-4xl font-bold">{res.data?.article?.title}</h1>

          <div className="flex items-center justify-start gap-2">
            <UserAvatar size="lg" src="" />

            <div className="flex flex-col">
              <div className="flex items-center gap-2 text-foreground">
                <Link href="" className=" hover:underline">
                  {res.data.article.author.firstName}{" "}
                  {res.data.article.author.lastName}
                </Link>
                {"·"}
                <button className="text-primary">Fallow</button>
              </div>

              <div className="flex items-center gap-2 text-foreground/75">
                <p>5 min read</p>
                {"·"}
                <p>
                  {GetMonthName(
                    new Date(res.data.article.createdDate).getMonth(),
                  )}{" "}
                  {new Date(res.data.article.createdDate).getDate()}
                </p>
              </div>
            </div>
          </div>

          <ArticleActionBar id={res.data.article.id} />
        </div>

        <div
          className="test flex w-full flex-col gap-6 overflow-hidden break-words"
          dangerouslySetInnerHTML={{ __html: html.join("") }}
        />
      </div>
    );
  } catch (err) {
    return notFound();
  }
};

export default Page;
