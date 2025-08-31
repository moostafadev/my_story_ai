import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  `
    flex items-center justify-center cursor-pointer gap-2 whitespace-nowrap 
    rounded-md text-sm font-medium shrink-0
    disabled:opacity-50 disabled:!cursor-not-allowed
    [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0
    
    outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] 
    aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive
    
    transition-all duration-200 ease-in-out 
    transform hover:scale-[1.05] active:scale-[0.95] 
    hover:shadow-md active:shadow-sm
  `,
  {
    variants: {
      variant: {
        default:
          "bg-primary text-background shadow-xs hover:bg-primary-foreground",
        defaultSub:
          "bg-primary-foreground text-background shadow-xs hover:bg-primary",
        destructive:
          "bg-destructive hover:bg-destructive/90 text-white shadow-xs",
        destructiveSub: "bg-white hover:bg-white/90 text-destructive shadow-xs",
        outline:
          "border-2 border-primary/80 hover:border-primary bg-background text-primary-foreground shadow-xs hover:bg-primary hover:text-background",
        outlineSub:
          "border-2 border-secondary-foreground/80 hover:border-secondary-foreground bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary-foreground hover:text-secondary",
        secondary:
          "bg-secondary-foreground text-secondary shadow-xs hover:bg-secondary-foreground/80",
        secondarySub:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-background-accent",
        ghostSub: "hover:bg-secondary hover:text-secondary-foreground",
        link: "text-accent-foreground underline-offset-4 hover:underline hover:shadow-none !p-0",
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

const LoadingDots = ({ size }: { size: "sm" | "default" | "lg" | "icon" }) => {
  const dotSize =
    size === "sm" ? "w-1 h-1" : size === "lg" ? "w-2 h-2" : "w-1.5 h-1.5";
  const gap = size === "sm" ? "gap-0.5" : size === "lg" ? "gap-1.5" : "gap-1";

  return (
    <span className={cn("flex items-center", gap)} aria-label="Loading">
      <span
        className={cn(
          dotSize,
          "rounded-full bg-current opacity-80",
          "animate-bounce [animation-duration:0.8s] [animation-delay:-0.32s]"
        )}
      />
      <span
        className={cn(
          dotSize,
          "rounded-full bg-current opacity-80",
          "animate-bounce [animation-duration:0.8s] [animation-delay:-0.16s]"
        )}
      />
      <span
        className={cn(
          dotSize,
          "rounded-full bg-current opacity-80",
          "animate-bounce [animation-duration:0.8s]"
        )}
      />
    </span>
  );
};

function Button({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  children,
  disabled,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    loading?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading ? <LoadingDots size={size || "default"} /> : children}
    </Comp>
  );
}

export { Button, buttonVariants };
