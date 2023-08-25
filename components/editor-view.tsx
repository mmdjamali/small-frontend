"use client";

import Button from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import MainLogo from "./layout/main-logo";
import PostDetails from "./post-details";
import Editor from "./editor";

const EditorView = () => {
  return (
    <div className="flex flex-col relative w-full min-h-screen text-foreground">
      <div className="w-full relative border-b border-border">
        <header className="flex items-center justify-between w-full gap-3 h-[57px] mx-auto px-4 md:px-8 max-w-[1300px]">
          <MainLogo />

          <div className="flex items-center justify-center gap-3">
            <Button color="foreground" className="border-none hidden sm:flex">
              Publish
            </Button>

            <PostDetails />

            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback />
            </Avatar>
          </div>
        </header>
      </div>

      <div className="w-full h-full">
        <main className="flex max-w-[1300px] mx-auto px-4 md:px-8 ">
          <Editor />
        </main>
      </div>
    </div>
  );
};

export default EditorView;
