"use client";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { useUser } from "@/hooks/use-user";
import { ChangeEvent, FormEvent, useState } from "react";

const Page = () => {
  const { user } = useUser();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex min-h-[50vh] w-full flex-col items-end gap-8"
    >
      <Input label="Old Password" block />

      <Input label="New Password" block />

      <Button className="mt-auto">Change password</Button>
    </form>
  );
};

export default Page;
