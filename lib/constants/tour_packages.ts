import { Package } from "../types/tour_packages"

export const packages: Package[] = [
  {
    id: "negombo-lagoon",
    title: "Negombo Lagoon Sunrise Paddle",
    currency: "$",
    tagline: "Kayak · Birdwatching",
    description:
      "Glide through still mangrove channels as stilt fishermen take their posts and the lagoon wakes up around you.",
    duration: "2 hrs",
    price: 40,
    image:
      "https://images.unsplash.com/photo-1596395463022-b1988b8a9a1d?auto=format&fit=crop&w=900&q=80",
    tag: "Most booked",
  },
  {
    id: "bentota-river",
    title: "Bentota River Safari",
    currency: "$",
    tagline: "Wildlife · Riverboat",
    description:
      "A slow boat past cinnamon islands and monitor lizards, ending where the river meets the open sea.",
    duration: "2 hrs",
    price: 65,
    image:
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "madu-ganga",
    title: "Madu Ganga Mangrove Expedition",
    currency: "$",
    tagline: "Mangroves · Island hopping",
    description:
      "Weave between 64 tiny islands, visit a mangrove-bark workshop, and stop for tea on a floating restaurant.",
    duration: "2 hrs",
    price: 35,
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "yala-lagoon",
    title: "Yala Lagoon & Leopard Trail",
    currency: "$",
    tagline: "Safari · Big cats",
    description:
      "Track leopards and elephants at dawn, then cool off at a lagoon thick with painted storks and pelicans.",
    duration: "3 hrs",
    price: 18,
    image:
      "https://images.unsplash.com/photo-1547970810-dc1eac37d174?auto=format&fit=crop&w=900&q=80",
    tag: "New",
  },
  {
    id: "galle-fort",
    title: "Galle Fort Heritage Walk",
    currency: "$",
    tagline: "Culture · Coastal town",
    description:
      "Cobbled ramparts, Dutch colonial facades, and a lighthouse walk with the Indian Ocean on every side.",
    duration: "4 hrs",
    price: 30,
    image:
      "https://images.unsplash.com/photo-1591983662620-395c052d4c99?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "sigiriya",
    title: "Sigiriya & Cultural Triangle",
    currency: "$",
    tagline: "Ancient sites · Highlands",
    description:
      "Climb the lion's rock fortress, walk Dambulla's cave temples, and end among Kandy's hill-country tea gardens.",
    duration: "5 hrs",
    price: 31,
    image:
      "https://images.unsplash.com/photo-1586183189334-1a5b0f0d9d3f?auto=format&fit=crop&w=900&q=80",
  },
];

// Shoreline / wave clip-path used on every card image
export const waveClip =
  "polygon(0% 0%, 100% 0%, 100% 88%, 92% 92%, 84% 88%, 76% 94%, 68% 88%, 60% 93%, 52% 88%, 44% 94%, 36% 88%, 28% 92%, 20% 88%, 12% 94%, 4% 88%, 0% 92%)";
