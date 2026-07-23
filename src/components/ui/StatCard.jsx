import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { cn } from '../../utils/cn'

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = 'text-primary-600',
  iconBg = 'bg-primary-50 dark:bg-primary-900/20',
  trend,
  trendValue,
  trendLabel,
  className,
  gradient,
  onClick,
}) {
  const isPositive = trend === 'up'
  const isNegative = trend === 'down'

  return (
    <motion.div
      whileHover={{ y: -3, boxShadow: '0 10px 25px -5px rgba(37,99,235,0.15)' }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className={cn(
        'stat-card relative overflow-hidden group',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {/* Gradient overlay on hover */}
      {gradient && (
        <div className={cn('absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl', gradient)} />
      )}
      <div className="flex items-start justify-between mb-4">
        <div className={cn('w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0', iconBg)}>
          {Icon && <Icon size={22} className={iconColor} />}
        </div>
        {trend && trendValue && (
          <div className={cn(
            'flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold',
            isPositive ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : '',
            isNegative ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : '',
            !trend || trend === 'neutral' ? 'bg-gray-100 text-gray-600 dark:bg-gray-800' : '',
          )}>
            {isPositive && <TrendingUp size={12} />}
            {isNegative && <TrendingDown size={12} />}
            {trend === 'neutral' && <Minus size={12} />}
            {trendValue}
          </div>
        )}
      </div>

      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
        {(subtitle || trendLabel) && (
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5">
            {subtitle || trendLabel}
          </p>
        )}
      </div>
    </motion.div>
  )
}

export function MiniStatCard({ title, value, icon: Icon, color = 'primary', className }) {
  const colorMap = {
    primary: { bg: 'bg-primary-500', text: 'text-primary-600', light: 'bg-primary-50 dark:bg-primary-900/20' },
    secondary: { bg: 'bg-secondary-500', text: 'text-secondary-600', light: 'bg-secondary-50 dark:bg-secondary-900/20' },
    accent: { bg: 'bg-accent-500', text: 'text-accent-600', light: 'bg-accent-50 dark:bg-accent-900/20' },
    warning: { bg: 'bg-amber-500', text: 'text-amber-600', light: 'bg-amber-50 dark:bg-amber-900/20' },
    danger: { bg: 'bg-red-500', text: 'text-red-600', light: 'bg-red-50 dark:bg-red-900/20' },
    success: { bg: 'bg-green-500', text: 'text-green-600', light: 'bg-green-50 dark:bg-green-900/20' },
  }
  const c = colorMap[color] || colorMap.primary
  return (
    <div className={cn('flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700', className)}>
      {Icon && (
        <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center', c.light)}>
          <Icon size={18} className={c.text} />
        </div>
      )}
      <div>
        <p className="text-xs text-gray-500 dark:text-gray-400">{title}</p>
        <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{value}</p>
      </div>
    </div>
  )
}

export default StatCard
