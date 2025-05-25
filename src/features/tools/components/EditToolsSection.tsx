import { EditContent } from "@/features/content/components/EditContent";
import { Tool } from "@prisma/client";
import { Code } from "lucide-react";
import React from "react";
import { EditableToolCard } from "./EditableToolCard";
import { NewToolModal } from "./NewToolModal";

interface Props {
  my_tools_title: string;
  tools: Tool[];
}

export const EditToolsSection = ({ my_tools_title, tools }: Props) => {
  return (
    <div className="space-y-4">
      <h3 className="flex items-center justify-end gap-2 font-semibold lg:text-lg">
        <Code className="size-5" /> <EditContent field="my_tools_title">{my_tools_title}</EditContent>
      </h3>
      <div className="grid grid-cols-2 gap-1 sm:grid-cols-[repeat(auto-fit,minmax(150px,1fr))]">
        {tools.map((tool) => (
          <EditableToolCard key={tool.id} tool={tool} />
        ))}
        <NewToolModal />
      </div>
    </div>
  );
};
