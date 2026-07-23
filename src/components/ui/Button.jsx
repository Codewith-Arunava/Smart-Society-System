import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

const variants = {
  default: 'bg-primary-600 hover:bg-primary-700 text-white shadow-sm hover:shadow-md',
  secondary: 'bg-secondary-500 hover:bg-secondary-600 text-white shadow-sm hover:shadow-md',
  accent: 'bg-accent-500 hover:bg-accent-600 text-white shadow-sm hover:shadow-md',
  outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20',
  ghost: 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800',
  danger: 'bg-red-500 hover:bg-red-600 text-white shadow-sm',
  success: 'bg-green-500 hover:bg-green-600 text-white shadow-sm',
  glass: 'bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30',
  link: 'text-primary-600 dark:text-primary-400 hover:underline p-0 h-auto',
}

const sizes = {
  xs: 'px-2.5 py-1.5 text-xs rounded-lg gap-1.5',
  sm: 'px-3 py-2 text-sm rounded-xl gap-2',
  md: 'px-4 py-2.5 text-sm rounded-xl gap-2',
  lg: 'px-6 py-3 text-base rounded-2xl gap-2.5',
  xl: 'px-8 py-4 text-lg rounded-2xl gap-3',
  icon: 'p-2.5 rounded-xl',
}

export function Button({
  children,
  variant = 'default',
  size = 'md',
  className,
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  onClick,
  type = 'button',
  ...props
}) {
  return (
    <motion.button
      type={type}
      whileTap={{ scale: disabled || loading ? 1 : 0.97 }}
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center font-semibold transition-all duration-200 cursor-pointer select-none',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {!loading && leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
      {children}
      {!loading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
    </motion.button>
  )
}

export default Button
