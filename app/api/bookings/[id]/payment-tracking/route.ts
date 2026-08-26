import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/supabase-admin";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = createClient();

    const body = await request.json();
    const { payment_received_from_customer, commission_received_from_partner } = body as {
      payment_received_from_customer?: boolean;
      commission_received_from_partner?: boolean;
    };

    const { data: booking, error: fetchError } = await supabase
      .from("bookings")
      .select("id")
      .eq("id", id)
      .single();

    if (fetchError || !booking) {
      return NextResponse.json(
        { error: fetchError?.message || "Booking not found" },
        { status: 404 }
      );
    }

    const updateData: Record<string, boolean> = {};
    if (typeof payment_received_from_customer === "boolean") {
      updateData.payment_received_from_customer = payment_received_from_customer;
    }
    if (typeof commission_received_from_partner === "boolean") {
      updateData.commission_received_from_partner = commission_received_from_partner;
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
        { error: updateError.message || "Failed to update payment tracking" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, updated: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
