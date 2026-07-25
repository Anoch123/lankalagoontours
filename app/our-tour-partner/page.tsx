"use client";

import { Oswald } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/ui/pageHero";
import Footer from "@/components/common/footer";
import { CERT_POINTS } from "@/lib/constants/about_us";
import { app_text_constants } from "@/lib/constants/text_const";

const oswald = Oswald({
    weight: ["500", "700"],
    subsets: ["latin"],
});

const CREDENTIALS = [
    {
        title: "Registered operator",
        body: "A licensed and authorised tourism service provider in Sri Lanka, operating boats, crews, and equipment to national standards.",
    },
    {
        title: "Local, lifelong knowledge",
        body: "Rohitha and his crew have worked Negombo Lagoon for years, reading its tides, channels, and wildlife patterns better than anyone.",
    },
    {
        title: "Safety-first crews",
        body: "Trained boat handlers who brief every guest, monitor weather and water conditions, and adjust routes when safety calls for it.",
    },
    {
        title: "Small, dedicated fleet",
        body: "A close-knit operation rather than a mass-tourism outfit — every tour is run by people who know the lagoon personally.",
    },
];

const CRUISES = [
    {
        time: "6:00 AM",
        name: "Sunrise Cruise",
        body: "Calm water, a cool morning breeze, and the lagoon's fishing boats setting out for the day. The quietest and best light for photos.",
    },
    {
        time: "8:00 AM",
        name: "Morning Lagoon Cruise",
        body: "A closer look at the mangrove channels, fishing villages, and the everyday rhythm of the lagoon as it wakes up.",
    },
    {
        time: "4:30 PM",
        name: "Sunset Cruise",
        body: "Two hours on the water as the light turns gold over the lagoon — a slower, more atmospheric way to end the day.",
    },
];

const PRICING = [
    { guests: "1–3 guests", price: "LKR 15,000" },
    { guests: "4 guests", price: "LKR 18,000" },
    { guests: "5 guests", price: "LKR 20,000" },
    { guests: "6 guests", price: "LKR 25,000" },
];

const WILDLIFE = [
    "Herons and egrets",
    "Kingfishers",
    "Cormorants",
    "Brahminy kites",
    "Bee-eaters",
    "Water monitors",
    "Mudskippers and crabs",
];

