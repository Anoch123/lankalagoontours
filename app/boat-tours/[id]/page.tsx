"use client";

import Footer from "@/components/common/footer";
import PageHero from "@/components/ui/pageHero";
import Image from "next/image";
import { useBoatTours } from "@/hooks/admin/useBoatTours";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Package } from "@/lib/types/api/tour_packages";
import { Clock, Users, Banknote, Activity, MapPin, Check } from "lucide-react";

export default function BoatTours() {
    const [tour, setTour] = useState<Package | null>(null);
    const { getBoatTour } = useBoatTours();
    const params = useParams();

    const quickFacts = [
        { icon: Clock, label: "Duration", value: tour?.duration },
        { icon: Users, label: "Group size", value: `${tour?.group_min}–${tour?.group_max} guests` },
        { icon: Banknote, label: "From", value: `${tour?.currency} ${tour?.price} / person` },
        { icon: Activity, label: "Fitness", value: "Low" },
    ];

    useEffect(() => {

        async function load() {
            const tourId = params.id as string | undefined;

            if (!tourId) {
                return;
            }

            const data = await getBoatTour(tourId);

            setTour(data);

        }

        load();

    }, [params.id]);
    return (
        <main className="bg-[#FAF7F1] text-[#23231F]">
            <PageHero
                eyebrow="Reserve your spot"
                heading={["Book a ", <span key="accent" className="italic text-[#B68A4E]">Lagoon Tour</span>]}
                description="Choose your route, pick a time, and we'll have the boat ready at the jetty."
                imageSrc="/images/hero1.webp"
            />

            {/* ---------------- QUICK FACTS — floats over hero/content seam ---------------- */}
            <div className="relative z-10 mx-auto -mt-14 max-w-6xl px-6 sm:px-10">
                <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[#0E3A3B]/10 bg-[#0E3A3B]/10 shadow-[0_20px_50px_-20px_rgba(14,58,59,0.35)] sm:grid-cols-4">
                    {quickFacts.map(({ icon: Icon, label, value }) => (
                        <div key={label} className="flex items-center gap-3 bg-[#FAF7F1] px-6 py-6">
                            <Icon className="h-5 w-5 shrink-0 text-[#B68A4E]" strokeWidth={1.5} aria-hidden />
                            <div>
                                <p className="text-[11px] uppercase tracking-[0.12em] text-[#23231F]/50">
                                    {label}
                                </p>
                                <p className="mt-0.5 font-[family-name:var(--font-display)] text-base text-[#0E3A3B]">
                                    {value}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ---------------- MAIN: content + sticky booking card ---------------- */}
            <section className="mx-auto max-w-6xl px-6 py-20 sm:px-10">
                <div className="grid gap-16 lg:grid-cols-12">
                    {/* Left column — content */}
                    <div className="lg:col-span-7">
                        <p className="flex items-center gap-2 text-sm text-[#23231F]/60">
                            <MapPin className="h-4 w-4 text-[#B68A4E]" strokeWidth={1.5} aria-hidden />
                            {tour?.departure_location}
                        </p>
                        <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl leading-[1.1] text-[#0E3A3B] sm:text-5xl">
                            {tour?.title}
                        </h1>
                        <p className="mt-4 max-w-xl text-lg text-[#23231F]/70">{tour?.tagline}</p>

                        <div className="mt-10 space-y-4 text-[16px] leading-relaxed text-[#23231F]/80">
                            {(Array.isArray(tour?.description) ? tour?.description : [tour?.description]).map((p, i) => (
                                <p key={i}>{p}</p>
                            ))}
                        </div>

                        {/* Itinerary */}
                        <div className="mt-16">
                            <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#0E3A3B]">
                                Your route
                            </h2>
                            <div className="relative mt-8">
                                <div
                                    aria-hidden
                                    className="absolute left-[15px] top-2 bottom-2 w-px bg-[#0E3A3B]/12"
                                />
                                <div className="space-y-9">
                                    {tour?.itinerary.map((stop) => (
                                        <div key={stop.title} className="relative flex gap-6 pl-0">
                                            <span className="relative z-10 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#0E3A3B]/20 bg-[#FAF7F1] text-xs text-[#0E3A3B]">
                                                {stop.time}
                                            </span>
                                            <div>
                                                <p className="font-[family-name:var(--font-display)] text-lg text-[#0E3A3B]">
                                                    {stop.title}
                                                </p>
                                                <p className="mt-1 text-[15px] text-[#23231F]/70">{stop.copy}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* What's included */}
                        <div className="mt-16">
                            <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#0E3A3B]">
                                What's included
                            </h2>
                            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                                {tour?.included.map((item) => (
                                    <li key={item} className="flex items-start gap-3 text-[15px] text-[#23231F]/80">
                                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#7E9C8F]" strokeWidth={2} aria-hidden />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Gallery */}
                        <div className="mt-16">
                            <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#0E3A3B]">
                                Gallery
                            </h2>
                            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                                {tour?.gallery.map((src, i) => (
                                    <div
                                        key={src}
                                        className={`relative aspect-[4/3] overflow-hidden rounded-xl ${i === 0 ? "col-span-2 row-span-2 aspect-square sm:aspect-[4/3.4]" : ""
                                            }`}
                                    >
                                        <Image
                                            src={src}
                                            alt={`${tour?.title} — photo ${i + 1}`}
                                            fill
                                            className="object-cover transition duration-500 hover:scale-105"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right column — sticky booking card */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-24 rounded-2xl border border-[#0E3A3B]/10 bg-white p-8 shadow-[0_20px_50px_-25px_rgba(14,58,59,0.3)]">
                            <p className="font-[family-name:var(--font-display)] text-3xl text-[#0E3A3B]">
                                {tour?.currency} {tour?.price}
                                <span className="text-base font-normal text-[#23231F]/50"> / person</span>
                            </p>
                            <p className="mt-1 text-sm text-[#23231F]/60">
                                {tour?.type} · {tour?.duration}
                            </p>

                            <div className="mt-6 space-y-4">
                                <div>
                                    <label
                                        htmlFor="tour-date"
                                        className="block text-xs uppercase tracking-[0.1em] text-[#23231F]/50"
                                    >
                                        Date
                                    </label>
                                    <input
                                        id="tour-date"
                                        type="date"
                                        className="mt-2 w-full rounded-lg border border-[#0E3A3B]/15 bg-[#FAF7F1] px-4 py-3 text-sm text-[#23231F] outline-none focus-visible:ring-2 focus-visible:ring-[#B68A4E]"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="tour-time"
                                        className="block text-xs uppercase tracking-[0.1em] text-[#23231F]/50"
                                    >
                                        Departure
                                    </label>
                                    <select
                                        id="tour-time"
                                        className="mt-2 w-full appearance-none rounded-lg border border-[#0E3A3B]/15 bg-[#FAF7F1] px-4 py-3 text-sm text-[#23231F] outline-none focus-visible:ring-2 focus-visible:ring-[#B68A4E]"
                                    >
                                        <option>06:30</option>
                                        <option>15:30</option>
                                    </select>
                                </div>

                                <div>
                                    <label
                                        htmlFor="tour-guests"
                                        className="block text-xs uppercase tracking-[0.1em] text-[#23231F]/50"
                                    >
                                        Guests
                                    </label>
                                    <select
                                        id="tour-guests"
                                        className="mt-2 w-full appearance-none rounded-lg border border-[#0E3A3B]/15 bg-[#FAF7F1] px-4 py-3 text-sm text-[#23231F] outline-none focus-visible:ring-2 focus-visible:ring-[#B68A4E]"
                                    >
                                        {Array.from({ length: (tour?.group_max ?? 0) - (tour?.group_min ?? 0) + 1 }, (_, i) => i + (tour?.group_min ?? 0)).map(
                                            (n) => (
                                                <option key={n} value={n}>
                                                    {n} {n === 1 ? "guest" : "guests"}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>
                            </div>

                            <button
                                type="button"
                                className="mt-7 w-full rounded-lg bg-[#0E3A3B] py-3.5 text-sm font-medium tracking-wide text-[#FAF7F1] transition hover:bg-[#0E3A3B]/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B68A4E]"
                            >
                                Reserve a seat
                            </button>

                            <p className="mt-4 text-center text-xs text-[#23231F]/50">
                                Free cancellation up to 24 hours before departure
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}