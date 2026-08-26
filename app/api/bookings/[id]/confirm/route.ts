import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/supabase-admin";
import { sendBookingConfirmationEmail, type BookingEmailData } from "@/lib/email";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = createClient();

    const { data: booking, error: fetchError } = await supabase
        .from("bookings")
        .select(
            `
            *,
            boat_tours (id, title, slug, currency),
            booking_passengers (id, first_name, last_name, country, is_lead)
        `
        )
        .eq("id", id)
        .single();

    if (fetchError || !booking) {
        return NextResponse.json(
            { error: fetchError?.message || "Booking not found" },
            { status: 404 }
        );
    }

    const body = await request.json().catch(() => ({}));
    const confirmOnly = body.confirm_only === true;
    const paymentReceived = body.payment_received_from_customer;
    const commissionReceived = body.commission_received_from_partner;

    const updateData: Record<string, unknown> = {};

    if (confirmOnly) {
      updateData.email_sent = true;
    } else {
      if (typeof paymentReceived === "boolean") {
        updateData.payment_received_from_customer = paymentReceived;
      }
      if (typeof commissionReceived === "boolean") {
        updateData.commission_received_from_partner = commissionReceived;
      }

      if (paymentReceived && commissionReceived) {
        updateData.status = "completed";
        updateData.payment_status = "paid";
      }
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ success: true, updated: false });
    }

    const { error: updateError } = await supabase
      .from("bookings")
      .update(updateData)
      .eq("id", id);

    if (updateError) {
      return NextResponse.json(
        { error: updateError.message || "Failed to update booking" },
        { status: 400 }
      );
    }

    if (confirmOnly && booking.email) {
      const tour = booking.boat_tours as { title?: string; currency?: string } | null;
      const currency = tour?.currency ?? "LKR";

      const emailData: BookingEmailData = {
        bookingNumber: booking.booking_number,
        tourTitle: tour?.title ?? "Tour Booking",
        bookingDate: booking.booking_date,
        departureTime: booking.departure_time,
        guestCount: booking.guest_count,
        totalPrice: booking.needs_tuk_tuk ? booking.total_price + 1500 : booking.total_price,
        baseTotalPrice: booking.needs_tuk_tuk ? booking.total_price : booking.total_price,
        currency,
        leadName: booking.lead_name,
        email: booking.email,
        phone: booking.phone,
        remarks: booking.remarks ?? "",
        needsTukTuk: booking.needs_tuk_tuk ?? false,
        status: "confirmed",
        passengers: (booking.booking_passengers ?? []).map((p: { first_name: string; last_name: string; country: string; is_lead: boolean }) => ({
          firstName: p.first_name,
          lastName: p.last_name,
          country: p.country,
          isLead: p.is_lead,
        })),
      };

      try {
        await sendBookingConfirmationEmail(emailData);
      } catch (emailError) {
        console.error("Booking confirmation email failed", emailError);
      }
    }

    return NextResponse.json({ success: true, completed: !confirmOnly && paymentReceived && commissionReceived });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
