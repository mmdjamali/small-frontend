import Signin from "@/components/auth/signin";
import { siteConfig } from "@/config";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: `${siteConfig.name} - Sign in`,
};

function Page() {
  return (
    <main className="w-full min-h-screen px-4 sm:px-10 lg:px-12 grid place-items-center md:col-span-2 lg:col-span-1 z-10">
      <Signin />
    </main>
  );
}

export default Page;
