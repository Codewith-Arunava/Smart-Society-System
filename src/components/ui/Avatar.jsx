import { cn } from '../../utils/cn'
import { getInitials } from '../../utils/formatters'

const sizes = {
  xs:  'w-6 h-6 text-xs',
  sm:  'w-8 h-8 text-xs',
  md:  'w-10 h-10 text-sm',
  lg:  'w-12 h-12 text-base',
  xl:  'w-16 h-16 text-lg',
  '2xl': 'w-20 h-20 text-xl',
}

const colors = [
  'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400',
  'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
]

export function Avatar({ src, name, size = 'md', className, online }) {
  const initials = getInitials(name || '')
  const colorIndex = (name || '').charCodeAt(0) % colors.length

  return (
    <div className={cn('relative flex-shrink-0', className)}>
      {src ? (
        <img
          src={src}
          alt={name || 'avatar'}
          className={cn('rounded-full object-cover ring-2 ring-white dark:ring-gray-800', sizes[size])}
          onError={(e) => {
            e.target.style.display = 'none'
            e.target.nextSibling?.style.removeProperty('display')
          }}
        />
      ) : null}
      {(!src || true) && (
        <div
          className={cn(
            'rounded-full flex items-center justify-center font-semibold flex-shrink-0',
            sizes[size],
            colors[colorIndex],
            src ? 'hidden' : ''
          )}
        >
          {initials}
        </div>
      )}
      {online !== undefined && (
        <span className={cn(
          'absolute bottom-0 right-0 rounded-full ring-2 ring-white dark:ring-gray-800',
          size === 'xs' || size === 'sm' ? 'w-2 h-2' : 'w-3 h-3',
          online ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
        )} />
      )}
    </div>
  )
}

export function AvatarGroup({ avatars = [], max = 4, size = 'sm' }) {
  const visible = avatars.slice(0, max)
  const rest = avatars.length - max

  return (
    <div className="flex items-center">
      {visible.map((av, i) => (
        <div key={i} className={cn('-ml-2 first:ml-0 ring-2 ring-white dark:ring-gray-800 rounded-full')}>
          <Avatar src={av.src} name={av.name} size={size} />
        </div>
      ))}
      {rest > 0 && (
        <div className={cn(
          '-ml-2 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-xs font-semibold text-gray-600 dark:text-gray-300 ring-2 ring-white dark:ring-gray-800',
          sizes[size]
        )}>
          +{rest}
        </div>
      )}
    </div>
  )
}

export default Avatar
