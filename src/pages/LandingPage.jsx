import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Building2, Shield, Users, BarChart3, Brain, Car, Bell,
  MessageSquare, CreditCard, CheckCircle, Star, ArrowRight,
  Zap, Droplets, Phone, Mail, MapPin, Menu, X
} from 'lucide-react'
import { useState } from 'react'

const features = [
  { icon: Brain, title: 'AI-Powered Insights', desc: 'ML models predict complaints, costs, and usage patterns', color: 'from-purple-500 to-primary-600' },
  { icon: Shield, title: 'Smart Security', desc: 'Real-time gate management with QR visitor passes', color: 'from-blue-500 to-secondary-500' },
  { icon: BarChart3, title: 'Analytics Dashboard', desc: 'Comprehensive charts for all society metrics', color: 'from-accent-500 to-teal-600' },
  { icon: MessageSquare, title: 'Complaint Tracking', desc: 'End-to-end complaint lifecycle with real-time updates', color: 'from-orange-500 to-amber-500' },
  { icon: CreditCard, title: 'Smart Billing', desc: 'Automated maintenance bills with online payment', color: 'from-green-500 to-emerald-500' },
  { icon: Car, title: 'Parking Management', desc: 'Visual grid with real-time slot availability', color: 'from-indigo-500 to-purple-500' },
]

const stats = [
  { value: '500+', label: 'Societies Using SmartSociety' },
  { value: '50K+', label: 'Happy Residents' },
  { value: '99.9%', label: 'Uptime Guaranteed' },
  { value: '4.9/5', label: 'Average Rating' },
]

