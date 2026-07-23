import { motion } from 'framer-motion'
import {
  Users, MessageSquare, UserCheck, Car, CreditCard, TrendingUp,
  Zap, Droplets, AlertTriangle, CheckCircle, Clock, ArrowUpRight,
  Activity, Building2
} from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import { format } from 'date-fns'
import { StatCard } from '../components/ui/StatCard'
import { Card, CardHeader, CardContent, CardTitle } from '../components/ui/Card'
import { Avatar } from '../components/ui/Avatar'
import { StatusBadge, PriorityBadge } from '../components/ui/Badge'
import { residents } from '../data/residents'
import { complaints } from '../data/complaints'
import { visitors } from '../data/visitors'
import { monthlyRevenue } from '../data/bills'
import { electricityUsage, waterUsage, electricityBreakdown } from '../data/usage'
import { parkingStats } from '../data/parking'
import { formatCurrency, formatNumber, formatRelative } from '../utils/formatters'

const CHART_COLORS = ['#2563eb','#0ea5e9','#14b8a6','#f59e0b','#ef4444','#8b5cf6']

const complaintTrend = Array.from({ length: 7 }, (_, i) => ({
  day: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][i],
  open: Math.floor(Math.random() * 20) + 5,
  resolved: Math.floor(Math.random() * 25) + 8,
  critical: Math.floor(Math.random() * 5) + 1,
}))

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
}

