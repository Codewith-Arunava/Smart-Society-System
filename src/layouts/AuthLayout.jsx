import { Outlet } from 'react-router-dom'
import { Building2 } from 'lucide-react'
import { motion } from 'framer-motion'

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-950 via-primary-900 to-secondary-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-secondary-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-500/5 rounded-full blur-3xl" />
      </div>

      {/* Dot grid */}
      <div className="absolute inset-0 bg-hero-pattern opacity-30" />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-400 to-secondary-400 shadow-lg mb-4">
            <Building2 size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white font-display">SmartSociety</h1>
          <p className="text-primary-200/70 text-sm mt-1">AI-Powered Society Management</p>
        </div>

        {/* Page content */}
        <div className="bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
          <Outlet />
        </div>

        <p className="text-center text-primary-200/50 text-xs mt-6">
          © 2026 SmartSociety. All rights reserved.
        </p>
      </motion.div>
    </div>
  )
}
