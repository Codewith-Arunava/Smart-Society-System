import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

export function Card({ children, className, hover = false, glass = false, onClick, ...props }) {
  const base = 'bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-card'
  const hoverClass = hover ? 'cursor-pointer card-hover' : ''
  const glassClass = glass ? 'glass' : base

  return (
    <motion.div
      className={cn(glassClass, hoverClass, className)}
      onClick={onClick}
      whileHover={hover ? { y: -2 } : {}}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function CardHeader({ children, className }) {
  return (
    <div className={cn('px-6 pt-6 pb-0', className)}>
      {children}
    </div>
  )
}

export function CardContent({ children, className }) {
  return (
    <div className={cn('px-6 py-4', className)}>
      {children}
    </div>
  )
}

export function CardFooter({ children, className }) {
  return (
    <div className={cn('px-6 pb-6 pt-0', className)}>
      {children}
    </div>
  )
}

export function CardTitle({ children, className }) {
  return (
    <h3 className={cn('text-base font-semibold text-gray-900 dark:text-gray-100', className)}>
      {children}
    </h3>
  )
}

export function CardDescription({ children, className }) {
  return (
    <p className={cn('text-sm text-gray-500 dark:text-gray-400 mt-1', className)}>
      {children}
    </p>
  )
}

export default Card
