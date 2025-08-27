import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

const premiumButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group isolate",
  {
    variants: {
      variant: {
        default: [
          "bg-gradient-to-r from-blue-600 to-cyan-600",
          "text-white shadow-lg hover:shadow-xl",
          "hover:scale-105 active:scale-100",
          "before:absolute before:inset-0 before:bg-gradient-to-r before:from-cyan-600 before:to-blue-600",
          "before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100",
          "after:absolute after:inset-0 after:bg-white/20 after:opacity-0",
          "active:after:opacity-100 after:transition-opacity after:duration-150"
        ].join(" "),
        
        premium: [
          "bg-gradient-to-r from-purple-600 via-pink-600 to-red-600",
          "text-white shadow-xl hover:shadow-2xl",
          "hover:scale-105 active:scale-100",
          "before:absolute before:inset-0 before:bg-gradient-to-l before:from-purple-600 before:via-pink-600 before:to-red-600",
          "before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100",
          "after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/10 after:to-transparent",
          "after:-translate-x-full hover:after:translate-x-full after:transition-transform after:duration-700"
        ].join(" "),
        
        glass: [
          "bg-white/10 backdrop-blur-md",
          "text-gray-900 dark:text-white",
          "border border-white/20",
          "shadow-lg hover:shadow-xl",
          "hover:bg-white/20 hover:scale-105 active:scale-100",
          "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:to-transparent",
          "before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300"
        ].join(" "),
        
        glow: [
          "bg-gradient-to-r from-blue-500 to-purple-600",
          "text-white",
          "shadow-lg hover:shadow-2xl",
          "hover:scale-105 active:scale-100",
          "before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-r before:from-blue-500 before:to-purple-600",
          "before:blur-xl before:opacity-50 hover:before:opacity-75 before:transition-opacity before:duration-300",
          "after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent",
          "after:-translate-x-full hover:after:translate-x-full after:transition-transform after:duration-700"
        ].join(" "),
        
        success: [
          "bg-gradient-to-r from-green-600 to-emerald-600",
          "text-white shadow-lg hover:shadow-xl",
          "hover:scale-105 active:scale-100",
          "hover:from-green-500 hover:to-emerald-500"
        ].join(" "),
        
        danger: [
          "bg-gradient-to-r from-red-600 to-rose-600",
          "text-white shadow-lg hover:shadow-xl",
          "hover:scale-105 active:scale-100",
          "hover:from-red-500 hover:to-rose-500",
          "animate-pulse-subtle"
        ].join(" "),
        
        outline: [
          "border-2 border-gray-300 dark:border-gray-600",
          "bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800",
          "text-gray-700 dark:text-gray-200",
          "hover:border-gray-400 dark:hover:border-gray-500",
          "hover:scale-105 active:scale-100",
          "shadow-sm hover:shadow-md"
        ].join(" "),
        
        ghost: [
          "hover:bg-gray-100 dark:hover:bg-gray-800",
          "text-gray-700 dark:text-gray-200",
          "hover:scale-105 active:scale-100"
        ].join(" "),
        
        link: [
          "text-blue-600 dark:text-blue-400",
          "underline-offset-4 hover:underline",
          "hover:text-blue-700 dark:hover:text-blue-300"
        ].join(" "),
      },
      size: {
        xs: "h-7 px-3 text-xs rounded-lg",
        sm: "h-9 px-4 text-sm rounded-lg",
        default: "h-11 px-6 text-base rounded-xl",
        lg: "h-13 px-8 text-lg rounded-xl",
        xl: "h-16 px-10 text-xl rounded-2xl",
        icon: "h-10 w-10 rounded-xl",
      },
      animate: {
        none: "",
        pulse: "animate-pulse",
        bounce: "animate-bounce",
        spin: "animate-spin",
        ping: "animate-ping",
        shimmer: [
          "before:absolute before:inset-0",
          "before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
          "before:-translate-x-full before:animate-shimmer",
          "overflow-hidden"
        ].join(" "),
      },
      gradient: {
        none: "",
        rainbow: [
          "bg-gradient-to-r",
          "from-purple-600 via-pink-600 to-red-600",
          "bg-size-200 animate-gradient-x"
        ].join(" "),
        ocean: [
          "bg-gradient-to-r",
          "from-blue-600 via-cyan-600 to-teal-600",
          "bg-size-200 animate-gradient-x"
        ].join(" "),
        sunset: [
          "bg-gradient-to-r",
          "from-orange-600 via-red-600 to-pink-600",
          "bg-size-200 animate-gradient-x"
        ].join(" "),
        forest: [
          "bg-gradient-to-r",
          "from-green-600 via-emerald-600 to-teal-600",
          "bg-size-200 animate-gradient-x"
        ].join(" "),
      },
      elevation: {
        none: "",
        low: "shadow-md hover:shadow-lg",
        medium: "shadow-lg hover:shadow-xl",
        high: "shadow-xl hover:shadow-2xl",
        floating: "shadow-2xl hover:shadow-3xl hover:-translate-y-1",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animate: "none",
      gradient: "none",
      elevation: "medium"
    },
  }
)

