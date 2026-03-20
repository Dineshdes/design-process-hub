"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg border font-medium text-base outline-none transition-shadow focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-60",
  {
    defaultVariants: {
      size: "default",
      variant: "default",
    },
    variants: {
      size: {
        default: "h-9 px-3 text-sm",
        sm: "h-8 gap-1.5 px-2.5 text-sm",
        lg: "h-10 px-3.5",
        xl: "h-11 px-4 text-lg",
        icon: "size-9",
      },
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "border-transparent bg-destructive text-white hover:bg-destructive/90",
        ghost: "border-transparent text-foreground hover:bg-accent",
        link: "border-transparent underline-offset-4 hover:underline",
        outline: "border-border bg-background text-foreground hover:bg-accent/50",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
      },
    },
  },
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
