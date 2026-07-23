import { motion } from 'framer-motion'
import { format } from 'date-fns'
import {
  Home, Bell, MessageSquare, CreditCard, Car, UserCheck, Calendar,
  ArrowUpRight, CheckCircle, Clock, AlertTriangle, TrendingUp
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { StatCard } from '../components/ui/StatCard'
import { StatusBadge, PriorityBadge } from '../components/ui/Badge'
import { Avatar } from '../components/ui/Avatar'
import { bills } from '../data/bills'
import { complaints } from '../data/complaints'
import { visitors } from '../data/visitors'
import { notices } from '../data/notices'
import { bookings } from '../data/bookings'
import { formatCurrency, formatDate, formatRelative } from '../utils/formatters'
import { Link } from 'react-router-dom'

const quickActions = [
  { label: 'Pay Bill', icon: CreditCard, path: '/resident/bills', color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20' },
  { label: 'Complaint', icon: MessageSquare, path: '/complaints/create', color: 'text-orange-600', bg: 'bg-orange-50 dark:bg-orange-900/20' },
  { label: 'Add Visitor', icon: UserCheck, path: '/resident/visitors', color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
  { label: 'Book Facility', icon: Calendar, path: '/resident/bookings', color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20' },
]

export default function ResidentDashboard() {
  const { currentUser } = useAuth()
  const myBills = bills.filter(b => b.residentId === 'RES-0002').slice(0, 3)
  const myComplaints = complaints.filter(c => c.residentId === 'RES-0001').slice(0, 4)
  const myBookings = bookings.slice(0, 3)
  const pendingBill = myBills.find(b => b.status !== 'paid')
  const openComplaints = myComplaints.filter(c => c.status === 'open').length

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* Welcome Card */}
      <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-700 rounded-3xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24" />
        <div className="relative z-10 flex items-start justify-between">
          <div>
            <p className="text-primary-200 text-sm mb-1">{format(new Date(), 'EEEE, dd MMMM yyyy')}</p>
            <h1 className="text-2xl font-bold font-display">Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 17 ? 'Afternoon' : 'Evening'}, {currentUser?.name?.split(' ')[0]}! 👋</h1>
            <p className="text-primary-200 text-sm mt-1">Flat {currentUser?.apartment || 'A-201'} · Sunrise Heights Society</p>
            <div className="flex flex-wrap gap-3 mt-4">
              {pendingBill && (
                <div className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2 text-sm">
                  <AlertTriangle size={14} className="text-amber-300" />
                  <span>Bill due: {formatCurrency(pendingBill.totalAmount)}</span>
                </div>
              )}
              {openComplaints > 0 && (
                <div className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2 text-sm">
                  <Clock size={14} className="text-blue-300" />
                  <span>{openComplaints} open complaint{openComplaints > 1 ? 's' : ''}</span>
                </div>
              )}
            </div>
          </div>
          <Avatar src={currentUser?.avatar} name={currentUser?.name} size="xl" />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {quickActions.map((a, i) => (
          <Link key={i} to={a.path}>
            <motion.div
              whileHover={{ y: -3 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700/50 shadow-card flex flex-col items-center gap-2 cursor-pointer hover:shadow-card-hover transition-all"
            >
              <div className={`w-11 h-11 rounded-2xl ${a.bg} flex items-center justify-center`}>
                <a.icon size={20} className={a.color} />
              </div>
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">{a.label}</p>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Pending Bills" value={myBills.filter(b=>b.status!=='paid').length} icon={CreditCard} iconColor="text-red-600" iconBg="bg-red-50 dark:bg-red-900/20" />
        <StatCard title="Open Complaints" value={openComplaints} icon={MessageSquare} iconColor="text-orange-600" iconBg="bg-orange-50 dark:bg-orange-900/20" />
        <StatCard title="Upcoming Bookings" value={myBookings.filter(b=>b.status==='confirmed').length} icon={Calendar} iconColor="text-purple-600" iconBg="bg-purple-50 dark:bg-purple-900/20" />
        <StatCard title="Visitors This Month" value={visitors.filter(v=>v.residentId==='RES-0002').length} icon={UserCheck} iconColor="text-green-600" iconBg="bg-green-50 dark:bg-green-900/20" />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bills */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Upcoming Bills</CardTitle>
              <Link to="/resident/bills" className="text-xs text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1">View All <ArrowUpRight size={12} /></Link>
            </div>
          </CardHeader>
          <CardContent className="pt-0 space-y-3">
            {myBills.map(bill => (
              <div key={bill.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{bill.month}</p>
                  <p className="text-xs text-gray-400">Due: {formatDate(bill.dueDate)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{formatCurrency(bill.totalAmount)}</p>
                  <StatusBadge status={bill.status} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Notices */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Latest Notices</CardTitle>
              <Link to="/resident/notices" className="text-xs text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1">View All <ArrowUpRight size={12} /></Link>
            </div>
          </CardHeader>
          <CardContent className="pt-0 space-y-3">
            {notices.slice(0, 4).map(n => (
              <div key={n.id} className="border-l-3 border-primary-300 pl-3">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-1">{n.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">{n.category} · {formatRelative(n.postedAt)}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Complaints */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>My Complaints</CardTitle>
              <Link to="/resident/complaints" className="text-xs text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1">View All <ArrowUpRight size={12} /></Link>
            </div>
          </CardHeader>
          <CardContent className="pt-0 space-y-3">
            {myComplaints.slice(0, 4).map(c => (
              <div key={c.id} className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-1">{c.title}</p>
                  <p className="text-xs text-gray-400">{c.category}</p>
                </div>
                <StatusBadge status={c.status} />
              </div>
            ))}
            <Link to="/complaints/create">
              <button className="w-full mt-2 py-2 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 text-xs text-gray-400 hover:border-primary-300 hover:text-primary-500 transition-colors">
                + New Complaint
              </button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
