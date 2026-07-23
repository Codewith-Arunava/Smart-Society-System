import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setSent(true)
    setLoading(false)
    toast.success('Reset link sent!')
  }

  return (
    <div className="p-8">
      <Link to="/login" className="inline-flex items-center gap-1 text-xs text-white/50 hover:text-white/80 mb-6 transition-colors">
        <ArrowLeft size={12} /> Back to login
      </Link>

      {sent ? (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-green-400" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Check your email</h2>
          <p className="text-sm text-white/60">We've sent a password reset link to your email address.</p>
          <Link to="/login" className="inline-block mt-6 text-sm text-primary-300 hover:underline">Return to login</Link>
        </motion.div>
      ) : (
        <>
          <h2 className="text-xl font-bold text-white mb-1">Forgot password?</h2>
          <p className="text-sm text-white/60 mb-6">Enter your email and we'll send you a reset link</p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-white/70">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="email"
                  {...register('email', { required: 'Email is required' })}
                  className="w-full h-11 pl-10 pr-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400/50 transition-all"
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && <p className="text-xs text-red-300">{errors.email.message}</p>}
            </div>
            <motion.button
              type="submit"
              disabled={loading}
              whileTap={{ scale: 0.98 }}
              className="w-full h-11 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Send Reset Link'}
            </motion.button>
          </form>
        </>
      )}
    </div>
  )
}
