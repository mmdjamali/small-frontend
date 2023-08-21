import ResetPassword from "@/components/auth/reset-password";
import { BACKEND_URL } from "@/config/env";

import { notFound } from "next/navigation";

type PageProps = {
  params: {
    token: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
};

const Page = async ({ params, searchParams }: PageProps) => {
  const resetPasswordToken = searchParams?.token;

  if (!resetPasswordToken) notFound();

  const res = await fetch(
    BACKEND_URL + "/api/auth/reset-password-confirmation",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({
        resetPasswordToken,
      }),
    }
  );

  const resData = await res.json();

  if (!resData.success) notFound();

  return (
    <main className="w-full min-h-screen px-4 sm:px-10 lg:px-12 grid place-items-center md:col-span-2 lg:col-span-1 z-10">
      <ResetPassword token={resetPasswordToken.toString() ?? ""} />
    </main>
  );
};

export default Page;
