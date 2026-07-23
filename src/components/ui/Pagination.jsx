import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { cn } from '../../utils/cn'

export function Pagination({ currentPage, totalPages, onPageChange, totalItems, itemsPerPage, className }) {
  const start = Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)
  const end = Math.min(currentPage * itemsPerPage, totalItems)

  const getPages = () => {
    const pages = []
    const maxVisible = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2))
    let endPage = Math.min(totalPages, startPage + maxVisible - 1)
    if (endPage - startPage + 1 < maxVisible) startPage = Math.max(1, endPage - maxVisible + 1)

    if (startPage > 1) { pages.push(1); if (startPage > 2) pages.push('...') }
    for (let i = startPage; i <= endPage; i++) pages.push(i)
    if (endPage < totalPages) { if (endPage < totalPages - 1) pages.push('...'); pages.push(totalPages) }
    return pages
  }

  if (totalPages <= 1) return null

  return (
    <div className={cn('flex flex-col sm:flex-row items-center justify-between gap-4 mt-4', className)}>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Showing <span className="font-medium text-gray-900 dark:text-gray-100">{start}–{end}</span> of{' '}
        <span className="font-medium text-gray-900 dark:text-gray-100">{totalItems}</span> results
      </p>
      <div className="flex items-center gap-1">
        <PageBtn onClick={() => onPageChange(1)} disabled={currentPage === 1} aria-label="First">
          <ChevronsLeft size={14} />
        </PageBtn>
        <PageBtn onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} aria-label="Previous">
          <ChevronLeft size={14} />
        </PageBtn>
        {getPages().map((page, i) =>
          page === '...'
            ? <span key={`e-${i}`} className="px-2 text-gray-400">...</span>
            : (
              <PageBtn
                key={page}
                onClick={() => onPageChange(page)}
                active={page === currentPage}
              >
                {page}
              </PageBtn>
            )
        )}
        <PageBtn onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} aria-label="Next">
          <ChevronRight size={14} />
        </PageBtn>
        <PageBtn onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages} aria-label="Last">
          <ChevronsRight size={14} />
        </PageBtn>
      </div>
    </div>
  )
}

function PageBtn({ children, onClick, disabled, active, ...props }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200',
        active
          ? 'bg-primary-600 text-white shadow-sm'
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700',
        disabled && 'opacity-40 cursor-not-allowed',
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default Pagination
