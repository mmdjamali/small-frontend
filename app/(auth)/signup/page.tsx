import Signup from "@/components/auth/signup";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Yellow Page | Sign up",
};

function Page() {
  return (
    <main className="w-full px-4 sm:px-10 lg:px-12 grid place-items-center md:col-span-2 lg:col-span-1 z-10">
      <Signup />
    </main>
  );
}

export default Page;
