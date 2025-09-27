import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        noStyle: "",
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        blueGradient:
          "font-medium text-white break-words rounded-full bg-[linear-gradient(180deg,rgba(31,147,219,0.63)0%,rgba(31,147,219,0.21)100%)] hover:bg-indigo-900",
        page404:
          "text-md md:text-xl px-12 mr-5 bg-_primary rounded-full hover:bg-_secondary font-medium text-_whiteText",
        homePageBlue:
          "text-xl px-12 mr-5 bg-_primary rounded-full hover:bg-_secondary font-medium text-_whiteText",
        homePageTransparent:
          "text-xl px-12 mr-5 text-_blackText border-black hover:bg-zinc-100 border-2",
        blue: "text-_whiteText text-sm bg-_primary hover:bg-_secondary dark:bg-_darkPrimary hover:dark:bg-_darkSecondary",
        blueOutline:
          "text-_darkText text-sm border-2 border-_primary dark:border-_darkPrimary hover:border-_secondary hover:dark:border-_darkSecondary",
        red: "text-_whiteText text-sm bg-_redText hover:bg-_lightRedText",
        gradient:
          "text-_whiteText text-sm bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl hover:from-cyan-600 hover:to-blue-700",
        new: "text-_whiteText text-sm bg-gradient-to-br from-cyan-300 via-blue-400 to-purple-300 dark:from-cyan-600 dark:via-blue-600 dark:to-purple-600 hover:bg-gradient-to-tl hover:from-cyan-500 hover:via-blue-500 hover:to-purple-500 dark:hover:from-cyan-700 dark:hover:via-blue-700 dark:hover:to-purple-700",
        gray: "text-_whiteText text-sm bg-slate-400 hover:bg-slate-500 dark:bg-slate-600 dark:hover:bg-slate-500",
      },
      size: {
        noStyle: "",
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        smFull: "h-9 rounded-full pr-4 pl-3",
        lg: "h-11 rounded-md px-8",
        roundPage404: "h-12 md:h-16 rounded-full",
        roundHomePage: "h-16 rounded-full",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
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
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
