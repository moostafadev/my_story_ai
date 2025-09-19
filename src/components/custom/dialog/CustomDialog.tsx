"use client";

import React, { memo } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogProps } from "./types";
import { cn } from "@/lib/utils";

const CustomDialog = memo(
  ({
    title,
    description,
    open,
    onOpenChange,
    children,
    trigger,
    className,
  }: DialogProps) => {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        {trigger && <DialogTrigger>{trigger}</DialogTrigger>}

        <DialogContent
          className={cn(
            "max-h-[95%] overflow-y-scroll rtl:pl-1 ltr:pr-1",
            className
          )}
        >
          <DialogHeader>
            {title && (
              <DialogTitle
                className={cn(
                  "text-primary-foreground leading-tight",
                  title.className
                )}
              >
                {title.text}
              </DialogTitle>
            )}
            {description && (
              <DialogDescription className={description.className}>
                {description.text}
              </DialogDescription>
            )}
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  }
);

CustomDialog.displayName = "CustomDialog";

export default CustomDialog;
