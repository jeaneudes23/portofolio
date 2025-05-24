"use client";

import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/Dialog";
import { Project } from "@prisma/client";
import { Trash } from "lucide-react";
import React, { useActionState, useCallback, useRef } from "react";
import { SubmitButton } from "@/components/SubmitButton";
import { useServerActionToast } from "@/hooks/useServerActionToast";
import { useRouter } from "next/navigation";
import { deleteProject } from "../server-actions/projects-server-actions";

export const DeleteProjectModalForm = ({ project }: { project: Project }) => {
  const [state, action] = useActionState(deleteProject, {});

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
        <span className="sr-only">Delete {project.name}</span>
        <Trash className="size-4" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Are you sure you want to delete {project.name} ?</DialogTitle>
        </DialogHeader>
        <form action={action} className="grid gap-6">
          <input type="hidden" name="id" value={project.id} />
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
