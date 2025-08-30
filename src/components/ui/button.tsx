"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-centre justify-centre gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        emergency: "bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg hover:from-red-700 hover:to-orange-700 transform hover:scale-105 transition-all duration-200 relative overflow-hidden",
        premium: "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200",
        success: "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg hover:from-green-700 hover:to-emerald-700 transform hover:scale-105",
        glass: "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-200",
        gradient: "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg hover:from-cyan-600 hover:to-blue-700 transform hover:scale-105",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-11 rounded-md px-8 text-base",
        xl: "h-14 rounded-lg px-12 text-lg font-semibold",
        icon: "h-9 w-9",
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
  loading?: boolean
  animate?: boolean
  glow?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, animate = true, glow = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    const baseClassName = cn(
      buttonVariants({ variant, size }),
      glow && "relative before:absolute before:inset-0 before:rounded-md before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
      className
    )
    
    const buttonContent = (
      <Comp
        className={baseClassName}
        ref={ref}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
            Loading...
          </>
        ) : (
          children
        )}
        {variant === "emergency" && (
          <div className="absolute inset-0 rounded-md bg-gradient-to-r from-red-600 to-orange-600 blur opacity-0 group-hover:opacity-50 transition-opacity duration-300 -z-10" />
        )}
      </Comp>
    )

    // Removed motion wrapper to fix Vercel build
    // Animation handled via CSS transitions instead

    return buttonContent
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }