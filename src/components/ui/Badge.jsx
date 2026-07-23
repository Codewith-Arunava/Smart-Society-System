import { cn } from '../../utils/cn'
import { getStatusColor, getPriorityColor, titleCase } from '../../utils/formatters'

export function StatusBadge({ status, className }) {
  if (!status) return null
  return (
    <span className={cn('status-badge', getStatusColor(status), className)}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
      {titleCase(status)}
    </span>
  )
}

export function PriorityBadge({ priority, className }) {
  if (!priority) return null
  const dotColors = {
    low: 'bg-gray-400',
    medium: 'bg-blue-500',
    high: 'bg-orange-500',
    critical: 'bg-red-500 animate-pulse',
  }
  return (
    <span className={cn('status-badge', getPriorityColor(priority), className)}>
      <span className={cn('w-1.5 h-1.5 rounded-full', dotColors[priority] || 'bg-gray-400')} />
      {titleCase(priority)}
    </span>
  )
}

export function Badge({ children, variant = 'default', className }) {
  const variants = {
    default: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
    primary: 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400',
    secondary: 'bg-secondary-100 text-secondary-700 dark:bg-secondary-900/30 dark:text-secondary-400',
    accent: 'bg-accent-100 text-accent-700 dark:bg-accent-900/30 dark:text-accent-400',
    success: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    warning: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    danger: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  }
  return (
    <span className={cn('inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold', variants[variant], className)}>
      {children}
    </span>
  )
}
