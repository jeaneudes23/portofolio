"use client";

import { cn } from "@/lib/utils";
import React, { ComponentProps, createContext, PropsWithChildren, useContext, useState } from "react";
import { Button, ButtonProps } from "./ui/button";

const dialogContext = createContext<{ open: () => void; close: () => void; isOpen: boolean }>({
  open: () => {},
  close: () => {},
  isOpen: false,
});

const Dialog = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <dialogContext.Provider value={{ open, close, isOpen }}>
      <div className="relative">{children}</div>
    </dialogContext.Provider>
  );
};

const DialogTrigger = ({ ...props }: ButtonProps) => {
  const { open } = useContext(dialogContext);

  return <Button {...props} onClick={open} />;
};

const DialogContent = ({ children }: PropsWithChildren) => {
  const { isOpen, close } = useContext(dialogContext);
  return (
    isOpen && (
      <>
        <div className="fixed inset-0 z-50 bg-black/60" onClick={close}></div>
        <div className="bg-card text-card-foreground fixed inset-4 z-50 h-auto max-h-[600px] w-auto max-w-md self-center justify-self-center overflow-y-auto rounded-md px-4 py-6 shadow lg:min-w-sm">{children}</div>
      </>
    )
  );
};

const DialogHeader = ({ children }: ComponentProps<"div">) => {
  return <div className="mb-6">{children}</div>;
};

const DialogTitle = ({ className, children }: ComponentProps<"div">) => {
  return <h3 className={cn("text-lg leading-none font-semibold text-balance", className)}>{children}</h3>;
};

const DialogClose = ({ children, ...props }: ButtonProps) => {
  const { close } = useContext(dialogContext);
  return (
    <Button onClick={close} type="button" {...props}>
      {children}
    </Button>
  );
};

export { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose };
