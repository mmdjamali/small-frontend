"use client";

import { useEffect, useState } from "react";
import Input from "../ui/input";
import { useUsername } from "@/hooks/use-username";
import Icon from "../icon";

interface Props extends React.ComponentPropsWithRef<typeof Input> {
  loading: boolean;
}

const UsernameInput = ({ error, loading, success, ...props }: Props) => {
  const Loading = () => (
    <Icon name="Spinner" className="animate-spin text-[18px] " />
  );
  const Error = () => <Icon name="Close" className="text-[18px] text-error " />;
  const Success = () => (
    <Icon name="Check" className="text-[18px] text-success " />
  );

  if (loading)
    return (
      <Input {...props} error={error} actions={[<Loading key="loading" />]} />
    );

  if (error)
    return <Input {...props} error={error} actions={[<Error key="error" />]} />;

  if (success)
    return (
      <Input {...props} error={error} actions={[<Success key="success" />]} />
    );

  return <Input error={error} {...props} />;
};

export default UsernameInput;
