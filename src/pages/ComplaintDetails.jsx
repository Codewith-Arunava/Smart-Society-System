import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, User, MapPin, Tag, Image, MessageSquare, Star, Edit, CheckCircle, AlertTriangle, Loader } from 'lucide-react'
import { useState } from 'react'
import { complaints } from '../data/complaints'
import { StatusBadge, PriorityBadge } from '../components/ui/Badge'
import { Avatar } from '../components/ui/Avatar'
import Button from '../components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { formatDateTime, formatRelative } from '../utils/formatters'
import { EmptyState } from '../components/ui/EmptyState'
import toast from 'react-hot-toast'

const stepColors = {
  'Complaint Submitted': 'bg-blue-500',
  'Complaint Acknowledged': 'bg-indigo-500',
  'Assigned to Maintenance Team': 'bg-purple-500',
  'Work in Progress': 'bg-amber-500',
  'Issue Resolved': 'bg-green-500',
  'Resolution Verified': 'bg-teal-500',
}

export default function ComplaintDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const complaint = complaints.find(c => c.id === id) || complaints[0]
  const [comment, setComment] = useState('')
  const [updating, setUpdating] = useState(false)

  const handleStatusUpdate = async (newStatus) => {
    setUpdating(true)
    await new Promise(r => setTimeout(r, 700))
    setUpdating(false)
    toast.success(`Status updated to ${newStatus}`)
  }

  const handleComment = async () => {
    if (!comment.trim()) return
    await new Promise(r => setTimeout(r, 400))
    setComment('')
    toast.success('Comment added')
  }

  if (!complaint) return <EmptyState type="error" title="Complaint Not Found" />

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-6xl">
      {/* Back + Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <ArrowLeft size={18} />
          </button>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono text-gray-400">{complaint.id}</span>
              <PriorityBadge priority={complaint.priority} />
              <StatusBadge status={complaint.status} />
              {complaint.isUrgent && (
                <span className="status-badge bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 animate-pulse">
                  🔴 URGENT
                </span>
              )}
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 mt-1 font-display">{complaint.title}</h1>
          </div>
        </div>
        <div className="flex gap-2">
          {complaint.status !== 'resolved' && complaint.status !== 'closed' && (
            <Button
              variant="success"
              size="sm"
              leftIcon={<CheckCircle size={15} />}
              onClick={() => handleStatusUpdate('resolved')}
              loading={updating}
            >
              Mark Resolved
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <Card>
            <CardContent>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{complaint.description}</p>
              {complaint.images && complaint.images.length > 0 && (
                <div className="mt-4">
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">Attached Images</p>
                  <div className="grid grid-cols-2 gap-3">
                    {complaint.images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={`Attachment ${i+1}`}
                        className="w-full h-36 object-cover rounded-xl cursor-pointer hover:opacity-90 transition-opacity border border-gray-100 dark:border-gray-700"
                      />
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Status Update Actions */}
          <Card>
            <CardHeader><CardTitle>Update Status</CardTitle></CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-2">
                {['in_progress','resolved','closed','rejected'].map(s => (
                  <Button
                    key={s}
                    variant={complaint.status === s ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleStatusUpdate(s)}
                  >
                    {s.replace('_',' ').replace(/\b\w/g, c => c.toUpperCase())}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Comments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare size={18} /> Comments ({complaint.comments})
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex gap-3 mb-4">
                <Avatar name="Admin" size="sm" />
                <div className="flex-1">
                  <textarea
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    rows={3}
                    placeholder="Add a comment or update..."
                    className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                  />
                  <div className="mt-2 flex justify-end">
                    <Button size="sm" onClick={handleComment} disabled={!comment.trim()}>Post Comment</Button>
                  </div>
                </div>
              </div>
              {complaint.rating && (
                <div className="flex items-center gap-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
                  <div className="flex">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} size={14} className={i < complaint.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} />
                    ))}
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Resident rated this resolution {complaint.rating}/5</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Resident Info */}
          <Card>
            <CardHeader><CardTitle>Reported By</CardTitle></CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center gap-3 mb-4">
                <Avatar src={complaint.residentAvatar} name={complaint.residentName} size="md" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">{complaint.residentName}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{complaint.residentApartment}</p>
                </div>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex gap-2"><Tag size={13} className="text-gray-400 flex-shrink-0 mt-0.5" /><span className="text-gray-600 dark:text-gray-400">{complaint.category}</span></div>
                <div className="flex gap-2"><Clock size={13} className="text-gray-400 flex-shrink-0 mt-0.5" /><span className="text-gray-600 dark:text-gray-400">{formatDateTime(complaint.createdAt)}</span></div>
                {complaint.assignedTo && (
                  <div className="flex gap-2"><User size={13} className="text-gray-400 flex-shrink-0 mt-0.5" /><span className="text-gray-600 dark:text-gray-400">Assigned: {complaint.assignedTo}</span></div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader><CardTitle>Activity Timeline</CardTitle></CardHeader>
            <CardContent className="pt-0">
              <div className="relative">
                <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-100 dark:bg-gray-700" />
                {complaint.timeline.map((step, i) => (
                  <div key={i} className="relative flex gap-4 pb-4 last:pb-0">
                    <div className={`w-6 h-6 rounded-full ${stepColors[step.action] || 'bg-gray-400'} flex items-center justify-center flex-shrink-0 z-10 ring-2 ring-white dark:ring-gray-800`}>
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                    <div className="flex-1 pt-0.5">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{step.action}</p>
                      <p className="text-xs text-gray-400">{step.author} · {step.timestamp}</p>
                      {step.note && <p className="text-xs text-gray-500 mt-1 italic">{step.note}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  )
}
