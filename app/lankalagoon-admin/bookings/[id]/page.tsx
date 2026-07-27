'use client'

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AdminLayout from "@/components/ui/AdminLayout";
import { useBookings } from "@/hooks/admin/useBookings";
import { Booking } from "@/lib/types/api/bookings";

export default function BookingDetails() {

    const { id } = useParams();

    const { getBookingById, confirmBooking, loading } = useBookings();

    const [booking, setBooking] = useState<Booking | null>(null);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [confirmSuccess, setConfirmSuccess] = useState(false);
    const [confirmError, setConfirmError] = useState<string | null>(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    useEffect(() => {
        async function load() {
            const data = await getBookingById(id as string);

            if (data) {
                setBooking(data);
            }
        }

        load();
    }, [id]);

    async function handleConfirm() {
        setShowConfirmModal(false)
        setConfirmLoading(true);
        setConfirmError(null);
        setConfirmSuccess(false);
        try {
            await confirmBooking(booking!.id);
            setConfirmSuccess(true);
            setBooking((prev) =>
                prev ? { ...prev, status: 'completed', payment_status: 'paid' } : prev
            );
        } catch (err) {
            setConfirmError(err instanceof Error ? err.message : 'Failed to confirm booking');
        } finally {
            setConfirmLoading(false);
        }
    }

    if (loading || !booking) {
        return (
            <AdminLayout>
                <div className="p-6">
                    Loading...
                </div>
            </AdminLayout>
        );
    }

    const canConfirm = booking.status !== 'completed' && booking.status !== 'cancelled';

    return (
        <AdminLayout>
            <div className="max-w-6xl mx-auto p-6 space-y-8">

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h1 className="text-3xl font-bold">
                        Booking #{booking.booking_number}
                    </h1>

                    {canConfirm && (
                        <button
                            onClick={() => setShowConfirmModal(true)}
                            disabled={confirmLoading}
                            className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {confirmLoading ? 'Confirming...' : 'Confirm Booking'}
                        </button>
                    )}

                    {confirmSuccess && (
                        <p className="text-sm text-emerald-700">
                            Booking confirmed and confirmation email sent to {booking.email}.
                        </p>
                    )}

                    {confirmError && (
                        <p className="text-sm text-red-600">{confirmError}</p>
                    )}
                </div>

                {/* Tour */}
                <div className="bg-white rounded-lg border p-6">
                    <h2 className="font-semibold text-lg mb-4">
                        Tour
                    </h2>

                    <p><strong>Tour:</strong> {booking.boat_tours?.title}</p>
                    <p><strong>Date:</strong> {booking.booking_date}</p>
                    <p><strong>Time:</strong> {booking.departure_time}</p>
                    <p><strong>Guests:</strong> {booking.guest_count}</p>
                    <p><strong>Total:</strong> Rs. {booking.total_price}</p>
                </div>

                {/* Contact */}
                <div className="bg-white rounded-lg border p-6">
                    <h2 className="font-semibold text-lg mb-4">
                        Lead Customer
                    </h2>

                    <p><strong>Name:</strong> {booking.lead_name}</p>
                    <p><strong>Email:</strong> {booking.email}</p>
                    <p><strong>Phone:</strong> {booking.phone}</p>

                    <p className="mt-4">
                        <strong>Remarks</strong>
                    </p>

                    <p>{booking.remarks || "-"}</p>
                </div>

                {/* Passengers */}
                <div className="bg-white rounded-lg border p-6">

                    <h2 className="font-semibold text-lg mb-4">
                        Passengers
                    </h2>

                    <table className="w-full border-collapse">

                        <thead>
                            <tr className="border-b">
                                <th className="text-left py-2">#</th>
                                <th className="text-left py-2">First Name</th>
                                <th className="text-left py-2">Last Name</th>
                                <th className="text-left py-2">Country</th>
                                <th className="text-left py-2">Lead</th>
                            </tr>
                        </thead>

                        <tbody>

                            {booking.booking_passengers?.map((passenger, index) => (

                                <tr
                                    key={passenger.id}
                                    className="border-b"
                                >
                                    <td className="py-3">{index + 1}</td>
                                    <td>{passenger.first_name}</td>
                                    <td>{passenger.last_name}</td>
                                    <td>{passenger.country}</td>
                                    <td>
                                        {passenger.is_lead ? "✅" : ""}
                                    </td>
                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

                {/* Status */}
                <div className="bg-white rounded-lg border p-6">

                    <h2 className="font-semibold text-lg mb-4">
                        Booking Status
                    </h2>

                    <p><strong>Status:</strong> {booking.status}</p>
                    <p><strong>Payment:</strong> {booking.payment_status}</p>

                </div>

            </div>

            {showConfirmModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/40" onClick={() => setShowConfirmModal(false)} />
                    <div className="relative bg-white rounded-xl shadow-xl border border-gray-200 max-w-md w-full p-6">
                        <h3 className="text-lg font-semibold text-gray-900">Confirm Booking</h3>
                        <p className="mt-2 text-sm text-gray-600">
                            Are you sure you want to confirm booking <span className="font-semibold text-gray-900">#{booking.booking_number}</span> for <span className="font-semibold text-gray-900">{booking.lead_name}</span>?
                        </p>
                        <p className="mt-2 text-sm text-gray-500">
                            The booking status will be updated to <span className="font-semibold text-gray-900">completed</span> and a confirmation email with payment details will be sent to <span className="font-semibold text-gray-900">{booking.email}</span>.
                        </p>
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={() => setShowConfirmModal(false)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirm}
                                disabled={confirmLoading}
                                className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {confirmLoading ? 'Confirming...' : 'Yes, Confirm'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}