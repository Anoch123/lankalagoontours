import { NextResponse } from "next/server";
import { getDashboardStats } from "@/services/admin/supabase-admin-dashboard.service";

export async function GET() {
    try {
        const stats = await getDashboardStats();
        return NextResponse.json(stats);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unexpected error";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}