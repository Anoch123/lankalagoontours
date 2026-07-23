'use client'

import { useState } from 'react'
import { app_text_constants } from '@/lib/constants/text_const'
import { useRouter } from 'next/navigation'
import { adminLogin } from '@/services/admin/supabase-admin-login.service'

export default function LankaLagoonAdmin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const result = await adminLogin(email, password);

      if (!result) {
        setError("Login Failed. No Admin User Found")
        return;
      }

      if(result?.profile.role === 'ADMIN') {
        router.push('/lankalagoon-admin/dashboard')
      }

    } catch (err: any) {
      const errorMessage = err?.message || err?.statusText || 'Login error'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">

      <div className="w-full max-w-md">

        {/* Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8">

          {/* Logo + Title inside card */}
          <div className="text-center mb-6">
            <img
              src="/images/web_logo.png"
              alt={app_text_constants.APP_NAME}
              className="mx-auto h-35 w-auto object-contain"
            />

            <p className="text-gray-500 text-sm mt-[-20px]">
              Sign in to access the {app_text_constants.APP_NAME} admin dashboard
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-300 text-red-600 px-4 py-3 rounded-lg mb-5 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Email
              </label>
              <input
                type="email"
                required
                placeholder="admin@email.com"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-black text-white font-medium hover:bg-gray-900 transition disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Sign In'}
            </button>

            {/* Back */}
            <div className="text-center pt-2">
              <a
                href="/"
                className="text-sm text-gray-500 hover:text-black transition"
              >
                ← Back to {app_text_constants.APP_NAME}
              </a>
            </div>

          </form>
        </div>

      </div>
    </div>
  )
}