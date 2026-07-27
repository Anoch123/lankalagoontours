import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/supabase-admin";
import { sendContactAdminEmail, sendContactCustomerEmail, type ContactEmailData } from "@/lib/email";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, phone, country, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 });
        }

        const supabase = createClient();

        const { data: contactMessage, error: insertError } = await supabase
            .from("contact_messages")
            .insert({
                name,
                email,
                phone: phone || "",
                country: country || "",
                message,
            })
            .select("id")
            .single();

        if (insertError || !contactMessage) {
            return NextResponse.json({ error: insertError?.message || "Unable to save message" }, { status: 400 });
        }

        const emailData: ContactEmailData = {
            name,
            email,
            phone: phone || "",
            country: country || "",
            message,
        };

        const emailResults = await Promise.allSettled([
            sendContactAdminEmail(emailData),
            sendContactCustomerEmail(emailData),
        ]);

        const emailErrors = emailResults.filter((r) => r.status === "rejected").map((r) => (r as PromiseRejectedResult).reason);
        if (emailErrors.length > 0) {
            console.error("Contact email send failed", emailErrors);
        }

        return NextResponse.json({ success: true, id: contactMessage.id });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unexpected error";
        return NextResponse.json({ error: message }, { status: 400 });
    }
}