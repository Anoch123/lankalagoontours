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
  "Trusted local tourism partners",
  "Easy online booking assistance",
  "Authentic Negombo lagoon experiences",
  "Support before and after your booking",
];

export const stats = [
  {
    value: "100%",
    label: "Local experiences",
  },
  {
    value: "Daily",
    label: "Tours available",
  },
  {
    value: "Negombo",
    label: "Lagoon destination",
  },
  {
    value: "Trusted",
    label: "Partner operators",
  },
];

export const route = [
  { label: "Canal", x: 40, y: 150 },
  { label: "Lagoon", x: 150, y: 60 },
  { label: "Marsh", x: 260, y: 130 },
];