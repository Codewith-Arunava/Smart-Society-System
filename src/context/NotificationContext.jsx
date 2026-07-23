import { createContext, useContext, useState, useCallback } from 'react'
import { format } from 'date-fns'

const NotificationContext = createContext(null)

const initialNotifications = [
  { id: 'n1', type: 'complaint', title: 'New Complaint Submitted', message: 'CMP-0289: Water leakage in B-201 reported by Amit Sharma', time: '5 min ago', read: false, priority: 'high' },
  { id: 'n2', type: 'payment', title: 'Payment Received', message: 'Maintenance bill for A-101 paid — ₹5,800', time: '1 hour ago', read: false, priority: 'low' },
  { id: 'n3', type: 'visitor', title: 'Visitor Approval Pending', message: 'Delivery person waiting at gate for flat C-302', time: '2 hours ago', read: false, priority: 'medium' },
  { id: 'n4', type: 'notice', title: 'New Notice Posted', message: 'Water supply interruption on 24th July', time: '3 hours ago', read: true, priority: 'medium' },
  { id: 'n5', type: 'alert', title: 'AI Alert: Anomaly Detected', message: 'Water consumption in Block C is 23% above baseline', time: '4 hours ago', read: true, priority: 'high' },
  { id: 'n6', type: 'booking', title: 'Facility Booking Confirmed', message: 'Club House booked for 26th July, 4-8 PM', time: '5 hours ago', read: true, priority: 'low' },
  { id: 'n7', type: 'complaint', title: 'Complaint Resolved', message: 'CMP-0241: Lift issue in Tower B has been resolved', time: '1 day ago', read: true, priority: 'low' },
  { id: 'n8', type: 'payment', title: 'Overdue Bill Reminder', message: '12 residents have overdue maintenance bills for June', time: '2 days ago', read: true, priority: 'high' },
]

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState(initialNotifications)

  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = useCallback((id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }, [])

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }, [])

  const addNotification = useCallback((notification) => {
    const newNotif = {
      id: `n-${Date.now()}`,
      time: 'Just now',
      read: false,
      priority: 'medium',
      ...notification,
    }
    setNotifications(prev => [newNotif, ...prev])
  }, [])

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }, [])

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      markAsRead,
      markAllAsRead,
      addNotification,
      removeNotification,
    }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotifications = () => {
  const ctx = useContext(NotificationContext)
  if (!ctx) throw new Error('useNotifications must be used within NotificationProvider')
  return ctx
}