export default function AdminDashboard() {
  const totalResidents = residents.length
  const activeResidents = residents.filter(r => r.isActive).length
  const totalComplaints = complaints.length
  const openComplaints = complaints.filter(c => c.status === 'open').length
  const criticalComplaints = complaints.filter(c => c.priority === 'critical').length
  const resolvedComplaints = complaints.filter(c => c.status === 'resolved').length
  const todayVisitors = visitors.filter(v => v.date === format(new Date(), 'yyyy-MM-dd')).length
  const pendingVisitors = visitors.filter(v => v.status === 'expected').length
  const currentMonthRevenue = monthlyRevenue[monthlyRevenue.length - 1]
  const recentComplaints = complaints.filter(c => c.status !== 'closed').slice(0, 6)
  const recentVisitors = visitors.slice(0, 5)

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      {/* Page Header */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 font-display">Admin Dashboard</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Sunrise Heights Society · {format(new Date(), 'EEEE, dd MMMM yyyy')}
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm font-medium text-green-700 dark:text-green-400">All Systems Operational</span>
        </div>
      </motion.div>

      {/* KPI Stats Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Residents"
          value={formatNumber(totalResidents)}
          subtitle={`${activeResidents} active members`}
          icon={Users}
          iconColor="text-primary-600"
          iconBg="bg-primary-50 dark:bg-primary-900/20"
          trend="up"
          trendValue="+3%"
          trendLabel="vs last month"
        />
        <StatCard
          title="Total Visitors"
          value={formatNumber(visitors.length)}
          subtitle={`${todayVisitors} today · ${pendingVisitors} expected`}
          icon={UserCheck}
          iconColor="text-secondary-600"
          iconBg="bg-secondary-50 dark:bg-secondary-900/20"
          trend="up"
          trendValue="+12%"
          trendLabel="vs last week"
        />
        <StatCard
          title="Open Complaints"
          value={openComplaints}
          subtitle={`${criticalComplaints} critical · ${resolvedComplaints} resolved`}
          icon={MessageSquare}
          iconColor="text-orange-600"
          iconBg="bg-orange-50 dark:bg-orange-900/20"
          trend="down"
          trendValue="-8%"
          trendLabel="improving"
        />
        <StatCard
          title="Revenue Collected"
          value={formatCurrency(currentMonthRevenue.collected)}
          subtitle={`${currentMonthRevenue.collectionRate}% collection rate`}
          icon={CreditCard}
          iconColor="text-green-600"
          iconBg="bg-green-50 dark:bg-green-900/20"
          trend="up"
          trendValue="+5%"
          trendLabel="vs last month"
        />
      </motion.div>

      {/* Secondary Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Electricity Usage', value: `${electricityUsage[electricityUsage.length-1].units.toLocaleString()} kWh`, icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-50 dark:bg-yellow-900/20', sub: 'This month' },
          { label: 'Water Usage', value: `${waterUsage[waterUsage.length-1].kl} kL`, icon: Droplets, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20', sub: 'This month' },
          { label: 'Parking Occupancy', value: `${parkingStats.occupancyRate}%`, icon: Car, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20', sub: `${parkingStats.occupied}/${parkingStats.total} slots` },
          { label: 'Resolved This Month', value: `${resolvedComplaints}`, icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20', sub: `of ${totalComplaints} total` },
        ].map((s, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700/50 shadow-card flex items-center gap-4">
            <div className={`w-11 h-11 rounded-2xl ${s.bg} flex items-center justify-center flex-shrink-0`}>
              <s.icon size={20} className={s.color} />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">{s.label}</p>
              <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{s.value}</p>
              <p className="text-xs text-gray-400">{s.sub}</p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Revenue Overview</CardTitle>
                  <p className="text-sm text-gray-400 mt-1">Monthly collection vs target — 12 months</p>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 dark:bg-green-900/20 rounded-xl">
                  <TrendingUp size={14} className="text-green-600" />
                  <span className="text-xs font-semibold text-green-700 dark:text-green-400">+8.2% YOY</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={monthlyRevenue} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colColl" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colPend" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" className="dark:stroke-gray-700" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `₹${(v/100000).toFixed(0)}L`} />
                  <Tooltip formatter={v => [formatCurrency(v), '']} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                  <Area type="monotone" dataKey="collected" name="Collected" stroke="#2563eb" strokeWidth={2} fill="url(#colColl)" />
                  <Area type="monotone" dataKey="pending" name="Pending" stroke="#f59e0b" strokeWidth={2} fill="url(#colPend)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Electricity Breakdown Pie */}
        <motion.div variants={itemVariants}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Electricity Breakdown</CardTitle>
              <p className="text-sm text-gray-400 mt-1">Category-wise usage %</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={electricityBreakdown} cx="50%" cy="50%" innerRadius={45} outerRadius={72} paddingAngle={3} dataKey="value">
                    {electricityBreakdown.map((entry, index) => (
                      <Cell key={index} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={v => [`${v}%`, '']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-2">
                {electricityBreakdown.slice(0, 4).map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: CHART_COLORS[i] }} />
                      <span className="text-gray-600 dark:text-gray-400">{item.name}</span>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Complaint Trend */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle>Complaint Trend (This Week)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={complaintTrend} barSize={14} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" className="dark:stroke-gray-700" vertical={false} />
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                  <Legend />
                  <Bar dataKey="open" name="Open" fill="#f59e0b" radius={[4,4,0,0]} />
                  <Bar dataKey="resolved" name="Resolved" fill="#10b981" radius={[4,4,0,0]} />
                  <Bar dataKey="critical" name="Critical" fill="#ef4444" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Electricity & Water Usage */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle>Utility Usage — Last 6 Months</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={electricityUsage.slice(-6)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" className="dark:stroke-gray-700" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} yAxisId="elec" tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
                  <YAxis tick={{ fontSize: 11 }} yAxisId="water" orientation="right" tickFormatter={v => `${(v/1000).toFixed(0)}kL`} hide />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="elec" type="monotone" dataKey="units" name="Electricity (kWh)" stroke="#2563eb" strokeWidth={2.5} dot={{ r: 4, fill: '#2563eb' }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Bottom Row: Recent Complaints + Visitors */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Complaints */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Complaints</CardTitle>
                <a href="/admin/complaints" className="text-xs text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1">
                  View All <ArrowUpRight size={12} />
                </a>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {recentComplaints.map((c) => (
                  <div key={c.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors group cursor-pointer">
                    <Avatar src={c.residentAvatar} name={c.residentName} size="sm" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-1">{c.title}</p>
                        <PriorityBadge priority={c.priority} className="flex-shrink-0" />
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{c.residentName} · {c.residentApartment} · {formatRelative(c.createdAt)}</p>
                    </div>
                    <StatusBadge status={c.status} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Today's Visitors */}
        <motion.div variants={itemVariants}>
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Visitors</CardTitle>
                <span className="text-xs text-gray-400">Today: {todayVisitors}</span>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {recentVisitors.map((v) => (
                  <div key={v.id} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-sm">
                      👤
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{v.name}</p>
                      <p className="text-xs text-gray-400 truncate">{v.purpose} · {v.residentApartment}</p>
                    </div>
                    <StatusBadge status={v.status} />
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 grid grid-cols-2 gap-3">
                <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded-xl">
                  <p className="text-lg font-bold text-green-700 dark:text-green-400">{visitors.filter(v => v.status === 'checked_in').length}</p>
                  <p className="text-xs text-gray-500">Checked In</p>
                </div>
                <div className="text-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                  <p className="text-lg font-bold text-blue-700 dark:text-blue-400">{visitors.filter(v => v.status === 'expected').length}</p>
                  <p className="text-xs text-gray-500">Expected</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
