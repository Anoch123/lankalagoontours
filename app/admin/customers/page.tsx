"use client";

import { useEffect, useMemo, useState } from "react";
import AdminLayout from "@/components/ui/AdminLayout";
import { useCustomers } from "@/hooks/admin/useCustomers";
import { BookingCustomerGroup } from "@/lib/types/api/bookings";

const statusStyles: Record<string, string> = {
    confirmed: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    pending: "bg-amber-50 text-amber-700 ring-amber-600/20",
    cancelled: "bg-red-50 text-red-700 ring-red-600/20",
    completed: "bg-sky-50 text-sky-700 ring-sky-600/20",
};

function statusStyle(status: string) {
    return statusStyles[status?.toLowerCase()] ?? "bg-gray-100 text-gray-700 ring-gray-500/20";
}

function initials(first: string, last: string) {
    return `${first?.[0] ?? ""}${last?.[0] ?? ""}`.toUpperCase();
}

export default function AdminCustomers() {
    const [bookedCustomers, setBookedCustomers] = useState<BookingCustomerGroup[]>([]);
    const [query, setQuery] = useState("");
    const { loadCustomers, loading } = useCustomers();

    useEffect(() => {
        const loadBookedCustomers = async () => {
            const response = await loadCustomers();
            if (response) {
                setBookedCustomers(response as BookingCustomerGroup[]);
            }
        };

        loadBookedCustomers();
    }, []);

    const filtered = useMemo(() => {
        if (!query.trim()) return bookedCustomers;
        const q = query.toLowerCase();
        return bookedCustomers.filter((booking) => {
            const matchesBookingNumber = booking.booking.booking_number
                ?.toString()
                .toLowerCase()
                .includes(q);
            const matchesPassenger = booking.passengers.some((p) =>
                `${p.first_name} ${p.last_name}`.toLowerCase().includes(q)
            );
            return matchesBookingNumber || matchesPassenger;
        });
    }, [bookedCustomers, query]);

    const totalPassengers = bookedCustomers.reduce(
        (sum, b) => sum + b.passengers.length,
        0
    );

    return (
        <AdminLayout>
            <div className="p-6 max-w-6xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Booked Customers
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            {bookedCustomers.length} bookings · {totalPassengers} passengers
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
                            placeholder="Search booking # or passenger"
                            className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300"
                        />
                    </div>
                </div>

                {loading && (
                    <div className="rounded-xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
                        Loading customers…
                    </div>
                )}

                {!loading && filtered.length === 0 && (
                    <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center">
                        <p className="text-sm font-medium text-gray-900">
                            No bookings match that search
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                            Try a different booking number or passenger name.
                        </p>
                    </div>
                )}

                <div className="space-y-4">
                    {filtered.map((booking, index) => {
                        const status = booking.booking.status ?? "";
                        const lead = booking.passengers.find((p) => p.is_lead);

                        return (
                            <div
                                key={booking.booking_id || `booking-${index}`}
                                className="rounded-xl border border-gray-200 bg-white overflow-hidden"
                            >
                                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm font-semibold text-gray-900">
                                            Booking #{booking.booking.booking_number}
                                        </span>
                                        <span
                                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${statusStyle(
                                                status
                                            )}`}
                                        >
                                            {status.charAt(0).toUpperCase() + status.slice(1)}
                                        </span>
                                    </div>

                                    <span className="text-sm text-gray-500">
                                        {booking.passengers.length}{" "}
                                        {booking.passengers.length === 1 ? "passenger" : "passengers"}
                                    </span>
                                </div>

                                <div className="divide-y divide-gray-100">
                                    {booking.passengers.map((passenger, passengerIndex) => (
                                        <div
                                            key={passenger.id || `${booking.booking_id}-${passengerIndex}`}
                                            className="flex items-center justify-between px-5 py-3"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-900 text-xs font-medium text-white">
                                                    {initials(passenger.first_name, passenger.last_name)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {passenger.first_name} {passenger.last_name}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {passenger.country}
                                                    </p>
                                                </div>
                                            </div>

                                            {passenger.is_lead && (
                                                <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-700 bg-blue-50 px-2 py-1 rounded-full ring-1 ring-inset ring-blue-600/20">
                                                    Lead passenger
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {lead && (
                                    <div className="px-5 py-2.5 bg-gray-50 text-xs text-gray-500">
                                        Contact: {lead.first_name} {lead.last_name} · {lead.country}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </AdminLayout>
    );
}