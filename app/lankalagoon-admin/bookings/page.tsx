'use client'

import { useEffect, useMemo, useState } from 'react'
import AdminLayout from '@/components/ui/AdminLayout'
import { Badge, paymentBadge, statusBadgeStyle } from '@/components/ui/status-badge'
import { Booking } from '@/lib/types/api/bookings'
import { useBookings } from '@/hooks/admin/useBookings'
import Link from 'next/link'

type FilterTab = 'all' | 'pending_payment' | 'pending_status'

export default function AdminBookings() {
    const [bookings, setBookings] = useState<Booking[]>([])
    const [activeTab, setActiveTab] = useState<FilterTab>('all')
    const [query, setQuery] = useState('')
    const { listBookings, loading } = useBookings()

    useEffect(() => {
        const loadBookings = async () => {
            const response = await listBookings()
            if (response) {
                setBookings(response as Booking[])
            }
        }
        loadBookings()
    }, [])

    const pendingPayments = useMemo(
        () => bookings.filter((b) => b.payment_status === 'pending'),
        [bookings]
    )

    const pendingStatus = useMemo(
        () => bookings.filter((b) => b.status === 'pending'),
        [bookings]
    )

    const tabFiltered = useMemo(() => {
        if (activeTab === 'pending_payment') return pendingPayments
        if (activeTab === 'pending_status') return pendingStatus
        return bookings
    }, [activeTab, bookings, pendingPayments, pendingStatus])

    const filteredBookings = useMemo(() => {
        if (!query.trim()) return tabFiltered
        const q = query.toLowerCase()
        return tabFiltered.filter(
            (b) =>
                b.lead_name?.toLowerCase().includes(q) ||
                b.email?.toLowerCase().includes(q) ||
                b.boat_tours?.title?.toLowerCase().includes(q)
        )
    }, [tabFiltered, query])

    if (loading) {
        return (
            <AdminLayout>
                <div className="p-6 text-center text-sm text-gray-500">
                    Loading bookings...
                </div>
            </AdminLayout>
        )
    }

    return (
        <AdminLayout>
            <div className="p-6 max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">Customer Bookings</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            {bookings.length} total bookings
                        </p>
                    </div>

                    <div className="relative w-full sm:w-72">
                        <svg
                            className="absolute left-3 top-2.5 h-4 w-4 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
                            />
                        </svg>
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search name, email, or tour"
                            className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300"
                        />
                    </div>
                </div>

                {/* Summary cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                        <p className="text-sm text-gray-500">Total Bookings</p>
                        <p className="text-2xl font-semibold text-gray-900 mt-1">{bookings.length}</p>
                    </div>
                    <button
                        onClick={() => setActiveTab(activeTab === 'pending_payment' ? 'all' : 'pending_payment')}
                        className={`rounded-xl shadow-sm border p-4 text-left transition ${
                            activeTab === 'pending_payment'
                                ? 'bg-amber-50 border-amber-300'
                                : 'bg-white border-gray-200 hover:bg-amber-50/50 hover:border-amber-200'
                        }`}
                    >
                        <p className="text-sm text-amber-700">Pending Payments</p>
                        <p className="text-2xl font-semibold text-amber-800 mt-1">
                            {pendingPayments.length}
                        </p>
                    </button>
                    <button
                        onClick={() => setActiveTab(activeTab === 'pending_status' ? 'all' : 'pending_status')}
                        className={`rounded-xl shadow-sm border p-4 text-left transition ${
                            activeTab === 'pending_status'
                                ? 'bg-orange-50 border-orange-300'
                                : 'bg-white border-gray-200 hover:bg-orange-50/50 hover:border-orange-200'
                        }`}
                    >
                        <p className="text-sm text-orange-700">Pending Status</p>
                        <p className="text-2xl font-semibold text-orange-800 mt-1">
                            {pendingStatus.length}
                        </p>
                    </button>
                </div>

                {/* Filter tabs */}
                <div className="flex gap-2 mb-4">
                    {(
                        [
                            { key: 'all', label: 'All Bookings' },
                            { key: 'pending_payment', label: 'Pending Payments' },
                            { key: 'pending_status', label: 'Pending Status' },
                        ] as { key: FilterTab; label: string }[]
                    ).map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`px-4 py-2 text-sm font-medium rounded-md border transition ${
                                activeTab === tab.key
                                    ? 'bg-gray-900 text-white border-gray-900'
                                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Table - desktop */}
                <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Customer
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tour
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tour Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Group Size
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Amount
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Payment
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredBookings.map((booking) => (
                                <tr key={booking.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <div className="font-medium text-gray-900">{booking.lead_name}</div>
                                        <div className="text-gray-500">{booking.email}</div>
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {booking.boat_tours?.title ?? '-'}
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(booking.booking_date).toLocaleDateString()}
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {booking.guest_count}
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        Rs. {Number(booking.total_price).toLocaleString()}
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Badge
                                            label={booking.payment_status}
                                            className={paymentBadge(booking.payment_status)}
                                        />
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Badge
                                            label={booking.status}
                                            className={statusBadgeStyle(booking.status)}
                                        />
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link
                                            href={`/lankalagoon-admin/bookings/${booking.id}`}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filteredBookings.length === 0 && (
                        <div className="text-center py-12 text-gray-500 text-sm">
                            No bookings found.
                        </div>
                    )}
                </div>

                {/* Cards - mobile */}
                <div className="md:hidden space-y-3">
                    {filteredBookings.map((booking) => (
                        <Link
                            key={booking.id}
                            href={`/lankalagoon-admin/bookings/${booking.id}`}
                            className="block bg-white rounded-xl shadow-sm border border-gray-200 p-4"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <p className="font-medium text-gray-900">{booking.lead_name}</p>
                                    <p className="text-sm text-gray-500">{booking.email}</p>
                                </div>
                                <p className="text-sm font-semibold text-gray-900 whitespace-nowrap">
                                    Rs. {Number(booking.total_price).toLocaleString()}
                                </p>
                            </div>

                            <div className="mt-3 text-sm text-gray-500">
                                {booking.boat_tours?.title ?? '-'} ·{' '}
                                {new Date(booking.booking_date).toLocaleDateString()} · {booking.guest_count} guests
                            </div>

                            <div className="mt-3 flex gap-2">
                                <Badge
                                    label={booking.payment_status}
                                    className={paymentBadge(booking.payment_status)}
                                />
                                <Badge
                                    label={booking.status}
                                    className={statusBadgeStyle(booking.status)}
                                />
                            </div>
                        </Link>
                    ))}

                    {filteredBookings.length === 0 && (
                        <div className="text-center py-12 text-gray-500 text-sm bg-white rounded-xl border border-gray-200">
                            No bookings found.
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    )
}