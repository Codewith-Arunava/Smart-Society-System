import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { Shield, UserCheck, UserX, Clock, Phone, AlertTriangle, CheckCircle, Car } from 'lucide-react'
import { visitors } from '../data/visitors'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { StatCard } from '../components/ui/StatCard'
import { StatusBadge } from '../components/ui/Badge'
import { DataTable } from '../components/ui/DataTable'
import Button from '../components/ui/Button'
import { formatDateTime } from '../utils/formatters'
import toast from 'react-hot-toast'

const emergencyContacts = [
  { name: 'Police', number: '100', icon: '🚔' },
  { name: 'Ambulance', number: '108', icon: '🚑' },
  { name: 'Fire', number: '101', icon: '🔥' },
  { name: 'Society Manager', number: '+91 98765 43210', icon: '👨‍💼' },
  { name: 'Electrician', number: '+91 87654 32109', icon: '⚡' },
  { name: 'Plumber', number: '+91 76543 21098', icon: '🔧' },
]

const todayVisitors = visitors.slice(0, 25)
const expectedVisitors = visitors.filter(v => v.status === 'expected').slice(0, 8)

export default function SecurityDashboard() {
  const handleAction = (visitor, action) => {
    toast.success(`Visitor ${action === 'in' ? 'checked in' : action === 'out' ? 'checked out' : 'denied'}`)
  }

  const columns = [
    { key: 'name', label: 'Visitor', render: (v, row) => <div><p className="font-medium text-sm">{v}</p><p className="text-xs text-gray-400">{row.phone}</p></div> },
    { key: 'purpose', label: 'Purpose' },
    { key: 'residentName', label: 'Host', render: (v, row) => <div><p className="text-sm">{v}</p><p className="text-xs text-gray-400">{row.residentApartment}</p></div> },
    { key: 'entryTime', label: 'Time', render: v => <span className="text-xs">{formatDateTime(v)}</span> },
    { key: 'vehicleNumber', label: 'Vehicle', render: v => v ? <span className="text-xs font-mono">{v}</span> : <span className="text-gray-300">—</span> },
    { key: 'status', label: 'Status', render: v => <StatusBadge status={v} /> },
    {
      key: 'id', label: 'Action', render: (v, row) => (
        <div className="flex gap-1">
          {row.status === 'expected' && <>
            <Button size="xs" variant="success" onClick={() => handleAction(row, 'in')}>In</Button>
            <Button size="xs" variant="danger" onClick={() => handleAction(row, 'deny')}>Deny</Button>
          </>}
          {row.status === 'checked_in' && <Button size="xs" variant="outline" onClick={() => handleAction(row, 'out')}>Out</Button>}
        </div>
      )
    },
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-primary-600 rounded-xl flex items-center justify-center">
            <Shield size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 font-display">Security Dashboard</h1>
            <p className="text-sm text-gray-400">{format(new Date(), 'EEEE, dd MMMM yyyy · HH:mm')}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm font-medium text-green-700 dark:text-green-400">Gate Active</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Today's Visitors" value={28} icon={UserCheck} iconColor="text-primary-600" iconBg="bg-primary-50 dark:bg-primary-900/20" />
        <StatCard title="Checked In" value={todayVisitors.filter(v=>v.status==='checked_in').length} icon={CheckCircle} iconColor="text-green-600" iconBg="bg-green-50 dark:bg-green-900/20" />
        <StatCard title="Pending Approval" value={expectedVisitors.length} icon={Clock} iconColor="text-amber-600" iconBg="bg-amber-50 dark:bg-amber-900/20" />
        <StatCard title="Denied Today" value={2} icon={UserX} iconColor="text-red-600" iconBg="bg-red-50 dark:bg-red-900/20" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Approvals */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock size={16} className="text-amber-500" /> Pending Approvals
              {expectedVisitors.length > 0 && <span className="ml-auto bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{expectedVisitors.length}</span>}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-3">
            {expectedVisitors.slice(0, 6).map(v => (
              <div key={v.id} className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{v.name}</p>
                  <span className="text-xs text-amber-600">{v.purpose}</span>
                </div>
                <p className="text-xs text-gray-400 mb-2">{v.residentName} · {v.residentApartment}</p>
                <div className="flex gap-2">
                  <Button size="xs" variant="success" fullWidth onClick={() => handleAction(v, 'in')}>
                    <CheckCircle size={11} /> Allow
                  </Button>
                  <Button size="xs" variant="danger" fullWidth onClick={() => handleAction(v, 'deny')}>Deny</Button>
                </div>
              </div>
            ))}
            {expectedVisitors.length === 0 && <p className="text-sm text-gray-400 text-center py-4">No pending approvals</p>}
          </CardContent>
        </Card>

        {/* Emergency Contacts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle size={16} className="text-red-500" /> Emergency Contacts
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 grid grid-cols-2 gap-2">
            {emergencyContacts.map((c, i) => (
              <button key={i} className="p-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl text-left hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors group">
                <div className="text-xl mb-1">{c.icon}</div>
                <p className="text-xs font-semibold text-gray-900 dark:text-gray-100">{c.name}</p>
                <p className="text-xs text-primary-600 dark:text-primary-400 group-hover:text-red-600">{c.number}</p>
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader><CardTitle>Shift Summary</CardTitle></CardHeader>
          <CardContent className="pt-0 space-y-3">
            {[
              { label: 'Vehicles Entered', value: 42, icon: Car, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
              { label: 'Delivery Persons', value: 8, icon: UserCheck, color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20' },
              { label: 'Alerts Raised', value: 0, icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-900/20' },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 dark:border-gray-700">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${s.bg}`}>
                  <s.icon size={18} className={s.color} />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{s.label}</p>
                <p className="ml-auto text-lg font-bold text-gray-900 dark:text-gray-100">{s.value}</p>
              </div>
            ))}
            <div className="pt-3 border-t border-gray-100 dark:border-gray-700">
              <p className="text-xs text-gray-400 text-center">Guard on duty: Ramesh Kumar</p>
              <p className="text-xs text-gray-400 text-center">Shift: 08:00 AM – 08:00 PM</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Entries */}
      <Card>
        <CardHeader><CardTitle>Recent Entries</CardTitle></CardHeader>
        <CardContent className="pt-0">
          <DataTable columns={columns} data={todayVisitors} compact />
        </CardContent>
      </Card>
    </motion.div>
  )
}
