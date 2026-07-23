import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import AppRouter from './routes/AppRouter'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import { NotificationProvider } from './context/NotificationContext'
import { AppProvider } from './context/AppContext'

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <NotificationProvider>
            <AppProvider>
              <AppRouter />
              <Toaster
                position="top-right"
                gutter={8}
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: 'var(--toast-bg, #fff)',
                    color: 'var(--toast-color, #1f2937)',
                    borderRadius: '12px',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                    border: '1px solid rgba(0,0,0,0.06)',
                    fontSize: '14px',
                    fontFamily: 'Inter, sans-serif',
                  },
                  success: {
                    iconTheme: { primary: '#10b981', secondary: '#fff' },
                  },
                  error: {
                    iconTheme: { primary: '#ef4444', secondary: '#fff' },
                  },
                }}
              />
            </AppProvider>
          </NotificationProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
