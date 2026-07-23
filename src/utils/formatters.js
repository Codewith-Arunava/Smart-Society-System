import { format, formatDistanceToNow, isValid, parseISO } from 'date-fns'

// Date formatters
export const formatDate = (date, fmt = 'dd MMM yyyy') => {
  if (!date) return 'N/A'
  const d = typeof date === 'string' ? parseISO(date) : date
  return isValid(d) ? format(d, fmt) : 'Invalid Date'
}

export const formatDateTime = (date) => formatDate(date, 'dd MMM yyyy, hh:mm a')
export const formatTime = (date) => formatDate(date, 'hh:mm a')
export const formatRelative = (date) => {
  if (!date) return 'N/A'
  const d = typeof date === 'string' ? parseISO(date) : date
  return isValid(d) ? formatDistanceToNow(d, { addSuffix: true }) : 'N/A'
}
export const formatMonthYear = (date) => formatDate(date, 'MMMM yyyy')

// Currency
export const formatCurrency = (amount, currency = 'INR') => {
  if (amount === null || amount === undefined) return '₹0'
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount)
}

export const formatNumber = (num) => {
  if (num === null || num === undefined) return '0'
  return new Intl.NumberFormat('en-IN').format(num)
}

export const formatCompact = (num) => {
  if (!num) return '0'
  if (num >= 10000000) return `₹${(num / 10000000).toFixed(1)}Cr`
  if (num >= 100000) return `₹${(num / 100000).toFixed(1)}L`
  if (num >= 1000) return `₹${(num / 1000).toFixed(1)}K`
  return `₹${num}`
}

export const formatCompactNum = (num) => {
  if (!num) return '0'
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
  return `${num}`
}

// Percentage
export const formatPercent = (value, decimals = 1) => `${Number(value).toFixed(decimals)}%`

// File size
export const formatFileSize = (bytes) => {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

// Truncate text
export const truncate = (str, length = 80) => {
  if (!str) return ''
  return str.length > length ? `${str.substring(0, length)}...` : str
}

// Capitalize
export const capitalize = (str) => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const titleCase = (str) => {
  if (!str) return ''
  return str.split('_').map(capitalize).join(' ')
}

// Generate initials
export const getInitials = (name = '') => {
  return name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase()
}

// Get status color classes
export const getStatusColor = (status) => {
  const map = {
    active: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    inactive: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
    open: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    in_progress: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    resolved: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    closed: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
    rejected: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    paid: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    overdue: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    partial: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    confirmed: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    completed: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    available: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    occupied: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    reserved: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    maintenance: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    checked_in: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    checked_out: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
    expected: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    denied: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    free: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400',
  }
  return map[status] || 'bg-gray-100 text-gray-600'
}

export const getPriorityColor = (priority) => {
  const map = {
    low: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
    medium: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    high: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    critical: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  }
  return map[priority] || 'bg-gray-100 text-gray-600'
}

export const getPriorityDot = (priority) => {
  const map = {
    low: 'bg-gray-400',
    medium: 'bg-blue-500',
    high: 'bg-orange-500',
    critical: 'bg-red-500',
  }
  return map[priority] || 'bg-gray-400'
}

// Unique id
export const generateId = (prefix = 'ID') =>
  `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`

// Filter/search
export const filterBySearch = (items, query, fields) => {
  if (!query) return items
  const q = query.toLowerCase()
  return items.filter(item =>
    fields.some(field => {
      const val = field.split('.').reduce((obj, key) => obj?.[key], item)
      return String(val || '').toLowerCase().includes(q)
    })
  )
}

// Paginate
export const paginate = (items, page, perPage) => {
  const start = (page - 1) * perPage
  return items.slice(start, start + perPage)
}

// Sort
export const sortBy = (items, key, direction = 'asc') => {
  return [...items].sort((a, b) => {
    const av = a[key], bv = b[key]
    if (av < bv) return direction === 'asc' ? -1 : 1
    if (av > bv) return direction === 'asc' ? 1 : -1
    return 0
  })
}
