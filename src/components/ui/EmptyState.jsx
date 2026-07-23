import { motion } from 'framer-motion'
import { InboxIcon, SearchX, AlertCircle, FolderOpen } from 'lucide-react'
import { cn } from '../../utils/cn'
import Button from './Button'

const types = {
  empty: { Icon: FolderOpen, title: 'No Data Found', description: 'There are no records to display yet.' },
  search: { Icon: SearchX, title: 'No Results Found', description: 'Try adjusting your search or filter criteria.' },
  error: { Icon: AlertCircle, title: 'Something Went Wrong', description: 'An error occurred while loading data. Please try again.' },
  inbox: { Icon: InboxIcon, title: 'All Clear!', description: 'Nothing here. Come back later.' },
}

export function EmptyState({
  type = 'empty',
  title,
  description,
  action,
  actionLabel,
  className,
  icon: CustomIcon,
}) {
  const preset = types[type] || types.empty
  const Icon = CustomIcon || preset.Icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn('flex flex-col items-center justify-center py-16 px-8 text-center', className)}
    >
      <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-6">
        <Icon size={36} className="text-gray-400 dark:text-gray-500" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
        {title || preset.title}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
        {description || preset.description}
      </p>
      {action && (
        <div className="mt-6">
          <Button onClick={action}>{actionLabel || 'Take Action'}</Button>
        </div>
      )}
    </motion.div>
  )
}

export default EmptyState
