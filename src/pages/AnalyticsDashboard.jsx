import { motion } from 'framer-motion'
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import { electricityUsage, waterUsage, electricityBreakdown } from '../data/usage'
import { monthlyRevenue } from '../data/bills'
import { complaints } from '../data/complaints'
import { visitors } from '../data/visitors'
import { residents } from '../data/residents'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { StatCard } from '../components/ui/StatCard'
import { formatCurrency } from '../utils/formatters'
import { TrendingUp, Zap, Droplets, Users, MessageSquare } from 'lucide-react'

const COLORS = ['#2563eb','#0ea5e9','#14b8a6','#f59e0b','#ef4444','#8b5cf6','#ec4899','#10b981']

const complaintsByCategory = Object.entries(
  complaints.reduce((acc, c) => {
    acc[c.category] = (acc[c.category] || 0) + 1; return acc
  }, {})
).map(([name, value]) => ({ name, value })).sort((a,b) => b.value - a.value).slice(0, 8)

const monthlyVisitors = Array.from({ length: 12 }, (_, i) => ({
  month: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][i],
  visitors: Math.floor(Math.random() * 800) + 200,
  residents: Math.floor(Math.random() * 20) + 90,
}))

const residentGrowth = Array.from({ length: 12 }, (_, i) => ({
  month: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][i],
  total: 85 + i,
  active: 80 + i,
}))

export default function AnalyticsDashboard() {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 font-display">Analytics Dashboard</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Comprehensive data insights — Sunrise Heights Society</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Avg Collection Rate" value="87.3%" icon={TrendingUp} iconColor="text-green-600" iconBg="bg-green-50 dark:bg-green-900/20" trend="up" trendValue="+4%" />
        <StatCard title="Total Electricity" value={`${electricityUsage.reduce((s,e)=>s+e.units,0).toLocaleString()} kWh`} icon={Zap} iconColor="text-yellow-600" iconBg="bg-yellow-50 dark:bg-yellow-900/20" />
        <StatCard title="Total Water" value={`${waterUsage.reduce((s,w)=>s+w.kl,0).toLocaleString()} kL`} icon={Droplets} iconColor="text-blue-600" iconBg="bg-blue-50 dark:bg-blue-900/20" />
        <StatCard title="Resolution Rate" value={`${Math.round(complaints.filter(c=>c.status==='resolved').length/complaints.length*100)}%`} icon={MessageSquare} iconColor="text-primary-600" iconBg="bg-primary-50 dark:bg-primary-900/20" />
      </div>

      {/* Revenue + Visitors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Monthly Revenue (12 Months)</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={monthlyRevenue} barSize={18}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `₹${(v/100000).toFixed(0)}L`} />
                <Tooltip formatter={v => [formatCurrency(v), '']} contentStyle={{ borderRadius: 12 }} />
                <Legend />
                <Bar dataKey="collected" name="Collected" fill="#2563eb" radius={[4,4,0,0]} />
                <Bar dataKey="pending" name="Pending" fill="#f59e0b" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Monthly Visitor Traffic</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={monthlyVisitors}>
                <defs>
                  <linearGradient id="gv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ borderRadius: 12 }} />
                <Area type="monotone" dataKey="visitors" name="Visitors" stroke="#0ea5e9" strokeWidth={2} fill="url(#gv)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Electricity + Water */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Electricity Usage (kWh) — 12 Months</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={electricityUsage}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
                <Tooltip contentStyle={{ borderRadius: 12 }} />
                <Legend />
                <Line type="monotone" dataKey="units" name="Total (kWh)" stroke="#2563eb" strokeWidth={2.5} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="solarGenerated" name="Solar (kWh)" stroke="#14b8a6" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Water Consumption (kL) — 12 Months</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={waterUsage}>
                <defs>
                  <linearGradient id="gw" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ borderRadius: 12 }} />
                <Area type="monotone" dataKey="kl" name="Water (kL)" stroke="#14b8a6" strokeWidth={2} fill="url(#gw)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Complaint Categories + Resident Growth */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Complaints by Category</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={complaintsByCategory} layout="vertical" barSize={14}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={120} />
                <Tooltip contentStyle={{ borderRadius: 12 }} />
                <Bar dataKey="value" name="Count" radius={[0,4,4,0]}>
                  {complaintsByCategory.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Resident Growth (YTD)</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={residentGrowth}>
                <defs>
                  <linearGradient id="gr" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ borderRadius: 12 }} />
                <Area type="monotone" dataKey="total" name="Total Residents" stroke="#2563eb" strokeWidth={2} fill="url(#gr)" />
                <Area type="monotone" dataKey="active" name="Active" stroke="#10b981" strokeWidth={2} fill="none" strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
