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
        type={show ? "text" : "password"}
        placeholder={show ? placeholder : "*********"}
        actions={[
          <button key={0}>
            <Icon
              onClick={(e) => {
                e.preventDefault();
                setShow((prev) => !prev);
              }}
              name={show ? "Eye" : "EyeClose"}
              className="text-[21px] cursor-pointer"
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
