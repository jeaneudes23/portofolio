"use client";

import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/Dialog";
import { Project } from "@prisma/client";
import { Pencil } from "lucide-react";
import React, { useActionState, useCallback, useRef } from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CustomFileUploader } from "@/components/CustomFileUploader";
import { SubmitButton } from "@/components/SubmitButton";
import { Textarea } from "@/components/ui/textarea";
import { Category } from "@prisma/client";
import { CustomSelect } from "@/components/CustomSelect";
import { SelectItem } from "@/components/ui/select";
import { editProject } from "../server-actions/projects-server-actions";
import { useServerActionToast } from "@/hooks/useServerActionToast";
import { useRouter } from "next/navigation";

export const EditProjectModalForm = ({ project, categories }: { project: Project; categories: Category[] }) => {
  const [state, action] = useActionState(editProject, {});

  const { refresh } = useRouter();
  const closeRef = useRef<HTMLButtonElement>(null);
  const callback = useCallback(() => {
    if (closeRef.current) closeRef.current.click();
    refresh();
  }, [refresh]);

  useServerActionToast({ state, callback });

  return (
    <Dialog>
      <DialogTrigger variant={"accent"} size={"sm"}>
        <span className="sr-only">Edit {project.name}</span>
        <Pencil className="size-4" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit {project.name}</DialogTitle>
        </DialogHeader>
        <form action={action} className="grid gap-6">
          <input type="hidden" name="id" value={project.id} />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-1">
              <Label htmlFor="name">Name</Label>
              <Input defaultValue={project.name} type="text" className="form-input" name="name" id="name" />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="name">Order</Label>
              <Input defaultValue={project.order} type="number" className="form-input" name="order" id="order" />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="url">URL</Label>
              <Input defaultValue={project.url} name="url" id="url" />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="categoryId">Category</Label>
              <CustomSelect defaultValue={project.categoryId} name="categoryId">
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </CustomSelect>
            </div>
            <div className="col-span-full grid gap-1">
              <Label htmlFor="summary">Summary</Label>
              <Textarea defaultValue={project.summary} name="summary" />
            </div>
            <div className="col-span-full grid gap-1">
              <Label htmlFor="image">Image</Label>
              <CustomFileUploader defaultUrl={project.image} name="image" />
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
