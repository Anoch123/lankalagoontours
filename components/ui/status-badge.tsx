import { Booking } from '@/lib/types/api/bookings'

export const paymentBadge = (status: Booking['payment_status']) => {
    switch (status) {
        case 'paid':
            return 'bg-emerald-50 text-emerald-700 ring-emerald-600/20'
        case 'pending':
            return 'bg-amber-50 text-amber-700 ring-amber-600/20'
        case 'failed':
            return 'bg-red-50 text-red-700 ring-red-600/20'
        case 'refunded':
            return 'bg-gray-100 text-gray-700 ring-gray-500/20'
        default:
            return 'bg-gray-100 text-gray-700 ring-gray-500/20'
    }
}

export const statusBadgeStyle = (status: Booking['status']) => {
    switch (status) {
        case 'confirmed':
            return 'bg-emerald-50 text-emerald-700 ring-emerald-600/20'
        case 'pending':
            return 'bg-amber-50 text-amber-700 ring-amber-600/20'
        case 'cancelled':
            return 'bg-red-50 text-red-700 ring-red-600/20'
        case 'completed':
            return 'bg-sky-50 text-sky-700 ring-sky-600/20'
        default:
            return 'bg-gray-100 text-gray-700 ring-gray-500/20'
    }
}

export function Badge({ label, className }: { label: string; className: string }) {
    return (
        <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${className}`}
        >
            {label}
        </span>
    )
}
