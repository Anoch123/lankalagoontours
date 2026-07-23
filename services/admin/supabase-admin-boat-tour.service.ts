import { createClient } from "@/lib/supabase/supabase";
import { Package } from "@/lib/types/api/tour_packages";


export async function createBoatTour(
    tour:Package
){

    const supabase=createClient();


    const {data,error}=await supabase
        .from("boat_tours")
        .insert({

            slug:tour.id,

            title:tour.title,

            currency:tour.currency,

            tagline:tour.tagline,

            description:tour.description,

            duration:tour.duration,

            price:Number(tour.price),

            image:tour.image,

            tag:tour.tag,

            type:tour.type,

            departures:tour.departures,

            group_min:Number(tour.groupMin),

            group_max:Number(tour.groupMax),

            age_level:tour.ageLevel,

            fitness:tour.fitness,

            departure_location:
                tour.departureLocation,

            summary:tour.summary,

            details:tour.details,

            itinerary:tour.itinerary,

            included:tour.included,

            gallery:tour.gallery

        })
        .select()
        .single();



    if(error){
        throw error;
    }


    return data;
}