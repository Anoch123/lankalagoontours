'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { app_text_constants } from '@/lib/constants/text_const'
import { adminLinks } from '@/lib/constants/admin'
import { handleLogout as handleLogoutService } from '@/services/admin/supabase-admin-login.service'
import { useAdminAuth } from '@/hooks/admin/useAdminAuth'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { user, loading } = useAdminAuth()

  // console.log('object ' , user);

  const handleLogout = async () => {
    await handleLogoutService()
    router.push('/admin')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F2E9]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-[#EDE4D3] border-t-[#146B72]" />
          <span className="text-sm text-[#4A625F] tracking-wide">Charting the course…</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F7F2E9]">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap');
        .font-display { font-family: 'Fraunces', serif; }
        .font-body { font-family: 'Inter', sans-serif; }
      `}</style>

      {/* Mobile Header */}
      <div className="lg:hidden bg-[#0B3D3E] text-[#F7F2E9] px-4 py-3 flex items-center justify-between font-body">
        <span className="font-display text-lg tracking-wide">Lanka Lagoon</span>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-xl"
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          font-body fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#0B3D3E] text-[#F7F2E9] transform transition-transform duration-200 ease-in-out flex flex-col
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="p-6 pb-4">
            <h1 className="font-display text-2xl tracking-wide">Lanka Lagoon</h1>
            <p className="text-[#8FB8B4] text-xs mt-1 uppercase tracking-[0.15em]">Admin Studio</p>
          </div>

          {/* signature wave divider */}
          <svg
            viewBox="0 0 256 16"
            className="w-full h-4 px-6 opacity-70"
            preserveAspectRatio="none"
          >
            <path
              d="M0 8 C 20 0, 40 16, 60 8 S 100 0, 120 8 S 160 16, 180 8 S 220 0, 240 8 S 256 8, 256 8"
              fill="none"
              stroke="#E76F51"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>

          <nav className="mt-4 px-3 flex-1 overflow-y-auto">
            {adminLinks.map((link) => {
              const active = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2.5 my-0.5 rounded-full text-sm transition-colors ${active
                      ? 'bg-[#146B72] text-white shadow-sm'
                      : 'text-[#CFE3E1] hover:bg-white/5 hover:text-white'
                    }`}
                >
                  <span className="text-base leading-none">{link.icon}</span>
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <div className="p-6 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#8FB8B4] uppercase tracking-wide">Signed in</span>
              <button
                onClick={handleLogout}
                className="text-sm text-[#F3A78A] hover:text-[#E76F51] transition-colors"
              >
                Log out
              </button>
            </div>
            <a href="/" className="block mt-3 text-sm text-[#CFE3E1] hover:text-white transition-colors">
              ← Back to the site
            </a>
          </div>
        </aside>

        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="font-body flex-1 min-h-screen p-4 md:p-6 lg:p-10">
          {children}
        </main>
      </div>

      {/* Admin Footer */}
      <footer className="font-body bg-white border-t border-[#EDE4D3] py-4 px-4 md:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-3">
            <img src="/images/web_logo.png" alt={app_text_constants.APP_NAME} className="h-8 w-auto object-contain" />
            <span className="text-sm text-[#4A625F]">Admin Studio</span>
          </div>
          <p className="text-sm text-[#4A625F] text-center sm:text-right">
            © {new Date().getFullYear()} {app_text_constants.APP_NAME}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}