import { useState } from 'react'
import { motion } from 'framer-motion'
import { HelpCircle, ChevronDown, ChevronUp, Mail, Phone, MessageSquare, Book, Video, Search } from 'lucide-react'
import { SearchBar } from '../components/ui/SearchBar'
import { Card, CardContent } from '../components/ui/Card'
import { cn } from '../utils/cn'

const faqs = [
  { q: 'How do I submit a complaint?', a: 'Go to the Complaints section and click "New Complaint". Fill in the title, description, category, and priority. You can also attach images. Your complaint will be tracked in real-time.', category: 'Complaints' },
  { q: 'How do I pay my maintenance bill?', a: 'Navigate to Maintenance Bills, find your pending bill, and click "Pay Now". You can pay via UPI, Net Banking, Credit Card, or Cash at the office.', category: 'Billing' },
  { q: 'How do I pre-approve a visitor?', a: 'Go to Visitor Entry and fill in the visitor details including name, phone, purpose, and expected time. They will receive a QR code via SMS for quick entry at the gate.', category: 'Visitors' },
  { q: 'How do I book a facility?', a: 'Go to Facility Booking, select the facility, pick a date on the calendar, choose a time slot, and click "Request Booking". Admin will confirm within 24 hours.', category: 'Booking' },
  { q: 'How do I register my vehicle?', a: 'Go to Parking Management → Vehicles and click "Register Vehicle". Fill in the vehicle details, and you\'ll receive an RFID tag within 2 business days.', category: 'Parking' },
  { q: 'How does the AI Insights work?', a: 'The AI Insights page uses machine learning models trained on historical society data to predict complaint trends, maintenance costs, and utility usage. These are informational and not guaranteed predictions.', category: 'AI' },
  { q: 'How do I update my profile?', a: 'Go to My Profile (top right corner → Profile) and click "Edit Profile". You can update your name, phone, and email. Profile photo changes require admin approval.', category: 'Account' },
  { q: 'What should I do in an emergency?', a: 'For fire: call 101. For medical: call 108. For police: call 100. Contact the security guard at the gate who has a direct line to all emergency services.', category: 'Emergency' },
]

const categories = [...new Set(faqs.map(f => f.category))]

export default function HelpCenter() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [openFaq, setOpenFaq] = useState(null)

  let filteredFaqs = faqs
  if (search) filteredFaqs = filteredFaqs.filter(f => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase()))
  if (activeCategory !== 'all') filteredFaqs = filteredFaqs.filter(f => f.category === activeCategory)

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-4xl">
      <div className="text-center py-8 px-4 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-3xl text-white">
        <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <HelpCircle size={28} className="text-white" />
        </div>
        <h1 className="text-2xl font-bold font-display mb-2">How can we help you?</h1>
        <p className="text-primary-100 text-sm mb-6">Search our FAQ or contact support</p>
        <SearchBar
          value={search}
          onChange={setSearch}
          onClear={() => setSearch('')}
          placeholder="Search help articles..."
          className="max-w-lg mx-auto"
        />
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { icon: Book, label: 'User Guide', color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
          { icon: Video, label: 'Video Tutorials', color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20' },
          { icon: MessageSquare, label: 'Live Chat', color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20' },
          { icon: Mail, label: 'Email Support', color: 'text-orange-600', bg: 'bg-orange-50 dark:bg-orange-900/20' },
        ].map((item, i) => (
          <motion.div key={i} whileHover={{ y: -2 }} className={`p-4 rounded-2xl ${item.bg} border border-gray-100 dark:border-gray-700 cursor-pointer text-center`}>
            <item.icon size={24} className={`mx-auto mb-2 ${item.color}`} />
            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">{item.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {['all', ...categories].map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn('px-3 py-1.5 rounded-full text-xs font-medium border transition-all',
              activeCategory === cat ? 'bg-primary-600 text-white border-primary-600' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700'
            )}
          >
            {cat === 'all' ? 'All Topics' : cat}
          </button>
        ))}
      </div>

      {/* FAQs */}
      <div className="space-y-2">
        {filteredFaqs.map((faq, i) => (
          <Card key={i} className="overflow-hidden">
            <button
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              className="w-full flex items-center justify-between p-5 text-left"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 font-medium">{faq.category}</span>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{faq.q}</span>
              </div>
              {openFaq === i ? <ChevronUp size={18} className="text-gray-400 flex-shrink-0" /> : <ChevronDown size={18} className="text-gray-400 flex-shrink-0" />}
            </button>
            {openFaq === i && (
              <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} className="px-5 pb-5">
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed pl-3 border-l-2 border-primary-300">{faq.a}</p>
              </motion.div>
            )}
          </Card>
        ))}
      </div>

      {/* Contact Card */}
      <Card>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Still need help?</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Our support team is available Mon–Sat, 9 AM – 6 PM</p>
            </div>
            <div className="flex gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"><Phone size={14} /> +91 98765 43210</div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"><Mail size={14} /> support@smartsociety.com</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
