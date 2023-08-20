import ForgotPassword from "@/components/auth/forgot-password";
import { NextPage } from "next";

const Page: NextPage = () => {
  return (
    <main className="w-full min-h-screen px-4 sm:px-10 lg:px-12 grid place-items-center md:col-span-2 lg:col-span-1 z-10">
      <ForgotPassword />
    </main>
  );
};

export default Page;
