import { format, subDays, addHours, subHours } from 'date-fns'
import { residents } from './residents'

const visitorFirstNames = [
  'Amit','Rahul','Suresh','Raj','Vikram','Anil','Deepak','Rajesh',
  'Priya','Pooja','Neha','Sunita','Geeta','Anjali','Riya','Meera',
  'Sanjay','Pankaj','Manoj','Harish','Girish','Naresh','Dinesh',
]

const visitorLastNames = [
  'Sharma','Patel','Verma','Singh','Kumar','Gupta','Joshi','Shah','Mehta',
]

const purposes = [
  'Family Visit','Guest','Delivery - Amazon','Delivery - Flipkart','Plumber',
  'Electrician','House Help','Doctor Visit','Interview Candidate','Vendor',
  'AC Technician','Carpenter','Painter','Food Delivery - Zomato',
  'Food Delivery - Swiggy','Courier - DTDC','Business Meeting','Friend',
]

export const visitors = Array.from({ length: 500 }, (_, i) => {
  const resident = residents[i % residents.length]
  const fn = visitorFirstNames[i % visitorFirstNames.length]
  const ln = visitorLastNames[i % visitorLastNames.length]
  const purpose = purposes[i % purposes.length]
  const daysAgo = Math.floor(Math.random() * 90)
  const entryTime = subDays(new Date(), daysAgo)
  const statuses = ['checked_in','checked_out','expected','denied']
  const status = daysAgo > 0
    ? (Math.random() > 0.1 ? 'checked_out' : 'denied')
    : statuses[Math.floor(Math.random() * 2)]

  return {
    id: `VIS-${String(i + 1).padStart(4, '0')}`,
    name: `${fn} ${ln}`,
    phone: `+91 ${Math.floor(7000000000 + Math.random() * 2999999999)}`,
    purpose,
    residentId: resident.id,
    residentName: resident.name,
    residentApartment: resident.apartment,
    entryTime: format(entryTime, 'yyyy-MM-dd HH:mm:ss'),
    exitTime: status === 'checked_out'
      ? format(addHours(entryTime, Math.floor(Math.random() * 5) + 0.5), 'yyyy-MM-dd HH:mm:ss')
      : null,
    expectedTime: format(entryTime, 'yyyy-MM-dd HH:mm'),
    status,
    vehicleNumber: Math.random() > 0.5 ? `MH ${String(Math.floor(Math.random() * 50)).padStart(2,'0')} AB ${Math.floor(Math.random() * 9000) + 1000}` : null,
    preApproved: Math.random() > 0.4,
    photo: `https://api.dicebear.com/7.x/personas/svg?seed=visitor${i}`,
    qrCode: `QR-${String(i + 1).padStart(6, '0')}`,
    securityGuard: ['Ramesh Kumar','Sita Ram','Ajay Singh','Lal Bahadur'][Math.floor(Math.random() * 4)],
    remarks: Math.random() > 0.7 ? 'Verified ID at gate' : null,
    isRecurring: purpose.includes('House Help') || purpose.includes('Delivery'),
    date: format(entryTime, 'yyyy-MM-dd'),
  }
})

export default visitors
