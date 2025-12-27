import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-bold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          'bg-nrpg-blue text-white rounded-2xl shadow-md hover:bg-nrpg-blue/90 shadow-nrpg-blue/20',
        emergency:
          'bg-nrpg-red text-white rounded-3xl font-black shadow-2xl shadow-nrpg-red/30 hover:bg-nrpg-red/90 focus-visible:ring-nrpg-red',
        outline:
          'border-2 border-slate-200 bg-transparent rounded-2xl hover:bg-slate-50 hover:border-slate-300',
        secondary:
          'bg-slate-100 text-slate-900 rounded-2xl hover:bg-slate-200',
        ghost:
          'hover:bg-slate-100 rounded-xl',
        link:
          'text-nrpg-blue underline-offset-4 hover:underline font-semibold',
      },
      size: {
        default: 'h-10 px-6 py-2 text-sm',
        sm: 'h-8 px-4 text-xs rounded-xl',
        lg: 'h-12 px-10 py-3 text-base rounded-2xl',
        xl: 'h-16 px-12 py-5 text-lg rounded-3xl',
        icon: 'size-10 rounded-xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
