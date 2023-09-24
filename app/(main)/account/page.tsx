"use client";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { useUser } from "@/hooks/use-user";

const Page = () => {
  const { user } = useUser();

  const Desc = () => {
    return (
      <>
        {"Your Small URL: https://sm.mmdjamali.ir/"}
        <span className="font-semibold">@{user?.userName}</span>
      </>
    );
  };

  return (
    <form className="flex min-h-[50vh] w-full flex-col items-end gap-4">
      <Input
        defaultValue={user?.userName}
        label="Username"
        block
        description={<Desc />}
      />

      <Button className="mt-auto">Save Changes</Button>
    </form>
  );
};

export default Page;
