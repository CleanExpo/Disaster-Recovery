import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const r6CardVariants = cva(
  "relative overflow-hidden transition-all duration-500",
  {
    variants: {
      variant: {
        default: [
          "bg-white rounded-2xl",
          "shadow-[0_4px_20px_rgba(0,0,0,0.08)]",
          "hover:shadow-[0_8px_30px_rgba(19,28,255,0.12)]",
          "hover:translate-y-[-4px]",
          "border border-[#eeeeee]",
        ].join(" "),
        
        glass: [
          "bg-white/80 backdrop-blur-xl rounded-2xl",
          "shadow-[0_8px_32px_rgba(31,38,135,0.15)]",
          "hover:shadow-[0_8px_40px_rgba(19,28,255,0.25)]",
          "hover:bg-white/90",
          "border border-white/20",
          "hover:translate-y-[-4px]",
        ].join(" "),
        
        gradient: [
          "bg-gradient-to-br from-white to-[#f8f9fa] rounded-2xl",
          "shadow-[0_4px_20px_rgba(0,0,0,0.08)]",
          "hover:shadow-[0_8px_30px_rgba(19,28,255,0.15)]",
          "hover:translate-y-[-4px]",
          "border border-[#eeeeee]",
        ].join(" "),
        
        bordered: [
          "bg-white rounded-2xl",
          "border-2 border-[#131cff]",
          "hover:shadow-[0_8px_30px_rgba(19,28,255,0.2)]",
          "hover:translate-y-[-4px]",
        ].join(" "),
        
        dark: [
          "bg-[#1a1a1a] text-white rounded-2xl",
          "shadow-[0_4px_20px_rgba(0,0,0,0.3)]",
          "hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)]",
          "hover:translate-y-[-4px]",
          "border border-[#2a2a2a]",
        ].join(" "),
        
        interactive: [
          "bg-white rounded-2xl cursor-pointer",
          "shadow-[0_4px_20px_rgba(0,0,0,0.08)]",
          "hover:shadow-[0_12px_40px_rgba(19,28,255,0.2)]",
          "hover:scale-[1.02]",
          "active:scale-[0.98]",
          "border border-[#eeeeee]",
          "hover:border-[#131cff]/20",
        ].join(" "),
      },
      
      padding: {
        none: "",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
        xl: "p-10",
      },
      
      hover: {
        none: "",
        lift: "hover:translate-y-[-8px]",
        glow: "hover:shadow-[0_0_40px_rgba(19,28,255,0.3)]",
        scale: "hover:scale-[1.05]",
      }
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
      hover: "none",
    },
  }
)

interface R6CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof r6CardVariants> {
  children?: React.ReactNode
  hoverEffect?: boolean
  glowOnHover?: boolean
}

const R6Card = React.forwardRef<HTMLDivElement, R6CardProps>(
  ({ className, variant, padding, hover, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          r6CardVariants({ variant, padding, hover }),
          "group",
          className
        )}
        {...props}
      >
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#131cff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
        {children}
      </div>
    )
  }
)
R6Card.displayName = "R6Card"

const R6CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5", className)}
    {...props}
  />
))
R6CardHeader.displayName = "R6CardHeader"

const R6CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-bold leading-tight tracking-tight text-[#000000]",
      className
    )}
    {...props}
  />
))
R6CardTitle.displayName = "R6CardTitle"

const R6CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-base text-[#6a6d72] leading-relaxed", className)}
    {...props}
  />
))
R6CardDescription.displayName = "R6CardDescription"

const R6CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("pt-0", className)} {...props} />
))
R6CardContent.displayName = "R6CardContent"

const R6CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center pt-0", className)}
    {...props}
  />
))
R6CardFooter.displayName = "R6CardFooter"

export { 
  R6Card, 
  R6CardHeader, 
  R6CardFooter, 
  R6CardTitle, 
  R6CardDescription, 
  R6CardContent,
  r6CardVariants 
}