export default function OurTourPartner() {
    return (
        <div className="min-h-screen">
            <PageHero
                eyebrow="Who Runs The Boat"
                heading={[
                    "Our Tour",
                    <><span className="text-[#c9862f]">Partner</span></>,
                ]}
                description="Lanka Lagoon Tours handles your booking. Rohitha Boat Tours takes you out on the water."
                imageSrc="/images/hero1.webp"
            />

            {/* Intro */}
            <section className="mx-auto max-w-6xl px-6 py-20 sm:px-10 md:px-16">
                <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
                    <div className="overflow-hidden rounded-3xl bg-[#0f2e2c]/5">
                        <Image
                            src="/images/hero1.webp"
                            alt={app_text_constants.APP_NAME}
                            width={800}
                            height={600}
                            className="h-auto w-full object-cover"
                        />
                    </div>

                    <div>
                        <span className={`${oswald.className} text-xs font-medium tracking-[0.35em] text-[#a86c1f]`}>
                            MEET THE OPERATOR
                        </span>
                        <h2 className={`${oswald.className} mt-4 text-3xl font-bold tracking-tight text-[#0f2e2c] sm:text-4xl`}>
                            Rohitha Boat Tours
                        </h2>
                        <p className="mt-5 text-sm leading-relaxed text-[#0f2e2c]/70">
                            Rohitha Boat Tours is registered with the Sri Lanka Tourism Development
                            Authority and has been guiding guests across Negombo Lagoon for more
                            than two decades. Every trip is led by experienced boatmen who know
                            the waterways, the wildlife, and the traditions of the area.
                        </p>
                        <p className="mt-4 text-sm leading-relaxed text-[#0f2e2c]/70">
                            Boats run daily between 6:00 AM and 6:30 PM, and every private or
                            group cruise includes a complimentary fresh fruit platter — a small,
                            local touch while you take in the lagoon.
                        </p>
                    </div>
                </div>
            </section>

            {/* Cruise schedule */}
            <section className="bg-[#0f2e2c]/[0.03] py-20">
                <div className="mx-auto max-w-6xl px-6 sm:px-10 md:px-16">
                    <div className="mx-auto max-w-2xl text-center">
                        <span className={`${oswald.className} text-xs font-medium tracking-[0.35em] text-[#a86c1f]`}>
                            PICK YOUR TIME OF DAY
                        </span>
                        <h2 className={`${oswald.className} mt-4 text-3xl font-bold tracking-tight text-[#0f2e2c]`}>
                            Three cruises, one lagoon
                        </h2>
                        <p className="mt-3 text-sm text-[#0f2e2c]/60">
                            Every cruise runs for two hours.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-6 sm:grid-cols-3">
                        {CRUISES.map((c) => (
                            <div
                                key={c.name}
                                className="rounded-2xl border border-[#0f2e2c]/10 bg-white p-6"
                            >
                                <p className={`${oswald.className} text-sm font-semibold tracking-[0.15em] text-[#c9862f]`}>
                                    {c.time}
                                </p>
                                <h3 className={`${oswald.className} mt-2 text-lg font-semibold text-[#0f2e2c]`}>
                                    {c.name}
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-[#0f2e2c]/70">
                                    {c.body}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Wildlife & culture */}
            <section className="bg-[#0f2e2c]/[0.03] py-20">
                <div className="mx-auto max-w-6xl px-6 sm:px-10 md:px-16">
                    <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
                        <div>
                            <span className={`${oswald.className} text-xs font-medium tracking-[0.35em] text-[#a86c1f]`}>
                                ON THE WATER
                            </span>
                            <h2 className={`${oswald.className} mt-4 text-3xl font-bold tracking-tight text-[#0f2e2c]`}>
                                Wildlife of the lagoon
                            </h2>
                            <p className="mt-4 text-sm leading-relaxed text-[#0f2e2c]/70">
                                Negombo Lagoon is fringed by mangrove forests, small islands, and
                                palm-lined channels — a quieter side of Negombo, away from the
                                beaches and town. What you'll spot changes with the season, tide,
                                and time of day, but every trip shows a different slice of lagoon
                                life.
                            </p>
                            <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2">
                                {WILDLIFE.map((w) => (
                                    <li
                                        key={w}
                                        className="flex items-start gap-2 text-sm text-[#0f2e2c]/70"
                                    >
                                        <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-[#c9862f]" />
                                        {w}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <span className={`${oswald.className} text-xs font-medium tracking-[0.35em] text-[#a86c1f]`}>
                                LIFE ON THE LAGOON
                            </span>
                            <h2 className={`${oswald.className} mt-4 text-3xl font-bold tracking-tight text-[#0f2e2c]`}>
                                A glimpse of traditional Negombo
                            </h2>
                            <p className="mt-4 text-sm leading-relaxed text-[#0f2e2c]/70">
                                Fishing is still central to life on the lagoon. As you cruise
                                past, you'll see colourful boats, traditional nets, and families
                                working along the shore. Your guide can share the stories behind
                                the fishing community and why protecting this environment matters
                                to them.
                            </p>
                            <p className="mt-4 text-sm leading-relaxed text-[#0f2e2c]/70">
                                It's a quiet, memorable way to see Sri Lanka beyond the usual
                                sights — best paired with an early sunrise cruise for birdlife, or
                                a slower sunset cruise for atmosphere.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Credentials grid */}
            <section className="py-20">
                <div className="mx-auto max-w-6xl px-6 sm:px-10 md:px-16">
                    <div className="mx-auto max-w-2xl text-center">
                        <span className={`${oswald.className} text-xs font-medium tracking-[0.35em] text-[#a86c1f]`}>
                            WHY WE PARTNER WITH THEM
                        </span>
                        <h2 className={`${oswald.className} mt-4 text-3xl font-bold tracking-tight text-[#0f2e2c]`}>
                            Built on the water, not a brochure
                        </h2>
                    </div>

                    <div className="mt-12 grid gap-6 sm:grid-cols-2">
                        {CREDENTIALS.map((c) => (
                            <div
                                key={c.title}
                                className="rounded-2xl border border-[#0f2e2c]/10 bg-white p-6"
                            >
                                <h3 className={`${oswald.className} text-lg font-semibold text-[#0f2e2c]`}>
                                    {c.title}
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-[#0f2e2c]/70">
                                    {c.body}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How the partnership works */}
            <section className="mx-auto max-w-4xl px-6 py-20 sm:px-10 md:px-16">
                <span className={`${oswald.className} block text-center text-xs font-medium tracking-[0.35em] text-[#a86c1f]`}>
                    HOW IT WORKS
                </span>
                <h2 className={`${oswald.className} mt-4 text-center text-3xl font-bold tracking-tight text-[#0f2e2c]`}>
                    Two teams, one trip
                </h2>

                <div className="mt-10 grid gap-6 sm:grid-cols-2">
                    <div className="rounded-2xl border border-[#0f2e2c]/10 bg-white p-6">
                        <p className={`${oswald.className} text-sm font-semibold tracking-[0.15em] text-[#c9862f]`}>
                            LANKA LAGOON TOURS
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-[#0f2e2c]/70">
                            Your booking, your questions, your confirmation. We&rsquo;re the team
                            you reach before your tour, and the ones who make sure Rohitha Boat Tours
                            has everything they need to look after you on the day.
                        </p>
                    </div>
                    <div className="rounded-2xl border border-[#0f2e2c]/10 bg-white p-6">
                        <p className={`${oswald.className} text-sm font-semibold tracking-[0.15em] text-[#c9862f]`}>
                            Rohitha Boat Tours
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-[#0f2e2c]/70">
                            The boat, the crew, the route, the moment you spot a kingfisher in the
                            mangroves. Everything from the jetty onward is run by them, start to
                            finish.
                        </p>
                    </div>
                </div>
            </section>

            {/* SLTDA certification */}
            <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
                <div className="grid items-center gap-12 lg:grid-cols-2">
                    <div>
                        <span
                            className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#c99a3e]"
                            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                        >
                            Certified Operator
                        </span>

                        <h2
                            className="mt-3 text-[26px] font-semibold text-[#0f2e2c] sm:text-[32px]"
                            style={{ fontFamily: "var(--font-fraunces)" }}
                        >
                            Certified by the Sri Lanka Tourism Development Authority (SLTDA)
                        </h2>

                        <ul className="mt-8 space-y-4">
                            {CERT_POINTS.map((point) => (
                                <li key={point} className="flex items-start gap-3">
                                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#c99a3e]/15 text-[#c99a3e]">
                                        <svg viewBox="0 0 16 16" className="h-3 w-3" aria-hidden="true">
                                            <path
                                                d="M3 8.5l3 3 7-7"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </span>
                                    <span
                                        className="text-[15px] leading-relaxed text-[#0f2e2c]/70"
                                        style={{ fontFamily: "var(--font-work-sans)" }}
                                    >
                                        {point}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex justify-center lg:justify-end">
                        <div className="rounded-full">
                            <div className="relative overflow-hidden rounded-full sm:h-56 sm:w-56">
                                <Image
                                    src="/images/sltda_logo.png"
                                    alt="SLTDA Certificate"
                                    fill
                                    className="object-contain p-6"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}