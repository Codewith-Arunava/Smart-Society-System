import { useState } from 'react'
import { motion } from 'framer-motion'
import { visitors } from '../data/visitors'
import { DataTable } from '../components/ui/DataTable'
import { StatusBadge } from '../components/ui/Badge'
import { SearchBar } from '../components/ui/SearchBar'
import { Card, CardContent } from '../components/ui/Card'
import { StatCard } from '../components/ui/StatCard'
import { formatDateTime, formatDate, filterBySearch } from '../utils/formatters'
import { Users, UserCheck, UserX, Clock } from 'lucide-react'

export default function VisitorHistory() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [page, setPage] = useState(1)
  const perPage = 12

  let filtered = filterBySearch(visitors, search, ['name','phone','purpose','residentName','residentApartment','id'])
  if (statusFilter !== 'all') filtered = filtered.filter(v => v.status === statusFilter)
  const paginated = filtered.slice((page-1)*perPage, page*perPage)

  const columns = [
    { key: 'id', label: 'ID', render: v => <span className="text-xs font-mono text-gray-400">{v}</span> },
    { key: 'name', label: 'Visitor', sortable: true, render: (v, row) => (
      <div>
        <p className="font-medium">{v}</p>
        <p className="text-xs text-gray-400">{row.phone}</p>
      </div>
    )},
    { key: 'purpose', label: 'Purpose', render: v => <span className="text-sm">{v}</span> },
    { key: 'residentName', label: 'Host', sortable: true, render: (v, row) => (
      <div><p className="text-sm">{v}</p><p className="text-xs text-gray-400">{row.residentApartment}</p></div>
    )},
    { key: 'entryTime', label: 'Entry', sortable: true, render: v => <span className="text-xs">{formatDateTime(v)}</span> },
    { key: 'exitTime', label: 'Exit', render: v => <span className="text-xs text-gray-400">{v ? formatDateTime(v) : '—'}</span> },
    { key: 'securityGuard', label: 'Guard', render: v => <span className="text-xs text-gray-500">{v || '—'}</span> },
    { key: 'status', label: 'Status', render: v => <StatusBadge status={v} /> },
    { key: 'preApproved', label: 'Pre-approved', align: 'center', render: v => <span className={v ? 'text-green-600' : 'text-gray-400'}>{v ? '✓' : '—'}</span> },
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 font-display">Visitor History</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Complete visitor log — {visitors.length} records</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Visitors" value={visitors.length} icon={Users} iconColor="text-primary-600" iconBg="bg-primary-50 dark:bg-primary-900/20" />
        <StatCard title="Checked In" value={visitors.filter(v=>v.status==='checked_in').length} icon={UserCheck} iconColor="text-green-600" iconBg="bg-green-50 dark:bg-green-900/20" />
        <StatCard title="Checked Out" value={visitors.filter(v=>v.status==='checked_out').length} icon={Clock} iconColor="text-secondary-600" iconBg="bg-secondary-50 dark:bg-secondary-900/20" />
        <StatCard title="Denied" value={visitors.filter(v=>v.status==='denied').length} icon={UserX} iconColor="text-red-600" iconBg="bg-red-50 dark:bg-red-900/20" />
      </div>

      <Card>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <SearchBar value={search} onChange={v=>{setSearch(v);setPage(1)}} onClear={()=>{setSearch('');setPage(1)}} placeholder="Search visitors, hosts, purposes..." />
            <select
              value={statusFilter}
              onChange={e=>{setStatusFilter(e.target.value);setPage(1)}}
              className="h-10 px-3 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="checked_in">Checked In</option>
              <option value="checked_out">Checked Out</option>
              <option value="expected">Expected</option>
              <option value="denied">Denied</option>
            </select>
          </div>
          <DataTable
            columns={columns}
            data={paginated}
            pagination={{ page, totalPages: Math.ceil(filtered.length/perPage), total: filtered.length, perPage, onChange: setPage }}
          />
        </CardContent>
      </Card>
    </motion.div>
  )
}
