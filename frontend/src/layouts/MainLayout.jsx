import { useState } from "react"
import { Outlet } from "react-router-dom"

import Sidebar from "@/layouts/Sidebar"
import Header from "@/layouts/Header"
import Footer from "@/layouts/Footer"

// import ThemeProvider from "@/components/theme-provider"

function MainLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        mobileMenuOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      <div className="flex min-h-screen flex-col md:ml-64">
        <Header
          onMenuClick={() => setMobileMenuOpen((prev) => !prev)}
          mobileMenuOpen={mobileMenuOpen}
        />

        <main className="flex-1">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  )
}

export default MainLayout