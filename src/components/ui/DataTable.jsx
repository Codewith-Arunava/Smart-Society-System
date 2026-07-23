import { useState } from 'react'
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../utils/cn'
import { EmptyState } from './EmptyState'
import { TableSkeleton } from './LoadingSpinner'
import Pagination from './Pagination'

export function DataTable({
  columns,
  data = [],
  loading = false,
  keyField = 'id',
  onRowClick,
  emptyType = 'empty',
  emptyTitle,
  emptyDescription,
  striped = false,
  compact = false,
  pagination,
  className,
  stickyHeader = false,
}) {
  const [sortField, setSortField] = useState(null)
  const [sortDir, setSortDir] = useState('asc')

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDir('asc')
    }
  }

  const sortedData = sortField
    ? [...data].sort((a, b) => {
        const av = a[sortField], bv = b[sortField]
        if (av === null || av === undefined) return 1
        if (bv === null || bv === undefined) return -1
        const cmp = String(av).localeCompare(String(bv), undefined, { numeric: true })
        return sortDir === 'asc' ? cmp : -cmp
      })
    : data

  return (
    <div className={cn('flex flex-col', className)}>
      <div className={cn('overflow-x-auto rounded-xl border border-gray-100 dark:border-gray-700/50', stickyHeader && 'max-h-[500px] overflow-y-auto')}>
        <table className="w-full text-sm">
          <thead className={cn('bg-gray-50 dark:bg-gray-800/50', stickyHeader && 'sticky top-0 z-10')}>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    'px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap',
                    col.sortable && 'cursor-pointer select-none hover:text-gray-900 dark:hover:text-gray-100',
                    col.align === 'right' && 'text-right',
                    col.align === 'center' && 'text-center',
                  )}
                  style={{ width: col.width }}
                  onClick={col.sortable ? () => handleSort(col.key) : undefined}
                >
                  <span className="flex items-center gap-1">
                    {col.label}
                    {col.sortable && (
                      sortField === col.key
                        ? (sortDir === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />)
                        : <ChevronsUpDown size={12} className="opacity-40" />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-700/50">
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="p-4">
                  <TableSkeleton rows={5} cols={columns.length} />
                </td>
              </tr>
            ) : sortedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length}>
                  <EmptyState type={emptyType} title={emptyTitle} description={emptyDescription} />
                </td>
              </tr>
            ) : (
              sortedData.map((row, i) => (
                <motion.tr
                  key={row[keyField] || i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15, delay: i * 0.02 }}
                  onClick={() => onRowClick?.(row)}
                  className={cn(
                    'bg-white dark:bg-gray-800 transition-colors duration-150',
                    onRowClick && 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50',
                    striped && i % 2 === 1 && 'bg-gray-50/50 dark:bg-gray-800/50',
                  )}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={cn(
                        'whitespace-nowrap text-gray-700 dark:text-gray-300',
                        compact ? 'px-4 py-2' : 'px-4 py-3.5',
                        col.align === 'right' && 'text-right',
                        col.align === 'center' && 'text-center',
                      )}
                    >
                      {col.render ? col.render(row[col.key], row) : (row[col.key] ?? '—')}
                    </td>
                  ))}
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {pagination && (
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          totalItems={pagination.total}
          itemsPerPage={pagination.perPage}
          onPageChange={pagination.onChange}
          className="mt-4"
        />
      )}
    </div>
  )
}

export default DataTable
