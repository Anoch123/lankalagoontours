"use client";

import { useState } from "react";
import { getCustomersByBooking } from "@/services/admin/supabase-admin-customers.service";

export function useCustomers() {

    const [loading, setLoading] = useState(false);

    async function loadCustomers() {
        try {

            setLoading(true);
            return await getCustomersByBooking();

        } finally {
            setLoading(false);
        }

    }


    return {
        loadCustomers,
        loading,
    };
}