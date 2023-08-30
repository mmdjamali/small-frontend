import Image from "next/image";
import React, { PropsWithChildren } from "react";

function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="relative block h-fit w-full text-foreground">
      <div className="grid h-full w-full grid-cols-1 place-items-center md:grid-cols-3 lg:grid-cols-2">
        {children}
        <div className="inset-0 top-0 hidden h-screen max-h-screen w-full md:sticky md:flex">
          <Image
            className="object-cover"
            unoptimized
            fill
            src="https://img.freepik.com/premium-vector/colored-tribal-seamless-pattern-with-grunge-effect_601200-1319.jpg?w=1480"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
