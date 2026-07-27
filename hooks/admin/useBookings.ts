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

    async function confirmBooking(bookingId: string) {
        const response = await fetch(`/api/bookings/${bookingId}/confirm`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({}),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || "Failed to confirm booking");
        }

        return response.json();
    }

    return {
        listBookings,
        getBookingById,
        confirmBooking,
        loading
    };
}