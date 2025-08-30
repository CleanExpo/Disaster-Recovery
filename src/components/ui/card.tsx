"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  animate?: boolean
  hover?: boolean
  glow?: boolean
  glass?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, animate = true, hover = true, glow = false, glass = false, children, ...props }, ref) => {
    const baseClassName = cn(
      "rounded-xl border bg-card text-card-foreground shadow transition-all duration-300",
      glass && "bg-white/10 backdrop-blur-md border-white/20",
      glow && "shadow-2xl shadow-blue-500/10",
      hover && "hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02]",
      animate && "animate-in fade-in-0 slide-in-from-bottom-4 duration-500",
      className
    )

    return (
      <div ref={ref} className={baseClassName} {...props}>
        {children}
      </div>
    )
  }
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-centre p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }