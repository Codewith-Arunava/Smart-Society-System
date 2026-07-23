import { format, subMonths } from 'date-fns'

// Monthly electricity & water usage data for the society (aggregate)
export const electricityUsage = Array.from({ length: 12 }, (_, i) => {
  const month = subMonths(new Date(), 11 - i)
  const base = 45000
  const seasonal = Math.sin((i / 12) * Math.PI * 2) * 8000
  const units = Math.round(base + seasonal + (Math.random() * 5000 - 2500))
  return {
    month: format(month, 'MMM'),
    fullMonth: format(month, 'MMMM yyyy'),
    year: month.getFullYear(),
    units,
    cost: Math.round(units * 6.5),
    avgPerFlat: Math.round(units / 100),
    peakDemand: Math.round(units * 0.035),
    solarGenerated: Math.round(units * 0.12),
    gridConsumed: Math.round(units * 0.88),
    co2Saved: Math.round(units * 0.12 * 0.82),
  }
})

export const waterUsage = Array.from({ length: 12 }, (_, i) => {
  const month = subMonths(new Date(), 11 - i)
  const base = 1200000 // liters
  const seasonal = Math.sin((i / 12) * Math.PI * 2) * 150000
  const liters = Math.round(base + seasonal + (Math.random() * 100000 - 50000))
  return {
    month: format(month, 'MMM'),
    fullMonth: format(month, 'MMMM yyyy'),
    year: month.getFullYear(),
    liters,
    kl: Math.round(liters / 1000),
    cost: Math.round((liters / 1000) * 25),
    avgPerFlat: Math.round(liters / 100),
    wastage: Math.round(liters * 0.05),
    recycled: Math.round(liters * 0.08),
  }
})

// Hourly usage for today
export const hourlyElectricity = Array.from({ length: 24 }, (_, h) => ({
  hour: `${String(h).padStart(2, '0')}:00`,
  units: h >= 6 && h <= 22
    ? Math.round(50 + Math.random() * 120 + (h >= 18 && h <= 21 ? 80 : 0))
    : Math.round(15 + Math.random() * 30),
}))

// Category-wise electricity breakdown
export const electricityBreakdown = [
  { name: 'Common Area Lights', value: 18, color: '#2563eb' },
  { name: 'Lifts/Elevators', value: 22, color: '#0ea5e9' },
  { name: 'Water Pumps', value: 15, color: '#14b8a6' },
  { name: 'HVAC', value: 28, color: '#f59e0b' },
  { name: 'Security Systems', value: 8, color: '#8b5cf6' },
  { name: 'Others', value: 9, color: '#ec4899' },
]

export default { electricityUsage, waterUsage, hourlyElectricity, electricityBreakdown }
