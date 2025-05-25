"use client";

import { SubmitButton } from "@/components/SubmitButton";
import { Content } from "@prisma/client";
import React, { PropsWithChildren, useCallback, useRef, useState, useTransition } from "react";
import { editContent } from "../server-actions/content-server-actions";
import { Pencil } from "lucide-react";
import { ServerActionResponse } from "@/lib/types";
import { useServerActionToast } from "@/hooks/useServerActionToast";
import { FormFieldError } from "@/components/FormFieldError";

interface Props extends PropsWithChildren {
  field: keyof Content;
  className?: string;
}

export const EditContent = ({ className, children, field }: Props) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const [isSaving, startTransition] = useTransition();
  const [editMode, setEditMode] = useState<boolean>(false);

  const [state, setState] = useState<ServerActionResponse>({});

  const saveContent = () => {
    startTransition(async () => {
      const value = contentRef.current?.textContent ? contentRef.current.textContent : "";
      const formData = new FormData();
      formData.set("field", field);
      formData.set("value", value);

      const response = await editContent(formData);
      setState(response);
    });
  };

  const callback = useCallback(() => {
    setEditMode(false);
  }, [setEditMode]);

  useServerActionToast({ state, callback });

  return (
    <div className="group relative">
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 justify-end opacity-0 transition-all group-hover:pointer-events-auto group-hover:opacity-100">
        {!editMode && (
          <button onClick={() => setEditMode(true)} className="bg-accent text-accent-foreground inline-flex cursor-pointer items-center gap-1 rounded-md border px-2 py-1 text-xs font-medium whitespace-pre transition-colors">
            <Pencil className="size-4" /> Edit
          </button>
        )}
      </div>
      <div contentEditable={editMode} suppressContentEditableWarning ref={contentRef} className={`${editMode ? "outline-primary rounded-md p-3 outline-2" : ""} ${className}`}>
        {children}
      </div>
      <FormFieldError error={state.errors?.value} />
      {editMode && (
        <div className="flex justify-end gap-2 py-2 text-sm">
          <button disabled={state.errors?.value ? true : false} onClick={() => setEditMode(false)} className="bg-card cursor-pointer rounded-md border px-3 py-2 font-medium">
            Cancel
          </button>
          <SubmitButton disabled={isSaving} onClick={saveContent} className="bg-primary text-primary-foreground cursor-pointer rounded-md border px-3 py-2 font-medium">
            Save
          </SubmitButton>
        </div>
      )}
    </div>
  );
};
