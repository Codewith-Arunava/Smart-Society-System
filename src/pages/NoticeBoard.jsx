import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Pin, Bell, Search, Eye, Paperclip, Heart, Calendar } from 'lucide-react'
import { notices } from '../data/notices'
import { SearchBar } from '../components/ui/SearchBar'
import { Badge } from '../components/ui/Badge'
import { formatDate, formatRelative } from '../utils/formatters'
import { NOTICE_CATEGORIES } from '../constants'
import { cn } from '../utils/cn'

const priorityColors = {
  high: 'border-l-4 border-red-400',
  medium: 'border-l-4 border-amber-400',
  low: 'border-l-4 border-green-400',
}

const categoryColors = {
  General: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
  Maintenance: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  Event: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  Emergency: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  Finance: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  Security: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  Community: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400',
}

export default function NoticeBoard() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [selected, setSelected] = useState(null)
  const [liked, setLiked] = useState({})

  let filtered = notices
  if (search) {
    const q = search.toLowerCase()
    filtered = filtered.filter(n => n.title.toLowerCase().includes(q) || n.body.toLowerCase().includes(q))
  }
  if (category !== 'all') filtered = filtered.filter(n => n.category === category)

  const pinned = filtered.filter(n => n.isPinned)
  const regular = filtered.filter(n => !n.isPinned)

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 font-display">Notice Board</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Society announcements, updates, and important information</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <SearchBar value={search} onChange={setSearch} onClear={() => setSearch('')} placeholder="Search notices..." />
        <div className="flex flex-wrap gap-2">
          {['all', ...NOTICE_CATEGORIES].map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={cn('px-3 py-1.5 rounded-full text-xs font-medium border transition-all',
                category === c ? 'bg-primary-600 text-white border-primary-600' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-gray-400'
              )}
            >
              {c === 'all' ? 'All' : c}
            </button>
          ))}
        </div>
      </div>

      {/* Pinned Notices */}
      {pinned.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Pin size={14} className="text-red-500" />
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Pinned Notices</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {pinned.map(notice => (
              <NoticeCard key={notice.id} notice={notice} onClick={() => setSelected(notice)} liked={liked} setLiked={setLiked} />
            ))}
          </div>
        </div>
      )}

      {/* Regular Notices */}
      <div>
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">All Notices ({regular.length})</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {regular.map(notice => (
            <NoticeCard key={notice.id} notice={notice} onClick={() => setSelected(notice)} liked={liked} setLiked={setLiked} />
          ))}
        </div>
      </div>

      {/* Notice Detail Modal */}
      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)} className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-10 w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden"
            >
              <div className={cn('p-6', priorityColors[selected.priority])}>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    {selected.isPinned && <span className="flex items-center gap-1 text-xs text-red-600 font-semibold"><Pin size={11} /> Pinned</span>}
                    <span className={cn('status-badge', categoryColors[selected.category])}>{selected.category}</span>
                    {selected.isNew && <span className="status-badge bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">New</span>}
                  </div>
                  <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 transition-colors text-lg">✕</button>
                </div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">{selected.title}</h2>
                <p className="text-xs text-gray-400 mb-4">{selected.postedBy} · {formatDate(selected.postedAt)} · Expires: {formatDate(selected.expiresAt)}</p>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{selected.body}</p>
                {selected.hasAttachment && (
                  <div className="mt-4 flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <Paperclip size={14} className="text-gray-400" />
                    <span className="text-xs text-primary-600 dark:text-primary-400 cursor-pointer hover:underline">Download Attachment</span>
                  </div>
                )}
                <div className="mt-4 flex items-center gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1"><Eye size={12} /> {selected.views} views</span>
                  <span className="flex items-center gap-1"><Heart size={12} /> {selected.likes + (liked[selected.id] ? 1 : 0)} likes</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function NoticeCard({ notice, onClick, liked, setLiked }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      onClick={onClick}
      className={cn(
        'bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700/50 shadow-card cursor-pointer hover:shadow-card-hover transition-all',
        priorityColors[notice.priority]
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          {notice.isPinned && <span className="flex items-center gap-1 text-xs text-red-500 font-semibold"><Pin size={10} /> Pinned</span>}
          <span className={cn('status-badge text-xs', categoryColors[notice.category])}>{notice.category}</span>
          {notice.isNew && <span className="status-badge bg-primary-100 text-primary-700 text-xs">New</span>}
        </div>
        {notice.hasAttachment && <Paperclip size={13} className="text-gray-400" />}
      </div>
      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">{notice.title}</h3>
      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-3 mb-3">{notice.body}</p>
      <div className="flex items-center justify-between text-xs text-gray-400">
        <span>{notice.postedBy}</span>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1"><Eye size={11} /> {notice.views}</span>
          <button
            onClick={e => { e.stopPropagation(); setLiked(l => ({ ...l, [notice.id]: !l[notice.id] })) }}
            className={cn('flex items-center gap-1 transition-colors', liked[notice.id] ? 'text-red-500' : 'hover:text-red-400')}
          >
            <Heart size={11} className={liked[notice.id] ? 'fill-red-500' : ''} />
            {notice.likes + (liked[notice.id] ? 1 : 0)}
          </button>
        </div>
      </div>
    </motion.div>
  )
}
