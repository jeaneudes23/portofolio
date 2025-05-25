"use client";

import { CustomFileUploader } from "@/components/CustomFileUploader";
import { SubmitButton } from "@/components/SubmitButton";
import { Tool } from "@prisma/client";
import Image from "next/image";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/Dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useActionState, useCallback, useRef } from "react";
import { deleteTool, editTool } from "../server-actions/tools-server-action";
import { useServerActionToast } from "@/hooks/useServerActionToast";
import { Pencil, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormFieldError } from "@/components/FormFieldError";

interface Props {
  tool: Tool;
}

export const EditableToolCard = ({ tool }: Props) => {
  return (
    <div key={tool.id} className="bg-card relative rounded-md border p-6 transition-all">
      <Image src={tool.icon} alt={tool.name} width={0} height={0} className="mx-auto aspect-square w-full max-w-24 object-contain" />
      <div className="bg-secondary/50 absolute top-0 left-0 flex gap-2 rounded-tl-md border p-2">
        <EditToolModal tool={tool} />
        <DeleteToolModal tool={tool} />
      </div>
    </div>
  );
};

const EditToolModal = ({ tool }: { tool: Tool }) => {
  return (
    <Dialog>
      <DialogTrigger variant={"accent"} size={"sm"}>
        <span className="sr-only">Edit {tool.name}</span>
        <Pencil className="size-4" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit {tool.name}</DialogTitle>
        </DialogHeader>
        <EditToolForm tool={tool} />
      </DialogContent>
    </Dialog>
  );
};

const EditToolForm = ({ tool }: { tool: Tool }) => {
  const [state, action] = useActionState(editTool, {});

  const { refresh } = useRouter();
  const closeRef = useRef<HTMLButtonElement>(null);
  const callback = useCallback(() => {
    if (closeRef.current) closeRef.current.click();
    refresh();
  }, [refresh]);

  useServerActionToast({ state, callback });

  return (
    <form action={action} className="grid gap-6">
      <div className="grid items-start gap-3 md:grid-cols-2">
        <input type="hidden" name="id" value={tool.id} />
        <div className="grid gap-1">
          <Label htmlFor="name">Name</Label>
          <Input defaultValue={tool.name} type="text" className="form-input" name="name" id="name" />
          <FormFieldError error={state.errors?.name} />
        </div>
        <div className="grid gap-1">
          <Label htmlFor="name">Order</Label>
          <Input defaultValue={tool.order} type="number" className="form-input" name="order" id="order" />
          <FormFieldError error={state.errors?.order} />
        </div>
        <div className="col-span-full grid gap-1">
          <Label htmlFor="icon">Icon</Label>
          <CustomFileUploader name="icon" defaultUrl={tool.icon} />
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
  );
};

const DeleteToolModal = ({ tool }: { tool: Tool }) => {
  const [state, action] = useActionState(deleteTool, {});
  const { refresh } = useRouter();
  const closeRef = useRef<HTMLButtonElement>(null);
  const callback = useCallback(() => {
    if (closeRef.current) closeRef.current.click();
    refresh();
  }, [refresh]);

  useServerActionToast({ state, callback });
  return (
    <Dialog>
      <DialogTrigger size={"sm"} variant={"destructive"}>
        <span className="sr-only">Delete {tool.name}</span>
        <Trash className="size-4" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Are you sure you want to delete {tool.name} ?</DialogTitle>
        </DialogHeader>
        <form action={action} className="grid gap-6">
          <input type="hidden" name="id" value={tool.id} />
          <div className="flex items-center gap-2">
            <DialogClose ref={closeRef} variant={"secondary"} type="button">
              Cancel
            </DialogClose>
            <SubmitButton>Confirm</SubmitButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
