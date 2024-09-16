import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'
import clsx from 'clsx'
import { cn } from '@/lib/utils'

interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  indicatorClassName?: string
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, max, indicatorClassName, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      'relative h-5 w-full overflow-hidden rounded-full bg-secondary',
      className,
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={clsx(
        'size-full flex-1 transition-all',
        indicatorClassName || 'bg-primary',
      )}
      style={{
        transform: `translateX(-${
          100 - Math.min(100, ((value || 0) / (max || 100)) * 100)
        }%)`,
      }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
