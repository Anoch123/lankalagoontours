import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/supabase-admin";
import { bookingSchema, bookingPassengerSchema } from "@/lib/validations/booking.schema";
import { sendBookingCustomerEmail, sendBookingAdminEmail, type BookingEmailData } from "@/lib/email";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const bookingPayload = bookingSchema.parse(body.booking);
        const passengersPayload = (body.passengers ?? []).map((passenger: unknown) => bookingPassengerSchema.parse(passenger));

        const supabase = createClient();

        const { data: booking, error: bookingError } = await supabase
            .from("bookings")
            .insert({
                booking_number: bookingPayload.booking_number,
                tour_id: bookingPayload.tour_id,
                booking_date: bookingPayload.booking_date,
                departure_time: bookingPayload.departure_time,
                guest_count: bookingPayload.guest_count,
                total_price: bookingPayload.total_price,
                lead_name: bookingPayload.lead_name,
                email: bookingPayload.email,
                phone: bookingPayload.phone,
                remarks: bookingPayload.remarks,
                status: bookingPayload.status,
                payment_status: bookingPayload.payment_status,
            })
            .select("id")
            .single();

        if (bookingError || !booking) {
            return NextResponse.json({ error: bookingError?.message || "Unable to create booking" }, { status: 400 });
        }

        const passengerRows = passengersPayload.map((passenger: { first_name: string; last_name: string; country: string }, index: number) => ({
            booking_id: booking.id,
            first_name: passenger.first_name,
            last_name: passenger.last_name,
            country: passenger.country,
            is_lead: index === 0,
        }));

        const { error: passengerError } = await supabase.from("booking_passengers").insert(passengerRows);

        if (passengerError) {
            return NextResponse.json({ error: passengerError.message || "Unable to save passengers" }, { status: 400 });
        }

        const { data: tour } = await supabase
            .from("boat_tours")
            .select("title, price, currency, duration")
            .eq("id", bookingPayload.tour_id)
            .single();

        const currency = tour?.currency ?? "LKR";

        const emailData: BookingEmailData = {
            bookingNumber: bookingPayload.booking_number,
            tourTitle: tour?.title ?? "Tour Booking",
            bookingDate: bookingPayload.booking_date,
            departureTime: bookingPayload.departure_time,
            guestCount: bookingPayload.guest_count,
            totalPrice: bookingPayload.total_price,
            currency,
            leadName: bookingPayload.lead_name,
            email: bookingPayload.email,
            phone: bookingPayload.phone,
            remarks: bookingPayload.remarks ?? "",
            status: bookingPayload.status,
            passengers: passengersPayload.map((p: { first_name: string; last_name: string; country: string; is_lead: boolean }) => ({
                firstName: p.first_name,
                lastName: p.last_name,
                country: p.country,
                isLead: p.is_lead,
            })),
        };

        const adminUrl = `${process.env.NEXT_PUBLIC_SITE_URL || ""}/lankalagoon-admin/bookings/${booking.id}`;

        const emailResults = await Promise.allSettled([
            sendBookingCustomerEmail(emailData),
            sendBookingAdminEmail(emailData, adminUrl),
        ]);

        const emailErrors = emailResults.filter((r) => r.status === "rejected").map((r) => (r as PromiseRejectedResult).reason);
        if (emailErrors.length > 0) {
            console.error("Booking email send failed", emailErrors);
        }

        return NextResponse.json({ success: true, booking });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unexpected error";
        return NextResponse.json({ error: message }, { status: 400 });
    }
}
