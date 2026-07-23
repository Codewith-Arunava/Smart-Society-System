import { NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Users, MessageSquare, CreditCard, Car, UserCheck,
  Bell, BookOpen, BarChart3, Brain, Settings, HelpCircle, LogOut,
  ChevronLeft, ChevronRight, Building2, Shield, Wrench, MapPin,
  Calendar, FileText, Home, ClipboardList, TrendingUp
} from 'lucide-react'
import { cn } from '../utils/cn'
import { useApp } from '../context/AppContext'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import Avatar from '../components/ui/Avatar'

const navGroups = {
  admin: [
    {
      label: 'Overview',
      items: [
        { label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
        { label: 'Analytics', icon: BarChart3, path: '/admin/analytics' },
        { label: 'AI Insights', icon: Brain, path: '/admin/ai-insights', badge: 'AI' },
      ]
    },
    {
      label: 'Management',
      items: [
        { label: 'Residents', icon: Users, path: '/admin/residents' },
        { label: 'Complaints', icon: MessageSquare, path: '/admin/complaints' },
        { label: 'Visitors', icon: UserCheck, path: '/admin/visitors' },
        { label: 'Parking', icon: Car, path: '/admin/parking' },
        { label: 'Notice Board', icon: Bell, path: '/admin/notices' },
      ]
    },
    {
      label: 'Finance',
      items: [
        { label: 'Bills & Payments', icon: CreditCard, path: '/admin/bills' },
      ]
    },
    {
      label: 'System',
      items: [
        { label: 'Settings', icon: Settings, path: '/admin/settings' },
        { label: 'Help Center', icon: HelpCircle, path: '/help' },
      ]
    },
  ],
  resident: [
    {
      label: 'Overview',
      items: [
        { label: 'Dashboard', icon: Home, path: '/resident/dashboard' },
        { label: 'Notices', icon: Bell, path: '/resident/notices' },
      ]
    },
    {
      label: 'Services',
      items: [
        { label: 'Complaints', icon: MessageSquare, path: '/resident/complaints' },
        { label: 'Maintenance Bills', icon: CreditCard, path: '/resident/bills' },
        { label: 'Parking', icon: Car, path: '/resident/parking' },
        { label: 'Visitor Entry', icon: UserCheck, path: '/resident/visitors' },
        { label: 'Facility Booking', icon: Calendar, path: '/resident/bookings' },
      ]
    },
    {
      label: 'Account',
      items: [
        { label: 'My Profile', icon: Users, path: '/profile' },
        { label: 'Help Center', icon: HelpCircle, path: '/help' },
      ]
    },
  ],
  security: [
    {
      label: 'Overview',
      items: [
        { label: 'Dashboard', icon: Shield, path: '/security/dashboard' },
      ]
    },
    {
      label: 'Gate Management',
      items: [
        { label: 'Visitor Entry', icon: UserCheck, path: '/security/visitor-entry' },
        { label: 'Visitor History', icon: ClipboardList, path: '/security/visitor-history' },
      ]
    },
    {
      label: 'Account',
      items: [
        { label: 'Help Center', icon: HelpCircle, path: '/help' },
      ]
    },
  ],
}

export default function Sidebar() {
  const { sidebarCollapsed, toggleSidebar, mobileSidebarOpen, setMobileSidebarOpen } = useApp()
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  const role = currentUser?.role || 'admin'
  const groups = navGroups[role] || navGroups.admin

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const SidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={cn('flex items-center gap-3 px-4 h-16 border-b border-gray-100 dark:border-gray-700/50 flex-shrink-0', sidebarCollapsed && 'justify-center px-2')}>
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-600 to-secondary-500 flex items-center justify-center flex-shrink-0">
          <Building2 size={18} className="text-white" />
        </div>
        <AnimatePresence>
          {!sidebarCollapsed && (
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
              <p className="font-bold text-gray-900 dark:text-gray-100 text-sm leading-none">SmartSociety</p>
              <p className="text-xs text-gray-400 dark:text-gray-500">v2.0</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 scrollbar-hide">
        {groups.map((group) => (
          <div key={group.label} className="mb-4">
            <AnimatePresence>
              {!sidebarCollapsed && (
                <motion.p
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="px-3 mb-1.5 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider"
                >
                  {group.label}
                </motion.p>
              )}
            </AnimatePresence>
            {group.items.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileSidebarOpen(false)}
                className={({ isActive }) =>
                  cn('sidebar-link', isActive && 'sidebar-link-active', sidebarCollapsed && 'justify-center px-0')
                }
                title={sidebarCollapsed ? item.label : undefined}
              >
                <item.icon size={18} className="flex-shrink-0" />
                <AnimatePresence>
                  {!sidebarCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -5 }}
                      className="flex-1 text-sm"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {!sidebarCollapsed && item.badge && (
                  <span className="text-xs px-1.5 py-0.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-bold">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* User */}
      <div className={cn('border-t border-gray-100 dark:border-gray-700/50 p-3', sidebarCollapsed && 'flex justify-center')}>
        {!sidebarCollapsed ? (
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer group transition-colors">
            <Avatar src={currentUser?.avatar} name={currentUser?.name} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">{currentUser?.name}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 capitalize truncate">{currentUser?.role}</p>
            </div>
            <button
              onClick={handleLogout}
              className="opacity-0 group-hover:opacity-100 p-1 rounded-lg text-gray-400 hover:text-red-500 transition-all"
              title="Logout"
            >
              <LogOut size={14} />
            </button>
          </div>
        ) : (
          <Avatar src={currentUser?.avatar} name={currentUser?.name} size="sm" />
        )}
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: sidebarCollapsed ? 72 : 260 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="hidden lg:flex flex-col h-full bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-700/50 relative flex-shrink-0"
      >
        {SidebarContent}
        {/* Collapse toggle */}
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-20 z-10 w-6 h-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all text-gray-500 hover:text-primary-600"
        >
          {sidebarCollapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>
      </motion.aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="fixed left-0 top-0 z-50 h-full w-[260px] bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-700/50 lg:hidden"
            >
              {SidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
