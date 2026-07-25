import { createClient } from "@/lib/supabase/supabase";

export async function getCustomersByBooking() {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("booking_passengers")
        .select(`
            id,
            first_name,
            last_name,
            country,
            is_lead,
            booking_id,
            booking:bookings (
                booking_number,
                booking_date,
                status
            ),
            bookings (
                booking_number,
                booking_date,
                status
            )
        `)
        .order("booking_id");

    if (error) {
        throw error;
    }

    // Group passengers by booking_id
    const grouped = data.reduce((acc: Record<string, any>, passenger: any) => {
        const bookingId = passenger.booking_id;

        if (!acc[bookingId]) {
            acc[bookingId] = {
                booking_id: bookingId,
                booking: passenger.bookings,
                passengers: []
            };
        }

        acc[bookingId].passengers.push({
            id: passenger.id,
            first_name: passenger.first_name,
            last_name: passenger.last_name,
            country: passenger.country,
            is_lead: passenger.is_lead
        });

        return acc;
    }, {});

    return Object.values(grouped);
}