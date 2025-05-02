
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 transform hover:scale-[1.02] active:scale-[0.98] hover:shadow-md",
  {
    variants: {
      variant: {
        default: "bg-theme-primary text-white hover:bg-theme-primary-dark",
        destructive: "bg-[#C9796A] text-white hover:bg-[#B5675A]",
        outline: "border border-theme-primary bg-transparent text-theme-primary hover:bg-theme-primary/10",
        secondary: "bg-theme-secondary text-theme-accent hover:bg-theme-primary-light",
        ghost: "hover:bg-theme-primary/10 text-theme-primary",
        link: "text-theme-primary underline-offset-4 hover:underline",
        premium: "bg-gradient-to-r from-theme-primary to-theme-accent text-white hover:from-theme-primary-dark hover:to-theme-accent",
        elegant: "bg-gradient-to-br from-theme-primary to-theme-primary-dark text-white hover:opacity-90"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
