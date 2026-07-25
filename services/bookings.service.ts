import { createClient } from "@/lib/supabase/supabase";
import { BookingPassengerPayload, BookingPayload, bookingPassengerSchema, bookingSchema } from "@/lib/validations/booking.schema";

export async function createBooking(payload: BookingPayload, passengers: BookingPassengerPayload[]) {
    const supabase = createClient();

    const validatedBooking = bookingSchema.parse(payload);
    const validatedPassengers = passengers.map((passenger) => bookingPassengerSchema.parse(passenger));

    const { data: booking, error: bookingError } = await supabase
        .from("bookings")
        .insert({
            booking_number: validatedBooking.booking_number,
            tour_id: validatedBooking.tour_id,
            booking_date: validatedBooking.booking_date,
            departure_time: validatedBooking.departure_time,
            guest_count: validatedBooking.guest_count,
            total_price: validatedBooking.total_price,
            lead_name: validatedBooking.lead_name,
            email: validatedBooking.email,
            phone: validatedBooking.phone,
            remarks: validatedBooking.remarks,
            status: validatedBooking.status,
            payment_status: validatedBooking.payment_status,
        })
        .select("id")
        .single();

    if (bookingError || !booking) {
        throw bookingError ?? new Error("Failed to create booking");
    }

    const passengerRows = validatedPassengers.map((passenger, index) => ({
        booking_id: booking.id,
        first_name: passenger.first_name,
        last_name: passenger.last_name,
        country: passenger.country,
        is_lead: index === 0,
    }));

    const { error: passengerError } = await supabase
        .from("booking_passengers")
        .insert(passengerRows);

    if (passengerError) {
        throw passengerError;
    }

    return booking;
}
