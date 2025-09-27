"use client";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Separator } from "./ui/separator";

interface FormTitle {
  title: string;
  description: string;
}

export default function FormTitle({ title, description }: FormTitle) {
  return (
    <DialogHeader>
      <HoverCard>
        <HoverCardTrigger asChild>
          <DialogTitle className="flex items-center gap-1 hover:cursor-pointer text-2xl">
            {title}
            <span className="material-symbols-outlined text-2xl">info</span>
          </DialogTitle>
        </HoverCardTrigger>
        <Separator className="bg-_grayText mt-2 mb-4" />
        <HoverCardContent className="w-80">
          <div className="flex justify-between space-x-4">
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">Description</h4>
              <DialogDescription>{description}</DialogDescription>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </DialogHeader>
  );
}
