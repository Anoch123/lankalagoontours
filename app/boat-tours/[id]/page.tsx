"use client";

import Footer from "@/components/common/footer";
import PageHero from "@/components/ui/pageHero";
import Image from "next/image";
import { useBoatTours } from "@/hooks/admin/useBoatTours";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Package } from "@/lib/types/api/tour_packages";
import { Clock, Users, Banknote, Activity, MapPin, Check, AlertCircle } from "lucide-react";

export default function BoatTours() {
    const [tour, setTour] = useState<Package | null>(null);
    const { getBoatTour } = useBoatTours();
    const params = useParams();

    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [guests, setGuests] = useState<number | null>(null);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const quickFacts = [
        { icon: Clock, label: "Duration", value: tour?.duration },
        { icon: Users, label: "Group size", value: `${tour?.group_min}–${tour?.group_max} guests` },
        { icon: Banknote, label: "From", value: `${tour?.currency} ${tour?.price} / person` },
        { icon: Activity, label: "Fitness", value: "Low" },
    ];

    const stampTilts = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2"];

    useEffect(() => {

        async function load() {
            const tourId = params.id as string | undefined;

            if (!tourId) {
                return;
            }

            const data = await getBoatTour(tourId);

            setTour(data);

            if (data?.group_min) {
                setGuests(data.group_min);
            }
        }

        load();

    }, [params.id]);

    const dateLabel = selectedDate
        ? new Date(`${selectedDate}T00:00:00`).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        })
        : "Add dates";

    function handleSubmit() {
        if (!tour || !selectedDate || !guests) {
            setConfirmOpen(true);

            return;
        }

        const params = new URLSearchParams();
        if (tour) params.set("destination", tour.id);
        if (selectedDate) params.set("date", selectedDate.toISOString().slice(0, 10));
        params.set("guests", String(guests));
        window.location.href = `/book_tour?${params.toString()}`;
    }

    return (
        <main className="bg-[#FAF7F1] text-[#23231F]">
            <PageHero
                eyebrow="Reserve your spot"
                heading={["Book a ", <span key="accent" className="italic text-[#B68A4E]">Lagoon Tour</span>]}
                description="Choose your route, pick a time, and we'll have the boat ready at the jetty."
                imageSrc="/images/hero1.webp"
            />

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

                        <div className="mt-10">
                            <p className="text-[10px] uppercase tracking-[0.22em] text-[#1B2A4A]/40">
                                At a glance
                            </p>
                            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                                {quickFacts.map(({ icon: Icon, label, value }, i) => (
                                    <div
                                        key={label}
                                        className={`overflow-hidden rounded-sm border-2 border-dashed border-[#1B2A4A]/20 bg-white text-center shadow-[0_10px_20px_-12px_rgba(27,42,74,0.35)] transition duration-300 hover:rotate-0 ${stampTilts[i % stampTilts.length]}`}
                                    >
                                        <div
                                            className="h-1.5 w-full"
                                            style={{
                                                backgroundImage:
                                                    "repeating-linear-gradient(45deg, #E2703A 0 8px, #1B2A4A 8px 16px)",
                                            }}
                                            aria-hidden
                                        />
                                        <div className="px-4 pb-5 pt-2 sm:px-5">
                                            <div className="mx-auto -mt-7 flex h-14 w-14 items-center justify-center rounded-full border-4 border-white bg-[#1B2A4A] shadow-sm">
                                                <Icon className="h-5 w-5 text-[#E2703A]" strokeWidth={1.5} aria-hidden />
                                            </div>
                                            <p className="mt-3 text-[10px] uppercase tracking-[0.16em] text-[#1B2A4A]/45">
                                                {label}
                                            </p>
                                            <p className="mt-1 font-[family-name:var(--font-display)] text-base text-[#1B2A4A]">
                                                {value}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-10 space-y-4 text-[16px] leading-relaxed text-[#23231F]/80">
                            {(Array.isArray(tour?.description) ? tour?.description : [tour?.description]).map((p, i) => (
                                <p key={i}>{p}</p>
                            ))}
                        </div>

                        {/* Pick-up & drop-off */}
                        <div className="mt-16">
                            <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#0E3A3B]">
                                Pick-up & drop-off
                            </h2>
                            <p className="mt-4 text-[15px] leading-relaxed text-[#23231F]/70">
                                For groups of 1–3 guests, we can arrange return pick-up and drop-off by tuk-tuk
                                from any local Negombo hotel for an additional LKR 1,500 per tuk-tuk. This is a
                                lovely local experience and makes it easy to begin your lagoon adventure without
                                arranging transport.
                            </p>
                            <div className="mt-5 flex items-start gap-3 rounded-lg border border-dashed border-[#B68A4E]/40 bg-[#B68A4E]/[0.06] px-4 py-3.5">
                                <Banknote className="mt-0.5 h-4 w-4 shrink-0 text-[#B68A4E]" strokeWidth={1.5} aria-hidden />
                                <p className="text-xs leading-relaxed text-[#23231F]/70">
                                    <span className="font-medium text-[#0E3A3B]">LKR 1,500 per tuk-tuk</span>{" "}
                                    · groups of 1–3 guests · pick-up from any Negombo hotel. Mention your hotel at the time of booking confirmation call to arrange this service.
                                </p>
                            </div>
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
                                        value={selectedDate ? selectedDate.toISOString().slice(0, 10) : ""}
                                        onChange={(e) => setSelectedDate(e.target.value ? new Date(e.target.value) : null)}
                                        min={new Date().toISOString().slice(0, 10)}
                                        className="mt-2 w-full rounded-lg border border-[#0E3A3B]/15 bg-[#FAF7F1] px-4 py-3 text-sm text-[#23231F] outline-none focus-visible:ring-2 focus-visible:ring-[#B68A4E]"
                                    />
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
                                        value={guests ?? ""}
                                        onChange={(e) => setGuests(Number(e.target.value))}
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

                            {confirmOpen && (
                                <div className="mt-5 flex items-start gap-3 rounded-lg border border-dashed border-red-400/50 bg-red-50 px-4 py-3.5">
                                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" strokeWidth={1.5} aria-hidden />
                                    <p className="text-xs leading-relaxed text-red-700/80">
                                        Please pick a date and number of guests before reserving.
                                    </p>
                                </div>
                            )}

                            <button
                                onClick={handleSubmit}
                                type="button"
                                className="mt-7 w-full rounded-lg bg-[#0E3A3B] py-3.5 text-sm font-medium tracking-wide text-[#FAF7F1] transition hover:bg-[#0E3A3B]/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B68A4E]"
                            >
                                Reserve a seat
                            </button>

                            <div className="mt-5 flex items-start gap-3 rounded-lg border border-dashed border-[#B68A4E]/40 bg-[#B68A4E]/[0.06] px-4 py-3.5">
                                <Banknote className="mt-0.5 h-4 w-4 shrink-0 text-[#B68A4E]" strokeWidth={1.5} aria-hidden />
                                <p className="text-xs leading-relaxed text-[#23231F]/70">
                                    <span className="font-medium text-[#0E3A3B]">Pay after the tour.</span>{" "}
                                    No payment is taken now — Rohitha Boat Tours collects payment directly once your tour is complete.
                                </p>
                            </div>

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