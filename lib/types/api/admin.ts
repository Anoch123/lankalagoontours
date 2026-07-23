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
  groupMin: string
  groupMax: string
  ageLevel: string
  fitness: string
  departureLocation: string
  summary: string
  details: string[]
  itinerary: ItineraryStop[]
  included: string[]
  gallery: string[]
}