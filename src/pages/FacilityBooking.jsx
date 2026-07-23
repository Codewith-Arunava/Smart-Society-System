import { motion } from 'framer-motion'
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth } from 'date-fns'
import { useState } from 'react'
import { ChevronLeft, ChevronRight, Calendar, Clock, Users, MapPin } from 'lucide-react'
import { bookings } from '../data/bookings'
import { FACILITIES } from '../constants'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { StatusBadge, Badge } from '../components/ui/Badge'
import Button from '../components/ui/Button'
import { cn } from '../utils/cn'
import toast from 'react-hot-toast'

export default function FacilityBooking() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedFacility, setSelectedFacility] = useState(null)

  const days = eachDayOfInterval({ start: startOfMonth(currentDate), end: endOfMonth(currentDate) })
  const startPad = startOfMonth(currentDate).getDay()

  const getBookingsForDay = (date) => bookings.filter(b => b.date === format(date, 'yyyy-MM-dd'))
  const selectedDayBookings = getBookingsForDay(selectedDate)

  const handleBook = () => {
    if (!selectedFacility) { toast.error('Please select a facility first'); return }
    toast.success(`Booking request sent for ${selectedFacility.name} on ${format(selectedDate, 'dd MMM')}!`)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 font-display">Facility Booking</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Book society amenities for your events and activities</p>
      </div>

      {/* Facilities */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {FACILITIES.map(f => (
          <motion.div
            key={f.id}
            whileHover={{ y: -2 }}
            onClick={() => setSelectedFacility(f.id === selectedFacility?.id ? null : f)}
            className={cn(
              'p-4 rounded-2xl border-2 cursor-pointer transition-all text-center',
              selectedFacility?.id === f.id
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                : 'border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300'
            )}
          >
            <div className="text-2xl mb-1.5">
              {f.id === 'gym' ? '🏋️' : f.id === 'pool' ? '🏊' : f.id === 'clubhouse' ? '🏛️' : f.id === 'badminton' ? '🏸' : f.id === 'party_hall' ? '🎉' : f.id === 'kids_zone' ? '🎪' : f.id === 'yoga_room' ? '🧘' : '🌿'}
            </div>
            <p className="text-xs font-semibold text-gray-900 dark:text-gray-100">{f.name}</p>
            <p className="text-xs text-gray-400 mt-0.5">Cap: {f.capacity}</p>
            <p className="text-xs mt-1 font-medium text-primary-600 dark:text-primary-400">
              {f.rate === 0 ? 'Free' : `₹${f.rate}`}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendar */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{format(currentDate, 'MMMM yyyy')}</CardTitle>
              <div className="flex gap-1">
                <button onClick={() => setCurrentDate(d => new Date(d.getFullYear(), d.getMonth()-1, 1))} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                  <ChevronLeft size={16} />
                </button>
                <button onClick={() => setCurrentDate(d => new Date(d.getFullYear(), d.getMonth()+1, 1))} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
                <div key={d} className="text-center text-xs font-semibold text-gray-400 py-1">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: startPad }).map((_, i) => <div key={`p-${i}`} />)}
              {days.map(day => {
                const hasBooking = getBookingsForDay(day).length > 0
                const isSelected = isSameDay(day, selectedDate)
                const isToday = isSameDay(day, new Date())
                return (
                  <motion.button
                    key={day.toISOString()}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedDate(day)}
                    className={cn(
                      'h-9 w-full rounded-xl text-sm font-medium transition-colors relative',
                      isSelected ? 'bg-primary-600 text-white' :
                      isToday ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400' :
                      'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    )}
                  >
                    {format(day, 'd')}
                    {hasBooking && !isSelected && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent-500" />
                    )}
                  </motion.button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Selected Day Bookings + Book Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar size={18} /> {format(selectedDate, 'EEEE, dd MMMM yyyy')}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-3">
            {selectedDayBookings.length > 0 ? (
              selectedDayBookings.map(b => (
                <div key={b.id} className="p-3 rounded-xl bg-gray-50 dark:bg-gray-700/30 border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-semibold">{b.facilityName}</p>
                    <StatusBadge status={b.status} />
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><Clock size={11} /> {b.timeSlot}</span>
                    <span className="flex items-center gap-1"><Users size={11} /> {b.guests} guests</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{b.residentName} · {b.residentApartment}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400 text-center py-6">No bookings on this date</p>
            )}

            {/* New Booking */}
            <div className="pt-3 border-t border-gray-100 dark:border-gray-700">
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Book a Slot</p>
              {selectedFacility ? (
                <div className="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-xl border border-primary-200 dark:border-primary-800 mb-3">
                  <p className="text-sm font-medium text-primary-700 dark:text-primary-400">{selectedFacility.name}</p>
                  <p className="text-xs text-primary-500">{selectedFacility.rate === 0 ? 'Free' : `₹${selectedFacility.rate}`} · Max {selectedFacility.capacity} people</p>
                </div>
              ) : (
                <p className="text-xs text-gray-400 mb-3">Select a facility from above to book</p>
              )}
              <select className="w-full h-10 px-3 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl mb-3">
                {['06:00-08:00','08:00-10:00','10:00-12:00','14:00-16:00','16:00-18:00','18:00-20:00','20:00-22:00'].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <Button fullWidth onClick={handleBook} disabled={!selectedFacility}>
                Request Booking
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
