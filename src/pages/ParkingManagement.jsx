import { useState } from 'react'
import { motion } from 'framer-motion'
import { Car, Grid3X3, List, Search, Plus, Zap } from 'lucide-react'
import { parkingSlots, parkingStats } from '../data/parking'
import { vehicles } from '../data/vehicles'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { SearchBar } from '../components/ui/SearchBar'
import { StatusBadge, Badge } from '../components/ui/Badge'
import { DataTable } from '../components/ui/DataTable'
import { cn } from '../utils/cn'
import { filterBySearch } from '../utils/formatters'

const statusColors = {
  available: 'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700',
  occupied: 'bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700',
  reserved: 'bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700',
  maintenance: 'bg-orange-100 dark:bg-orange-900/30 border-orange-300 dark:border-orange-700',
}
const statusDot = {
  available: 'bg-green-500',
  occupied: 'bg-red-500',
  reserved: 'bg-blue-500',
  maintenance: 'bg-orange-500',
}

export default function ParkingManagement() {
  const [activeTab, setActiveTab] = useState('grid')
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const filteredSlots = parkingSlots.filter(s => {
    if (filter !== 'all' && s.status !== filter) return false
    if (search) {
      const q = search.toLowerCase()
      return s.label.toLowerCase().includes(q) || (s.vehicleNumber || '').toLowerCase().includes(q) || (s.residentName || '').toLowerCase().includes(q)
    }
    return true
  })

  const vehicleColumns = [
    { key: 'vehicleNumber', label: 'Vehicle No.', sortable: true, render: v => <span className="font-mono font-semibold text-sm">{v}</span> },
    { key: 'brand', label: 'Vehicle', render: (v, row) => <div><p className="font-medium">{row.brand} {row.model?.split(' ').slice(-1)[0]}</p><p className="text-xs text-gray-400">{row.color} · {row.fuelType}</p></div> },
    { key: 'residentName', label: 'Owner', sortable: true, render: (v, row) => <div><p>{v}</p><p className="text-xs text-gray-400">{row.residentApartment}</p></div> },
    { key: 'parkingSlot', label: 'Slot', render: v => <Badge variant="primary">{v}</Badge> },
    { key: 'type', label: 'Type', render: v => <span className="capitalize text-xs">{v.replace('_', ' ')}</span> },
    { key: 'isEV', label: '', render: v => v ? <span className="flex items-center gap-1 text-xs text-green-600"><Zap size={12} /> EV</span> : null },
    { key: 'isActive', label: 'Status', render: v => <StatusBadge status={v ? 'active' : 'inactive'} /> },
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 font-display">Parking Management</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Real-time parking slot overview and vehicle registry</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: 'Total Slots', value: parkingStats.total, color: 'text-gray-900 dark:text-gray-100', bg: 'bg-gray-50 dark:bg-gray-800' },
          { label: 'Available', value: parkingStats.available, color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20' },
          { label: 'Occupied', value: parkingStats.occupied, color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-900/20' },
          { label: 'Reserved', value: parkingStats.reserved, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
          { label: 'Occupancy', value: `${parkingStats.occupancyRate}%`, color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20' },
        ].map((s, i) => (
          <div key={i} className={`${s.bg} rounded-2xl p-4 border border-gray-100 dark:border-gray-700/50 text-center`}>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700">
        {[{ id: 'grid', label: 'Slot Grid', icon: Grid3X3 }, { id: 'vehicles', label: 'Vehicles', icon: Car }].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={cn('flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors',
              activeTab === t.id ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700')}
          >
            <t.icon size={15} /> {t.label}
          </button>
        ))}
      </div>

      {/* Slot Grid */}
      {activeTab === 'grid' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <SearchBar value={search} onChange={setSearch} onClear={() => setSearch('')} placeholder="Search slot, vehicle, resident..." />
            <div className="flex gap-2">
              {['all', 'available', 'occupied', 'reserved', 'maintenance'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn('px-3 py-1.5 rounded-xl text-xs font-medium transition-all border',
                    filter === f ? 'bg-primary-600 text-white border-primary-600' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700'
                  )}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 text-xs">
            {Object.entries(statusDot).map(([s, c]) => (
              <div key={s} className="flex items-center gap-1.5">
                <div className={`w-3 h-3 rounded-full ${c}`} />
                <span className="text-gray-600 dark:text-gray-400 capitalize">{s}</span>
              </div>
            ))}
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-4 overflow-x-auto">
            <div className="grid gap-1.5" style={{ gridTemplateColumns: 'repeat(20, minmax(44px, 1fr))', minWidth: 960 }}>
              {filteredSlots.map(slot => (
                <motion.div
                  key={slot.id}
                  whileHover={{ scale: 1.08 }}
                  title={`${slot.label}\n${slot.status}\n${slot.vehicleNumber || 'Empty'}\n${slot.residentName || ''}`}
                  className={cn(
                    'h-11 rounded-lg border-2 flex flex-col items-center justify-center cursor-pointer transition-all',
                    statusColors[slot.status]
                  )}
                >
                  <div className={`w-2 h-2 rounded-full ${statusDot[slot.status]}`} />
                  <span className="text-[9px] font-bold text-gray-600 dark:text-gray-400 mt-0.5 leading-none">{slot.label}</span>
                  {slot.isEV && <Zap size={8} className="text-green-600 mt-0.5" />}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Vehicles Table */}
      {activeTab === 'vehicles' && (
        <Card>
          <CardContent>
            <div className="mb-4">
              <SearchBar value={search} onChange={setSearch} onClear={() => setSearch('')} placeholder="Search vehicles, owners..." />
            </div>
            <DataTable
              columns={vehicleColumns}
              data={filterBySearch(vehicles, search, ['vehicleNumber','brand','model','residentName','residentApartment'])}
            />
          </CardContent>
        </Card>
      )}
    </motion.div>
  )
}
