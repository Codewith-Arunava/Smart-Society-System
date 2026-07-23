import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bell, BellOff, Check, Trash2, Filter } from 'lucide-react'
import { useNotifications } from '../context/NotificationContext'
import Button from '../components/ui/Button'
import { cn } from '../utils/cn'

const typeColors = {
  complaint: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
  payment: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
  visitor: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
  notice: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
  alert: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
  booking: 'bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400',
}
const typeEmoji = { complaint: '⚠️', payment: '💰', visitor: '👤', notice: '📢', alert: '🤖', booking: '📅' }

export default function NotificationsPage() {
  const { notifications, markAsRead, markAllAsRead, removeNotification } = useNotifications()
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all' ? notifications : filter === 'unread' ? notifications.filter(n => !n.read) : notifications.filter(n => n.type === filter)
  const unread = notifications.filter(n => !n.read).length

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 font-display">Notifications</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{unread} unread notifications</p>
        </div>
        {unread > 0 && (
          <Button variant="outline" size="sm" leftIcon={<Check size={15} />} onClick={markAllAsRead}>
            Mark All Read
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {['all', 'unread', 'complaint', 'payment', 'visitor', 'notice', 'alert'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn('px-3 py-1.5 rounded-full text-xs font-medium border transition-all',
              filter === f ? 'bg-primary-600 text-white border-primary-600' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700'
            )}
          >
            {f === 'all' ? `All (${notifications.length})` : f === 'unread' ? `Unread (${unread})` : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-2">
        {filtered.map(n => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className={cn(
              'flex items-start gap-4 p-4 rounded-2xl border transition-colors group cursor-pointer',
              n.read
                ? 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700/50'
                : 'bg-primary-50/50 dark:bg-primary-900/10 border-primary-100 dark:border-primary-800/30'
            )}
            onClick={() => markAsRead(n.id)}
          >
            <div className={cn('w-10 h-10 rounded-full flex items-center justify-center text-base flex-shrink-0', typeColors[n.type] || typeColors.notice)}>
              {typeEmoji[n.type] || '🔔'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className={cn('text-sm font-medium', n.read ? 'text-gray-700 dark:text-gray-300' : 'text-gray-900 dark:text-gray-100')}>{n.title}</p>
                {!n.read && <div className="w-2 h-2 rounded-full bg-primary-500 flex-shrink-0 mt-1.5" />}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{n.message}</p>
              <p className="text-xs text-gray-400 mt-1.5">{n.time}</p>
            </div>
            <button
              onClick={e => { e.stopPropagation(); removeNotification(n.id) }}
              className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
            >
              <Trash2 size={14} />
            </button>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <BellOff size={40} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <p className="text-sm text-gray-500">No notifications</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}
