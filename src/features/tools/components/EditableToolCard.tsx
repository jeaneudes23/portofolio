"use client";

import { CustomFileUploader } from "@/components/CustomFileUploader";
import { SubmitButton } from "@/components/SubmitButton";
import { Tool } from "@prisma/client";
import Image from "next/image";
import { Button, buttonVariants } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/Dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";
import { createTool, deleteTool, editTool } from "../server-actions/tools-server-action";
import { useServerActionToast } from "@/hooks/useServerActionToast";
import { Pencil, Plus, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  tool: Tool;
}

export const EditableToolCard = ({ tool }: Props) => {
  return (
    <div key={tool.id} className="bg-card group border-subtle/30 relative rounded-md border p-6 transition-all">
      <Image src={tool.icon} alt={tool.name} width={0} height={0} className="mx-auto aspect-square w-full max-w-24 object-contain" />
      <div className="pointer-events-none absolute top-0 left-0 flex w-full justify-between p-2 opacity-0 group-hover:pointer-events-auto group-hover:opacity-100">
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
  useServerActionToast({ state });
  const { refresh } = useRouter();
  useServerActionToast({ state, callback: refresh });

  return (
    <form action={action} className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-2">
        <input type="hidden" name="id" value={tool.id} />
        <div className="grid gap-1">
          <Label htmlFor="name" className="label">
            Name
          </Label>
          <Input defaultValue={tool.name} type="text" className="form-input" name="name" id="name" />
        </div>
        <div className="grid gap-1">
          <Label htmlFor="name" className="label">
            Order
          </Label>
          <Input defaultValue={tool.order} type="number" className="form-input" name="order" id="order" />
        </div>
        <div className="col-span-full grid gap-1">
          <Label htmlFor="icon" className="label">
            Icon
          </Label>
          <CustomFileUploader name="icon" defaultUrl={tool.icon} />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <DialogClose variant={"secondary"} type="button">
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
  useServerActionToast({ state, callback: refresh });
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
            <DialogClose variant={"secondary"} type="button">
              Cancel
            </DialogClose>
            <SubmitButton>Confirm</SubmitButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export const NewToolModal = () => {
  const [state, action] = useActionState(createTool, {});
  useServerActionToast({ state });
  const { refresh } = useRouter();
  useServerActionToast({ state, callback: refresh });

  return (
    <Dialog>
      <DialogTrigger className="bg-card text-card-foreground !h-full w-full">
        <span className="sr-only">New Tool</span>
        <Plus className="size-6" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new tool</DialogTitle>
        </DialogHeader>
        <form action={action} className="grid gap-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-1">
              <Label htmlFor="name" className="label">
                Name
              </Label>
              <Input type="text" className="form-input" name="name" id="name" />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="name" className="label">
                Order
              </Label>
              <Input type="number" className="form-input" name="order" id="order" />
            </div>
            <div className="col-span-full grid gap-1">
              <Label htmlFor="icon" className="label">
                Icon
              </Label>
              <CustomFileUploader name="icon" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <DialogClose variant={"secondary"} type="button">
              Cancel
            </DialogClose>
            <SubmitButton>Save Changes</SubmitButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
