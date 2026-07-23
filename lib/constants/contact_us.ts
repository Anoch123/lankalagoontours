import { Oswald } from "next/font/google";

export const oswald = Oswald({
    weight: ["500", "700"],
    subsets: ["latin"],
});

export const TOUR_INTERESTS = [
    "Mangrove Tour",
    "Sunset Tour",
    "Fishing Tour",
    "Bird Watching",
    "Custom Tour",
    "Not sure yet",
] as const;