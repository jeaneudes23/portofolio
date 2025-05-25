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
import { FormFieldError } from "@/components/FormFieldError";

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
          <div className="grid items-start gap-3 md:grid-cols-2">
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
            <div className="grid gap-1">
              <Label htmlFor="url">URL</Label>
              <Input name="url" id="url" defaultValue={state.prevs?.url} />
              <FormFieldError error={state.errors?.url} />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="categoryId">Category</Label>
              <CustomSelect defaultValue={state.prevs?.categoryId} name="categoryId">
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </CustomSelect>
              <FormFieldError error={state.errors?.categoryId} />
            </div>
            <div className="col-span-full grid gap-1">
              <Label htmlFor="summary">Summary</Label>
              <Textarea name="summary" defaultValue={state.prevs?.summary} />
              <FormFieldError error={state.errors?.summary} />
            </div>
            <div className="col-span-full grid gap-1">
              <Label htmlFor="image">Image</Label>
              <CustomFileUploader name="image" defaultUrl={state.prevs?.image} />
              <FormFieldError error={state.errors?.image} />
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
