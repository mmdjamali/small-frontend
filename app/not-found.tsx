import Link from "next/link";

const NotFound = () => (
  <main className="grid place-items-center w-full h-full bg-background ">
    <div className="flex flex-col gap-1 items-center justify-center bg-foreground p-12 rounded-lg">
      <h1 className="text-background text-[60px] leading-none font-bold">
        404
      </h1>
      <p className="text-background/75">
        Are you lost? Lets take you{" "}
        <Link className="text-background underline" href={"/"}>
          Home
        </Link>
        .
      </p>
    </div>
  </main>
);

export default NotFound;
