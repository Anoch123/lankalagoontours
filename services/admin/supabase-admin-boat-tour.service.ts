import { createClient } from "@/lib/supabase/supabase";
import { Package } from "@/lib/types/api/tour_packages";

function buildSupabasePayload(tour: Package) {
    const payload = {
        slug: tour.id,
        title: tour.title,
        currency: tour.currency,
        tagline: tour.tagline,
        description: tour.description,
        duration: tour.duration,
        price: Number(tour.price),
        image: tour.image,
        tag: tour.tag,
        type: tour.type,
        departures: tour.departures,
        departure_details: tour.departure_details,
        group_min: Number(tour.group_min),
        group_max: Number(tour.group_max),
        age_level: tour.age_level,
        fitness: tour.fitness,
        departure_location: tour.departure_location,
        summary: tour.summary,
        details: tour.details,
        itinerary: tour.itinerary,
        included: tour.included,
        gallery: tour.gallery,
        status: tour.status,
    };

    return payload;
}

export async function createBoatTour(tour: Package) {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("boat_tours")
        .insert(buildSupabasePayload(tour))
        .select()
        .single();

    if (error) {
        throw error;
    }

    return data;
}

export async function listBoatTours(): Promise<Package[]> {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("boat_tours")
        .select("*");

    if (error) throw error;

    return data ?? [];
}

export async function getBoatTourDetails(id: string): Promise<Package | null> {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("boat_tours")
        .select("*")
        .eq("slug", id)
        .maybeSingle();

    if (error) throw error;

    if (data) {
        return data as Package;
    }

    const fallback = await supabase
        .from("boat_tours")
        .select("*")
        .eq("id", id)
        .maybeSingle();

    if (fallback.error) throw fallback.error;

    return (fallback.data as Package | null) ?? null;
}

export async function updateBoatTourDetails(id: string, tour: Package) {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("boat_tours")
        .update(buildSupabasePayload(tour))
        .eq("id", id)
        .select()
        .single();

    if (error) {
        throw error;
    }

    return {
        success: true,
        message: "Boat tour updated successfully",
        data: data,
    };;
}