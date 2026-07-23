import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import MainLayout from '../layouts/MainLayout'
import AuthLayout from '../layouts/AuthLayout'
import { PageLoader } from '../components/ui/LoadingSpinner'

// Pages (lazy loaded)
const LandingPage = lazy(() => import('../pages/LandingPage'))
const LoginPage = lazy(() => import('../pages/LoginPage'))
const ForgotPasswordPage = lazy(() => import('../pages/ForgotPasswordPage'))
const AdminDashboard = lazy(() => import('../pages/AdminDashboard'))
const ResidentDashboard = lazy(() => import('../pages/ResidentDashboard'))
const SecurityDashboard = lazy(() => import('../pages/SecurityDashboard'))
const ComplaintManagement = lazy(() => import('../pages/ComplaintManagement'))
const ComplaintDetails = lazy(() => import('../pages/ComplaintDetails'))
const CreateComplaint = lazy(() => import('../pages/CreateComplaint'))
const MaintenanceBills = lazy(() => import('../pages/MaintenanceBills'))
const ParkingManagement = lazy(() => import('../pages/ParkingManagement'))
const VisitorEntry = lazy(() => import('../pages/VisitorEntry'))
const VisitorHistory = lazy(() => import('../pages/VisitorHistory'))
const NoticeBoard = lazy(() => import('../pages/NoticeBoard'))
const FacilityBooking = lazy(() => import('../pages/FacilityBooking'))
const ResidentsList = lazy(() => import('../pages/ResidentsList'))
const ResidentProfile = lazy(() => import('../pages/ResidentProfile'))
const AnalyticsDashboard = lazy(() => import('../pages/AnalyticsDashboard'))
const AIInsightsPage = lazy(() => import('../pages/AIInsightsPage'))
const Settings = lazy(() => import('../pages/Settings'))
const ProfilePage = lazy(() => import('../pages/ProfilePage'))
const NotificationsPage = lazy(() => import('../pages/NotificationsPage'))
const HelpCenter = lazy(() => import('../pages/HelpCenter'))
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'))

export default function AppRouter() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Landing */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Route>

        {/* App Routes (with MainLayout) */}
        <Route element={<MainLayout />}>
          {/* Admin */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/residents" element={<ResidentsList />} />
          <Route path="/admin/residents/:id" element={<ResidentProfile />} />
          <Route path="/admin/complaints" element={<ComplaintManagement />} />
          <Route path="/admin/complaints/:id" element={<ComplaintDetails />} />
          <Route path="/admin/analytics" element={<AnalyticsDashboard />} />
          <Route path="/admin/ai-insights" element={<AIInsightsPage />} />
          <Route path="/admin/notices" element={<NoticeBoard />} />
          <Route path="/admin/parking" element={<ParkingManagement />} />
          <Route path="/admin/visitors" element={<VisitorHistory />} />
          <Route path="/admin/bills" element={<MaintenanceBills />} />
          <Route path="/admin/settings" element={<Settings />} />

          {/* Resident */}
          <Route path="/resident/dashboard" element={<ResidentDashboard />} />
          <Route path="/resident/complaints" element={<ComplaintManagement />} />
          <Route path="/resident/bills" element={<MaintenanceBills />} />
          <Route path="/resident/parking" element={<ParkingManagement />} />
          <Route path="/resident/visitors" element={<VisitorEntry />} />
          <Route path="/resident/bookings" element={<FacilityBooking />} />
          <Route path="/resident/notices" element={<NoticeBoard />} />

          {/* Security */}
          <Route path="/security/dashboard" element={<SecurityDashboard />} />
          <Route path="/security/visitor-entry" element={<VisitorEntry />} />
          <Route path="/security/visitor-history" element={<VisitorHistory />} />

          {/* Shared */}
          <Route path="/complaints/create" element={<CreateComplaint />} />
          <Route path="/complaints/:id" element={<ComplaintDetails />} />
          <Route path="/bookings/facilities" element={<FacilityBooking />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/help" element={<HelpCenter />} />
        </Route>

        {/* Fallback redirects */}
        <Route path="/dashboard" element={<Navigate to="/admin/dashboard" replace />} />

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  )
}
