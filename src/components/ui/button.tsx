import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "flex items-center justify-center cursor-pointer duration-300 gap-2 whitespace-nowrap rounded-md text-sm font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary-foreground text-primary shadow-xs hover:bg-primary-foreground/90",
        defaultSub:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive hover:bg-destructive/90 text-white shadow-xs",
        destructiveSub: "bg-white hover:bg-white/90 text-destructive shadow-xs",
        outline:
          "border-2 border-primary-foreground/80 hover:border-primary-foreground bg-primary text-primary-foreground shadow-xs hover:bg-primary-foreground hover:text-primary",
        outlineSub:
          "border-2 border-secondary-foreground/80 hover:border-secondary-foreground bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary-foreground hover:text-secondary",
        secondary:
          "bg-secondary-foreground text-secondary shadow-xs hover:bg-secondary-foreground/80",
        secondarySub:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-primary hover:text-primary-foreground",
        ghostSub: "hover:bg-secondary hover:text-secondary-foreground",
        link: "text-accent-foreground underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
