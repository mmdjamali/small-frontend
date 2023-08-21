"use client";

import React, { useState } from "react";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import Link from "next/link";
import { BACKEND_URL } from "@/config/env";

import { useDebouncedValue } from "@/hooks/use-debounced-value";
import PasswordInput from "../password-input";

function ResetPassword({ token }: { token: string }) {
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
    ]
  );

  const [confirmPassword, registerConfirmPassword] = useDebouncedValue("", 500);

  const [loading, setLoading] = useState(false);

  return (
    <section className="w-full relative px-0 sm:p-8 max-w-md sm:max-w-lg mx-auto text-foreground text-[14px]">
      <div className="rounded-[8px] bg-background sm:p-5 my-[10%] relative">
        <div className="grid gap-2 mb-6 text-center">
          <h1 className="flex items-center gap-x-1 justify-center flex-wrap text-[28px] font-bold">
            Reset your password!
          </h1>
          <p className="text-[14px] text-foreground/75">
            Please enter your new password.
          </p>
        </div>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
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
                }
              ).then((res) => res.json());

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

          <Button loading={loading} className="mt-4">
            <p className="capitalize">SUBMIT</p>
          </Button>
        </form>
      </div>
    </section>
  );
}

export default ResetPassword;
