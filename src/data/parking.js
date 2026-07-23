// Parking slots grid: 120 slots total
const TOTAL_SLOTS = 120
const ROWS = ['A','B','C','D','E','F']
const COLS = 20

export const parkingSlots = Array.from({ length: TOTAL_SLOTS }, (_, i) => {
  const row = ROWS[Math.floor(i / COLS)]
  const col = (i % COLS) + 1
  const rand = Math.random()
  const status = rand < 0.55 ? 'occupied' : rand < 0.75 ? 'available' : rand < 0.88 ? 'reserved' : 'maintenance'
  return {
    id: `P-${String(i + 1).padStart(3, '0')}`,
    label: `${row}${String(col).padStart(2, '0')}`,
    row,
    col,
    status,
    type: i < 10 ? 'disabled' : i < 20 ? 'two_wheeler' : 'four_wheeler',
    vehicleNumber: status === 'occupied' ? `MH ${String(Math.floor(Math.random()*50)).padStart(2,'0')} AB ${Math.floor(Math.random()*9000)+1000}` : null,
    residentName: status === 'occupied' || status === 'reserved' ? ['Rahul Sharma','Priya Patel','Amit Kumar','Neha Gupta','Vijay Singh'][Math.floor(Math.random()*5)] : null,
    apartment: status === 'occupied' || status === 'reserved' ? ['A-101','B-202','C-301','D-102','E-203'][Math.floor(Math.random()*5)] : null,
    floor: 'G',
    isEV: Math.random() > 0.85,
  }
})

export const parkingStats = {
  total: TOTAL_SLOTS,
  occupied: parkingSlots.filter(s => s.status === 'occupied').length,
  available: parkingSlots.filter(s => s.status === 'available').length,
  reserved: parkingSlots.filter(s => s.status === 'reserved').length,
  maintenance: parkingSlots.filter(s => s.status === 'maintenance').length,
  twoWheeler: parkingSlots.filter(s => s.type === 'two_wheeler').length,
  fourWheeler: parkingSlots.filter(s => s.type === 'four_wheeler').length,
  ev: parkingSlots.filter(s => s.isEV).length,
  occupancyRate: Math.round((parkingSlots.filter(s => s.status === 'occupied').length / TOTAL_SLOTS) * 100),
}

export default parkingSlots
