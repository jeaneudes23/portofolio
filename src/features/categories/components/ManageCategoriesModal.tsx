"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/Dialog";
import { SubmitButton } from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, List, Pencil, Trash, X } from "lucide-react";
import React, { useActionState, useCallback, useState } from "react";
import { createCategory, deleteCategory, editCategory } from "../server-actions/categories-server-actions";
import { useServerActionToast } from "@/hooks/useServerActionToast";
import { Category } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const ManageCategoriesModal = ({ categories }: { categories: Category[] }) => {
  return (
    <Dialog>
      <DialogTrigger variant={"accent"} className="rounded-full !p-2">
        <span className="sr-only">Manage categories</span>
        <List className="size-5" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manage Categories</DialogTitle>
        </DialogHeader>
        <CreateCategoryForm />
        <div className="divide-y py-4">
          {categories.map((category) => (
            <CategoryListItem category={category} key={category.id} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

const CreateCategoryForm = () => {
  const [state, action] = useActionState(createCategory, {});
  const { refresh } = useRouter();
  const callback = useCallback(() => {
    refresh();
  }, [refresh]);

  useServerActionToast({ state, callback });
  return (
    <form action={action} className="flex items-center gap-2">
      <Label htmlFor="name" hidden>
        Name
      </Label>
      <Input placeholder="Category name" name="name" id="name" />
      <SubmitButton>Add</SubmitButton>
    </form>
  );
};

const CategoryListItem = ({ category }: { category: Category }) => {
  const [mode, setMode] = useState<"view" | "edit" | "delete">("view");
  const cancel = useCallback(() => {
    setMode("view");
  }, []);
  return (
    <div className="py-2">
      {mode == "view" && (
        <div className="flex items-center justify-between text-sm">
          <p>{category.name}</p>
          <div className="space-x-2">
            <Button size={"sm"} variant={"outline"} className="rounded-full !p-2" onClick={() => setMode("edit")}>
              <span className="sr-only">Edit</span>
              <Pencil className="size-4" />
            </Button>
            <Button size={"sm"} variant={"destructive"} className="rounded-full !p-2" onClick={() => setMode("delete")}>
              <span className="sr-only">Delete</span>
              <Trash className="size-4" />
            </Button>
          </div>
        </div>
      )}
      {mode == "edit" && <EditCategoryForm cancel={cancel} category={category} />}
      {mode == "delete" && <DeleteCategoryForm cancel={cancel} category={category} />}
    </div>
  );
};

const EditCategoryForm = ({ category, cancel }: { category: Category; cancel: () => void }) => {
  const [state, action] = useActionState(editCategory, {});
  const { refresh } = useRouter();
  const callback = useCallback(() => {
    cancel();
    refresh();
  }, [refresh, cancel]);

  useServerActionToast({ state, callback });
  return (
    <form action={action}>
      <div className="flex items-center gap-2">
        <input type="hidden" name="id" value={category.id} />
        <Label htmlFor="name" hidden>
          Name
        </Label>
        <Input name="name" id="name" defaultValue={category.name} />
        <div className="flex items-center gap-2">
          <Button size={"sm"} variant={"outline"} className="rounded-full !p-2" onClick={cancel}>
            <span className="sr-only">Cancel</span>
            <X className="size-4" />
          </Button>
          <SubmitButton size={"sm"} className="rounded-full !p-2">
            <span className="sr-only">Edit</span>
            <Check className="size-4" />
          </SubmitButton>
        </div>
      </div>
    </form>
  );
};

const DeleteCategoryForm = ({ category, cancel }: { category: Category; cancel: () => void }) => {
  const [state, action] = useActionState(deleteCategory, {});
  const { refresh } = useRouter();
  const callback = useCallback(() => {
    cancel();
    refresh();
  }, [cancel, refresh]);

  useServerActionToast({ state, callback });
  return (
    <form action={action} className="flex items-center justify-between text-sm">
      <p>Delete {category.name} ?</p>
      <input type="hidden" name="id" value={category.id} />
      <div className="space-x-2 text-xs">
        <Button type="submit" size={"sm"} variant={"outline"} className="" onClick={cancel}>
          No
        </Button>
        <SubmitButton size={"sm"} className="">
          Yes
        </SubmitButton>
      </div>
    </form>
  );
};
