import React from "react";
import { Icons } from "./icons";
import { IconBaseProps } from "react-icons";

interface IconProps extends IconBaseProps {
  name?: keyof typeof Icons;
}

function Icon({ name = "Circle", ...props }: IconProps) {
  const Component = Icons[name] ?? Icons["Circle"];

  return <Component {...props} />;
}

export default Icon;
