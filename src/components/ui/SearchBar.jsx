import { Search, X } from 'lucide-react'
import { cn } from '../../utils/cn'

export function SearchBar({ value, onChange, onClear, placeholder = 'Search...', className, size = 'md' }) {
  const sizes = {
    sm: 'h-8 text-sm pl-8 pr-8',
    md: 'h-10 text-sm pl-10 pr-10',
    lg: 'h-12 text-base pl-12 pr-12',
  }
  const iconSizes = { sm: 14, md: 16, lg: 20 }
  const iconPos = { sm: 'left-2.5', md: 'left-3', lg: 'left-3.5' }

  return (
    <div className={cn('relative flex-1', className)}>
      <Search
        size={iconSizes[size]}
        className={cn('absolute top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none', iconPos[size])}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          'w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl',
          'text-gray-900 dark:text-gray-100 placeholder:text-gray-400',
          'focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400',
          'transition-all duration-200',
          sizes[size]
        )}
      />
      {value && (
        <button
          onClick={onClear}
          className={cn('absolute top-1/2 -translate-y-1/2 right-3 text-gray-400 hover:text-gray-600 transition-colors')}
        >
          <X size={14} />
        </button>
      )}
    </div>
  )
}

export default SearchBar
