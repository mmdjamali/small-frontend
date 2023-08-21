import Link from "next/link";

const NotFound = () => (
  <main className="grid place-items-center w-full h-full bg-background ">
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-foreground text-[60px] font-bold">404</h1>
      <p className="text-foreground/75">
        Are you lost? Lets take you{" "}
        <Link className="text-foreground underline" href={"/"}>
          Home
        </Link>
        .
      </p>
    </div>
  </main>
);

export default NotFound;
