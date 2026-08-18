export interface Profile {
  role: string;
}

export interface AdminLoginResponse {
  profile: Profile;
}

export interface StatCard {
  label: string
  value: string
  change: string
  positive: boolean
  icon: string
}

export interface AdminLink {
  href: string
  label: string
  icon: string
}

export interface ItineraryStop {
    title: string
    time: string
    copy: string
}

export interface GuestPricing {
    guest_count: string
    price: string
}

export interface BoatTourForm {
    id: string
    title: string
    currency: string
    tagline: string
    description: string
    duration: string
    price: string
    image: string
    tag: string
    type: string
    departures: string
    departure_details: string
    group_min: string
    group_max: string
    age_level: string
    fitness: string
    departure_location: string
    summary: string
    details: string[]
    itinerary: ItineraryStop[]
    included: string[]
    gallery: string[]
    guest_pricing: GuestPricing[]
    status: string
}