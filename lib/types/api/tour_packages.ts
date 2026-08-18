export interface ItineraryStop {
    title:string;
    time:string;
    copy:string;
}
export interface GuestPricing {
    guest_count:number;
    price:number;
}
export interface Package {
    id:string;
    title:string;
    currency:string;
    tagline:string;
    description:string;
    duration:string;
    price:number;
    image:string;
    tag:string;
    type:string;
    departures:string;
    departure_details:string;
    group_min:number;
    group_max:number;
    age_level:string;
    fitness:string;
    departure_location:string;
    summary:string;
    details:string[];
    itinerary:ItineraryStop[];
    included:string[];
    gallery:string[];
    guest_pricing:GuestPricing[];
    status:string;
}