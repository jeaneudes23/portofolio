"use client";

import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/Dialog";
import { SubmitButton } from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Metadata } from "@prisma/client";
import { Globe } from "lucide-react";
import React, { useActionState, useCallback, useRef } from "react";
import { editMetadata } from "../server-actions/metadata-server-action";
import { useServerActionToast } from "@/hooks/useServerActionToast";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { CustomFileUploader } from "@/components/CustomFileUploader";

export const EditMetadataModalForm = ({ metadata }: { metadata: Metadata }) => {
  const [state, action] = useActionState(editMetadata, {});

  const { refresh } = useRouter();
  const closeRef = useRef<HTMLButtonElement>(null);
  const callback = useCallback(() => {
    if (closeRef.current) closeRef.current.click();
    refresh();
  }, [refresh]);

  useServerActionToast({ state, callback });

  return (
    <Dialog>
      <DialogTrigger variant={"outline"}>
        <span className="sr-only">Edit metadata</span>
        <Globe />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Metadata</DialogTitle>
        </DialogHeader>
        <form action={action} className="grid gap-6">
          <div className="grid gap-4">
            <div className="grid gap-1">
              <Label htmlFor="title">Title</Label>
              <Input defaultValue={metadata.title} type="text" name="title" id="title" />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="description">Description</Label>
              <Textarea defaultValue={metadata.description} name="description" id="description" />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="keywords">keywords</Label>
              <Input defaultValue={metadata.keywords} type="text" name="keywords" id="keywords" />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="image">image</Label>
              <CustomFileUploader defaultUrl={metadata.image} name="image" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <DialogClose ref={closeRef} variant={"outline"}>
              Cancel
            </DialogClose>
            <SubmitButton>Save Changes</SubmitButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
