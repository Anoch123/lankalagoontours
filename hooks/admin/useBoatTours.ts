"use client";

import { createBoatTour, listBoatTours, getBoatTourDetails, updateBoatTourDetails } from "@/services/admin/supabase-admin-boat-tour.service";
import { useState } from "react";

export function useBoatTours() {
    const [loading, setLoading] = useState(false);

    async function saveTour(data: any) {
        try {
            setLoading(true);
            return await createBoatTour(data);
        }
        finally {
            setLoading(false);
        }
    }

    async function listTour() {
        try {
            setLoading(true);
            return await listBoatTours();
        }
        finally {
            setLoading(false);
        }
    }

    async function getBoatTour(id: string) {
        try {
            setLoading(true);
            return await getBoatTourDetails(id);
        }
        finally {
            setLoading(false);
        }
    }

    async function updateBoatTour(id: string, data: any) {
        try {
            setLoading(true);
            return await updateBoatTourDetails(id, data);
        }
        finally {
            setLoading(false);
        }
    }

    return {
        saveTour,
        listTour,
        getBoatTour,
        updateBoatTour,
        loading
    };

}