import React from "react";

interface Props {
  name: string;
  email: string;
  message: string;
}

export const EmailTemplate = ({ message }: Props) => {
  return <p>{message}</p>;
};
