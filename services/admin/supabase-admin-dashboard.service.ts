import { createClient } from "@/lib/supabase/supabase-admin";
import type { Booking } from "@/lib/types/api/bookings";

function getMonthRange() {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
    return { startOfMonth, endOfMonth };
}

function getLastMonthRange() {
    const now = new Date();
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);
    return { startOfLastMonth, endOfLastMonth };
}

export async function getDashboardStats() {
    const supabase = createClient();
    const { startOfMonth, endOfMonth } = getMonthRange();
    const { startOfLastMonth, endOfLastMonth } = getLastMonthRange();

    const thisMonthBookings = await supabase
        .from("bookings")
        .select("id, total_price, booking_passengers(id)")
        .gte("created_at", startOfMonth.toISOString())
        .lte("created_at", endOfMonth.toISOString());

    const lastMonthBookings = await supabase
        .from("bookings")
        .select("id, total_price, booking_passengers(id)")
        .gte("created_at", startOfLastMonth.toISOString())
        .lte("created_at", endOfLastMonth.toISOString());

    const totalBookings = await supabase
        .from("bookings")
        .select("id", { count: "exact", head: true });

    const thisMonthCount = thisMonthBookings.data?.length ?? 0;
    const lastMonthCount = lastMonthBookings.data?.length ?? 0;
    const thisMonthTotal = thisMonthBookings.data?.reduce((sum, b) => sum + Number(b.total_price ?? 0), 0) ?? 0;
    const lastMonthTotal = lastMonthBookings.data?.reduce((sum, b) => sum + Number(b.total_price ?? 0), 0) ?? 0;

    const thisMonthCustomerIds = new Set(
        thisMonthBookings.data?.flatMap((b: Booking) => b.booking_passengers?.map((p) => p.id) ?? [])
    );
    const lastMonthCustomerIds = new Set(
        lastMonthBookings.data?.flatMap((b: Booking) => b.booking_passengers?.map((p) => p.id) ?? [])
    );

    const thisMonthCust = thisMonthCustomerIds.size;
    const lastMonthCust = lastMonthCustomerIds.size;
    const totalCount = totalBookings.count ?? 0;

    function pctChange(current: number, previous: number) {
        if (previous === 0) return current > 0 ? "+100%" : "0%";
        const val = ((current - previous) / previous) * 100;
        const sign = val >= 0 ? "+" : "";
        return `${sign}${Math.round(val)}%`;
    }

    return {
        ordersThisMonth: {
            label: "Orders this month",
            value: String(thisMonthCount),
            change: pctChange(thisMonthCount, lastMonthCount),
            positive: thisMonthCount >= lastMonthCount,
            icon: "📦",
        },
        revenue: {
            label: "Revenue",
            value: `LKR ${(thisMonthTotal / 1000).toFixed(1)}K`,
            change: pctChange(thisMonthTotal, lastMonthTotal),
            positive: thisMonthTotal >= lastMonthTotal,
            icon: "💵",
        },
        newCustomers: {
            label: "New customers",
            value: String(thisMonthCust),
            change: pctChange(thisMonthCust, lastMonthCust),
            positive: thisMonthCust >= lastMonthCust,
            icon: "👥",
        },
        totalBookings: {
            label: "Total Bookings",
            value: String(totalCount),
            change: "",
            positive: true,
            icon: "👕",
        },
    };
}