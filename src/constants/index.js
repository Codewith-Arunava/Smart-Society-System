// App-wide constants

export const APP_NAME = 'SmartSociety'
export const APP_TAGLINE = 'AI-Powered Society Management'
export const APP_VERSION = '2.0.0'

export const USER_ROLES = {
  ADMIN: 'admin',
  RESIDENT: 'resident',
  SECURITY: 'security',
  SUPER_ADMIN: 'super_admin',
}

export const COMPLAINT_STATUS = {
  OPEN: 'open',
  IN_PROGRESS: 'in_progress',
  RESOLVED: 'resolved',
  CLOSED: 'closed',
  REJECTED: 'rejected',
}

export const COMPLAINT_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
}

export const COMPLAINT_CATEGORIES = [
  'Water Supply',
  'Electricity',
  'Lift / Elevator',
  'Parking',
  'Security',
  'Cleaning / Sanitation',
  'Plumbing',
  'Common Area',
  'Noise Complaint',
  'Internet / Cable',
  'Gardening',
  'Fire Safety',
  'Other',
]

export const PAYMENT_STATUS = {
  PAID: 'paid',
  PENDING: 'pending',
  OVERDUE: 'overdue',
  PARTIAL: 'partial',
}

export const VISITOR_STATUS = {
  EXPECTED: 'expected',
  CHECKED_IN: 'checked_in',
  CHECKED_OUT: 'checked_out',
  DENIED: 'denied',
}

export const PARKING_STATUS = {
  AVAILABLE: 'available',
  OCCUPIED: 'occupied',
  RESERVED: 'reserved',
  MAINTENANCE: 'maintenance',
}

export const BOOKING_STATUS = {
  CONFIRMED: 'confirmed',
  PENDING: 'pending',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
}

export const NOTICE_CATEGORIES = [
  'General',
  'Maintenance',
  'Event',
  'Emergency',
  'Finance',
  'Security',
  'Community',
]

export const FACILITIES = [
  { id: 'gym', name: 'Gymnasium', icon: 'Dumbbell', capacity: 20, rate: 0 },
  { id: 'pool', name: 'Swimming Pool', icon: 'Waves', capacity: 30, rate: 0 },
  { id: 'clubhouse', name: 'Club House', icon: 'Building2', capacity: 100, rate: 2000 },
  { id: 'badminton', name: 'Badminton Court', icon: 'Activity', capacity: 4, rate: 200 },
  { id: 'party_hall', name: 'Party Hall', icon: 'Music', capacity: 150, rate: 5000 },
  { id: 'kids_zone', name: 'Kids Zone', icon: 'Baby', capacity: 25, rate: 0 },
  { id: 'yoga_room', name: 'Yoga Room', icon: 'Heart', capacity: 15, rate: 0 },
  { id: 'terrace', name: 'Terrace Garden', icon: 'Trees', capacity: 50, rate: 500 },
]

export const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
]

export const SHORT_MONTHS = [
  'Jan','Feb','Mar','Apr','May','Jun',
  'Jul','Aug','Sep','Oct','Nov','Dec',
]

export const ITEMS_PER_PAGE = 10

export const CHART_COLORS = [
  '#2563eb', '#0ea5e9', '#14b8a6', '#f59e0b',
  '#ef4444', '#8b5cf6', '#ec4899', '#10b981',
]
