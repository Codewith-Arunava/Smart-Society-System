import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Filter, LayoutGrid, List, Search } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { complaints } from '../data/complaints'
import { DataTable } from '../components/ui/DataTable'
import { StatusBadge, PriorityBadge } from '../components/ui/Badge'
import { Avatar } from '../components/ui/Avatar'
import { SearchBar } from '../components/ui/SearchBar'
import Button from '../components/ui/Button'
import { Card, CardContent } from '../components/ui/Card'
import { StatCard } from '../components/ui/StatCard'
import { formatRelative, filterBySearch } from '../utils/formatters'
import { COMPLAINT_STATUS, COMPLAINT_PRIORITY, COMPLAINT_CATEGORIES, ITEMS_PER_PAGE } from '../constants'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } }
}
const itemVariants = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }

export default function ComplaintManagement() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [viewMode, setViewMode] = useState('table')
  const [page, setPage] = useState(1)
  const perPage = ITEMS_PER_PAGE

  let filtered = filterBySearch(complaints, search, ['title','residentName','residentApartment','id'])
  if (statusFilter !== 'all') filtered = filtered.filter(c => c.status === statusFilter)
  if (priorityFilter !== 'all') filtered = filtered.filter(c => c.priority === priorityFilter)
  if (categoryFilter !== 'all') filtered = filtered.filter(c => c.category === categoryFilter)

  const paginated = filtered.slice((page - 1) * perPage, page * perPage)
  const total = filtered.length
  const totalPages = Math.ceil(total / perPage)

  const stats = {
    open: complaints.filter(c => c.status === 'open').length,
    inProgress: complaints.filter(c => c.status === 'in_progress').length,
    resolved: complaints.filter(c => c.status === 'resolved').length,
    critical: complaints.filter(c => c.priority === 'critical').length,
  }

  const columns = [
    {
      key: 'id',
      label: 'ID',
      sortable: true,
      width: 110,
      render: (v) => <span className="text-xs font-mono text-gray-400">{v}</span>,
    },
    {
      key: 'title',
      label: 'Complaint',
      sortable: true,
      render: (v, row) => (
        <div>
          <p className="font-medium text-gray-900 dark:text-gray-100 line-clamp-1 max-w-xs">{v}</p>
          <p className="text-xs text-gray-400 mt-0.5">{row.category}</p>
        </div>
      ),
    },
    {
      key: 'residentName',
      label: 'Resident',
      sortable: true,
      render: (v, row) => (
        <div className="flex items-center gap-2">
          <Avatar src={row.residentAvatar} name={v} size="xs" />
          <div>
            <p className="text-sm font-medium">{v}</p>
            <p className="text-xs text-gray-400">{row.residentApartment}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'priority',
      label: 'Priority',
      sortable: true,
      render: (v) => <PriorityBadge priority={v} />,
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (v) => <StatusBadge status={v} />,
    },
    {
      key: 'createdAt',
      label: 'Raised',
      sortable: true,
      render: (v) => <span className="text-xs text-gray-400">{formatRelative(v)}</span>,
    },
    {
      key: 'id',
      label: 'Actions',
      render: (v, row) => (
        <button
          onClick={(e) => { e.stopPropagation(); navigate(`/admin/complaints/${v}`) }}
          className="text-xs text-primary-600 dark:text-primary-400 font-medium hover:underline"
        >
          View
        </button>
      ),
    },
  ]

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 font-display">Complaint Management</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Track and resolve resident complaints efficiently</p>
        </div>
        <Link to="/complaints/create">
          <Button leftIcon={<Plus size={16} />} size="md">New Complaint</Button>
        </Link>
      </motion.div>

      {/* Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Open', value: stats.open, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20', click: () => setStatusFilter('open') },
          { label: 'In Progress', value: stats.inProgress, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20', click: () => setStatusFilter('in_progress') },
          { label: 'Resolved', value: stats.resolved, color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20', click: () => setStatusFilter('resolved') },
          { label: 'Critical', value: stats.critical, color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-900/20', click: () => setPriorityFilter('critical') },
        ].map((s, i) => (
          <div key={i} onClick={s.click} className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700/50 shadow-card cursor-pointer hover:-translate-y-1 transition-all duration-200">
            <p className="text-xs text-gray-500 dark:text-gray-400">{s.label}</p>
            <p className={`text-3xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </motion.div>

      {/* Filters & View Toggle */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardContent>
            <div className="flex flex-col lg:flex-row gap-4">
              <SearchBar
                value={search}
                onChange={(v) => { setSearch(v); setPage(1) }}
                onClear={() => { setSearch(''); setPage(1) }}
                placeholder="Search complaints, residents, IDs..."
                className="flex-1"
              />
              <div className="flex flex-wrap gap-2">
                <select
                  value={statusFilter}
                  onChange={e => { setStatusFilter(e.target.value); setPage(1) }}
                  className="h-10 px-3 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                >
                  <option value="all">All Status</option>
                  {Object.values(COMPLAINT_STATUS).map(s => (
                    <option key={s} value={s}>{s.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())}</option>
                  ))}
                </select>
                <select
                  value={priorityFilter}
                  onChange={e => { setPriorityFilter(e.target.value); setPage(1) }}
                  className="h-10 px-3 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                >
                  <option value="all">All Priority</option>
                  {Object.values(COMPLAINT_PRIORITY).map(p => (
                    <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>
                  ))}
                </select>
                <select
                  value={categoryFilter}
                  onChange={e => { setCategoryFilter(e.target.value); setPage(1) }}
                  className="h-10 px-3 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                >
                  <option value="all">All Categories</option>
                  {COMPLAINT_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                {(statusFilter !== 'all' || priorityFilter !== 'all' || categoryFilter !== 'all' || search) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => { setStatusFilter('all'); setPriorityFilter('all'); setCategoryFilter('all'); setSearch(''); setPage(1) }}
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
              <div className="flex gap-1 border border-gray-200 dark:border-gray-700 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-1.5 rounded-lg transition-colors ${viewMode === 'table' ? 'bg-primary-600 text-white' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <List size={16} />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <LayoutGrid size={16} />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Table / Grid */}
      <motion.div variants={itemVariants}>
        {viewMode === 'table' ? (
          <DataTable
            columns={columns}
            data={paginated}
            onRowClick={(row) => navigate(`/admin/complaints/${row.id}`)}
            pagination={{ page, totalPages, total, perPage, onChange: setPage }}
          />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              {paginated.map((c) => (
                <motion.div
                  key={c.id}
                  whileHover={{ y: -3 }}
                  onClick={() => navigate(`/admin/complaints/${c.id}`)}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700/50 shadow-card cursor-pointer hover:shadow-card-hover transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-xs font-mono text-gray-400">{c.id}</span>
                    <div className="flex gap-1.5">
                      <PriorityBadge priority={c.priority} />
                      <StatusBadge status={c.status} />
                    </div>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1 line-clamp-2">{c.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">{c.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar src={c.residentAvatar} name={c.residentName} size="xs" />
                      <span className="text-xs text-gray-500">{c.residentApartment}</span>
                    </div>
                    <span className="text-xs text-gray-400">{formatRelative(c.createdAt)}</span>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Showing {(page-1)*perPage+1}–{Math.min(page*perPage, total)} of {total}</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setPage(p => Math.max(1, p-1))} disabled={page === 1}>Prev</Button>
                <Button variant="outline" size="sm" onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page === totalPages}>Next</Button>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  )
}
