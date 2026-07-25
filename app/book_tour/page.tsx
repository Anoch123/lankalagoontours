"use client";

import { useEffect, useMemo, useState } from "react";
import { Oswald } from "next/font/google";
import PageHero from "@/components/ui/pageHero";
import Footer from "@/components/common/footer";
import { Package } from "@/lib/types/api/tour_packages";
import { useSearchParams } from "next/navigation";
import { useBoatTours } from "@/hooks/admin/useBoatTours";
import { Passenger } from "@/lib/types/tour_booking";
import { emptyPassenger, formatTimeSlots, getMonthGrid, getNextMonth, isPastDay } from "@/lib/utils/bookTour";

const oswald = Oswald({
    weight: ["500", "700"],
    subsets: ["latin"],
});


export default function BookTour() {
    const searchParams = useSearchParams();
    const today = useMemo(() => new Date(), []);
    const [viewYear, setViewYear] = useState(today.getFullYear());
    const [viewMonth, setViewMonth] = useState(today.getMonth());

    const [selectedTour, setSelectedTour] = useState<Package['id'] | null>(null);
    const [selectedDate, setSelectedDate] = useState<number | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [guests, setGuests] = useState(2);
    const [contact, setContact] = useState({ email: "", phone: "", remarks: "" });
    const [passengers, setPassengers] = useState<Passenger[]>([emptyPassenger(), emptyPassenger()]);
    const [confirmed, setConfirmed] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const [tours, setTours] = useState<Package[]>([]);
    const { listTour } = useBoatTours();

    const tour = tours.find((t) => t.id === selectedTour) ?? null;
    const cells = useMemo(() => getMonthGrid(viewYear, viewMonth), [viewYear, viewMonth]);
    const monthLabel = new Date(viewYear, viewMonth).toLocaleString("en-US", { month: "long", year: "numeric" });
    const timeSlots = useMemo(() => {return formatTimeSlots(tour?.departures);}, [tour]);

    useEffect(() => {
        const loadBoatTours = async () => {
            const response = await listTour();

            if (response) {
                setTours(response as Package[]);
            }
        }

        loadBoatTours();

    }, [])

    const updateGuestCount = (nextGuests: number) => {
        setGuests(nextGuests);
        setPassengers((prev) => {
            if (nextGuests === prev.length) return prev;
            if (nextGuests > prev.length) {
                return [...prev, ...Array.from({ length: nextGuests - prev.length }, emptyPassenger)];
            }
            return prev.slice(0, nextGuests);
        });
    };

    const updatePassenger = (index: number, field: keyof Passenger, value: string) => {
        setPassengers((prev) =>
            prev.map((p, i) => (i === index ? { ...p, [field]: value } : p))
        );
    };

    const changeMonth = (dir: 1 | -1) => {
        const nextMonth = getNextMonth(viewYear, viewMonth, dir);
        setViewMonth(nextMonth.viewMonth);
        setViewYear(nextMonth.viewYear);
        setSelectedDate(null);
    };

    const total = tour ? tour.price * guests : 0;

    const formatDateForDb = (value: Date) => {
        const year = value.getFullYear();
        const month = String(value.getMonth() + 1).padStart(2, "0");
        const day = String(value.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const buildPayload = () => {
        const leadPassenger = passengers[0];
        const bookingDate = new Date(viewYear, viewMonth, selectedDate!);

        return {
            tour_id: tour!.id,
            booking_number: `LLT-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
            booking_date: formatDateForDb(bookingDate),
            departure_time: selectedTime!,
            guest_count: guests,
            total_price: Number((tour!.price * guests).toFixed(2)),
            lead_name: `${leadPassenger.firstName} ${leadPassenger.lastName}`.trim(),
            email: contact.email,
            phone: contact.phone,
            remarks: contact.remarks || "",
            status: "pending",
            payment_status: "pending",
        };
    };

    const handleConfirm = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!tour || !selectedDate || !selectedTime) return;

        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const bookingPayload = buildPayload();
            const passengerPayloads = passengers.map((passenger, index) => ({
                first_name: passenger.firstName.trim(),
                last_name: passenger.lastName.trim(),
                country: passenger.country.trim(),
                is_lead: index === 0,
            }));

            const response = await fetch("/api/bookings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    booking: bookingPayload,
                    passengers: passengerPayloads,
                }),
            });

            const result = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(result.error || "Unable to create your booking right now.");
            }

            setConfirmed(true);
        } catch (error) {
            console.error("Booking submission failed", error);
            setSubmitError(error instanceof Error ? error.message : "Unable to create your booking right now. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        const loadParams = () => {
            const destination = searchParams.get("destination");
            const dateParam = searchParams.get("date");
            const totalPassengers = searchParams.get("guests");

            if (destination) {
                setSelectedTour(destination);
            }

            if (totalPassengers) {
                const parsedGuests = Number(totalPassengers);
                if (!Number.isNaN(parsedGuests)) {
                    updateGuestCount(parsedGuests);
                }
            }

            if (dateParam) {
                const parsedDate = new Date(dateParam);
                if (!Number.isNaN(parsedDate.getTime())) {
                    setSelectedDate(parsedDate.getDate() + 1);
                    setViewYear(parsedDate.getFullYear());
                    setViewMonth(parsedDate.getMonth());
                    setSelectedTime(null);
                }
            }
        };

        loadParams();
    }, [searchParams]);

    if (confirmed && tour && selectedDate) {
        return (
            <div className="min-h-screen">
                <PageHero
                    eyebrow="Booking Confirmed"
                    heading={["You're", <><span className="text-[#c9862f]">Booked In</span></>]}
                    description="We've received your booking request and will confirm shortly by phone or email."
                    imageSrc="/images/hero1.webp"
                />
                <div className="mx-auto max-w-lg px-6 py-16 text-center">
                    <div className="rounded-2xl border border-[#0f2e2c]/10 p-8">
                        <p className={`${oswald.className} text-xs font-medium tracking-[0.3em] text-[#a86c1f]`}>
                            BOOKING SUMMARY
                        </p>
                        <h2 className={`${oswald.className} mt-3 text-2xl font-bold text-[#0f2e2c]`}>{tour.title}</h2>
                        <p className="mt-2 text-sm text-[#0f2e2c]/60">
                            {monthLabel} {selectedDate} &middot; {selectedTime} &middot; {guests} guest{guests > 1 ? "s" : ""}
                        </p>
                        <p className="mt-4 text-lg font-semibold text-[#0f2e2c]">Total Amount of Tour : {tour.currency}{total.toLocaleString()}</p>
                        <p className="mt-6 text-sm text-[#0f2e2c]/60">
                            A confirmation will be sent to {contact.email || "your email"}.
                        </p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <PageHero
                eyebrow="Reserve Your Spot"
                heading={["Book a", <><span className="text-[#c9862f]">Lagoon Tour</span></>]}
                description="Choose your route, pick a time, and we'll have the boat ready at the jetty."
                imageSrc="/images/hero1.webp"
            />

            <div className="mx-auto mb-24 grid max-w-6xl gap-10 px-6 py-10 sm:px-10 md:px-16 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
                <form onSubmit={handleConfirm} className="min-w-0 space-y-12">

                    {/* Step 1 — Choose Your Route */}
                    <section>
                        <div className="mb-5 flex items-baseline gap-3">
                            <span className={`${oswald.className} text-xs font-medium tracking-[0.25em] text-[#a86c1f]`}>01</span>
                            <h2 className={`${oswald.className} text-xl font-semibold text-[#0f2e2c]`}>Choose Your Route</h2>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                            {tours.map((t) => {
                                const isActive = selectedTour === t.id;
                                return (
                                    <button
                                        key={t.id}
                                        type="button"
                                        onClick={() => setSelectedTour(t.id)}
                                        className={`rounded-xl border p-4 text-left transition-colors ${isActive
                                            ? "border-[#c9862f] bg-[#c9862f]/[0.06]"
                                            : "border-[#0f2e2c]/10 hover:border-[#c9862f]/40"
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className={`${oswald.className} text-sm font-semibold text-[#0f2e2c]`}>
                                                {t.title}
                                            </span>
                                            <span
                                                className={`h-4 w-4 shrink-0 rounded-full border-2 ${isActive ? "border-[#c9862f] bg-[#c9862f]" : "border-[#0f2e2c]/20"
                                                    }`}
                                            />
                                        </div>
                                        <p className="mt-1 text-xs text-[#0f2e2c]/55">{t.description}</p>
                                        <div className="mt-3 flex items-center justify-between text-xs text-[#0f2e2c]/60">
                                            <span>{t.duration}</span>
                                            <span className="font-semibold text-[#a86c1f]">{t.currency} {t.price.toLocaleString()} pp</span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </section>

                    {/* Step 2 — Set Sail Time */}
                    <section className={!selectedTour ? "pointer-events-none opacity-40" : ""}>
                        <div className="mb-5 flex items-baseline gap-3">
                            <span className={`${oswald.className} text-xs font-medium tracking-[0.25em] text-[#a86c1f]`}>02</span>
                            <h2 className={`${oswald.className} text-xl font-semibold text-[#0f2e2c]`}>Set Sail Time</h2>
                        </div>

                        <div className="rounded-xl border border-[#0f2e2c]/10 p-4 sm:p-5">
                            <div className="mb-4 flex items-center justify-between">
                                <button
                                    type="button"
                                    onClick={() => changeMonth(-1)}
                                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[#0f2e2c]/15 text-[#0f2e2c]/60 transition-colors hover:border-[#c9862f] hover:text-[#a86c1f]"
                                    aria-label="Previous month"
                                >
                                    ‹
                                </button>
                                <span className={`${oswald.className} text-sm font-medium text-[#0f2e2c]`}>{monthLabel}</span>
                                <button
                                    type="button"
                                    onClick={() => changeMonth(1)}
                                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[#0f2e2c]/15 text-[#0f2e2c]/60 transition-colors hover:border-[#c9862f] hover:text-[#a86c1f]"
                                    aria-label="Next month"
                                >
                                    ›
                                </button>
                            </div>

                            <div className="grid grid-cols-7 gap-1 text-center">
                                {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                                    <span key={i} className={`${oswald.className} py-1 text-[11px] font-medium text-[#0f2e2c]/40`}>
                                        {d}
                                    </span>
                                ))}
                                {cells.map((day, i) => {
                                    if (day === null) return <span key={i} />;
                                    const disabled = isPastDay(day, viewYear, viewMonth, today);
                                    const isSelected = selectedDate === day;
                                    return (
                                        <button
                                            key={i}
                                            type="button"
                                            disabled={disabled}
                                            onClick={() => { setSelectedDate(day); setSelectedTime(null); }}
                                            className={`aspect-square rounded-lg text-sm transition-colors ${isSelected
                                                ? "bg-[#c9862f] font-semibold text-[#0f2e2c]"
                                                : disabled
                                                    ? "text-[#0f2e2c]/20"
                                                    : "text-[#0f2e2c]/75 hover:bg-[#c9862f]/10 hover:text-[#a86c1f]"
                                                }`}
                                        >
                                            {day}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {selectedDate && (
                            <div className="mt-4 flex flex-wrap gap-2">
                                {timeSlots.map((slot) => {
                                    const isActive = selectedTime === slot;
                                    return (
                                        <button
                                            key={slot}
                                            type="button"
                                            onClick={() => setSelectedTime(slot)}
                                            className={`${oswald.className} rounded-full border px-4 py-2 text-xs font-medium tracking-wide transition-colors ${isActive
                                                ? "border-[#c9862f] bg-[#c9862f] text-[#0f2e2c]"
                                                : "border-[#0f2e2c]/15 text-[#0f2e2c]/60 hover:border-[#c9862f]/60 hover:text-[#a86c1f]"
                                                }`}
                                        >
                                            {slot}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </section>

                    {/* Step 3 — Confirm Passage */}
                    <section className={!selectedTime ? "pointer-events-none opacity-40" : ""}>
                        <div className="mb-5 flex items-baseline gap-3">
                            <span className={`${oswald.className} text-xs font-medium tracking-[0.25em] text-[#a86c1f]`}>03</span>
                            <h2 className={`${oswald.className} text-xl font-semibold text-[#0f2e2c]`}>Confirm Passage</h2>
                        </div>

                        <div className="mb-5 flex items-center justify-between rounded-xl border border-[#0f2e2c]/10 px-4 py-3">
                            <span className={`${oswald.className} text-xs font-medium tracking-wide text-[#0f2e2c]/70`}>
                                Guests
                            </span>
                            <div className="flex items-center gap-4">
                                <button
                                    type="button"
                                    onClick={() => updateGuestCount(Math.max(1, guests - 1))}
                                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[#0f2e2c]/15 text-[#0f2e2c] transition-colors hover:border-[#c9862f] hover:text-[#a86c1f]"
                                >
                                    −
                                </button>
                                <span className="w-4 text-center text-sm font-semibold text-[#0f2e2c]">{guests}</span>
                                <button
                                    type="button"
                                    onClick={() => updateGuestCount(Math.min(12, guests + 1))}
                                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[#0f2e2c]/15 text-[#0f2e2c] transition-colors hover:border-[#c9862f] hover:text-[#a86c1f]"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Passenger details — one block per guest */}
                        <div className="space-y-4">
                            {passengers.map((p, i) => (
                                <div key={i} className="rounded-xl border border-[#0f2e2c]/10 p-4">
                                    <p className={`${oswald.className} mb-3 text-xs font-medium tracking-wide text-[#a86c1f]`}>
                                        Passenger {i + 1}{i === 0 ? " (Lead)" : ""}
                                    </p>
                                    <div className="grid gap-4 sm:grid-cols-3">
                                        <label className="flex flex-col gap-2">
                                            <span className={`${oswald.className} text-xs font-medium tracking-wide text-[#0f2e2c]/70`}>
                                                First name
                                            </span>
                                            <input
                                                required
                                                value={p.firstName}
                                                onChange={(e) => updatePassenger(i, "firstName", e.target.value)}
                                                placeholder="First name"
                                                className="rounded-lg border border-[#0f2e2c]/15 bg-transparent px-4 py-3 text-sm text-[#0f2e2c] outline-none transition-colors placeholder:text-[#0f2e2c]/35 focus:border-[#c9862f]"
                                            />
                                        </label>
                                        <label className="flex flex-col gap-2">
                                            <span className={`${oswald.className} text-xs font-medium tracking-wide text-[#0f2e2c]/70`}>
                                                Last name
                                            </span>
                                            <input
                                                required
                                                value={p.lastName}
                                                onChange={(e) => updatePassenger(i, "lastName", e.target.value)}
                                                placeholder="Last name"
                                                className="rounded-lg border border-[#0f2e2c]/15 bg-transparent px-4 py-3 text-sm text-[#0f2e2c] outline-none transition-colors placeholder:text-[#0f2e2c]/35 focus:border-[#c9862f]"
                                            />
                                        </label>
                                        <label className="flex flex-col gap-2">
                                            <span className={`${oswald.className} text-xs font-medium tracking-wide text-[#0f2e2c]/70`}>
                                                Country
                                            </span>
                                            <input
                                                required
                                                value={p.country}
                                                onChange={(e) => updatePassenger(i, "country", e.target.value)}
                                                placeholder="Country"
                                                className="rounded-lg border border-[#0f2e2c]/15 bg-transparent px-4 py-3 text-sm text-[#0f2e2c] outline-none transition-colors placeholder:text-[#0f2e2c]/35 focus:border-[#c9862f]"
                                            />
                                        </label>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Lead contact — phone/email, used for confirmation */}
                        <div className="mt-5 grid gap-4 sm:grid-cols-2">
                            <label className="flex flex-col gap-2">
                                <span className={`${oswald.className} text-xs font-medium tracking-wide text-[#0f2e2c]/70`}>Phone</span>
                                <input
                                    required
                                    type="tel"
                                    value={contact.phone}
                                    onChange={(e) => setContact((c) => ({ ...c, phone: e.target.value }))}
                                    placeholder="XX XXX XXXX"
                                    className="rounded-lg border border-[#0f2e2c]/15 bg-transparent px-4 py-3 text-sm text-[#0f2e2c] outline-none transition-colors placeholder:text-[#0f2e2c]/35 focus:border-[#c9862f]"
                                />
                            </label>
                            <label className="flex flex-col gap-2">
                                <span className={`${oswald.className} text-xs font-medium tracking-wide text-[#0f2e2c]/70`}>Email</span>
                                <input
                                    required
                                    type="email"
                                    value={contact.email}
                                    onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))}
                                    placeholder="you@example.com"
                                    className="rounded-lg border border-[#0f2e2c]/15 bg-transparent px-4 py-3 text-sm text-[#0f2e2c] outline-none transition-colors placeholder:text-[#0f2e2c]/35 focus:border-[#c9862f]"
                                />
                            </label>
                        </div>

                        <label className="mt-4 flex flex-col gap-2">
                            <span className={`${oswald.className} text-xs font-medium tracking-wide text-[#0f2e2c]/70`}>Remarks</span>
                            <textarea
                                rows={6}
                                value={contact.remarks}
                                onChange={(e) => setContact((c) => ({ ...c, remarks: e.target.value }))}
                                placeholder="Dietary needs, mobility needs, or anything else we should know"
                                className="rounded-lg border border-[#0f2e2c]/15 bg-transparent px-4 py-3 text-sm text-[#0f2e2c] outline-none transition-colors placeholder:text-[#0f2e2c]/35 focus:border-[#c9862f]"
                            />
                        </label>

                        {submitError ? (
                            <p className="mt-4 text-sm text-red-600">{submitError}</p>
                        ) : null}

                        <button
                            type="submit"
                            disabled={!tour || !selectedDate || !selectedTime || isSubmitting}
                            className={`${oswald.className} mt-6 inline-flex items-center gap-2 rounded-full bg-[#c9862f] px-7 py-3 text-sm font-semibold text-[#0f2e2c] transition-transform hover:-translate-y-0.5 hover:bg-[#e7c16f] disabled:pointer-events-none disabled:opacity-40`}
                        >
                            {isSubmitting ? "Creating Booking..." : "Confirm Booking"}
                        </button>
                    </section>
                </form>

                {/* Sticky summary */}
                <aside className="h-fit lg:sticky lg:top-24">
                    <div className="rounded-2xl border border-[#0f2e2c]/10 p-6">
                        <p className={`${oswald.className} text-xs font-medium tracking-[0.3em] text-[#a86c1f]`}>
                            YOUR PASSAGE
                        </p>

                        <div className="mt-4 space-y-3 text-sm">
                            <div className="flex items-center justify-between">
                                <span className="text-[#0f2e2c]/50">Tour</span>
                                <span className="font-medium text-[#0f2e2c]">{tour ? tour.title : "—"}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-[#0f2e2c]/50">Date</span>
                                <span className="font-medium text-[#0f2e2c]">
                                    {selectedDate ? `${monthLabel} ${selectedDate}` : "—"}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-[#0f2e2c]/50">Duration</span>
                                <span className="font-medium text-[#0f2e2c]">
                                    {tour ? tour.duration : "—"}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-[#0f2e2c]/50">Time</span>
                                <span className="font-medium text-[#0f2e2c]">{selectedTime ?? "—"}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-[#0f2e2c]/50">Guests</span>
                                <span className="font-medium text-[#0f2e2c]">{guests}</span>
                            </div>
                        </div>

                        <div className="mt-5 border-t border-[#0f2e2c]/10 pt-4">
                            <div className="flex items-center justify-between">
                                <span className={`${oswald.className} text-sm font-medium text-[#0f2e2c]`}>Total</span>
                                <span className={`${oswald.className} text-lg font-bold text-[#0f2e2c]`}>
                                    {tour?.currency} {total.toLocaleString()}
                                </span>
                            </div>
                            <p className="mt-1 text-xs text-[#0f2e2c]/45">Payment confirmed after we contact you.</p>
                        </div>
                    </div>
                </aside>
            </div>

            <Footer />
        </div>
    );
}