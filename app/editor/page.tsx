import Editor from "@/components/editor";
import { NextPage } from "next";

const Page: NextPage = ({}) => {
  return (
    <div className="w-full h-full">
      <main className="flex max-w-[1300px] mx-auto px-4 md:px-8 ">
        <Editor />
      </main>
    </div>
  );
};

export default Page;
