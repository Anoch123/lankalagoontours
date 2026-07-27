"use client";

import { useState, useEffect } from "react";
import type { StatCard } from "@/lib/types/api/admin";

export function useDashboardStats() {
    const [stats, setStats] = useState<StatCard[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadStats() {
            try {
                const response = await fetch("/api/admin/stats");
                if (!response.ok) {
                    throw new Error(`API request failed with status ${response.status}`);
                }
                const data = await response.json();
                setStats([
                    data.ordersThisMonth,
                    data.revenue,
                    data.newCustomers,
                    data.totalBookings,
                ]);
            } catch (err) {
                const message = err instanceof Error ? err.message : "Failed to load stats";
                setError(message);
                console.error("Failed to load dashboard stats", err);
            } finally {
                setLoading(false);
            }
        }
        loadStats();
    }, []);

    return { stats, loading, error };
}