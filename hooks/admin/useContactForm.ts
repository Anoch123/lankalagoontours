"use client";

import { getContactForms } from "@/services/admin/supabase-admin-contact-form.service";
import { useState } from "react";

export function useContactForms() {

    const [loading, setLoading] = useState(false);

    async function loadContactForms() {
        try {

            setLoading(true);
            return await getContactForms();

        } finally {
            setLoading(false);
        }

    }


    return {
        loadContactForms,
        loading,
    };
}