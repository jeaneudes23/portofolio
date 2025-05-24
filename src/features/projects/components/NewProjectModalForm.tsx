import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/Dialog";
import { useServerActionToast } from "@/hooks/useServerActionToast";
import { Plus } from "lucide-react";
import React, { useActionState, useCallback, useRef } from "react";
import { createProject } from "../server-actions/projects-server-actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CustomFileUploader } from "@/components/CustomFileUploader";
import { SubmitButton } from "@/components/SubmitButton";
import { Textarea } from "@/components/ui/textarea";
import { Category } from "@prisma/client";
import { CustomSelect } from "@/components/CustomSelect";
import { SelectItem } from "@/components/ui/select";
import { useRouter } from "next/navigation";

export const NewProjectModalForm = ({ categories }: { categories: Category[] }) => {
  const [state, action] = useActionState(createProject, {});
  const { refresh } = useRouter();
  const closeRef = useRef<HTMLButtonElement>(null);
  const callback = useCallback(() => {
    if (closeRef.current) closeRef.current.click();
    refresh();
  }, [refresh]);

  useServerActionToast({ state, callback });

  return (
    <Dialog>
      <DialogTrigger variant={"card"} className="!h-full w-full border shadow-lg">
        <span className="sr-only">New Project</span>
        <Plus className="size-6" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new project</DialogTitle>
        </DialogHeader>
        <form action={action} className="grid gap-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-1">
              <Label htmlFor="name">Name</Label>
              <Input type="text" className="form-input" name="name" id="name" />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="name">Order</Label>
              <Input type="number" className="form-input" name="order" id="order" />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="url">URL</Label>
              <Input name="url" id="url" />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="categoryId">Category</Label>
              <CustomSelect name="categoryId">
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </CustomSelect>
            </div>
            <div className="col-span-full grid gap-1">
              <Label htmlFor="summary">Summary</Label>
              <Textarea name="summary" />
            </div>
            <div className="col-span-full grid gap-1">
              <Label htmlFor="image">Image</Label>
              <CustomFileUploader name="image" />
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
