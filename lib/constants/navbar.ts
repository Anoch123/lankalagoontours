import { useEffect, useMemo, useRef, useState } from "react";

const MENU = [
    { label: "HOME", href: "/" },
    { label: "ABOUT US", href: "/about-us" },
    {
        label: "BOAT TOURS", href: "/boat-tours",
        children: [
            { label: "Mangrove Tour", href: "/boat-tours/mangrove-tour" },
            { label: "Sunset Tour", href: "/boat-tours/sunset-tour" },
            { label: "Fishing Tour", href: "/boat-tours/fishing-tour" },
            { label: "Bird Watching", href: "/boat-tours/bird-watching" },
            { label: "Custom Tour", href: "/boat-tours/custom-tour" },
        ],
    },
    { label: "GALLERY", href: "/gallery" },
    { label: "CONTACT US", href: "/contact-us" },
];

export { MENU };