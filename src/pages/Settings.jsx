import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import Button from '../components/ui/Button'
import { Sun, Moon, Bell, Shield, Globe, Palette, Database, LogOut } from 'lucide-react'
import { cn } from '../utils/cn'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={cn('w-11 h-6 rounded-full transition-colors duration-300 relative flex-shrink-0', checked ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700')}
    >
      <div className={cn('absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300', checked ? 'translate-x-6' : 'translate-x-1')} />
    </button>
  )
}

export default function Settings() {
  const { isDark, toggleTheme } = useTheme()
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const [notifs, setNotifs] = useState({ email: true, sms: true, push: true, complaints: true, bills: true, visitors: true, notices: false })

  const settingsGroups = [
    {
      label: 'Appearance',
      icon: Palette,
      items: [
        { label: 'Dark Mode', description: 'Switch to dark theme for better night viewing', value: isDark, onChange: toggleTheme },
      ]
    },
    {
      label: 'Notifications',
      icon: Bell,
      items: [
        { label: 'Email Notifications', description: 'Receive updates via email', value: notifs.email, onChange: v => setNotifs(n => ({...n, email: v})) },
        { label: 'SMS Alerts', description: 'Get important alerts via SMS', value: notifs.sms, onChange: v => setNotifs(n => ({...n, sms: v})) },
        { label: 'Push Notifications', description: 'Browser push notifications', value: notifs.push, onChange: v => setNotifs(n => ({...n, push: v})) },
        { label: 'Complaint Updates', description: 'Notify when complaint status changes', value: notifs.complaints, onChange: v => setNotifs(n => ({...n, complaints: v})) },
        { label: 'Bill Reminders', description: 'Reminders for upcoming due dates', value: notifs.bills, onChange: v => setNotifs(n => ({...n, bills: v})) },
        { label: 'Visitor Alerts', description: 'Alert when visitor is at gate', value: notifs.visitors, onChange: v => setNotifs(n => ({...n, visitors: v})) },
      ]
    },
    {
      label: 'Privacy & Security',
      icon: Shield,
      items: [
        { label: 'Two-Factor Authentication', description: 'Add an extra layer of security', value: false, onChange: () => toast.error('2FA setup requires phone verification') },
        { label: 'Login Activity', description: 'Show recent login sessions', value: true, onChange: () => toast('Feature coming soon') },
      ]
    },
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-3xl">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 font-display">Settings</h1>

      {settingsGroups.map((group, gi) => (
        <Card key={gi}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <group.icon size={18} className="text-primary-600" /> {group.label}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 divide-y divide-gray-50 dark:divide-gray-700/50">
            {group.items.map((item, ii) => (
              <div key={ii} className="flex items-center justify-between py-3.5 first:pt-0">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.description}</p>
                </div>
                <Toggle checked={item.value} onChange={item.onChange} />
              </div>
            ))}
          </CardContent>
        </Card>
      ))}

      {/* Account Actions */}
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><Database size={18} className="text-primary-600" /> Account</CardTitle></CardHeader>
        <CardContent className="pt-0 space-y-3">
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Export My Data</p>
              <p className="text-xs text-gray-400">Download all your data in JSON format</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => toast.success('Data export initiated!')}>Export</Button>
          </div>
          <div className="flex items-center justify-between py-2 border-t border-gray-50 dark:border-gray-700/50">
            <div>
              <p className="text-sm font-medium text-red-600">Sign Out</p>
              <p className="text-xs text-gray-400">Sign out from all devices</p>
            </div>
            <Button variant="danger" size="sm" leftIcon={<LogOut size={14} />} onClick={() => { logout(); navigate('/login') }}>Sign Out</Button>
          </div>
        </CardContent>
      </Card>

      <p className="text-center text-xs text-gray-400">SmartSociety v2.0 · © 2026 · Made with ❤️</p>
    </motion.div>
  )
}
