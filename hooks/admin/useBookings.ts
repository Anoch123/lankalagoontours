"use client";

import { getBooking, listCustomerBookings } from "@/services/admin/supabase-admin-booking-read.service";
import { useState } from "react";

export function useBookings() {
    const [loading, setLoading] = useState(false);

    async function listBookings() {
        try {
            setLoading(true);
            return await listCustomerBookings();
        }
        finally {
            setLoading(false);
        }
    }

    async function getBookingById(id: string) {
        try {
            setLoading(true);
            return await getBooking(id);
        } finally {
            setLoading(false);
        }
    }

    async function confirmBooking(bookingId: string, confirmOnly = false, paymentReceived?: boolean, commissionReceived?: boolean) {
        const response = await fetch(`/api/bookings/${bookingId}/confirm`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                confirm_only: confirmOnly,
                payment_received_from_customer: paymentReceived,
                commission_received_from_partner: commissionReceived,
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || "Failed to confirm booking");
        }

        return response.json();
    }

    async function savePaymentTracking(bookingId: string, paymentReceived: boolean, commissionReceived: boolean) {
        const response = await fetch(`/api/bookings/${bookingId}/payment-tracking`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                payment_received_from_customer: paymentReceived,
                commission_received_from_partner: commissionReceived,
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || "Failed to save payment tracking");
        }

        return response.json();
    }

    return {
        listBookings,
        getBookingById,
        confirmBooking,
        savePaymentTracking,
        loading
    };
}