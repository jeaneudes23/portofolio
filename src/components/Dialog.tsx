"use client";

import { X } from "lucide-react";
import React, { createContext, HTMLAttributes, PropsWithChildren, ReactNode, useRef } from "react";

interface Props extends PropsWithChildren {
  label: ReactNode;
}

export const DialogContext = createContext<{ close: () => void }>({
  close: () => {},
});

export const Dialog = ({ label, children }: Props) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const close = () => {
    dialogRef.current?.close();
  };

  return (
    <DialogContext.Provider value={{ close }}>
      <button className="cursor-pointer" onClick={() => dialogRef.current?.showModal()}>
        {label}
      </button>
      <dialog ref={dialogRef} className="shadow-foreground open:animate-fade-in w-full max-w-lg self-center justify-self-center rounded-md px-6 py-4">
        <div className="flex justify-end">
          <button className="cursor-pointer" onClick={close}>
            <X className="size-5" />
          </button>
        </div>
        <div>{children}</div>
      </dialog>
    </DialogContext.Provider>
  );
};

export const DialogTitle = ({ children }: HTMLAttributes<HTMLDivElement>) => {
  return <div className="mb-1 text-lg font-semibold lg:text-2xl">{children}</div>;
};

export const DialogDescription = ({ children }: HTMLAttributes<HTMLDivElement>) => {
  return <div className="text-subtle text-sm">{children}</div>;
};

export const DialogContent = ({ children }: HTMLAttributes<HTMLDivElement>) => {
  return <div className="mt-4">{children}</div>;
};