export interface PremiumButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof premiumButtonVariants> {
  asChild?: boolean
  loading?: boolean
  ripple?: boolean
  glow?: boolean
  children?: React.ReactNode
}

const PremiumButton = React.forwardRef<HTMLButtonElement, PremiumButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    animate,
    gradient,
    elevation,
    loading = false,
    ripple = true,
    glow = false,
    children,
    disabled,
    onClick,
    ...props 
  }, ref) => {
    const [ripples, setRipples] = React.useState<{ x: number; y: number; id: number }[]>([])

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (ripple && !disabled && !loading) {
        const button = e.currentTarget
        const rect = button.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const id = Date.now()
        
        setRipples(prev => [...prev, { x, y, id }])
        
        setTimeout(() => {
          setRipples(prev => prev.filter(r => r.id !== id))
        }, 600)
      }
      
      onClick?.(e)
    }

    return (
      <button
        className={cn(
          premiumButtonVariants({ variant, size, animate, gradient, elevation }),
          glow && [
            "before:absolute before:-inset-1 before:-z-10",
            "before:bg-gradient-to-r before:from-blue-600 before:to-purple-600",
            "before:rounded-xl before:blur-lg before:opacity-70",
            "hover:before:opacity-100 before:transition-opacity before:duration-300"
          ].join(" "),
          className
        )}
        ref={ref}
        disabled={disabled || loading}
        onClick={handleClick}
        {...props}
      >
        {/* Loading Spinner */}
        {loading && (
          <Loader2 className="h-4 w-4 animate-spin" />
        )}
        
        {/* Button Content */}
        <span className="relative z-10">
          {children}
        </span>
        
        {/* Ripple Effects */}
        {ripple && ripples.map(({ x, y, id }) => (
          <span
            key={id}
            className="absolute rounded-full bg-white/30 pointer-events-none animate-ripple"
            style={{
              left: x,
              top: y,
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </button>
    )
  }
)

PremiumButton.displayName = "PremiumButton"

export { PremiumButton, premiumButtonVariants }

// Add these animations to your global CSS or Tailwind config:
/*
@keyframes shimmer {
  to { transform: translateX(100%); }
}

@keyframes gradient-x {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

@keyframes pulse-subtle {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}

@keyframes ripple {
  to {
    width: 200px;
    height: 200px;
    opacity: 0;
  }
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}

.animate-gradient-x {
  animation: gradient-x 3s ease infinite;
}

.animate-pulse-subtle {
  animation: pulse-subtle 2s ease-in-out infinite;
}

.animate-ripple {
  animation: ripple 0.6s ease-out;
}

.bg-size-200 {
  background-size: 200% 200%;
}

.shadow-3xl {
  box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.3);
}
*/