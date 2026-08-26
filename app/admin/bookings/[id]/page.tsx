'use client'

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AdminLayout from "@/components/ui/AdminLayout";
import { useBookings } from "@/hooks/admin/useBookings";
import { Booking } from "@/lib/types/api/bookings";

export default function BookingDetails() {

    const { id } = useParams();

    const { getBookingById, confirmBooking, savePaymentTracking, loading } = useBookings();

    const [booking, setBooking] = useState<Booking | null>(null);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [confirmSuccess, setConfirmSuccess] = useState(false);
    const [confirmError, setConfirmError] = useState<string | null>(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [confirmAction, setConfirmAction] = useState<"confirm" | "complete" | null>(null);
    const [paymentReceived, setPaymentReceived] = useState(false);
    const [commissionReceived, setCommissionReceived] = useState(false);
    const [saveLoading, setSaveLoading] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [saveError, setSaveError] = useState<string | null>(null);

    useEffect(() => {
        async function load() {
            const data = await getBookingById(id as string);

            if (data) {
                setBooking(data);
                setPaymentReceived(data.payment_received_from_customer ?? false);
                setCommissionReceived(data.commission_received_from_partner ?? false);
            }
        }

        load();
    }, [id]);

    const canComplete = booking?.status !== 'completed' && booking?.status !== 'cancelled';
    const bothChecked = paymentReceived && commissionReceived;
    const emailSent = booking?.email_sent ?? false;

    async function reloadBooking() {
        const data = await getBookingById(id as string);
        if (data) {
            setBooking(data);
            setPaymentReceived(data.payment_received_from_customer ?? false);
            setCommissionReceived(data.commission_received_from_partner ?? false);
        }
    }

    async function handleConfirm() {
        setShowConfirmModal(false)
        setConfirmLoading(true);
        setConfirmError(null);
        setConfirmSuccess(false);
        try {
            if (confirmAction === "complete") {
                await confirmBooking(booking!.id, false, paymentReceived, commissionReceived);
                setConfirmSuccess(true);
                await reloadBooking();
            } else {
                await confirmBooking(booking!.id, true);
                setConfirmSuccess(true);
                await reloadBooking();
            }
        } catch (err) {
            setConfirmError(err instanceof Error ? err.message : 'Failed to confirm booking');
        } finally {
            setConfirmLoading(false);
            setConfirmAction(null);
        }
    }

    async function handleSavePaymentTracking() {
        setSaveLoading(true);
        setSaveError(null);
        setSaveSuccess(false);
        try {
            await savePaymentTracking(booking!.id, paymentReceived, commissionReceived);
            setSaveSuccess(true);
            await reloadBooking();
            setTimeout(() => setSaveSuccess(false), 3000);
        } catch (err) {
            setSaveError(err instanceof Error ? err.message : 'Failed to save payment tracking');
        } finally {
            setSaveLoading(false);
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

    return (
        <AdminLayout>
            <div className="max-w-6xl mx-auto p-6 space-y-8">

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h1 className="text-3xl font-bold">
                        Booking #{booking.booking_number}
                    </h1>

                    <div className="flex items-center gap-3">
                        {!emailSent && (
                            <>
                                <button
                                    onClick={() => { setConfirmAction("confirm"); setShowConfirmModal(true); }}
                                    disabled={confirmLoading}
                                    className="inline-flex items-center justify-center rounded-lg bg-[#0f2e2c] px-4 py-2 text-sm font-medium text-white hover:bg-[#0f2e2c]/90 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {confirmLoading ? 'Sending...' : 'Send Confirmation'}
                                </button>
                            </>
                        )}

                        {canComplete && (
                            <>
                                <button
                                    onClick={() => { setConfirmAction("complete"); setShowConfirmModal(true); }}
                                    disabled={confirmLoading || !bothChecked}
                                    className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {confirmLoading ? 'Processing...' : 'Mark as Completed'}
                                </button>
                            </>
                        )}

                        {canComplete && emailSent && (
                            <span className="text-sm text-gray-500">Confirmation email already sent</span>
                        )}

                        {!canComplete && (
                            <span className="text-sm text-gray-500">Booking {booking.status}</span>
                        )}

                        {confirmSuccess && (
                            <p className="text-sm text-emerald-700">
                                {confirmAction === "complete" ? 'Booking marked as completed.' : 'Confirmation email sent to customer.'}
                            </p>
                        )}

                        {confirmError && (
                            <p className="text-sm text-red-600">{confirmError}</p>
                        )}
                    </div>
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
                    <p><strong>Tuk Tuk:</strong> {booking.needs_tuk_tuk ? 'Yes (+LKR 1,500)' : 'No'}</p>
                    <p><strong>Total:</strong> Rs. {booking.needs_tuk_tuk ? booking.total_price + 1500 : booking.total_price}</p>
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

                {/* Payment Tracking */}
                <div className="bg-white rounded-lg border p-6">
                    <h2 className="font-semibold text-lg mb-4">
                        Payment Tracking
                    </h2>

                    <div className="space-y-4">
                        <label className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                checked={paymentReceived}
                                onChange={(e) => setPaymentReceived(e.target.checked)}
                                disabled={booking.status === 'completed'}
                                className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                            />
                            <div>
                                <span className="text-sm font-medium text-gray-900">Payment received from customer to tour partner</span>
                                <p className="text-xs text-gray-500">Check this when the customer has paid the tour partner directly.</p>
                            </div>
                        </label>

                        <label className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                checked={commissionReceived}
                                onChange={(e) => setCommissionReceived(e.target.checked)}
                                disabled={booking.status === 'completed'}
                                className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                            />
                            <div>
                                <span className="text-sm font-medium text-gray-900">Commission received from tour partner</span>
                                <p className="text-xs text-gray-500">Check this when you have received the commission from the tour partner.</p>
                            </div>
                        </label>
                    </div>

                    {saveSuccess && (
                        <p className="mt-3 text-sm text-emerald-700">Payment tracking saved.</p>
                    )}
                    {saveError && (
                        <p className="mt-3 text-sm text-red-600">{saveError}</p>
                    )}
                    <button
                        onClick={handleSavePaymentTracking}
                        disabled={saveLoading || booking.status === 'completed'}
                        className="mt-3 inline-flex items-center justify-center rounded-lg bg-[#0f2e2c] px-4 py-2 text-sm font-medium text-white hover:bg-[#0f2e2c]/90 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {saveLoading ? 'Saving...' : 'Save Payment Tracking'}
                    </button>

                    {!bothChecked && canComplete && (
                        <p className="mt-4 text-sm text-amber-600">
                            Both checkboxes must be checked before the tour can be marked as completed.
                        </p>
                    )}
                </div>

                {/* Status */}
                <div className="bg-white rounded-lg border p-6">

                    <h2 className="font-semibold text-lg mb-4">
                        Booking Status
                    </h2>

                    <p><strong>Status:</strong> {booking.status}</p>
                    <p><strong>Payment:</strong> {booking.payment_status}</p>
                    <p><strong>Paid to Partner:</strong> {booking.payment_received_from_customer ? 'Yes' : 'No'}</p>
                    <p><strong>Commission Received:</strong> {booking.commission_received_from_partner ? 'Yes' : 'No'}</p>
                    <p><strong>Confirmation Email Sent:</strong> {booking.email_sent ? 'Yes' : 'No'}</p>

                </div>

            </div>

            {showConfirmModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/40" onClick={() => { setShowConfirmModal(false); setConfirmAction(null); }} />
                    <div className="relative bg-white rounded-xl shadow-xl border border-gray-200 max-w-md w-full p-6">
                        <h3 className="text-lg font-semibold text-gray-900">
                            {confirmAction === "complete" ? "Mark Booking as Completed" : "Send Confirmation Email"}
                        </h3>
                        <p className="mt-2 text-sm text-gray-600">
                            {confirmAction === "complete" ? (
                                <>
                                    Are you sure you want to mark booking{" "}
                                    <span className="font-semibold text-gray-900">
                                        #{booking.booking_number}
                                    </span>{" "}
                                    for{" "}
                                    <span className="font-semibold text-gray-900">
                                        {booking.lead_name}
                                    </span>{" "}
                                    as completed?
                                </>
                            ) : (
                                <>
                                    Send confirmation email to{" "}
                                    <span className="font-semibold text-gray-900">
                                        {booking.email}
                                    </span>{" "}
                                    for booking{" "}
                                    <span className="font-semibold text-gray-900">
                                        #{booking.booking_number}
                                    </span>
                                    ?
                                </>
                            )}
                        </p>
                        {confirmAction === "complete" && (
                            <div className="mt-2 text-sm text-gray-500">
                                <p>Payment from customer: <span className={booking.payment_received_from_customer ? "text-emerald-600" : "text-red-600"}>{booking.payment_received_from_customer ? "Yes" : "No"}</span></p>
                                <p>Commission from partner: <span className={booking.commission_received_from_partner ? "text-emerald-600" : "text-red-600"}>{booking.commission_received_from_partner ? "Yes" : "No"}</span></p>
                            </div>
                        )}
                        <p className="mt-2 text-sm text-gray-500">
                            {confirmAction === "complete"
                                ? "The booking status will be updated to completed and payment status to paid."
                                : "A confirmation email with booking details will be sent to the customer."
                            }
                        </p>
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={() => { setShowConfirmModal(false); setConfirmAction(null); }}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirm}
                                disabled={confirmLoading || (confirmAction === "complete" && !bothChecked)}
                                className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {confirmLoading ? 'Processing...' : confirmAction === "complete" ? 'Yes, Mark as Completed' : 'Yes, Send Confirmation'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
