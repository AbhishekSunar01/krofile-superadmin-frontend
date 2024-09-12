import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/80",
        success: "bg-[#00A81C] text-white shadow-sm hover:bg-[#00A81C]/80",
        outline1: "border border-input bg-background shadow-sm ",
        outline:
          "border border-input bg-background shadow-sm hover:bg-mainBg hover:text-accent-foreground hover:shadow-md",
        pagination: "text-primary border border-input bg-background",
        paginationActive:
          "bg-primary text-white rounded-full border border-input disabled:opacity-100",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost:
          "hover:bg-gray-10 hover:text-accent-foreground font-[400] text-[14px] cursor-default",
        link: "text-primary underline-offset-4 hover:underline",
        login:
          "bg-[#14181f] text-primary-foreground rounded-[24px] px-[64px] text-[18px] font-[500]",
        backBtn:
          "bg-[#F6F7F9] border border-borderColor rounded-full flex justify-center items-center h-[48px] w-[48px] cursor-pointer",
        disabled: "bg-[#B6C1CA] shadow-none cursor-not-allowed text-white",
        start: "bg- text-white shadow-sm hover:bg-start/80",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
        login: "h-[48px]",
        backBtn: "h-[48px] w-[48px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

// eslint-disable-next-line react-refresh/only-export-components
export { Button, buttonVariants };
