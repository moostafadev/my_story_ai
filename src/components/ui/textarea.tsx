import * as React from "react";
import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        `
        flex w-full min-w-0 rounded-md border border-input bg-background
        px-3 py-2 text-sm md:text-base shadow-xs
        placeholder:text-muted-foreground
        selection:bg-primary/10 selection:text-primary-foreground
        disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50
        outline-none resize-y min-h-[100px]

        focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[2px]
        aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive

        transition-all duration-200 ease-in-out
        transform hover:scale-[1.02] active:scale-[0.98]
        hover:shadow-md active:shadow-sm
        `,
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
