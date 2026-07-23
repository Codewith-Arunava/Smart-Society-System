import { format, subDays, addDays } from 'date-fns'
import { residents } from './residents'
import { FACILITIES } from '../constants'

const timeSlots = ['06:00-08:00','08:00-10:00','10:00-12:00','12:00-14:00','14:00-16:00','16:00-18:00','18:00-20:00','20:00-22:00']

export const bookings = Array.from({ length: 80 }, (_, i) => {
  const resident = residents[i % residents.length]
  const facility = FACILITIES[i % FACILITIES.length]
  const daysOffset = Math.floor(Math.random() * 60) - 30 // -30 to +30 days
  const bookingDate = addDays(new Date(), daysOffset)
  const statuses = ['confirmed','pending','cancelled','completed']
  const status = daysOffset < 0 ? (Math.random() > 0.1 ? 'completed' : 'cancelled')
    : daysOffset === 0 ? 'confirmed'
    : (Math.random() > 0.2 ? 'confirmed' : 'pending')

  return {
    id: `BKG-${String(i + 1).padStart(4, '0')}`,
    facilityId: facility.id,
    facilityName: facility.name,
    residentId: resident.id,
    residentName: resident.name,
    residentApartment: resident.apartment,
    date: format(bookingDate, 'yyyy-MM-dd'),
    timeSlot: timeSlots[i % timeSlots.length],
    duration: [1, 2][Math.floor(Math.random() * 2)],
    status,
    amount: facility.rate,
    paymentStatus: facility.rate > 0 ? (status === 'confirmed' ? 'paid' : 'pending') : 'free',
    guests: Math.floor(Math.random() * 10) + 1,
    purpose: ['Birthday Party','Family Get-together','Community Event','Personal Use','Sports Practice','Yoga Session','Business Meeting'][i % 7],
    createdAt: format(subDays(new Date(), Math.floor(Math.random() * 15) + 1), 'yyyy-MM-dd HH:mm'),
    notes: Math.random() > 0.6 ? 'Please ensure the area is clean after use.' : null,
  }
})

export default bookings
