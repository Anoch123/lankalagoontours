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
    groupMin: 2,
    groupMax: 12,
    ageLevel: "All ages welcome",
    fitness: "Low — mostly seated",
    departureLocation: "Lanka Lagoon Jetty, Negombo",

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
    groupMin: 2,
    groupMax: 10,
    ageLevel: "All ages welcome",
    fitness: "Very low",
    departureLocation: "Lanka Lagoon Jetty, Negombo",

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
  },


  {
    id: "fishing-experience",
    title: "Traditional Fishing Village Experience",
    currency: "$",
    tagline: "Fishing · Culture · Local Life",
    description:
      "Experience the daily life of Negombo fishermen and traditional lagoon fishing methods.",
    duration: "3 hrs",
    price: 45,
    image: "/images/tours/fishing.jpg",

    type: "Cultural fishing tour",
    departures: "Morning departures",
    groupMin: 2,
    groupMax: 8,
    ageLevel: "All ages",
    fitness: "Low",
    departureLocation: "Negombo Fishing Harbour",

    summary:
      "Discover generations of fishing traditions with local guides who know the lagoon by heart.",

    details: [
      "Visit traditional fishing areas.",
      "Learn about lagoon fishing techniques.",
      "Meet local fishing families.",
    ],

    itinerary: [
      {
        title: "Fishing harbour",
        time: "0:00",
        copy:
          "Meet your guide and explore the fishing harbour.",
      },
      {
        title: "Lagoon fishing grounds",
        time: "1:00",
        copy:
          "Visit traditional fishing locations.",
      },
      {
        title: "Village return",
        time: "3:00",
        copy:
          "Return after experiencing local lagoon culture.",
      },
    ],

    included: [
      "Local guide",
      "Boat ride",
      "Safety equipment",
    ],

    gallery: [
      "/images/tours/fishing-1.jpg",
      "/images/tours/fishing-2.jpg",
    ],
  },


  {
    id: "bird-watching",
    title: "Negombo Lagoon Bird Watching Tour",
    currency: "$",
    tagline: "Birds · Nature · Photography",
    description:
      "Explore mangroves and wetlands where tropical birds gather.",
    duration: "2.5 hrs",
    price: 32,
    image: "/images/tours/birds.jpg",

    type: "Wildlife observation tour",
    departures: "06:00 daily",
    groupMin: 2,
    groupMax: 8,
    ageLevel: "Nature lovers",
    fitness: "Low",
    departureLocation: "Lanka Lagoon Jetty",

    summary:
      "A quiet morning journey through Negombo's bird-rich lagoon ecosystem.",

    details: [
      "Spot kingfishers, herons and migratory birds.",
      "Learn about lagoon ecosystems.",
      "Perfect for photographers.",
    ],

    itinerary: [
      {
        title: "Early departure",
        time: "0:00",
        copy:
          "Start before the lagoon becomes busy.",
      },
      {
        title: "Bird habitats",
        time: "1:00",
        copy:
          "Explore mangroves and shallow waters.",
      },
      {
        title: "Return",
        time: "2:30",
        copy:
          "Finish with unforgettable wildlife memories.",
      },
    ],

    included: [
      "Guide",
      "Binocular sharing",
      "Water",
    ],

    gallery: [
      "/images/tours/birds-1.jpg",
    ],
  },
];

// Shoreline / wave clip-path used on every card image
export const waveClip =
  "polygon(0% 0%, 100% 0%, 100% 88%, 92% 92%, 84% 88%, 76% 94%, 68% 88%, 60% 93%, 52% 88%, 44% 94%, 36% 88%, 28% 92%, 20% 88%, 12% 94%, 4% 88%, 0% 92%)";
