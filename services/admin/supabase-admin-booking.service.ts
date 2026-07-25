import { createClient } from "@/lib/supabase/supabase";
import { Booking } from "@/lib/types/api/bookings";

export async function listCustomerBookings(): Promise<Booking[]> {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("bookings")
        .select(`
        *,
        boat_tours (
            id,
            title,
            slug
        ),
        booking_passengers (
            id,
            first_name,
            last_name,
            country,
            is_lead
        )
    `);

    if (error) throw error;

    return data ?? [];
}

export async function getBooking(id: string): Promise<Booking | null> {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("bookings")
        .select(`
            *,
            boat_tours(*),
            booking_passengers(*)
        `)
        .eq("id", id)
        .single();

    if (error) throw error;

    return data;
}