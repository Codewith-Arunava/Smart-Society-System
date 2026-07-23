import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, ArrowLeft } from 'lucide-react'
import Button from '../components/ui/Button'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-8"
        >
          <div className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-primary-600 to-secondary-500 leading-none">
            404
          </div>
          <div className="w-32 h-1 bg-gradient-to-r from-primary-600 to-secondary-500 rounded-full mx-auto mt-2" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 font-display">Page Not Found</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex gap-3 justify-center">
            <Button variant="ghost" leftIcon={<ArrowLeft size={16} />} onClick={() => window.history.back()}>Go Back</Button>
            <Link to="/admin/dashboard">
              <Button leftIcon={<Home size={16} />}>Go to Dashboard</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
