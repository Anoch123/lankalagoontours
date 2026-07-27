import { createClient } from "@/lib/supabase/supabase";

export async function getContactForms() {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("contact_messages")
        .select(`*`)
        .order("created_at", { ascending: false });

    if (error) {
        throw error;
    }

    return data ?? [];
}