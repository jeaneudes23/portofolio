"use client";

import React, { useActionState, useContext, useEffect } from "react";
import { Metadata } from "@prisma/client";
import { editMetadata } from "../server-actions/metadata-server-action";
import { SubmitButton } from "@/components/SubmitButton";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Props {
  metadata: Metadata;
}

export const EditMetadataDialog = ({ metadata }: Props) => {
  return (
    <Dialog>
      <DialogTitle>Edit MetaData</DialogTitle>
      <DialogDescription>Handle Metadata</DialogDescription>
      <DialogContent>
        <EditMetaDataForm metadata={metadata} />
      </DialogContent>
    </Dialog>
  );
};

const EditMetaDataForm = ({ metadata }: Props) => {
  const [state, action] = useActionState(editMetadata, {});

  const { refresh } = useRouter();

  useEffect(() => {
    if (state.message) {
      if (state.ok) {
        toast.success(state.message);
        refresh();
      } else {
        toast.error(state.message);
      }
    }
  }, [state, refresh]);

  return (
    <form action={action} className="space-y-6 text-sm">
      <div className="grid gap-4">
        <div className="grid gap-1">
          <label className="text-subtle font-medium" htmlFor="title">
            Title
          </label>
          <input defaultValue={metadata.title} className="rounded-md border p-2" type="text" name="title" id="title" />
        </div>
        <div className="grid gap-1">
          <label className="text-subtle font-medium" htmlFor="description">
            Description
          </label>
          <input defaultValue={metadata.description} className="rounded-md border p-2" type="text" name="description" id="description" />
        </div>
        <div className="grid gap-1">
          <label className="text-subtle font-medium" htmlFor="keywords">
            keywords
          </label>
          <input defaultValue={metadata.keywords} className="rounded-md border p-2" type="text" name="keywords" id="keywords" />
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <button onClick={close} type="button" className="bg-card cursor-pointer rounded-md border p-2 font-medium">
          Cancel
        </button>
        <SubmitButton type="submit" className="bg-primary text-primary-foreground rounded-md border p-2">
          Save changes
        </SubmitButton>
      </div>
    </form>
  );
};
