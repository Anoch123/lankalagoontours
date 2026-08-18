import { Package } from "../types/api/tour_packages"

export const packages: Package[] = [
  {
    id: "negombo-lagoon",
    title: "Lanka Lagoon Mangrove & Wildlife Cruise",
    currency: "$",
    tagline: "Mangroves · Wildlife · Fishing Village",
    description:
      "A slow drift through Negombo's lagoon, canals and mangrove channels.",
    duration: "3 hrs",
    price: 35,
    image: "/images/tours/mangrove.jpg",
    tag: "Most booked",

    type: "Shared motorboat tour",
    departures: "06:30 & 15:30 daily",
    group_min: 2,
    group_max: 12,
    age_level: "All ages welcome",
    fitness: "Low — mostly seated",
    departure_location: "Lanka Lagoon Jetty, Negombo",
    departure_details: "Please arrive 15 minutes before departure. The tour departs from the Lanka Lagoon Jetty, located at the end of the Negombo Lagoon Road.",
    status: "ACTIVE",
    summary:
      "Glide out from the fishing jetty at first light, thread the old Dutch canal, and drift into mangrove channels where the lagoon does most of the talking.",

    details: [
      "We push off from the jetty while the stilt fishermen are still out and the lagoon is glass-flat.",
      "Explore narrow mangrove waterways where kingfishers, painted storks and water monitors can be spotted.",
      "Return past the fish market while local boats bring in the day's catch.",
    ],

    itinerary: [
      {
        title: "Depart the jetty",
        time: "0:00",
        copy:
          "Board at Lanka Lagoon Jetty and set off along calm morning waters.",
      },
      {
        title: "Dutch Canal & fishing village",
        time: "0:20",
        copy:
          "Pass drying nets, fishing boats and the daily rhythm of lagoon life.",
      },
      {
        title: "Mangrove channels",
        time: "1:10",
        copy:
          "Slow cruise through mangroves searching for birds and wildlife.",
      },
      {
        title: "Return to jetty",
        time: "3:00",
        copy:
          "Finish your lagoon adventure back at the departure point.",
      },
    ],

    included: [
      "Life jackets",
      "Safety briefing",
      "English-speaking guide",
      "Bottled water",
      "Hotel pickup within Negombo",
    ],

    gallery: [
      "/images/tours/mangrove-1.jpg",
      "/images/tours/mangrove-2.jpg",
      "/images/tours/mangrove-3.jpg",
    ],
    guest_pricing: [],
  },
  {
    id: "sunset-lagoon",
    title: "Negombo Lagoon Sunset Cruise",
    currency: "$",
    tagline: "Sunset · Photography · Relaxation",
    description:
      "Watch the lagoon transform into golden colours as fishing boats return home.",
    duration: "2 hrs",
    price: 30,
    image: "/images/tours/sunset.jpg",
    tag: "Popular",

    type: "Private sunset boat tour",
    departures: "16:30 daily",
    status: "INACTIVE",
    group_min: 2,
    group_max: 10,
    age_level: "All ages welcome",
    fitness: "Very low",
    departure_location: "Lanka Lagoon Jetty, Negombo",
    departure_details: "Please arrive 15 minutes before departure. The tour departs from the Lanka Lagoon Jetty, located at the end of the Negombo Lagoon Road.",
    summary:
      "A peaceful evening cruise across Negombo lagoon as the sun disappears behind coconut palms.",

    details: [
      "Cruise through calm waters during the golden hour.",
      "Capture fishermen returning home and birds settling for the night.",
      "Enjoy a quiet tropical sunset away from busy beaches.",
    ],

    itinerary: [
      {
        title: "Leave the jetty",
        time: "0:00",
        copy: "Begin the evening cruise across the lagoon.",
      },
      {
        title: "Fishing village route",
        time: "0:30",
        copy:
          "See traditional fishing boats and village life.",
      },
      {
        title: "Sunset viewpoint",
        time: "1:20",
        copy:
          "Stop at the best lagoon viewpoint for sunset photos.",
      },
      {
        title: "Return",
        time: "2:00",
        copy:
          "Cruise back under the evening sky.",
      },
    ],

    included: [
      "Boat and skipper",
      "Life jackets",
      "Drinking water",
      "Photography stops",
    ],

    gallery: [
      "/images/tours/sunset-1.jpg",
      "/images/tours/sunset-2.jpg",
    ],
    guest_pricing: [],
  },
];

// Shoreline / wave clip-path used on every card image
export const waveClip =
  "polygon(0% 0%, 100% 0%, 100% 88%, 92% 92%, 84% 88%, 76% 94%, 68% 88%, 60% 93%, 52% 88%, 44% 94%, 36% 88%, 28% 92%, 20% 88%, 12% 94%, 4% 88%, 0% 92%)";