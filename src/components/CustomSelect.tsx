import React, { PropsWithChildren, ReactNode, useState } from "react";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";

interface Props extends PropsWithChildren {
  name: string;
  defaultValue?: string;
  children: ReactNode;
}
export const CustomSelect = ({ name, defaultValue, children }: Props) => {
  const [value, setValue] = useState<string>(defaultValue || "");
  return (
    <>
      <Select defaultValue={defaultValue} onValueChange={(value) => setValue(value)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Project category" />
        </SelectTrigger>
        <SelectContent>{children}</SelectContent>
      </Select>
      <input type="hidden" name={name} value={value} />
    </>
  );
};
