"use client";

import EditStory from "@/components/edit-story";
import Icon from "@/components/icon";
import { useCustomFetch } from "@/hooks/use-custom-fetch";
import { GetArticleApiResponse } from "@/types/api";
import { OutputBlockData } from "@editorjs/editorjs";
import { NextPage } from "next";
import { useEffect, useState } from "react";

const Page = ({ params: { _id } }: { params: { _id: string } }) => {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(true);

  const fetch = useCustomFetch();

  useEffect(() => {
    const func = async () => {
      setLoading(true);
      const res: GetArticleApiResponse = await fetch("/api/articles/" + _id, {
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res?.json());

      if (!res?.success) {
        setLoading(false);
        return;
      }
      setData(res.data.article);
      setLoading(false);
    };

    func();

    /* eslint-disable */
  }, [_id]);

  if (loading)
    return (
      <Icon
        name="Logo"
        className="absolute inset-0 m-auto aspect-square h-[50px] animate-pulse text-[50px] text-foreground"
      />
    );

  return <EditStory id={_id} post={data} />;
};

export default Page;