const testimonials = [
  { name: 'Rajesh Kumar', role: 'Society Secretary', society: 'Sunshine Heights, Mumbai', text: 'SmartSociety transformed how we manage our 200-unit complex. The AI insights helped us reduce maintenance costs by 30%!', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=raj' },
  { name: 'Priya Mehta', role: 'Resident', society: 'Green Valley, Pune', text: 'Finally a system that actually works! Paying bills, tracking complaints, and booking facilities is so effortless now.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya' },
  { name: 'Amit Sharma', role: 'Security Supervisor', society: 'Royal Palms, Bangalore', text: 'The visitor management system with QR codes is brilliant. Gate management has never been this smooth and secure.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=amit' },
]

const plans = [
  { name: 'Starter', price: '₹2,999', period: '/month', features: ['Up to 50 units', 'Basic complaint management', 'Billing module', 'Visitor log', 'Email support'], popular: false },
  { name: 'Professional', price: '₹6,999', period: '/month', features: ['Up to 200 units', 'AI Insights module', 'Advanced analytics', 'Parking management', 'Facility booking', 'Priority support', 'SMS alerts'], popular: true },
  { name: 'Enterprise', price: 'Custom', period: '', features: ['Unlimited units', 'All Pro features', 'Custom integrations', 'Dedicated account manager', 'On-site training', 'SLA guarantee', 'White-labeling'], popular: false },
]

const faqs = [
  { q: 'Is there a free trial?', a: 'Yes! We offer a 30-day free trial with full access to all Professional features.' },
  { q: 'Can existing data be migrated?', a: 'Our team provides complete data migration support from Excel, legacy systems, or manual records.' },
  { q: 'Is the platform secure?', a: 'Absolutely. We use bank-grade 256-bit encryption, regular security audits, and GDPR-compliant data handling.' },
  { q: 'Does it work on mobile?', a: 'Yes, SmartSociety is fully responsive and works on any device — desktop, tablet, or phone.' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}
const itemVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-600 to-secondary-500 flex items-center justify-center">
              <Building2 size={18} className="text-white" />
            </div>
            <span className="font-bold text-gray-900 dark:text-gray-100 text-lg">SmartSociety</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {['Features','Analytics','Pricing','FAQ'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium">
                {item}
              </a>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 transition-colors">Sign In</Link>
            <Link to="/login" className="px-4 py-2 bg-gradient-to-r from-primary-600 to-secondary-500 text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg">
              Get Started Free →
            </Link>
          </div>
          <button className="md:hidden p-2 rounded-xl text-gray-500" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden px-4 py-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 space-y-3">
            {['Features','Analytics','Pricing','FAQ'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="block text-sm text-gray-600 dark:text-gray-400 py-2" onClick={() => setMobileMenuOpen(false)}>{item}</a>
            ))}
            <Link to="/login" className="block w-full py-2.5 bg-gradient-to-r from-primary-600 to-secondary-500 text-white text-sm font-semibold rounded-xl text-center" onClick={() => setMobileMenuOpen(false)}>
              Get Started Free
            </Link>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4 bg-gradient-to-br from-gray-950 via-primary-950 to-secondary-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-20" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-sm text-primary-300 mb-8">
              <Zap size={14} className="text-yellow-400" />
              Powered by AI & Machine Learning
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight font-display mb-6">
              Society Management
              <br />
              <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                Reimagined with AI
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              The complete smart society management platform — complaints, billing, visitors, parking, and AI-powered insights all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-500 text-white font-bold rounded-2xl text-base shadow-2xl hover:shadow-primary-500/25 transition-all flex items-center gap-2"
                >
                  Start Free Trial <ArrowRight size={18} />
                </motion.button>
              </Link>
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="px-8 py-4 bg-white/10 border border-white/20 text-white font-bold rounded-2xl text-base backdrop-blur-sm hover:bg-white/20 transition-all"
                >
                  View Live Demo →
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 bg-primary-600 text-white">
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
              <p className="text-4xl font-black mb-1">{s.value}</p>
              <p className="text-primary-200 text-sm">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-4 bg-white dark:bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 dark:text-gray-100 mb-4 font-display">Everything Your Society Needs</h2>
            <p className="text-lg text-gray-500 dark:text-gray-400">Built for modern residential communities, packed with powerful features</p>
          </div>
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div key={i} variants={itemVariants} whileHover={{ y: -5 }} className="p-6 rounded-3xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-card hover:shadow-card-hover transition-all group">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <f.icon size={22} className="text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Analytics Section */}
      <section id="analytics" className="py-24 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-black text-gray-900 dark:text-gray-100 mb-6 font-display">Data-Driven Society Management</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
                Make smarter decisions with real-time analytics and AI-powered predictions. Track electricity usage, water consumption, revenue collection, and complaint trends all in one dashboard.
              </p>
              {['Revenue collection rate tracking', 'Utility usage forecasting', 'Complaint trend analysis', 'Visitor traffic patterns', 'AI anomaly detection'].map((item, i) => (
                <div key={i} className="flex items-center gap-3 mb-3">
                  <CheckCircle size={16} className="text-primary-600 flex-shrink-0" />
                  <p className="text-sm text-gray-700 dark:text-gray-300">{item}</p>
                </div>
              ))}
            </div>
            <div className="bg-gradient-to-br from-primary-900 to-secondary-900 rounded-3xl p-6 text-white space-y-4">
              {[
                { label: 'Collection Rate', value: '87%', color: 'bg-green-500', width: '87%' },
                { label: 'Complaint Resolution', value: '92%', color: 'bg-accent-500', width: '92%' },
                { label: 'Resident Satisfaction', value: '4.8/5', color: 'bg-yellow-500', width: '96%' },
                { label: 'Gate Security', value: '99.9%', color: 'bg-blue-500', width: '99%' },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-primary-200">{item.label}</span>
                    <span className="font-bold">{item.value}</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: item.width }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.8 }}
                      className={`h-full ${item.color} rounded-full`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 bg-white dark:bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 dark:text-gray-100 mb-4 font-display">Loved by Thousands</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-6 rounded-3xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-card">
                <div className="flex mb-4">
                  {Array.from({length:5}).map((_,j) => <Star key={j} size={14} className="text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role} · {t.society}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 dark:text-gray-100 mb-4 font-display">Simple, Transparent Pricing</h2>
            <p className="text-gray-500">Start free, upgrade when you're ready</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className={`p-6 rounded-3xl border-2 relative ${plan.popular ? 'border-primary-500 bg-primary-50 dark:bg-primary-950/50' : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900'}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary-600 to-secondary-500 text-white text-xs font-bold rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-3xl font-black text-gray-900 dark:text-gray-100">{plan.price}</span>
                  <span className="text-gray-400 text-sm">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircle size={14} className="text-primary-600 flex-shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <Link to="/login">
                  <button className={`w-full py-3 rounded-2xl text-sm font-bold transition-all ${plan.popular ? 'bg-gradient-to-r from-primary-600 to-secondary-500 text-white hover:opacity-90 shadow-lg' : 'border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-primary-400'}`}>
                    {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-4 bg-white dark:bg-gray-950">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 dark:text-gray-100 mb-4 font-display">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left bg-white dark:bg-gray-900">
                  <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{faq.q}</span>
                  <span className="text-gray-400">{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 bg-white dark:bg-gray-900">
                    <p className="text-sm text-gray-600 dark:text-gray-400">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 bg-gradient-to-br from-primary-600 to-secondary-600 text-white text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-4xl font-black mb-4 font-display">Ready to Transform Your Society?</h2>
          <p className="text-primary-100 mb-8 text-lg">Join 500+ societies already using SmartSociety</p>
          <Link to="/login">
            <motion.button whileHover={{ scale: 1.02 }} className="px-10 py-4 bg-white text-primary-600 font-bold rounded-2xl text-lg shadow-2xl hover:shadow-white/20 transition-all">
              Get Started Free — No Credit Card Required →
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-600 to-secondary-500 flex items-center justify-center">
                  <Building2 size={16} className="text-white" />
                </div>
                <span className="font-bold text-white">SmartSociety</span>
              </div>
              <p className="text-sm leading-relaxed">AI-powered society management for modern residential communities.</p>
            </div>
            {[
              { title: 'Product', links: ['Features', 'Analytics', 'AI Insights', 'Security', 'Pricing'] },
              { title: 'Company', links: ['About Us', 'Blog', 'Careers', 'Press', 'Partners'] },
              { title: 'Support', links: ['Help Center', 'Contact', 'Status', 'Privacy Policy', 'Terms'] },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="text-white font-semibold mb-4 text-sm">{col.title}</h4>
                {col.links.map(link => (
                  <p key={link} className="text-sm mb-2 hover:text-white cursor-pointer transition-colors">{link}</p>
                ))}
              </div>
            ))}
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-xs">
            © 2026 SmartSociety Technologies Pvt. Ltd. All rights reserved. Made with ❤️ in India 🇮🇳
          </div>
        </div>
      </footer>
    </div>
  )
}
