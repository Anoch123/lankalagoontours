import { Fraunces, Work_Sans, JetBrains_Mono } from "next/font/google";

export const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["600", "900"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});
export const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-work-sans",
});
export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-jetbrains",
});

export const credentials = [
  "Licensed & insured",
  "Family-run since 2010",
  "Highly Experienced guides",
];

export const stats = [
  { value: "15+", label: "Years on the water" },
  { value: "9,000+", label: "Tours run" },
  { value: "12", label: "Local crew" },
];

export const route = [
  { label: "Canal", x: 40, y: 150 },
  { label: "Lagoon", x: 150, y: 60 },
  { label: "Marsh", x: 260, y: 130 },
];