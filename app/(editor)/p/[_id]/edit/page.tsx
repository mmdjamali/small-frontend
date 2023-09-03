"use client";

import EditStory from "@/components/edit-story";
import Icon from "@/components/icon";
import { useCustomFetch } from "@/hooks/use-custom-fetch";
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
      const res = await fetch("/api/articles/" + _id, {
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res?.status !== 401) {
        const res_data = await res.json();
        setData(res_data.data.article);
        setLoading(false);
      }
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

  return (
    <EditStory
      id={_id}
      post={{
        content: JSON.parse(data?.content ?? "[]") as OutputBlockData[],
        published: false,
        title: data?.title ?? "",
      }}
    />
  );
};

export default Page;
