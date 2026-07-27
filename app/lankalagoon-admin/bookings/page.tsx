'use client'

import { useEffect, useMemo, useState } from 'react'
import AdminLayout from '@/components/ui/AdminLayout'
import { Badge, paymentBadge, statusBadgeStyle } from '@/components/ui/status-badge'
import { Booking } from '@/lib/types/api/bookings'
import { useBookings } from '@/hooks/admin/useBookings'
import Link from 'next/link'

type FilterTab = 'all' | 'pending_payment' | 'pending_status' | 'booking_completed' | 'booking_cancelled' | 'payment_paid'
type ConfirmState = Record<string, { loading: boolean; success: boolean; error: string }>

export default function AdminBookings() {
    const [bookings, setBookings] = useState<Booking[]>([])
    const [activeTab, setActiveTab] = useState<FilterTab>('all')
    const [query, setQuery] = useState('')
    const [confirmState, setConfirmState] = useState<ConfirmState>({})
    const [confirmBookingId, setConfirmBookingId] = useState<string | null>(null)
    const { listBookings, confirmBooking, loading } = useBookings()

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

    const completedBookings = useMemo(
        () => bookings.filter((b) => b.status === 'completed'),
        [bookings]
    )

    const cancelledBookings = useMemo(
        () => bookings.filter((b) => b.status === 'cancelled'),
        [bookings]
    )

    const paidPayments = useMemo(
        () => bookings.filter((b) => b.payment_status === 'paid'),
        [bookings]
    )

    const tabFiltered = useMemo(() => {
        if (activeTab === 'pending_payment') return pendingPayments
        if (activeTab === 'pending_status') return pendingStatus
        if (activeTab === 'booking_completed') return completedBookings
        if (activeTab === 'booking_cancelled') return cancelledBookings
        if (activeTab === 'payment_paid') return paidPayments
        return bookings
    }, [activeTab, bookings, pendingPayments, pendingStatus, completedBookings, cancelledBookings, paidPayments])

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

    async function openConfirm(booking: Booking) {
        setConfirmBookingId(booking.id)
    }

    async function handleConfirm(booking: Booking) {
        setConfirmBookingId(null)
        setConfirmState((prev) => ({
            ...prev,
            [booking.id]: { loading: true, success: false, error: '' },
        }))
        try {
            await confirmBooking(booking.id)
            setConfirmState((prev) => ({
                ...prev,
                [booking.id]: { loading: true, success: true, error: '' },
            }))
            setBookings((prev) =>
                prev.map((b) =>
                    b.id === booking.id
                        ? { ...b, status: 'completed', payment_status: 'paid' }
                        : b
                )
            )
            setTimeout(() => {
                setConfirmState((prev) => {
                    const next = { ...prev }
                    delete next[booking.id]
                    return next
                })
            }, 3000)
        } catch (err) {
            setConfirmState((prev) => ({
                ...prev,
                [booking.id]: {
                    loading: false,
                    success: false,
                    error: err instanceof Error ? err.message : 'Failed to confirm booking',
                },
            }))
            setTimeout(() => {
                setConfirmState((prev) => {
                    const next = { ...prev }
                    delete next[booking.id]
                    return next
                })
            }, 5000)
        }
    }

    const selectedBooking = confirmBookingId ? bookings.find(b => b.id === confirmBookingId) : null

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
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
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
                    <button
                        onClick={() => setActiveTab(activeTab === 'booking_completed' ? 'all' : 'booking_completed')}
                        className={`rounded-xl shadow-sm border p-4 text-left transition ${
                            activeTab === 'booking_completed'
                                ? 'bg-emerald-50 border-emerald-300'
                                : 'bg-white border-gray-200 hover:bg-emerald-50/50 hover:border-emerald-200'
                        }`}
                    >
                        <p className="text-sm text-emerald-700">Booking Completed</p>
                        <p className="text-2xl font-semibold text-emerald-800 mt-1">
                            {completedBookings.length}
                        </p>
                    </button>
                    <button
                        onClick={() => setActiveTab(activeTab === 'booking_cancelled' ? 'all' : 'booking_cancelled')}
                        className={`rounded-xl shadow-sm border p-4 text-left transition ${
                            activeTab === 'booking_cancelled'
                                ? 'bg-red-50 border-red-300'
                                : 'bg-white border-gray-200 hover:bg-red-50/50 hover:border-red-200'
                        }`}
                    >
                        <p className="text-sm text-red-700">Booking Cancelled</p>
                        <p className="text-2xl font-semibold text-red-800 mt-1">
                            {cancelledBookings.length}
                        </p>
                    </button>
                    <button
                        onClick={() => setActiveTab(activeTab === 'payment_paid' ? 'all' : 'payment_paid')}
                        className={`rounded-xl shadow-sm border p-4 text-left transition ${
                            activeTab === 'payment_paid'
                                ? 'bg-blue-50 border-blue-300'
                                : 'bg-white border-gray-200 hover:bg-blue-50/50 hover:border-blue-200'
                        }`}
                    >
                        <p className="text-sm text-blue-700">Payment Paid</p>
                        <p className="text-2xl font-semibold text-blue-800 mt-1">
                            {paidPayments.length}
                        </p>
                    </button>
                </div>

                {/* Filter tabs */}
                <style jsx>{`
                    .scrollbar-hide::-webkit-scrollbar { display: none; }
                    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
                `}</style>
                <div className="md:hidden -mx-6 px-6 mb-4">
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {(
                            [
                                { key: 'all', label: 'All' },
                                { key: 'pending_payment', label: 'Pending Payments' },
                                { key: 'pending_status', label: 'Pending Status' },
                                { key: 'booking_completed', label: 'Completed' },
                                { key: 'booking_cancelled', label: 'Cancelled' },
                                { key: 'payment_paid', label: 'Payment Paid' },
                            ] as { key: FilterTab; label: string }[]
                        ).map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`px-3 py-1.5 text-xs font-medium rounded-full border transition whitespace-nowrap ${
                                    activeTab === tab.key
                                        ? 'bg-gray-900 text-white border-gray-900'
                                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="hidden md:flex gap-2 mb-4">
                    {(
                        [
                            { key: 'all', label: 'All Bookings' },
                            { key: 'pending_payment', label: 'Pending Payments' },
                            { key: 'pending_status', label: 'Pending Status' },
                            { key: 'booking_completed', label: 'Booking Completed' },
                            { key: 'booking_cancelled', label: 'Booking Cancelled' },
                            { key: 'payment_paid', label: 'Payment Paid' },
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
                <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200">
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
                            {filteredBookings.map((booking) => {
                                const state = confirmState[booking.id];
                                const canConfirm = booking.status !== 'completed' && booking.status !== 'cancelled';

                                return (
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
                                            <div className="flex items-center justify-end gap-3">
                                                {canConfirm && (
                                                    <button
                                                        onClick={() => openConfirm(booking)}
                                                        disabled={state?.loading}
                                                        className="text-emerald-600 hover:text-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        {state?.success
                                                            ? 'Confirmed'
                                                            : state?.loading
                                                                ? 'Confirming...'
                                                                : 'Confirm'}
                                                    </button>
                                                )}
                                                {state?.error && (
                                                    <span className="text-xs text-red-600">{state.error}</span>
                                                )}
                                                <Link
                                                    href={`/lankalagoon-admin/bookings/${booking.id}`}
                                                    className="text-blue-600 hover:text-blue-800"
                                                >
                                                    View
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
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
                    {filteredBookings.map((booking) => {
                        const state = confirmState[booking.id];
                        const canConfirm = booking.status !== 'completed' && booking.status !== 'cancelled';

                        return (
                            <div
                                key={booking.id}
                                className="bg-white rounded-xl shadow-sm border border-gray-200 p-4"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0 flex-1">
                                        <p className="font-medium text-gray-900 truncate">{booking.lead_name}</p>
                                        <p className="text-sm text-gray-500 truncate">{booking.email}</p>
                                    </div>
                                    <p className="text-sm font-semibold text-gray-900 whitespace-nowrap shrink-0">
                                        Rs. {Number(booking.total_price).toLocaleString()}
                                    </p>
                                </div>

                                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500">
                                    <span className="truncate">{booking.boat_tours?.title ?? '-'}</span>
                                    <span className="text-gray-300">|</span>
                                    <span className="whitespace-nowrap">{new Date(booking.booking_date).toLocaleDateString()}</span>
                                    <span className="text-gray-300">|</span>
                                    <span className="whitespace-nowrap">{booking.guest_count} guests</span>
                                </div>

                                <div className="mt-3 flex flex-wrap items-center gap-2">
                                    <Badge
                                        label={booking.payment_status}
                                        className={paymentBadge(booking.payment_status)}
                                    />
                                    <Badge
                                        label={booking.status}
                                        className={statusBadgeStyle(booking.status)}
                                    />
                                </div>

                                <div className="mt-3 flex flex-wrap items-center gap-3">
                                    {canConfirm && (
                                        <button
                                            onClick={() => openConfirm(booking)}
                                            disabled={state?.loading}
                                            className="text-sm text-emerald-600 hover:text-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {state?.success
                                                ? 'Confirmed'
                                                : state?.loading
                                                    ? 'Confirming...'
                                                    : 'Confirm'}
                                        </button>
                                    )}
                                    {state?.error && (
                                        <span className="text-xs text-red-600">{state.error}</span>
                                    )}
                                    <Link
                                        href={`/lankalagoon-admin/bookings/${booking.id}`}
                                        className="text-sm text-blue-600 hover:text-blue-800"
                                    >
                                        View
                                    </Link>
                                </div>
                            </div>
                        );
                    })}

                    {filteredBookings.length === 0 && (
                        <div className="text-center py-12 text-gray-500 text-sm bg-white rounded-xl border border-gray-200">
                            No bookings found.
                        </div>
                    )}
                </div>
            </div>

            {selectedBooking && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/40" onClick={() => setConfirmBookingId(null)} />
                    <div className="relative bg-white rounded-xl shadow-xl border border-gray-200 max-w-md w-full p-6">
                        <h3 className="text-lg font-semibold text-gray-900">Confirm Booking</h3>
                        <p className="mt-2 text-sm text-gray-600">
                            Are you sure you want to confirm booking <span className="font-semibold text-gray-900">#{selectedBooking.booking_number}</span> for <span className="font-semibold text-gray-900">{selectedBooking.lead_name}</span>?
                        </p>
                        <p className="mt-2 text-sm text-gray-500">
                            The booking status will be updated to <span className="font-semibold text-gray-900">completed</span> and a confirmation email with payment details will be sent to <span className="font-semibold text-gray-900">{selectedBooking.email}</span>.
                        </p>
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={() => setConfirmBookingId(null)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleConfirm(selectedBooking)}
                                className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700"
                            >
                                Yes, Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    )
}