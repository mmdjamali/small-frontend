"use client";

import React, { useState } from "react";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import Link from "next/link";
import { BACKEND_URL } from "@/config/env";

import { useDebouncedValue } from "@/hooks/use-debounced-value";
import toast from "../ui/toast";

function ForgotPassword() {
  const [email, registerEmail, emailError] = useDebouncedValue("", 500, [
    { pattern: /^\S+@\S+\.\S+$/, error_message: "Email is invalid" },
  ]);

  const [loading, setLoading] = useState(false);

  return (
    <section className="relative mx-auto w-full max-w-md px-0 text-[14px] text-foreground sm:max-w-lg sm:p-8">
      <div className="relative my-[10%] rounded-[8px] bg-background duration-500 animate-in fade-in-0 slide-in-from-bottom-full sm:p-5">
        <div className="mb-6 grid gap-2 text-center">
          <h1 className="flex flex-wrap items-center justify-center gap-x-1 text-[28px] font-bold">
            Reset your password!
          </h1>
          <p className="text-[14px] text-foreground/75">
            Please enter your email to continue.
          </p>
        </div>

        <form
          onSubmit={async (e) => {
            e.preventDefault();

            if (!email)
              return toast({
                varinat: "error",
                title: "Invaild credentials!",
                description: "credentials can't be empty.",
              });

            if (emailError)
              return toast({
                varinat: "error",
                title: "Invaild Credentials!",
                description: "credentials are not valid.",
              });

            try {
              setLoading(true);

              const res = await fetch(
                BACKEND_URL + "/api/auth/forgot-password",
                {
                  method: "POST",
                  credentials: "include",
                  mode: "cors",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    email,
                  }),
                },
              ).then((res) => res.json());

              if (!res.success) {
                toast({
                  varinat: "error",
                  title: "Something went wrong!",
                  description:
                    res.message ?? "something went wrong, please try again.",
                });
              } else {
                toast({
                  varinat: "success",
                  title: "Operation successful!",
                  description: "checkout your inbox for reset password link.",
                });
              }

              setLoading(false);
            } catch (err) {
              setLoading(false);
            }
          }}
          className="flex flex-col gap-2"
        >
          <Input
            error={emailError}
            name="email"
            label="Email"
            placeholder="test@gmail.com"
            {...registerEmail()}
          />

          <Button loading={loading} className="mt-2">
            Submit
          </Button>
        </form>

        <div className="mt-3">
          <p className="text-foreground/75">
            Want to create a new account?{" "}
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

export default ForgotPassword;
