import { useState } from 'react'
import { motion } from 'framer-motion'
import { UserPlus, Clock, CheckCircle, XCircle, Search, QrCode, Phone } from 'lucide-react'
import { visitors } from '../data/visitors'
import { useForm } from 'react-hook-form'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { StatusBadge } from '../components/ui/Badge'
import { SearchBar } from '../components/ui/SearchBar'
import { DataTable } from '../components/ui/DataTable'
import Button from '../components/ui/Button'
import { Input, Select } from '../components/ui/Input'
import { formatDateTime, formatRelative, filterBySearch } from '../utils/formatters'
import { residents } from '../data/residents'
import toast from 'react-hot-toast'

const todayVisitors = visitors.filter(v => {
  const today = new Date().toISOString().slice(0, 10)
  return v.date === today || Math.random() > 0.5
}).slice(0, 30)

export default function VisitorEntry() {
  const [tab, setTab] = useState('checkin')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    toast.success(`✅ Visitor ${data.name} checked in! QR: VIS-${Math.floor(Math.random()*900000+100000)}`)
    reset()
    setLoading(false)
  }

  const handleAction = async (visitor, action) => {
    await new Promise(r => setTimeout(r, 400))
    toast.success(`Visitor ${action === 'in' ? 'checked in' : action === 'out' ? 'checked out' : 'denied'}`)
  }

  const columns = [
    { key: 'name', label: 'Visitor', sortable: true, render: (v, row) => (
      <div>
        <p className="font-medium">{v}</p>
        <p className="text-xs text-gray-400">{row.phone}</p>
      </div>
    )},
    { key: 'purpose', label: 'Purpose', render: v => <span className="text-sm">{v}</span> },
    { key: 'residentName', label: 'Host', render: (v, row) => <div><p className="text-sm">{v}</p><p className="text-xs text-gray-400">{row.residentApartment}</p></div> },
    { key: 'entryTime', label: 'Entry Time', sortable: true, render: v => <span className="text-xs">{formatDateTime(v)}</span> },
    { key: 'status', label: 'Status', render: v => <StatusBadge status={v} /> },
    {
      key: 'id', label: 'Action', render: (v, row) => (
        <div className="flex gap-1">
          {row.status === 'expected' && (
            <>
              <Button size="xs" variant="success" onClick={() => handleAction(row, 'in')}>Check In</Button>
              <Button size="xs" variant="danger" onClick={() => handleAction(row, 'deny')}>Deny</Button>
            </>
          )}
          {row.status === 'checked_in' && (
            <Button size="xs" variant="outline" onClick={() => handleAction(row, 'out')}>Check Out</Button>
          )}
        </div>
      )
    },
  ]

  const stats = [
    { label: "Today's Visitors", value: 28, color: 'text-primary-600', bg: 'bg-primary-50 dark:bg-primary-900/20' },
    { label: 'Checked In', value: todayVisitors.filter(v => v.status === 'checked_in').length, color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20' },
    { label: 'Expected', value: todayVisitors.filter(v => v.status === 'expected').length, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20' },
    { label: 'Checked Out', value: todayVisitors.filter(v => v.status === 'checked_out').length, color: 'text-gray-600', bg: 'bg-gray-50 dark:bg-gray-800' },
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 font-display">Visitor Entry Management</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage gate entries and visitor approvals in real-time</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className={`${s.bg} rounded-2xl p-4 border border-gray-100 dark:border-gray-700/50 text-center`}>
            <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Check-In Form */}
        <Card className="lg:col-span-1">
          <CardHeader><CardTitle className="flex items-center gap-2"><UserPlus size={18} /> New Visitor Check-In</CardTitle></CardHeader>
          <CardContent className="pt-0">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <Input
                label="Visitor Name" required
                placeholder="Full name"
                error={errors.name?.message}
                {...register('name', { required: 'Required' })}
              />
              <Input
                label="Phone Number" required
                placeholder="+91 XXXXX XXXXX"
                error={errors.phone?.message}
                {...register('phone', { required: 'Required' })}
              />
              <Select label="Purpose" required {...register('purpose', { required: true })}>
                {['Family Visit','Delivery','Plumber','Electrician','Doctor','Friend','House Help','Other'].map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </Select>
              <Select label="Visiting Resident" required {...register('residentId', { required: true })}>
                {residents.slice(0, 20).map(r => (
                  <option key={r.id} value={r.id}>{r.name} — {r.apartment}</option>
                ))}
              </Select>
              <Input label="Vehicle Number (Optional)" placeholder="MH 01 AB 1234" {...register('vehicleNumber')} />
              <Button type="submit" fullWidth loading={loading} leftIcon={<CheckCircle size={15} />}>
                Check In & Generate Pass
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Today's Visitor Table */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Today's Visitor Log</CardTitle>
              <SearchBar value={search} onChange={setSearch} onClear={() => setSearch('')} placeholder="Search..." size="sm" className="w-48" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <DataTable
              columns={columns}
              data={filterBySearch(todayVisitors, search, ['name','purpose','residentName','residentApartment'])}
              compact
            />
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
