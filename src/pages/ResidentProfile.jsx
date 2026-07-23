import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Phone, Mail, MapPin, Car, MessageSquare, CreditCard, User, Shield, Calendar } from 'lucide-react'
import { residents } from '../data/residents'
import { bills } from '../data/bills'
import { complaints } from '../data/complaints'
import { visitors } from '../data/visitors'
import { vehicles } from '../data/vehicles'
import { Avatar } from '../components/ui/Avatar'
import { StatusBadge, PriorityBadge, Badge } from '../components/ui/Badge'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { formatDate, formatCurrency } from '../utils/formatters'
import { StatCard } from '../components/ui/StatCard'

export default function ResidentProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const resident = residents.find(r => r.id === id) || residents[0]
  const residentBills = bills.filter(b => b.residentId === resident.id)
  const residentComplaints = complaints.filter(c => c.residentId === resident.id)
  const residentVehicles = vehicles.filter(v => v.residentId === resident.id)

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-5xl">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Resident Profile</h1>
      </div>

      {/* Profile Header */}
      <Card>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="relative">
              <Avatar src={resident.avatar} name={resident.name} size="2xl" />
              <div className={`absolute bottom-1 right-1 w-4 h-4 rounded-full ${resident.isActive ? 'bg-green-500' : 'bg-gray-400'} ring-2 ring-white dark:ring-gray-800`} />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 font-display">{resident.name}</h2>
                <Badge variant="primary">{resident.apartment}</Badge>
                <StatusBadge status={resident.status} />
                {resident.tags?.map(t => <Badge key={t} variant="accent">{t}</Badge>)}
              </div>
              <p className="text-gray-500 dark:text-gray-400 mb-4">{resident.occupation}</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Phone size={14} className="text-gray-400" /> {resident.phone}
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Mail size={14} className="text-gray-400" /> {resident.email}
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Calendar size={14} className="text-gray-400" /> Joined: {formatDate(resident.joinDate)}
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-3">
                {resident.aadhaarVerified && <span className="flex items-center gap-1 text-xs text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full"><Shield size={11} /> Aadhaar Verified</span>}
                {resident.backgroundCheckDone && <span className="flex items-center gap-1 text-xs text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-full"><Shield size={11} /> Background Check Done</span>}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Paid" value={formatCurrency(resident.totalPaid)} icon={CreditCard} iconColor="text-green-600" iconBg="bg-green-50 dark:bg-green-900/20" />
        <StatCard title="Outstanding" value={formatCurrency(resident.outstandingAmount)} icon={CreditCard} iconColor="text-red-600" iconBg="bg-red-50 dark:bg-red-900/20" />
        <StatCard title="Complaints" value={residentComplaints.length} icon={MessageSquare} iconColor="text-orange-600" iconBg="bg-orange-50 dark:bg-orange-900/20" />
        <StatCard title="Vehicles" value={residentVehicles.length} icon={Car} iconColor="text-secondary-600" iconBg="bg-secondary-50 dark:bg-secondary-900/20" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Family Details */}
        <Card>
          <CardHeader><CardTitle>Details</CardTitle></CardHeader>
          <CardContent className="pt-0 space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-gray-500">Flat</span><Badge variant="primary">{resident.apartment}</Badge></div>
            <div className="flex justify-between"><span className="text-gray-500">Members</span><span>{resident.memberCount}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Parking Slots</span><span>{resident.parkingSlots}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Resident ID</span><span className="font-mono text-xs text-gray-400">{resident.id}</span></div>
          </CardContent>
        </Card>

        {/* Emergency Contact */}
        <Card>
          <CardHeader><CardTitle>Emergency Contact</CardTitle></CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
                <Phone size={16} className="text-red-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">{resident.emergencyContact.name}</p>
                <p className="text-xs text-gray-400">{resident.emergencyContact.relation}</p>
                <p className="text-sm text-primary-600 dark:text-primary-400">{resident.emergencyContact.phone}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vehicles */}
        <Card>
          <CardHeader><CardTitle>Registered Vehicles</CardTitle></CardHeader>
          <CardContent className="pt-0 space-y-2">
            {residentVehicles.length > 0 ? residentVehicles.map(v => (
              <div key={v.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700/30 rounded-xl text-sm">
                <div>
                  <p className="font-medium font-mono">{v.vehicleNumber}</p>
                  <p className="text-xs text-gray-400">{v.brand} · {v.color} · {v.type}</p>
                </div>
                <Badge variant="primary">{v.parkingSlot}</Badge>
              </div>
            )) : <p className="text-sm text-gray-400">No vehicles registered</p>}
          </CardContent>
        </Card>
      </div>

      {/* Recent Complaints */}
      <Card>
        <CardHeader><CardTitle>Recent Complaints</CardTitle></CardHeader>
        <CardContent className="pt-0">
          {residentComplaints.slice(0, 5).map(c => (
            <div key={c.id} className="flex items-start justify-between gap-3 py-3 border-b border-gray-50 dark:border-gray-700/50 last:border-0">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{c.title}</p>
                <p className="text-xs text-gray-400">{c.category} · {formatDate(c.createdAt)}</p>
              </div>
              <div className="flex gap-2">
                <PriorityBadge priority={c.priority} />
                <StatusBadge status={c.status} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  )
}
