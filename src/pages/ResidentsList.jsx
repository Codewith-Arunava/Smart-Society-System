import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Eye, Phone, Mail, MapPin, Car, MessageSquare, CreditCard } from 'lucide-react'
import { residents } from '../data/residents'
import { useNavigate } from 'react-router-dom'
import { DataTable } from '../components/ui/DataTable'
import { StatusBadge, Badge } from '../components/ui/Badge'
import { SearchBar } from '../components/ui/SearchBar'
import { Avatar } from '../components/ui/Avatar'
import { Card, CardContent } from '../components/ui/Card'
import { StatCard } from '../components/ui/StatCard'
import { formatDate, formatCurrency, filterBySearch } from '../utils/formatters'
import { Users, UserCheck, UserX, Building2 } from 'lucide-react'

export default function ResidentsList() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [page, setPage] = useState(1)
  const perPage = 12

  let filtered = filterBySearch(residents, search, ['name','email','apartment','phone','occupation'])
  if (statusFilter !== 'all') filtered = filtered.filter(r => r.status === statusFilter)
  const paginated = filtered.slice((page-1)*perPage, page*perPage)

  const columns = [
    { key: 'name', label: 'Resident', sortable: true, render: (v, row) => (
      <div className="flex items-center gap-3">
        <Avatar src={row.avatar} name={v} size="sm" />
        <div>
          <p className="font-medium">{v}</p>
          <p className="text-xs text-gray-400">{row.email}</p>
        </div>
      </div>
    )},
    { key: 'apartment', label: 'Flat', sortable: true, render: v => <Badge variant="primary">{v}</Badge> },
    { key: 'phone', label: 'Phone', render: v => <span className="text-xs text-gray-500">{v}</span> },
    { key: 'occupation', label: 'Occupation', render: v => <span className="text-sm text-gray-600 dark:text-gray-400">{v}</span> },
    { key: 'memberCount', label: 'Members', align: 'center', render: v => <span className="font-medium">{v}</span> },
    { key: 'joinDate', label: 'Joined', sortable: true, render: v => <span className="text-xs">{formatDate(v)}</span> },
    { key: 'outstandingAmount', label: 'Outstanding', render: v => v > 0 ? <span className="text-sm font-medium text-red-600">{formatCurrency(v)}</span> : <span className="text-green-600 text-sm">Clear</span> },
    { key: 'status', label: 'Status', render: v => <StatusBadge status={v} /> },
    { key: 'id', label: '', render: v => (
      <button onClick={e => { e.stopPropagation(); navigate(`/admin/residents/${v}`) }} className="text-xs text-primary-600 dark:text-primary-400 font-medium hover:underline">View</button>
    )},
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 font-display">Residents Directory</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{residents.length} registered residents</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Residents" value={residents.length} icon={Users} iconColor="text-primary-600" iconBg="bg-primary-50 dark:bg-primary-900/20" />
        <StatCard title="Active" value={residents.filter(r=>r.isActive).length} icon={UserCheck} iconColor="text-green-600" iconBg="bg-green-50 dark:bg-green-900/20" />
        <StatCard title="Inactive" value={residents.filter(r=>!r.isActive).length} icon={UserX} iconColor="text-red-600" iconBg="bg-red-50 dark:bg-red-900/20" />
        <StatCard title="Blocks" value={8} icon={Building2} iconColor="text-secondary-600" iconBg="bg-secondary-50 dark:bg-secondary-900/20" />
      </div>

      <Card>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <SearchBar value={search} onChange={v=>{setSearch(v);setPage(1)}} onClear={()=>{setSearch('');setPage(1)}} placeholder="Search by name, flat, email, phone..." />
            <select value={statusFilter} onChange={e=>{setStatusFilter(e.target.value);setPage(1)}} className="h-10 px-3 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <DataTable
            columns={columns}
            data={paginated}
            onRowClick={row => navigate(`/admin/residents/${row.id}`)}
            pagination={{ page, totalPages: Math.ceil(filtered.length/perPage), total: filtered.length, perPage, onChange: setPage }}
          />
        </CardContent>
      </Card>
    </motion.div>
  )
}
