import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { Input } from '../components/ui/Input'
import Button from '../components/ui/Button'
import toast from 'react-hot-toast'

const demoUsers = [
  { label: '👨‍💼 Admin', email: 'admin@smartsociety.com', color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' },
  { label: '🏠 Resident', email: 'resident@smartsociety.com', color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' },
  { label: '🛡️ Security', email: 'security@smartsociety.com', color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' },
]

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: { email: 'admin@smartsociety.com', password: 'demo123' }
  })

  const onSubmit = async (data) => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    const user = login(data.email, data.password)
    toast.success(`Welcome back, ${user.name.split(' ')[0]}! 👋`)
    navigate(`/${user.role}/dashboard`)
    setLoading(false)
  }

  const fillDemo = (email) => {
    setValue('email', email)
    setValue('password', 'demo123')
  }

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold text-white mb-1">Welcome back</h2>
      <p className="text-sm text-white/60 mb-6">Sign in to your account</p>

      {/* Demo pills */}
      <div className="mb-6">
        <p className="text-xs text-white/50 mb-2 font-medium">Quick demo login:</p>
        <div className="flex flex-wrap gap-2">
          {demoUsers.map(u => (
            <button
              key={u.email}
              onClick={() => fillDemo(u.email)}
              className={`px-3 py-1 rounded-full text-xs font-semibold ${u.color} transition-all hover:scale-105`}
            >
              {u.label}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-white/70">Email Address</label>
          <div className="relative">
            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              className="w-full h-11 pl-10 pr-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400/50 focus:border-primary-400/50 transition-all"
              placeholder="you@example.com"
            />
          </div>
          {errors.email && <p className="text-xs text-red-300">{errors.email.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-white/70">Password</label>
          <div className="relative">
            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type={showPass ? 'text' : 'password'}
              {...register('password', { required: 'Password is required' })}
              className="w-full h-11 pl-10 pr-11 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400/50 focus:border-primary-400/50 transition-all"
              placeholder="••••••••"
            />
            <button type="button" onClick={() => setShowPass(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70">
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && <p className="text-xs text-red-300">{errors.password.message}</p>}
        </div>

        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-xs text-primary-300 hover:text-primary-200 hover:underline">
            Forgot password?
          </Link>
        </div>

        <motion.button
          type="submit"
          disabled={loading}
          whileTap={{ scale: 0.98 }}
          className="w-full h-11 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-400 hover:to-secondary-400 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>Sign In <ArrowRight size={16} /></>
          )}
        </motion.button>
      </form>

      <p className="text-center text-white/40 text-xs mt-6">
        Demo app — use any of the quick login buttons above
      </p>
    </div>
  )
}
