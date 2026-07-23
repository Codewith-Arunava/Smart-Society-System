import { cn } from '../../utils/cn'

export function LoadingSpinner({ size = 'md', color = 'primary', className }) {
  const sizes = { sm: 'w-4 h-4 border-2', md: 'w-8 h-8 border-2', lg: 'w-12 h-12 border-3', xl: 'w-16 h-16 border-4' }
  const colors = {
    primary: 'border-primary-200 border-t-primary-600',
    white: 'border-white/20 border-t-white',
    gray: 'border-gray-200 border-t-gray-600',
  }
  return (
    <div className={cn('animate-spin rounded-full', sizes[size], colors[color], className)} />
  )
}

export function PageLoader() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 gap-4">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-primary-100 dark:border-primary-900/30 border-t-primary-600 animate-spin" />
        <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-accent-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }} />
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Loading SmartSociety</p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Please wait...</p>
      </div>
    </div>
  )
}

export function SkeletonLoader({ className }) {
  return (
    <div className={cn('shimmer rounded-lg bg-gray-200 dark:bg-gray-700', className)} />
  )
}

export function TableSkeleton({ rows = 5, cols = 5 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4">
          {Array.from({ length: cols }).map((_, j) => (
            <SkeletonLoader key={j} className={cn('h-10', j === 0 ? 'w-32' : 'flex-1')} />
          ))}
        </div>
      ))}
    </div>
  )
}

export function CardSkeleton({ count = 4 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-card">
          <div className="flex justify-between mb-4">
            <SkeletonLoader className="w-12 h-12 rounded-2xl" />
            <SkeletonLoader className="w-16 h-6 rounded-full" />
          </div>
          <SkeletonLoader className="h-4 w-24 mb-2" />
          <SkeletonLoader className="h-8 w-32" />
        </div>
      ))}
    </div>
  )
}
