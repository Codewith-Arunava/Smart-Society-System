import { useState, useRef, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Bell, Sun, Moon, Menu, Search, ChevronDown, LogOut, User, Settings, Users, Shield } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../utils/cn'
import { useApp } from '../context/AppContext'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { useNotifications } from '../context/NotificationContext'
import Avatar from '../components/ui/Avatar'

function NotificationPanel({ onClose }) {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications()
  const typeColors = {
    complaint: 'bg-red-100 text-red-600 dark:bg-red-900/30',
    payment: 'bg-green-100 text-green-600 dark:bg-green-900/30',
    visitor: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30',
    notice: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30',
    alert: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30',
    booking: 'bg-teal-100 text-teal-600 dark:bg-teal-900/30',
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="absolute right-0 top-12 w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 z-50 overflow-hidden"
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Notifications</h3>
          {unreadCount > 0 && <p className="text-xs text-gray-400">{unreadCount} unread</p>}
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllAsRead} className="text-xs text-primary-600 dark:text-primary-400 font-medium hover:underline">
            Mark all read
          </button>
        )}
      </div>
      <div className="max-h-96 overflow-y-auto divide-y divide-gray-50 dark:divide-gray-700/50">
        {notifications.slice(0, 8).map(n => (
          <div
            key={n.id}
            onClick={() => markAsRead(n.id)}
            className={cn('p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors', !n.read && 'bg-primary-50/50 dark:bg-primary-900/10')}
          >
            <div className="flex items-start gap-3">
              <div className={cn('w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0', typeColors[n.type] || typeColors.notice)}>
                {n.type === 'complaint' ? '⚠' : n.type === 'payment' ? '💰' : n.type === 'visitor' ? '👤' : n.type === 'alert' ? '🤖' : '📢'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{n.title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">{n.message}</p>
                <p className="text-xs text-gray-400 mt-1">{n.time}</p>
              </div>
              {!n.read && <div className="w-2 h-2 rounded-full bg-primary-500 flex-shrink-0 mt-1" />}
            </div>
          </div>
        ))}
      </div>
      <div className="p-3 border-t border-gray-100 dark:border-gray-700 text-center">
        <Link to="/notifications" onClick={onClose} className="text-xs text-primary-600 dark:text-primary-400 font-medium hover:underline">
          View all notifications
        </Link>
      </div>
    </motion.div>
  )
}

function ProfileMenu({ onClose }) {
  const { currentUser, logout, switchRole, mockUsers } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
    onClose()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="absolute right-0 top-12 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 z-50 overflow-hidden"
    >
      <div className="p-4 border-b border-gray-100 dark:border-gray-700">
        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{currentUser?.name}</p>
        <p className="text-xs text-gray-400 mt-0.5">{currentUser?.email}</p>
        <span className="mt-2 inline-block px-2 py-0.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-xs font-medium capitalize">
          {currentUser?.role}
        </span>
      </div>
      <div className="p-2">
        <Link to="/profile" onClick={onClose} className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <User size={16} /> My Profile
        </Link>
        <Link to="/admin/settings" onClick={onClose} className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <Settings size={16} /> Settings
        </Link>
      </div>
      <div className="p-2 border-t border-gray-100 dark:border-gray-700">
        <p className="px-3 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">Switch Role (Demo)</p>
        {mockUsers.map(u => (
          <button
            key={u.id}
            onClick={() => { switchRole(u.role); navigate(`/${u.role}/dashboard`); onClose() }}
            className={cn('w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-colors text-left',
              currentUser?.role === u.role ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            )}
          >
            {u.role === 'admin' ? <Users size={14} /> : u.role === 'security' ? <Shield size={14} /> : <User size={14} />}
            {u.name} ({u.role})
          </button>
        ))}
      </div>
      <div className="p-2 border-t border-gray-100 dark:border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          <LogOut size={16} /> Sign Out
        </button>
      </div>
    </motion.div>
  )
}

export default function Topbar() {
  const { toggleMobileSidebar } = useApp()
  const { currentUser } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const { unreadCount } = useNotifications()
  const [notifOpen, setNotifOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const notifRef = useRef(null)
  const profileRef = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false)
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700/50 flex items-center justify-between px-4 lg:px-6 gap-4 flex-shrink-0 z-30">
      {/* Left: Mobile menu + breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleMobileSidebar}
          className="lg:hidden p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <Menu size={20} />
        </button>
        <div className="hidden sm:block">
          <h1 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            {currentUser?.role === 'admin' ? 'Admin Portal' : currentUser?.role === 'security' ? 'Security Portal' : 'Resident Portal'}
          </h1>
          <p className="text-xs text-gray-400">Sunrise Heights Society</p>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => { setNotifOpen(p => !p); setProfileOpen(false) }}
            className="relative p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Notifications"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>
          <AnimatePresence>
            {notifOpen && <NotificationPanel onClose={() => setNotifOpen(false)} />}
          </AnimatePresence>
        </div>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => { setProfileOpen(p => !p); setNotifOpen(false) }}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Profile menu"
          >
            <Avatar src={currentUser?.avatar} name={currentUser?.name} size="sm" />
            <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300 max-w-[120px] truncate">
              {currentUser?.name?.split(' ')[0]}
            </span>
            <ChevronDown size={14} className="hidden sm:block text-gray-400" />
          </button>
          <AnimatePresence>
            {profileOpen && <ProfileMenu onClose={() => setProfileOpen(false)} />}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}
