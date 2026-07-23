"use client";


import { createBoatTour } from "@/services/admin/supabase-admin-boat-tour.service";
import { useState } from "react";


export function useBoatTours(){


const [loading,setLoading]=useState(false);



async function saveTour(data:any){

    try{

        setLoading(true);

        return await createBoatTour(data);

    }
    finally{

        setLoading(false);

    }

}



return {
    saveTour,
    loading
};

}