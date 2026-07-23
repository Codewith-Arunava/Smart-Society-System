import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { Avatar } from '../components/ui/Avatar'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import Button from '../components/ui/Button'
import { Input, TextArea } from '../components/ui/Input'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Phone, Mail, MapPin, Edit, Camera } from 'lucide-react'

export default function ProfilePage() {
  const { currentUser } = useAuth()
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: currentUser?.name || '',
      phone: currentUser?.phone || '',
      email: currentUser?.email || '',
    }
  })

  const onSubmit = async (data) => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    toast.success('Profile updated successfully!')
    setEditing(false)
    setLoading(false)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-3xl">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 font-display">My Profile</h1>

      {/* Profile Card */}
      <Card>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              <Avatar src={currentUser?.avatar} name={currentUser?.name} size="2xl" />
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-primary-700 transition-colors">
                <Camera size={14} />
              </button>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 font-display">{currentUser?.name}</h2>
              <p className="text-gray-500 dark:text-gray-400 capitalize">{currentUser?.role}</p>
              {currentUser?.apartment && <p className="text-sm text-primary-600 dark:text-primary-400 mt-1">Flat {currentUser.apartment}</p>}
              {currentUser?.designation && <p className="text-sm text-gray-500 mt-1">{currentUser.designation}</p>}
            </div>
            <Button variant="outline" size="sm" leftIcon={<Edit size={14} />} onClick={() => setEditing(!editing)}>
              {editing ? 'Cancel' : 'Edit Profile'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {editing ? (
        <Card>
          <CardHeader><CardTitle>Edit Profile</CardTitle></CardHeader>
          <CardContent className="pt-0">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input label="Full Name" required {...register('name', { required: 'Required' })} error={errors.name?.message} />
              <Input label="Phone Number" {...register('phone')} />
              <Input label="Email" type="email" {...register('email')} />
              <div className="flex gap-3 justify-end">
                <Button variant="ghost" onClick={() => setEditing(false)}>Cancel</Button>
                <Button type="submit" loading={loading}>Save Changes</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: 'Email', value: currentUser?.email, icon: Mail },
            { label: 'Phone', value: currentUser?.phone, icon: Phone },
            { label: 'Role', value: currentUser?.role, icon: MapPin },
          ].filter(i => i.value).map((info, i) => (
            <div key={i} className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-card">
              <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center">
                <info.icon size={18} className="text-primary-600" />
              </div>
              <div>
                <p className="text-xs text-gray-400">{info.label}</p>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 capitalize">{info.value}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Change Password */}
      <Card>
        <CardHeader><CardTitle>Change Password</CardTitle></CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            <Input label="Current Password" type="password" placeholder="••••••••" />
            <Input label="New Password" type="password" placeholder="••••••••" />
            <Input label="Confirm New Password" type="password" placeholder="••••••••" />
            <Button onClick={() => toast.success('Password changed!')} variant="outline" size="sm">Update Password</Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
