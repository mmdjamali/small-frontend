import React, { useState } from "react";
import Input from "@/components/ui/input";
import Icon from "./icon";

const PasswordInput = React.forwardRef<
  React.ElementRef<typeof Input>,
  React.ComponentPropsWithoutRef<typeof Input>
>(({ placeholder, ...props }, ref) => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <Input
        data-testid="password-input"
        type={show ? "text" : "password"}
        placeholder={show ? placeholder : "*********"}
        actions={[
          <button
            className="relative flex-shrink-0"
            onClick={(e) => {
              e.preventDefault();
              setShow((prev) => !prev);
            }}
            data-testid="password-input-button"
            type="button"
            key={0}
          >
            <Icon className="text-[21px] pointer-events-none invisible" />
            <Icon
              data-state={show ? "active" : "closed"}
              name={"Eye"}
              className="text-[21px] cursor-pointer absolute m-auto inset-0 data-[state=active]:animate-in data-[state=active]:zoom-in-0 data-[state=closed]:animate-out data-[state=closed]:zoom-out-0 data-[state=closed]:opacity-0 transition-opacity"
            />
            <Icon
              data-state={!show ? "active" : "closed"}
              name={"EyeClose"}
              className="text-[21px] cursor-pointer absolute m-auto inset-0 data-[state=active]:animate-in data-[state=active]:zoom-in-0 data-[state=closed]:animate-out data-[state=closed]:zoom-out-0  data-[state=closed]:opacity-0 transition-opacity"
            />
          </button>,
        ]}
        ref={ref}
        {...props}
      />
    </div>
  );
});

PasswordInput.displayName = "";

export default PasswordInput;
