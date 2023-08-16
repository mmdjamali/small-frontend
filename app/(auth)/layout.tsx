import Icon from "@/components/icon";
import Image from "next/image";
import Link from "next/link";
import React, { PropsWithChildren } from "react";

function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="h-fit w-full relative block text-foreground">
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 place-items-center">
        {children}
        <div className="h-screen max-h-screen hidden md:flex inset-0 md:sticky top-0 w-full">
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
