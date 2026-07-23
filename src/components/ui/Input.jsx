import { forwardRef } from 'react'
import { cn } from '../../utils/cn'

export const Input = forwardRef(({
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  className,
  containerClass,
  required,
  ...props
}, ref) => {
  return (
    <div className={cn('flex flex-col gap-1.5', containerClass)}>
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none">
            {leftIcon}
          </span>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full h-10 px-3 py-2 text-sm bg-white dark:bg-gray-800/50',
            'border border-gray-200 dark:border-gray-700 rounded-xl',
            'text-gray-900 dark:text-gray-100',
            'placeholder:text-gray-400 dark:placeholder:text-gray-500',
            'focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400',
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50',
            'transition-all duration-200',
            leftIcon && 'pl-10',
            rightIcon && 'pr-10',
            error && 'border-red-400 focus:ring-red-400/30 focus:border-red-400',
            className
          )}
          {...props}
        />
        {rightIcon && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
            {rightIcon}
          </span>
        )}
      </div>
      {error && <p className="text-xs text-red-500 flex items-center gap-1">⚠ {error}</p>}
      {hint && !error && <p className="text-xs text-gray-400 dark:text-gray-500">{hint}</p>}
    </div>
  )
})

Input.displayName = 'Input'

export const TextArea = forwardRef(({ label, error, hint, className, containerClass, required, rows = 4, ...props }, ref) => {
  return (
    <div className={cn('flex flex-col gap-1.5', containerClass)}>
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <textarea
        ref={ref}
        rows={rows}
        className={cn(
          'w-full px-3 py-2.5 text-sm bg-white dark:bg-gray-800/50',
          'border border-gray-200 dark:border-gray-700 rounded-xl',
          'text-gray-900 dark:text-gray-100',
          'placeholder:text-gray-400 dark:placeholder:text-gray-500',
          'focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'transition-all duration-200 resize-none',
          error && 'border-red-400 focus:ring-red-400/30',
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-500">⚠ {error}</p>}
      {hint && !error && <p className="text-xs text-gray-400 dark:text-gray-500">{hint}</p>}
    </div>
  )
})

TextArea.displayName = 'TextArea'

export const Select = forwardRef(({ label, error, hint, className, containerClass, required, children, ...props }, ref) => {
  return (
    <div className={cn('flex flex-col gap-1.5', containerClass)}>
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <select
        ref={ref}
        className={cn(
          'w-full h-10 px-3 py-2 text-sm bg-white dark:bg-gray-800/50',
          'border border-gray-200 dark:border-gray-700 rounded-xl',
          'text-gray-900 dark:text-gray-100',
          'focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'transition-all duration-200 cursor-pointer',
          error && 'border-red-400',
          className
        )}
        {...props}
      >
        {children}
      </select>
      {error && <p className="text-xs text-red-500">⚠ {error}</p>}
      {hint && !error && <p className="text-xs text-gray-400 dark:text-gray-500">{hint}</p>}
    </div>
  )
})

Select.displayName = 'Select'
