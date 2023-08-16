"use client";

import React, { useState, ChangeEvent } from "react";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import Icon from "@/components/icon";
import Link from "next/link";
import { BACKEND_URL } from "@/config/env";

import { useDebouncedValue } from "@/hooks/use-debounced-value";
import PasswordInput from "../password-input";
import axios from "axios";

function Signin() {
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
    ]
  );

  const [loading, setLoading] = useState(false);

  return (
    <section className="w-full relative px-0 sm:p-8 max-w-md sm:max-w-lg mx-auto text-foreground text-[14px]">
      <div className="rounded-[8px] bg-background sm:p-5 my-[10%] relative">
        <div className="grid gap-2 mb-6 text-center">
          <h1 className="flex items-center gap-x-1 justify-center flex-wrap text-[28px] font-bold">
            <span>Welcome back to</span> <span>yellow page!</span>
          </h1>
          <p className="text-[14px] text-foreground/75">
            Please enter your credentials to continue.
          </p>
        </div>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              setLoading(true);

              // await fetch(BACKEND_URL + "/api/auth/login", {
              //   method: "POST",
              //   credentials: "include",
              //   mode: "cors",
              //   headers: {
              //     "Content-Type": "application/json",
              //   },
              //   body: JSON.stringify({
              //     email,
              //     password,
              //   }),
              // }).then((res) => res.json());

              await axios.post(
                BACKEND_URL + "/api/auth/login",
                {
                  email,
                  password,
                },
                {
                  withCredentials: true,
                }
              );

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

          <PasswordInput
            error={passwordError}
            name="password"
            label="Password"
            placeholder="unbreakable"
            {...registerPassword()}
          />

          <Button loading={loading} className="mt-4">
            <p className="capitalize">SIGNIN</p>
          </Button>
        </form>

        <div className="w-full flex gap-3 items-center reltive my-6">
          <span className="flex h-[1px] bg-border w-full" />
          <p className="text-[12px] text-border flex-shrink-0">
            OR CONTINUE WITH
          </p>
          <span className="flex h-[1px] bg-border w-full" />
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
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

export default Signin;
