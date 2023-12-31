"use client";

import React, { useState } from "react";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import Icon from "@/components/icon";
import Link from "next/link";
import { BACKEND_URL } from "@/config/env";

import { useDebouncedValue } from "@/hooks/use-debounced-value";
import PasswordInput from "../password-input";
import { siteConfig } from "@/config";
import toast from "../ui/toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useUsernameOrEmail } from "@/hooks/use-username-or-email";

function Signin() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirect = searchParams.get("redirect") ?? "/";

  const [email, registerEmail, emailError] = useUsernameOrEmail("", 500);

  const [password, registerPassword, passwordError] = useDebouncedValue(
    "",
    500,
    [
      {
        pattern: /^.{8,}$/,
        error_message: "Password is too short",
      },
    ],
  );

  const [loading, setLoading] = useState(false);

  return (
    <section className="relative mx-auto w-full max-w-md px-0 text-[14px] text-foreground sm:max-w-lg sm:p-8">
      <div className="relative my-[10%] rounded-[8px] bg-background duration-500 animate-in fade-in-0 slide-in-from-bottom-full sm:p-5">
        <div className="mb-6 grid gap-2 text-center">
          <h1 className=" text-[28px] font-bold">
            Welcome back to {siteConfig.name}!
          </h1>
          <p className="text-[14px] text-foreground/75">
            Please enter your credentials to continue.
          </p>
        </div>

        <form
          onSubmit={async (e) => {
            e.preventDefault();

            if (!password || !email)
              return toast({
                varinat: "error",
                title: "Invaild credentials!",
                description: "credentials can't be empty.",
              });

            if (passwordError || emailError)
              return toast({
                varinat: "error",
                title: "Invaild Credentials!",
                description: "credentials are not valid.",
              });

            try {
              setLoading(true);

              const res = await fetch(BACKEND_URL + "/api/auth/login", {
                method: "POST",
                credentials: "include",
                mode: "cors",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  EmailOrUserName: email,
                  password,
                }),
              }).then((res) => res.json());

              if (!res.success) {
                toast({
                  varinat: "error",
                  title: "Something went wrong!",
                  description:
                    res.message ?? "something went wrong, please try again.",
                });

                return;
              } else {
                toast({
                  varinat: "success",
                  title: "Signin was successful!",
                  description:
                    "welcome back to small, we are smaller than medium :)",
                });
              }

              setTimeout(() => router.push(redirect), 500);

              setLoading(false);
            } catch (err) {
              setLoading(false);
            }
          }}
          className="flex flex-col gap-2"
        >
          <Input
            error={email ? emailError ?? undefined : undefined}
            name="email"
            label="Email or username"
            placeholder="email or username"
            {...registerEmail()}
          />

          <PasswordInput
            error={passwordError}
            name="password"
            label="Password"
            placeholder="unbreakable"
            {...registerPassword()}
          />

          <div className="grid w-full gap-1">
            <Button loading={loading} className="mt-2">
              <p className="capitalize">Signin</p>
            </Button>

            <Link href={"/forgot-password"} className="underline">
              Forgot password?
            </Link>
          </div>
        </form>

        {/* 
        <div className="reltive my-4 flex w-full items-center gap-3">
          <span className="flex h-[1px] w-full bg-border" />
          <p className="flex-shrink-0 text-[12px] text-border">
            OR CONTINUE WITH
          </p>
          <span className="flex h-[1px] w-full bg-border" />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Button variant="outlined" color="foreground">
            <Icon name="Google" className="text-[21px]" /> Google
          </Button>
          <Button variant="outlined" color="foreground">
            <Icon name="Facebook" className=" text-[21px]" /> Facebook
          </Button>
        </div> */}

        <div className="mt-3">
          <p className="text-foreground/75">
            Already have an account?{" "}
            <Link
              className="font-medium text-foreground underline"
              href="/signup"
            >
              sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Signin;
