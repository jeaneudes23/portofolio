import { ServerActionError } from "@/lib/types";
import React from "react";

export const FormFieldError = ({ error }: { error?: ServerActionError }) => {
  return error && <p className="text-destructive text-sm font-medium">{error}</p>;
};
