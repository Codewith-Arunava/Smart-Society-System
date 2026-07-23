import { createContext, useContext, useState, useCallback } from 'react'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed(prev => !prev)
  }, [])

  const toggleMobileSidebar = useCallback(() => {
    setMobileSidebarOpen(prev => !prev)
  }, [])

  return (
    <AppContext.Provider value={{
      sidebarOpen,
      sidebarCollapsed,
      mobileSidebarOpen,
      setSidebarOpen,
      setSidebarCollapsed,
      setMobileSidebarOpen,
      toggleSidebar,
      toggleMobileSidebar,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
