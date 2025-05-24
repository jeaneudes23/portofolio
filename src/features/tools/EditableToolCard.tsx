"use client";

import { CustomFileUploader } from "@/components/CustomFileUploader";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SubmitButton } from "@/components/SubmitButton";
import { Tool } from "@prisma/client";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";

interface Props {
  tool: Tool;
}

export const EditableToolCard = ({ tool }: Props) => {
  return (
    <div key={tool.id} className="bg-card group border-subtle/30 relative rounded-md border p-6 transition-all">
      <Image src={tool.icon} alt={tool.name} width={0} height={0} className="mx-auto aspect-square w-full max-w-24 object-contain" />
      <div className="absolute top-0 left-0 flex w-full justify-between p-2">
        <EditToolModal tool={tool} />
      </div>
    </div>
  );
};

const EditToolModal = ({ tool }: { tool: Tool }) => {
  return (
    <Dialog>
      <DialogTrigger className={buttonVariants({ variant: "accent" })}>Edit</DialogTrigger>
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
  return (
    <form action="">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-1">
          <label htmlFor="name" className="label">
            Name
          </label>
          <input defaultValue={tool.name} type="text" className="form-input" name="name" id="name" />
        </div>
        <div className="grid gap-1">
          <label htmlFor="name" className="label">
            Order
          </label>
          <input defaultValue={tool.order} type="number" className="form-input" name="order" id="order" />
        </div>
        <div className="col-span-full grid gap-1">
          <label htmlFor="icon" className="label">
            Icon
          </label>
          <CustomFileUploader name="icon" />
        </div>
      </div>
      <div>
        <button type="button" className="btn btn-sm btn-secondary">
          Cancel
        </button>
        <SubmitButton className="text-primary-foreground bg-primary rounded-md p-2 font-medium">Save Changes</SubmitButton>
      </div>
    </form>
  );
};
