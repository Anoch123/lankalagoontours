import { createClient } from "@/lib/supabase/supabase-admin";

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

    const thisMonthResult = await supabase
        .from("bookings")
        .select("id, total_price")
        .gte("created_at", startOfMonth.toISOString())
        .lte("created_at", endOfMonth.toISOString());

    if (thisMonthResult.error) throw thisMonthResult.error;

    const lastMonthResult = await supabase
        .from("bookings")
        .select("id, total_price")
        .gte("created_at", startOfLastMonth.toISOString())
        .lte("created_at", endOfLastMonth.toISOString());

    if (lastMonthResult.error) throw lastMonthResult.error;

    const paidThisMonthResult = await supabase
        .from("bookings")
        .select("id, total_price")
        .gte("created_at", startOfMonth.toISOString())
        .lte("created_at", endOfMonth.toISOString())
        .eq("payment_status", "paid");

    if (paidThisMonthResult.error) throw paidThisMonthResult.error;

    const paidLastMonthResult = await supabase
        .from("bookings")
        .select("id, total_price")
        .gte("created_at", startOfLastMonth.toISOString())
        .lte("created_at", endOfLastMonth.toISOString())
        .eq("payment_status", "paid");

    if (paidLastMonthResult.error) throw paidLastMonthResult.error;

    const totalResult = await supabase
        .from("bookings")
        .select("id", { count: "exact", head: true });

    if (totalResult.error) throw totalResult.error;

    const thisMonthBookings = thisMonthResult.data ?? [];
    const lastMonthBookings = lastMonthResult.data ?? [];
    const paidThisMonthBookings = paidThisMonthResult.data ?? [];
    const paidLastMonthBookings = paidLastMonthResult.data ?? [];

    const thisMonthCount = thisMonthBookings.length;
    const lastMonthCount = lastMonthBookings.length;
    const thisMonthTotal = paidThisMonthBookings.reduce((sum, b) => sum + Number(b.total_price ?? 0), 0);
    const lastMonthTotal = paidLastMonthBookings.reduce((sum, b) => sum + Number(b.total_price ?? 0), 0);

    const thisMonthBookingIds = new Set(thisMonthBookings.map((b) => b.id));
    const lastMonthBookingIds = new Set(lastMonthBookings.map((b) => b.id));

    let thisMonthCust = 0;
    let lastMonthCust = 0;

    if (thisMonthBookingIds.size > 0) {
        const thisMonthPassengers = await supabase
            .from("booking_passengers")
            .select("id")
            .in("booking_id", Array.from(thisMonthBookingIds));
        if (thisMonthPassengers.error) throw thisMonthPassengers.error;
        thisMonthCust = thisMonthPassengers.data?.length ?? 0;
    }

    if (lastMonthBookingIds.size > 0) {
        const lastMonthPassengers = await supabase
            .from("booking_passengers")
            .select("id")
            .in("booking_id", Array.from(lastMonthBookingIds));
        if (lastMonthPassengers.error) throw lastMonthPassengers.error;
        lastMonthCust = lastMonthPassengers.data?.length ?? 0;
    }
    const totalCount = totalResult.count ?? 0;

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
            value: `LKR ${thisMonthTotal.toLocaleString()}`,
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