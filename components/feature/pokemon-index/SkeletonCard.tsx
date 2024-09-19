import { Skeleton } from '@/components/ui/skeleton'

export const SkeletonCard = () => {
  return (
    <div className="relative flex aspect-square w-full animate-pulse flex-col items-center justify-center rounded-lg bg-gray-200 text-inherit dark:bg-gray-700">
      <Skeleton className="absolute right-1 top-1 h-4 w-8 bg-gray-600" />
      <Skeleton className="size-[90px] bg-gray-600" />
      <Skeleton className="mt-3 h-5 w-20 bg-gray-600" />
      <Skeleton className="mt-2 h-8 w-28 bg-gray-600" />
    </div>
  )
}
