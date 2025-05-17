import { Loader } from "lucide-react";
import React, { ButtonHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";

export const SubmitButton = ({ disabled, className, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { pending } = useFormStatus();
  const loading = pending || disabled;
  return (
    <button disabled={loading} className={`inline-flex cursor-pointer items-center gap-2 ${className}`} {...props}>
      {loading && <Loader className="size-4 animate-spin" />}
      {children}
    </button>
  );
};
