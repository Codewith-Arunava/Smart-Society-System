import { format, subMonths, addDays } from 'date-fns'
import { residents } from './residents'

const MONTHLY_MAINTENANCE = 3500
const WATER_CHARGE = 800
const PARKING_CHARGE = 500
const ELECTRICITY_CHARGE_BASE = 1200

const paymentMethods = ['UPI','Net Banking','Credit Card','Cash','NEFT','Cheque']

export const bills = []

residents.forEach((resident, ri) => {
  for (let m = 0; m < 12; m++) {
    const billMonth = subMonths(new Date(), m)
    const dueDate = new Date(billMonth.getFullYear(), billMonth.getMonth() + 1, 10)
    const electricityUnits = Math.floor(Math.random() * 200) + 100
    const electricityAmount = electricityUnits * 6.5
    const waterAmount = WATER_CHARGE + Math.floor(Math.random() * 200)
    const maintenanceAmount = MONTHLY_MAINTENANCE + (resident.memberCount > 4 ? 500 : 0)
    const parkingAmount = resident.parkingSlots * PARKING_CHARGE
    const totalAmount = electricityAmount + waterAmount + maintenanceAmount + parkingAmount

    const isPaid = m > 1 ? true : (Math.random() > 0.25)
    const paymentDate = isPaid ? addDays(dueDate, Math.floor(Math.random() * 10) - 5) : null

    bills.push({
      id: `BILL-${String(ri + 1).padStart(3, '0')}-${String(m + 1).padStart(2, '0')}`,
      residentId: resident.id,
      residentName: resident.name,
      residentApartment: resident.apartment,
      month: format(billMonth, 'MMMM yyyy'),
      monthIndex: billMonth.getMonth(),
      year: billMonth.getFullYear(),
      dueDate: format(dueDate, 'yyyy-MM-dd'),
      issueDate: format(new Date(billMonth.getFullYear(), billMonth.getMonth() + 1, 1), 'yyyy-MM-dd'),
      breakdown: {
        maintenance: maintenanceAmount,
        electricity: electricityAmount,
        water: waterAmount,
        parking: parkingAmount,
        electricityUnits,
        waterLiters: Math.floor(Math.random() * 5000) + 2000,
      },
      totalAmount: Math.round(totalAmount),
      paidAmount: isPaid ? Math.round(totalAmount) : 0,
      status: isPaid ? 'paid' : (new Date() > dueDate ? 'overdue' : 'pending'),
      paymentDate: paymentDate ? format(paymentDate, 'yyyy-MM-dd') : null,
      paymentMethod: isPaid ? paymentMethods[Math.floor(Math.random() * paymentMethods.length)] : null,
      transactionId: isPaid ? `TXN${Math.floor(Math.random() * 9000000000) + 1000000000}` : null,
      invoiceNumber: `INV-${billMonth.getFullYear()}${String(billMonth.getMonth() + 1).padStart(2, '0')}-${String(ri + 1).padStart(4, '0')}`,
      lateFee: !isPaid && new Date() > dueDate ? 500 : 0,
    })
  }
})

export const monthlyRevenue = Array.from({ length: 12 }, (_, i) => {
  const month = subMonths(new Date(), 11 - i)
  const collected = Math.floor(Math.random() * 500000) + 1500000
  const total = 1800000 + Math.floor(Math.random() * 200000)
  return {
    month: format(month, 'MMM'),
    year: month.getFullYear(),
    collected,
    pending: total - collected,
    total,
    collectionRate: Math.round((collected / total) * 100),
  }
})

export default bills
