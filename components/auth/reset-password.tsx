"use client";

import React, { useState } from "react";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import Link from "next/link";
import { BACKEND_URL } from "@/config/env";

import { useDebouncedValue } from "@/hooks/use-debounced-value";
import PasswordInput from "../password-input";
import toast from "../ui/toast";
import { useRouter } from "next/navigation";

function ResetPassword({ token }: { token: string }) {
  const router = useRouter();

  const [password, registerPassword, passwordError] = useDebouncedValue(
    "",
    500,
    [
      {
        pattern: /^.{8,}$/,
        error_message: "Password is too short",
      },
      {
        pattern: /[A-Z]+/,
        error_message: "must contain at least one uppercase character",
      },
      {
        pattern: /[a-z]+/,
        error_message: "must contain at least one lowecase character",
      },
      {
        pattern: /[0-9]+/,
        error_message: "must contain at least one number",
      },
    ],
  );

  const [confirmPassword, registerConfirmPassword] = useDebouncedValue("", 500);

  const [loading, setLoading] = useState(false);

  return (
    <section className="relative mx-auto w-full max-w-md px-0 text-[14px] text-foreground sm:max-w-lg sm:p-8">
      <div className="relative my-[10%] rounded-[8px] bg-background duration-500 animate-in fade-in-0 slide-in-from-bottom-full sm:p-5">
        <div className="mb-6 grid gap-2 text-center">
          <h1 className="flex flex-wrap items-center justify-center gap-x-1 text-[28px] font-bold">
            Reset your password!
          </h1>
          <p className="text-[14px] text-foreground/75">
            Please enter your new password.
          </p>
        </div>

        <form
          onSubmit={async (e) => {
            e.preventDefault();

            if (!password || !confirmPassword)
              return toast({
                varinat: "error",
                title: "Invaild credentials!",
                description: "credentials can't be empty.",
              });

            if (passwordError || password !== confirmPassword)
              return toast({
                varinat: "error",
                title: "Invaild Credentials!",
                description: "credentials are not valid.",
              });

            try {
              setLoading(true);

              const res = await fetch(
                BACKEND_URL + "/api/auth/reset-password",
                {
                  method: "POST",
                  credentials: "include",
                  mode: "cors",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    password,
                    resetPasswordToken: token,
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
                  title: "Reset was successful!",
                  description: "Try your new password and Login!",
                });
              }

              setTimeout(() => router.push("/signin"), 500);

              setLoading(false);
            } catch (err) {
              setLoading(false);
            }
          }}
          className="flex flex-col gap-2"
        >
          <PasswordInput
            error={passwordError}
            name="password"
            label="New Password"
            placeholder="unbreakable"
            {...registerPassword()}
          />

          <PasswordInput
            error={
              confirmPassword && confirmPassword !== password
                ? "Password doesn't match!"
                : ""
            }
            name="confirmPassword"
            label="Repeat New Password"
            placeholder="unbreakable"
            {...registerConfirmPassword()}
          />

          <Button loading={loading} className="mt-2">
            Submit
          </Button>
        </form>
      </div>
    </section>
  );
}

export default ResetPassword;
