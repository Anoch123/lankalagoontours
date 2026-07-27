"use client";

import { useState, useEffect } from "react";
import type { StatCard } from "@/lib/types/api/admin";

export function useDashboardStats() {
    const [stats, setStats] = useState<StatCard[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStats() {
            try {
                const response = await fetch("/api/admin/stats");
                if (response.ok) {
                    const data = await response.json();
                    setStats([
                        data.ordersThisMonth,
                        data.revenue,
                        data.newCustomers,
                        data.totalBookings,
                    ]);
                }
            } catch (err) {
                console.error("Failed to load dashboard stats", err);
            } finally {
                setLoading(false);
            }
        }
        loadStats();
    }, []);

    return { stats, loading };
}