export interface ItineraryStop {
    title:string;
    time:string;
    copy:string;
}


export interface Package {

    id:string;

    title:string;

    currency:string;

    tagline:string;

    description:string;

    duration:string;

    price:number|string;

    image:string;

    tag:string;

    type:string;

    departures:string;

    groupMin:number|string;

    groupMax:number|string;

    ageLevel:string;

    fitness:string;

    departureLocation:string;

    summary:string;

    details:string[];

    itinerary:ItineraryStop[];

    included:string[];

    gallery:string[];
}