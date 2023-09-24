"use client";

import Icon from "@/components/icon";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { IMAGE_BACKEND_URL } from "@/config/env";
import { useCustomFetch } from "@/hooks/use-custom-fetch";
import { useUser } from "@/hooks/use-user";
import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";

const Page = () => {
  const { user } = useUser();
  const fetch = useCustomFetch();

  const [picturePath, setPicturePath] = useState<null | string>(
    user?.avatarImagePath ?? null,
  );

  const onUploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("File", file);

    const res = await fetch("/api/profiles/upload-avatar-image", {
      method: "POST",
      mode: "cors",
      body: formData,
    }).then((res) => res?.json());

    console.log(res);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex min-h-[50vh] w-full flex-col items-end gap-8"
    >
      <div className="flex w-full items-center gap-4">
        <div className="relative flex aspect-square h-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-foreground/10">
          {user?.avatarImagePath ? (
            <Image
              unoptimized
              fill
              alt=""
              src={IMAGE_BACKEND_URL + "/" + user?.avatarImagePath ?? ""}
            />
          ) : (
            <Icon
              name="User"
              className="text-[30px] text-foreground/25 md:text-[36px]"
            />
          )}
        </div>

        <div>
          <Button
            tabIndex={-1}
            type="button"
            color="foreground"
            variant="outlined"
            className="p-0"
          >
            <label htmlFor="pictureInput" className="cursor-pointer px-4 py-2">
              Upload new picture
            </label>
          </Button>
          <input
            onChange={onUploadFile}
            type="file"
            accept="image/*"
            id="pictureInput"
            className="hidden"
          />
        </div>

        {picturePath ? (
          <Button color="foreground" variant="text" type="button">
            Remove
          </Button>
        ) : null}
      </div>
      <Input defaultValue={user?.firstName} label="Firstname" block />

      <Input defaultValue={user?.lastName} label="Lastname" block />

      <Button className="mt-auto">Save Changes</Button>
    </form>
  );
};

export default Page;
