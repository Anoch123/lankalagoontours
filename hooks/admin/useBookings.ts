"use client";

import { getBooking, listCustomerBookings } from "@/services/admin/supabase-admin-booking.service";
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

    return {
        listBookings,
        getBookingById,
        loading
    };

}