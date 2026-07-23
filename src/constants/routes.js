// Application-wide route constants
export const ROUTES = {
  // Public
  HOME: '/',
  LOGIN: '/login',
  FORGOT_PASSWORD: '/forgot-password',

  // Resident
  RESIDENT_DASHBOARD: '/resident/dashboard',
  RESIDENT_COMPLAINTS: '/resident/complaints',
  RESIDENT_BILLS: '/resident/bills',
  RESIDENT_PAYMENT_HISTORY: '/resident/payments',
  RESIDENT_VISITORS: '/resident/visitors',
  RESIDENT_PARKING: '/resident/parking',
  RESIDENT_NOTICES: '/resident/notices',
  RESIDENT_BOOKINGS: '/resident/bookings',

  // Admin
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_RESIDENTS: '/admin/residents',
  ADMIN_RESIDENT_PROFILE: '/admin/residents/:id',
  ADMIN_COMPLAINTS: '/admin/complaints',
  ADMIN_COMPLAINT_DETAILS: '/admin/complaints/:id',
  ADMIN_ANALYTICS: '/admin/analytics',
  ADMIN_AI_INSIGHTS: '/admin/ai-insights',
  ADMIN_NOTICES: '/admin/notices',
  ADMIN_PARKING: '/admin/parking',
  ADMIN_VISITORS: '/admin/visitors',
  ADMIN_SETTINGS: '/admin/settings',

  // Security
  SECURITY_DASHBOARD: '/security/dashboard',
  SECURITY_VISITOR_ENTRY: '/security/visitor-entry',
  SECURITY_VISITOR_HISTORY: '/security/visitor-history',

  // Shared
  CREATE_COMPLAINT: '/complaints/create',
  COMPLAINT_DETAILS: '/complaints/:id',
  VEHICLE_REGISTRATION: '/vehicles/register',
  FACILITY_BOOKING: '/bookings/facilities',
  CALENDAR_BOOKING: '/bookings/calendar',
  PROFILE: '/profile',
  NOTIFICATIONS: '/notifications',
  HELP: '/help',
  NOT_FOUND: '*',
}
