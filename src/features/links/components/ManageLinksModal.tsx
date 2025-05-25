"use client";

import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/Dialog";
import { SubmitButton } from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, LinkIcon, Pencil, Trash, X } from "lucide-react";
import React, { useActionState, useCallback, useState } from "react";
import { Link } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { createLink, deleteLink, editLink } from "../server-actions/links-server-actions";
import { useServerActionToast } from "@/hooks/useServerActionToast";
import { FormFieldError } from "@/components/FormFieldError";

export const ManageLinksModal = ({ links }: { links: Link[] }) => {
  return (
    <Dialog>
      <DialogTrigger variant={"outline"}>
        <span className="sr-only">Manage links</span>
        <LinkIcon className="size-5" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex items-center justify-between">
          <DialogTitle>Manage links</DialogTitle>
          <DialogClose variant={"secondary"} size={"icon"}>
            <span className="sr-only">Close</span>
            <X />
          </DialogClose>
        </DialogHeader>
        <CreateLinkForm />
        <div className="divide-y py-4">
          {links.map((link) => (
            <LinksListItem link={link} key={link.id} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

const CreateLinkForm = () => {
  const [state, action] = useActionState(createLink, {});
  const { refresh } = useRouter();
  const callback = useCallback(() => {
    refresh();
  }, [refresh]);

  useServerActionToast({ state, callback });
  return (
    <form action={action} className="grid gap-2">
      <div className="grid items-start gap-2 sm:grid-cols-2">
        <div className="grid gap-1">
          <Label htmlFor="name">Name</Label>
          <Input name="name" id="name" defaultValue={state.prevs?.name} />
          <FormFieldError error={state.errors?.name} />
        </div>
        <div className="grid gap-1">
          <Label htmlFor="url">URL</Label>
          <Input name="url" id="url" defaultValue={state.prevs?.url} />
          <FormFieldError error={state.errors?.url} />
        </div>
      </div>
      <div>
        <SubmitButton>Add</SubmitButton>
      </div>
    </form>
  );
};

const LinksListItem = ({ link }: { link: Link }) => {
  const [mode, setMode] = useState<"view" | "edit" | "delete">("view");
  const cancel = useCallback(() => {
    setMode("view");
  }, []);
  return (
    <div className="py-2">
      {mode == "view" && (
        <div className="flex items-center justify-between text-sm">
          <p>{link.name}</p>
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
      {mode == "edit" && <EditLinkForm cancel={cancel} link={link} />}
      {mode == "delete" && <DeleteLinkForm cancel={cancel} link={link} />}
    </div>
  );
};

const EditLinkForm = ({ link, cancel }: { link: Link; cancel: () => void }) => {
  const [state, action] = useActionState(editLink, {});
  const { refresh } = useRouter();
  const callback = useCallback(() => {
    cancel();
    refresh();
  }, [refresh, cancel]);

  useServerActionToast({ state, callback });
  return (
    <form action={action} className="grid gap-2">
      <input type="hidden" name="id" value={link.id} />
      <div className="grid items-start gap-2 sm:grid-cols-2">
        <div className="grid gap-1">
          <Label htmlFor="name">Name</Label>
          <Input defaultValue={link.name} name="name" id="name" />
          <FormFieldError error={state.errors?.name} />
        </div>
        <div className="grid gap-1">
          <Label htmlFor="url">URL</Label>
          <Input defaultValue={link.url} name="url" id="url" />
          <FormFieldError error={state.errors?.url} />
        </div>
      </div>
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
    </form>
  );
};

const DeleteLinkForm = ({ link, cancel }: { link: Link; cancel: () => void }) => {
  const [state, action] = useActionState(deleteLink, {});
  const { refresh } = useRouter();
  const callback = useCallback(() => {
    cancel();
    refresh();
  }, [cancel, refresh]);

  useServerActionToast({ state, callback });
  return (
    <form action={action} className="flex items-center justify-between text-sm">
      <p>Delete {link.name} ?</p>
      <input type="hidden" name="id" value={link.id} />
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
