"use client";

import React, { useState } from "react";
import Input from "../ui/input";
import Button from "../ui/button";
import Icon from "../icon";
import Link from "next/link";
import { BACKEND_URL } from "@/config/env";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import PasswordInput from "../password-input";
import { siteConfig } from "@/config";
import toast from "../ui/toast";

import { useRouter } from "next/navigation";

function Signup() {
  const router = useRouter();

  const [firstName, registerFirstName, firstNameError] = useDebouncedValue(
    "",
    500,
  );
  const [lastName, registerLastName, lastNameError] = useDebouncedValue(
    "",
    500,
  );
  const [email, registerEmail, emailError] = useDebouncedValue("", 500, [
    { pattern: /^\S+@\S+\.\S+$/, error_message: "Email is invalid" },
  ]);
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
      <div className="relative my-[10%] rounded-[8px] bg-background p-5 duration-500 animate-in fade-in-0 slide-in-from-bottom-full">
        <div className="mb-6 grid gap-2 text-center">
          <h1 className="text-[28px] font-bold">
            Welcome to {siteConfig.name}!
          </h1>
          <p className="text-[14px] text-foreground/75">
            Please enter your credentials to continue.
          </p>
        </div>

        <form
          onSubmit={async (e) => {
            e.preventDefault();

            if (
              !email ||
              !password ||
              !firstName ||
              !lastName ||
              !confirmPassword
            )
              return toast({
                varinat: "error",
                title: "Invaild credentials!",
                description: "credentials can't be empty.",
              });

            if (
              emailError ||
              passwordError ||
              firstNameError ||
              lastNameError ||
              password !== confirmPassword
            )
              return toast({
                varinat: "error",
                title: "Invaild Credentials!",
                description: "credentials are not valid.",
              });

            try {
              setLoading(true);

              const res = await fetch(BACKEND_URL + "/api/auth/register", {
                method: "POST",
                credentials: "include",
                mode: "cors",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  firstName,
                  lastName,
                  email,
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
              } else {
                toast({
                  varinat: "success",
                  title: "Signup was successful!",
                  description:
                    "welcome to small, we are smaller than medium :)",
                });
              }

              setTimeout(() => router.push("/"), 500);

              setLoading(false);
            } catch (err) {
              setLoading(false);
            }
          }}
          className="flex flex-col gap-2"
        >
          <div className="grid gap-3 md:grid-cols-2">
            <Input
              error={firstNameError}
              name="name"
              label="Name"
              placeholder="Your name"
              {...registerFirstName()}
            />

            <Input
              error={lastNameError}
              name="last_name"
              label="Last Name"
              placeholder="Your last name"
              {...registerLastName()}
            />
          </div>

          <Input
            error={emailError}
            name="email"
            label="Email"
            placeholder="test@gmail.com"
            {...registerEmail()}
          />

          <div className="grid gap-3 md:grid-cols-2">
            <PasswordInput
              error={passwordError}
              name="password"
              label="Password"
              placeholder="unbreakable"
              {...registerPassword()}
            />
            <PasswordInput
              error={
                confirmPassword !== password && confirmPassword
                  ? "Password doesn't match"
                  : ""
              }
              name="password_confirm"
              label="Confirm"
              placeholder="unbreakable"
              {...registerConfirmPassword()}
            />
          </div>

          <Button loading={loading} className="mt-2">
            Sign up
          </Button>
        </form>

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
        </div>

        <div className="mt-3">
          <p className="text-foreground/75">
            Already have an account?{" "}
            <Link
              className="font-medium text-foreground underline"
              href="/signin"
            >
              sign in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Signup;
