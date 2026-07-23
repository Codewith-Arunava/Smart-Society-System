import { useState } from 'react'
import { motion } from 'framer-motion'
import { CreditCard, Download, Filter, TrendingDown, TrendingUp, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import { bills, monthlyRevenue } from '../data/bills'
import { useAuth } from '../context/AuthContext'
import { DataTable } from '../components/ui/DataTable'
import { StatusBadge, Badge } from '../components/ui/Badge'
import { SearchBar } from '../components/ui/SearchBar'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import Button from '../components/ui/Button'
import { formatCurrency, formatDate, filterBySearch } from '../utils/formatters'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import toast from 'react-hot-toast'

export default function MaintenanceBills() {
  const { currentUser } = useAuth()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [page, setPage] = useState(1)
  const perPage = 10

  const isAdmin = currentUser?.role === 'admin'
  const myBills = isAdmin ? bills : bills.filter(b => b.residentId === 'RES-0002')
  let filtered = filterBySearch(myBills, search, ['residentName', 'residentApartment', 'invoiceNumber', 'month'])
  if (statusFilter !== 'all') filtered = filtered.filter(b => b.status === statusFilter)
  const paginated = filtered.slice((page-1)*perPage, page*perPage)

  const totalCollected = myBills.filter(b => b.status === 'paid').reduce((s, b) => s + b.totalAmount, 0)
  const totalPending = myBills.filter(b => b.status === 'pending').reduce((s, b) => s + b.totalAmount, 0)
  const totalOverdue = myBills.filter(b => b.status === 'overdue').reduce((s, b) => s + b.totalAmount, 0)

  const columns = [
    { key: 'invoiceNumber', label: 'Invoice', render: v => <span className="text-xs font-mono text-gray-400">{v}</span> },
    ...(isAdmin ? [{ key: 'residentName', label: 'Resident', sortable: true, render: (v, row) => (
      <div><p className="text-sm font-medium">{v}</p><p className="text-xs text-gray-400">{row.residentApartment}</p></div>
    )}] : []),
    { key: 'month', label: 'Month', sortable: true },
    {
      key: 'breakdown', label: 'Breakdown', render: (v) => (
        <div className="text-xs space-y-0.5">
          <span className="block text-gray-500">Maint: {formatCurrency(v.maintenance)}</span>
          <span className="block text-gray-500">Elec: {formatCurrency(v.electricity)}</span>
        </div>
      )
    },
    { key: 'totalAmount', label: 'Amount', sortable: true, render: v => <span className="font-semibold">{formatCurrency(v)}</span> },
    { key: 'dueDate', label: 'Due Date', sortable: true, render: v => <span className="text-xs">{formatDate(v)}</span> },
    { key: 'status', label: 'Status', render: v => <StatusBadge status={v} /> },
    {
      key: 'id', label: 'Action', align: 'right',
      render: (v, row) => row.status !== 'paid' ? (
        <Button size="xs" onClick={(e) => { e.stopPropagation(); toast.success('Redirecting to payment gateway...') }}>Pay Now</Button>
      ) : (
        <Button size="xs" variant="ghost" leftIcon={<Download size={12} />} onClick={(e) => { e.stopPropagation(); toast.success('Invoice downloaded') }}>Invoice</Button>
      )
    },
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 font-display">Maintenance Bills</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{isAdmin ? 'Society-wide billing overview' : 'Your monthly maintenance bills'}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Collected', value: formatCurrency(totalCollected), icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20' },
          { label: 'Pending', value: formatCurrency(totalPending), icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20' },
          { label: 'Overdue', value: formatCurrency(totalOverdue), icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-900/20' },
        ].map((s, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700/50 shadow-card flex items-center gap-4">
            <div className={`w-11 h-11 rounded-2xl ${s.bg} flex items-center justify-center`}>
              <s.icon size={20} className={s.color} />
            </div>
            <div>
              <p className="text-xs text-gray-500">{s.label}</p>
              <p className="text-xl font-bold text-gray-900 dark:text-gray-100">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      {isAdmin && (
        <Card>
          <CardHeader><CardTitle>Monthly Collection Trend</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={monthlyRevenue}>
                <defs>
                  <linearGradient id="gc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `₹${(v/100000).toFixed(0)}L`} />
                <Tooltip formatter={v => [formatCurrency(v), '']} />
                <Area type="monotone" dataKey="collected" name="Collected" stroke="#2563eb" strokeWidth={2} fill="url(#gc)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Table */}
      <Card>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <SearchBar value={search} onChange={v => { setSearch(v); setPage(1) }} onClear={() => { setSearch(''); setPage(1) }} placeholder="Search bills..." />
            <select
              value={statusFilter}
              onChange={e => { setStatusFilter(e.target.value); setPage(1) }}
              className="h-10 px-3 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl"
            >
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
          <DataTable
            columns={columns}
            data={paginated}
            pagination={{ page, totalPages: Math.ceil(filtered.length / perPage), total: filtered.length, perPage, onChange: setPage }}
          />
        </CardContent>
      </Card>
    </motion.div>
  )
}
