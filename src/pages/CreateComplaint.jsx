import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Upload, AlertTriangle } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Input, TextArea, Select } from '../components/ui/Input'
import Button from '../components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { COMPLAINT_CATEGORIES, COMPLAINT_PRIORITY } from '../constants'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

export default function CreateComplaint() {
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { priority: 'medium', category: 'Water Supply' }
  })

  const onSubmit = async (data) => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    toast.success('Complaint submitted successfully! ID: CMP-' + Math.floor(Math.random() * 9000 + 1000))
    navigate(-1)
    setLoading(false)
  }

  const priorityColors = { low: 'bg-gray-100', medium: 'bg-blue-100', high: 'bg-orange-100', critical: 'bg-red-100' }

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 font-display">Submit Complaint</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Describe your issue and our team will respond promptly</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader><CardTitle>Complaint Details</CardTitle></CardHeader>
          <CardContent className="pt-0 space-y-4">
            <Input
              label="Complaint Title"
              required
              placeholder="Brief description of the issue"
              error={errors.title?.message}
              {...register('title', { required: 'Title is required', minLength: { value: 10, message: 'At least 10 characters' } })}
            />
            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Category"
                required
                error={errors.category?.message}
                {...register('category', { required: true })}
              >
                {COMPLAINT_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </Select>
              <Select
                label="Priority"
                required
                error={errors.priority?.message}
                {...register('priority', { required: true })}
              >
                {Object.values(COMPLAINT_PRIORITY).map(p => (
                  <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>
                ))}
              </Select>
            </div>
            <TextArea
              label="Detailed Description"
              required
              rows={5}
              placeholder="Please provide as much detail as possible — location, time of occurrence, impact on daily life, etc."
              error={errors.description?.message}
              {...register('description', { required: 'Description is required', minLength: { value: 30, message: 'At least 30 characters' } })}
            />
            <Input
              label="Location (Flat / Block / Area)"
              placeholder={`Your flat: ${currentUser?.apartment || 'A-101'}`}
              {...register('location')}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Attachments (Optional)</CardTitle></CardHeader>
          <CardContent className="pt-0">
            <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl p-8 text-center hover:border-primary-300 dark:hover:border-primary-700 transition-colors cursor-pointer">
              <Upload size={32} className="mx-auto text-gray-300 dark:text-gray-600 mb-3" />
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Drop images here or click to upload</p>
              <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 10MB each (max 5 files)</p>
              <input type="file" multiple accept="image/*" className="hidden" />
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center gap-2 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
          <AlertTriangle size={16} className="text-amber-600 flex-shrink-0" />
          <p className="text-xs text-amber-700 dark:text-amber-400">
            For emergencies (fire, medical, crime), call <strong>security directly at 9876543210</strong> instead of filing a complaint.
          </p>
        </div>

        <div className="flex gap-3 justify-end">
          <Button variant="ghost" onClick={() => navigate(-1)}>Cancel</Button>
          <Button type="submit" loading={loading} leftIcon={<AlertTriangle size={16} />}>Submit Complaint</Button>
        </div>
      </form>
    </motion.div>
  )
}
