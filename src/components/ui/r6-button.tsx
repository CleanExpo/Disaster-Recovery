import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

const r6ButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden",
  {
    variants: {
      variant: {
        primary: [
          "bg-[#131cff] text-white",
          "hover:bg-[#0f17cc] hover:shadow-xl hover:scale-[1.02]",
          "active:scale-[0.98]",
          "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
          "before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700",
        ].join(" "),
        
        secondary: [
          "bg-white text-[#131cff] border-2 border-[#131cff]",
          "hover:bg-[#131cff] hover:text-white hover:shadow-lg",
          "active:scale-[0.98]",
        ].join(" "),
        
        gradient: [
          "bg-gradient-to-r from-[#131cff] to-[#00a0d2] text-white",
          "hover:shadow-2xl hover:scale-[1.02]",
          "active:scale-[0.98]",
          "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent",
          "before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700",
        ].join(" "),
        
        glass: [
          "bg-white/10 backdrop-blur-md text-[#131cff] border border-white/20",
          "hover:bg-white/20 hover:shadow-lg",
          "active:scale-[0.98]",
        ].join(" "),
        
        dark: [
          "bg-[#1a1a1a] text-white",
          "hover:bg-[#2a2a2a] hover:shadow-xl",
          "active:scale-[0.98]",
        ].join(" "),
        
        outline: [
          "border-2 border-[#c7cfdb] text-[#6a6d72] bg-transparent",
          "hover:border-[#131cff] hover:text-[#131cff] hover:bg-[#131cff]/5",
          "active:scale-[0.98]",
        ].join(" "),
        
        ghost: [
          "text-[#6a6d72] bg-transparent",
          "hover:text-[#131cff] hover:bg-[#131cff]/10",
          "active:scale-[0.98]",
        ].join(" "),
        
        danger: [
          "bg-[#e74c3c] text-white",
          "hover:bg-[#c0392b] hover:shadow-xl",
          "active:scale-[0.98]",
        ].join(" "),
        
        success: [
          "bg-[#00a0d2] text-white",
          "hover:bg-[#0088b3] hover:shadow-xl",
          "active:scale-[0.98]",
        ].join(" "),
      },
      
      size: {
        xs: "h-8 px-3 text-xs rounded-lg",
        sm: "h-10 px-4 text-sm rounded-lg",
        md: "h-12 px-6 text-base rounded-xl",
        lg: "h-14 px-8 text-lg rounded-xl",
        xl: "h-16 px-10 text-xl rounded-2xl",
        icon: "h-10 w-10 rounded-lg",
        iconLg: "h-12 w-12 rounded-xl",
      },
      
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  }
)

export interface R6ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof r6ButtonVariants> {
  asChild?: boolean
  loading?: boolean
  loadingText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const R6Button = React.forwardRef<HTMLButtonElement, R6ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    fullWidth,
    asChild = false, 
    loading = false,
    loadingText,
    leftIcon,
    rightIcon,
    children,
    disabled,
    ...props 
  }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    return (
      <Comp
        className={cn(
          r6ButtonVariants({ variant, size, fullWidth, className }),
          "group"
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {loadingText || children}
          </>
        ) : (
          <>
            {leftIcon && <span className="mr-2">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="ml-2">{rightIcon}</span>}
          </>
        )}
      </Comp>
    )
  }
)
R6Button.displayName = "R6Button"

export { R6Button, r6ButtonVariants }