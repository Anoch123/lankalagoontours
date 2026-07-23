'use client'

import AdminLayout from '@/components/ui/AdminLayout'
import { stats } from '@/lib/constants/admin'

export default function AdminDashboardPage() {
  
  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Hero */}
        <div className="relative overflow-hidden rounded-3xl bg-[#0B3D3E] text-[#F7F2E9] px-6 py-8 md:px-10 md:py-10">
          <svg
            viewBox="0 0 400 60"
            className="absolute inset-x-0 bottom-0 w-full h-10 opacity-40"
            preserveAspectRatio="none"
          >
            <path
              d="M0 30 C 40 10, 80 50, 120 30 S 200 10, 240 30 S 320 50, 360 30 S 400 30, 400 30"
              fill="none"
              stroke="#E76F51"
              strokeWidth="2"
            />
          </svg>
          <p className="text-xs uppercase tracking-[0.2em] text-[#8FB8B4] mb-2">Hello User</p>
          <h1 className="font-display text-3xl md:text-4xl">Good to see you back</h1>
          <p className="mt-2 text-[#CFE3E1] max-w-xl">
            Here&apos;s how the Tour booking site is moving today. Bookings and customers, all in one tide.
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl bg-white border border-[#EDE4D3] p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <span className="text-2xl">{stat.icon}</span>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    stat.positive
                      ? 'bg-[#E9F1E7] text-[#588157]'
                      : 'bg-[#FBE9E4] text-[#E76F51]'
                  }`}
                >
                  {stat.change}
                </span>
              </div>
              <p className="font-display text-2xl mt-4 text-[#16302E]">{stat.value}</p>
              <p className="text-sm text-[#4A625F] mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Placeholder for future widgets */}
        <div className="rounded-2xl border border-dashed border-[#DCCFB2] p-10 text-center text-[#4A625F]">
          <p className="font-display text-lg text-[#16302E] mb-1">More to come</p>
          <p className="text-sm">Recent orders, top customers and a revenue chart can live here.</p>
        </div>
      </div>
    </AdminLayout>
  )
}