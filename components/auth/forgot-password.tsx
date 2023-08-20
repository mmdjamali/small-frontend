"use client";

import React, { useState } from "react";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import Link from "next/link";
import { BACKEND_URL } from "@/config/env";

import { useDebouncedValue } from "@/hooks/use-debounced-value";

function ForgotPassword() {
  const [email, registerEmail, emailError] = useDebouncedValue("", 500, [
    { pattern: /^\S+@\S+\.\S+$/, error_message: "Email is invalid" },
  ]);

  const [loading, setLoading] = useState(false);

  return (
    <section className="w-full relative px-0 sm:p-8 max-w-md sm:max-w-lg mx-auto text-foreground text-[14px]">
      <div className="rounded-[8px] bg-background sm:p-5 my-[10%] relative">
        <div className="grid gap-2 mb-6 text-center">
          <h1 className="flex items-center gap-x-1 justify-center flex-wrap text-[28px] font-bold">
            Reset your password!
          </h1>
          <p className="text-[14px] text-foreground/75">
            Please enter your email to continue.
          </p>
        </div>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
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
                }
              ).then((res) => res.json());

              console.log(res);

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

          <Button loading={loading} className="mt-4">
            <p className="capitalize">SUBMIT</p>
          </Button>
        </form>

        <div className="mt-3">
          <p className="text-foreground/75">
            Want to create a new account?{" "}
            <Link
              className="underline text-foreground font-medium"
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
