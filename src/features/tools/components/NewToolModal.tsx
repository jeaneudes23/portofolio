"use client";

import { useServerActionToast } from "@/hooks/useServerActionToast";
import { useRouter } from "next/navigation";
import { useActionState, useCallback, useRef } from "react";
import { createTool } from "../server-actions/tools-server-action";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/Dialog";
import { Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CustomFileUploader } from "@/components/CustomFileUploader";
import { SubmitButton } from "@/components/SubmitButton";
import { FormFieldError } from "@/components/FormFieldError";

export const NewToolModal = () => {
  const [state, action] = useActionState(createTool, {});
  const { refresh } = useRouter();

  const closeRef = useRef<HTMLButtonElement>(null);
  const callback = useCallback(() => {
    if (closeRef.current) closeRef.current.click();
    refresh();
  }, [refresh]);

  useServerActionToast({ state, callback });

  return (
    <Dialog>
      <DialogTrigger variant={"card"} className="h-full w-full border">
        <span className="sr-only">New Tool</span>
        <Plus className="size-6" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new tool</DialogTitle>
        </DialogHeader>
        <form action={action} className="grid gap-6">
          <div className="grid items-start gap-4 md:grid-cols-2">
            <div className="grid gap-1">
              <Label htmlFor="name">Name</Label>
              <Input type="text" className="form-input" name="name" id="name" defaultValue={state.prevs?.name} />
              <FormFieldError error={state.errors?.name} />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="name">Order</Label>
              <Input type="number" className="form-input" name="order" id="order" defaultValue={state.prevs?.order} />
              <FormFieldError error={state.errors?.order} />
            </div>
            <div className="col-span-full grid gap-1">
              <Label htmlFor="icon">Icon</Label>
              <CustomFileUploader name="icon" defaultUrl={state.prevs?.icon} />
              <FormFieldError error={state.errors?.icon} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <DialogClose ref={closeRef} variant={"secondary"} type="button">
              Cancel
            </DialogClose>
            <SubmitButton>Save Changes</SubmitButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
