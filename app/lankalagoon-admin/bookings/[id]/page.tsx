'use client'

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AdminLayout from "@/components/ui/AdminLayout";
import { useBookings } from "@/hooks/admin/useBookings";
import { Booking } from "@/lib/types/api/bookings";

export default function BookingDetails() {

    const { id } = useParams();

    const { getBookingById, loading } = useBookings();

    const [booking, setBooking] = useState<Booking | null>(null);

    useEffect(() => {
        async function load() {
            const data = await getBookingById(id as string);

            if (data) {
                setBooking(data);
            }
        }

        load();
    }, [id]);

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

                <h1 className="text-3xl font-bold">
                    Booking #{booking.booking_number}
                </h1>

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
        </AdminLayout>
    );
}