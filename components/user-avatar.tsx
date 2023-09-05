"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface UserAvatarProps {
  src: string;
  size?: "sm" | "md" | "lg";
}

function UserAvatar({ src, size = "md" }: UserAvatarProps) {
  return (
    <Avatar size={size}>
      <AvatarImage src={src} />
      <AvatarFallback />
    </Avatar>
  );
}

export default UserAvatar;
