"use client";

import { Loader } from "lucide-react";
import React, { ButtonHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "./ui/button";

export const SubmitButton = ({ disabled, children, ...props }: ButtonProps) => {
  const { pending } = useFormStatus();
  const loading = pending || disabled;
  return (
    <Button disabled={loading} {...props}>
      {loading && <Loader className="size-4 animate-spin" />}
      {children}
    </Button>
  );
};
