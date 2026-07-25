"use client";

import { useEffect, useState } from "react";
import { Oswald } from "next/font/google";
import PageHero from "@/components/ui/pageHero";
import Footer from "@/components/common/footer";

const oswald = Oswald({
    weight: ["500", "700"],
    subsets: ["latin"],
});

const SECTIONS = [
    {
        id: "company",
        number: "1",
        title: "Lanka Lagoon Tours",
        body: (
            <div className="space-y-4">
                <p>
                    Lanka Lagoon Tours is an online booking and travel assistance platform that
                    connects visitors with trusted local tour operators in Sri Lanka.
                </p>
                <p>
                    Lanka Lagoon Tours does not directly operate boat tours, own vessels, employ boat
                    crews, or provide transportation services. We act as an intermediary by assisting
                    guests with discovering, requesting, and booking experiences provided by
                    independent tour operators.
                </p>
                <p>
                    All tours, cruises, boat trips, and related activities are operated by our selected
                    local partner:
                </p>
                <p className="font-semibold text-[#0f2e2c]">
                    Rohitha Boat Tours
                    <span className="block font-normal text-[#0f2e2c]/60">
                        A registered and authorised tourism service provider in Sri Lanka
                    </span>
                </p>
                <p>
                    The actual tour service agreement is between the guest and Rohitha Boat Tours.
                </p>
            </div>
        ),
    },
    {
        id: "contact",
        number: "2",
        title: "Contact details",
        body: (
            <div className="space-y-4">
                <ul className="space-y-1">
                    <li>Telephone and WhatsApp: +94 77 123 4567</li>
                    <li>Email: hello@lankalagoontours.com</li>
                    <li>Website: www.lankalagoontours.com</li>
                </ul>
                <p>
                    For operational questions regarding a confirmed tour, guests may also be contacted
                    by Rohitha Boat Tours or their assigned tour representative.
                </p>
            </div>
        ),
    },
    {
        id: "definitions",
        number: "3",
        title: "Definitions",
        body: (
            <div className="space-y-3">
                <p>
                    <span className="font-semibold text-[#0f2e2c]">&ldquo;Lanka Lagoon Tours&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;</span> refers
                    to the Lanka Lagoon Tours booking platform and its representatives.
                </p>
                <p>
                    <span className="font-semibold text-[#0f2e2c]">&ldquo;Rohitha Boat Tours&rdquo;</span> refers
                    to the independent tour operator responsible for providing the booked tourism
                    experience.
                </p>
                <p>
                    <span className="font-semibold text-[#0f2e2c]">&ldquo;Guest&rdquo;, &ldquo;you&rdquo;, or &ldquo;your&rdquo;</span> refers
                    to any person making a booking or participating in a tour.
                </p>
                <p>
                    <span className="font-semibold text-[#0f2e2c]">&ldquo;Tour operator&rdquo;</span> refers
                    to Rohitha Boat Tours and any authorised representatives involved in delivering the
                    experience.
                </p>
                <p>
                    Lanka Lagoon Tours acts only as a booking intermediary between guests and the tour
                    operator.
                </p>
            </div>
        ),
    },
    {
        id: "booking-process",
        number: "4",
        title: "Booking process",
        body: (
            <div className="space-y-4">
                <p>When you submit a booking request through Lanka Lagoon Tours:</p>
                <ul className="list-inside list-disc space-y-1 pl-1">
                    <li>We collect your booking details and communicate your request to Rohitha Boat Tours.</li>
                    <li>Availability, pricing, schedules, and operational arrangements are confirmed by Rohitha Boat Tours.</li>
                    <li>A booking confirmation is provided once the tour operator accepts the booking.</li>
                    <li>
                        Payment arrangements may be handled through Lanka Lagoon Tours or directly with
                        Rohitha Boat Tours depending on the booking method.
                    </li>
                </ul>
                <p>
                    Submitting a booking request does not guarantee availability until confirmation has
                    been provided.
                </p>
            </div>
        ),
    },
    {
        id: "role-responsibility",
        number: "5",
        title: "Role and responsibility of Lanka Lagoon Tours",
        body: (
            <div className="space-y-4">
                <div>
                    <h4 className="font-semibold text-[#0f2e2c]">Lanka Lagoon Tours provides:</h4>
                    <ul className="mt-2 list-inside list-disc space-y-1 pl-1">
                        <li>Tour information and recommendations.</li>
                        <li>Booking assistance.</li>
                        <li>Communication support between guests and Rohitha Boat Tours.</li>
                        <li>Customer service before the tour.</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-[#0f2e2c]">Lanka Lagoon Tours does not:</h4>
                    <ul className="mt-2 list-inside list-disc space-y-1 pl-1">
                        <li>Operate boats or vehicles.</li>
                        <li>Provide tour guides or boat crews.</li>
                        <li>Control weather, sea, lagoon, or environmental conditions.</li>
                        <li>Guarantee wildlife sightings or natural events.</li>
                        <li>Make decisions regarding operational safety.</li>
                        <li>Provide insurance coverage.</li>
                    </ul>
                </div>
                <p>All operational decisions are made by Rohitha Boat Tours.</p>
            </div>
        ),
    },
    {
        id: "schedule-changes",
        number: "6",
        title: "Tour changes and schedule adjustments",
        body: (
            <div className="space-y-4">
                <p>Tour schedules, routes, and activities may change due to:</p>
                <ul className="list-inside list-disc space-y-1 pl-1">
                    <li>Weather conditions.</li>
                    <li>Water levels, tides, or currents.</li>
                    <li>Safety concerns.</li>
                    <li>Mechanical issues.</li>
                    <li>Government restrictions.</li>
                    <li>Other circumstances outside the control of the tour operator.</li>
                </ul>
                <p>
                    Rohitha Boat Tours reserves the right to modify, postpone, or cancel activities when
                    necessary to protect guest safety.
                </p>
                <p>
                    Lanka Lagoon Tours is not responsible for operational changes made by Rohitha Boat Tours.
                </p>
            </div>
        ),
    },
    {
        id: "cancellation",
        number: "7",
        title: "Cancellation and refund policy",
        body: (
            <div className="space-y-5">
                <p>
                    Cancellation and refund requests are handled according to the policies of Rohitha
                    Tours. Guests must contact Lanka Lagoon Tours or Rohitha Boat Tours using the booking
                    confirmation details.
                </p>
                <div>
                    <h4 className="font-semibold text-[#0f2e2c]">7.1 Cancellation by guest</h4>
                    <p className="mt-2">Unless otherwise agreed:</p>
                    <div className="mt-3 overflow-hidden rounded-xl border border-[#0f2e2c]/10">
                        <table className="w-full border-collapse text-left text-sm">
                            <thead>
                                <tr className="bg-[#0f2e2c]/[0.04]">
                                    <th className="px-4 py-3 font-medium text-[#0f2e2c]/70">Timing</th>
                                    <th className="px-4 py-3 font-medium text-[#0f2e2c]/70">Refund</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-t border-[#0f2e2c]/10">
                                    <td className="px-4 py-3">More than 48 hours before departure</td>
                                    <td className="px-4 py-3">Refund may be available according to Rohitha Boat Tours&rsquo; policy</td>
                                </tr>
                                <tr className="border-t border-[#0f2e2c]/10">
                                    <td className="px-4 py-3">24&ndash;48 hours before departure</td>
                                    <td className="px-4 py-3">Partial refund may apply</td>
                                </tr>
                                <tr className="border-t border-[#0f2e2c]/10">
                                    <td className="px-4 py-3">Less than 24 hours before departure, or no-show</td>
                                    <td className="px-4 py-3">Refund may not be available</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p className="mt-3">
                        Any applicable transaction fees, payment processing charges, or third-party costs
                        may be deducted.
                    </p>
                </div>
                <div>
                    <h4 className="font-semibold text-[#0f2e2c]">7.2 Cancellation by Rohitha Boat Tours</h4>
                    <p className="mt-2">
                        If Rohitha Boat Tours cancels a tour due to safety reasons, weather conditions, or
                        operational issues, guests may be offered an alternative date/time, or a refund
                        according to Rohitha Boat Tours&rsquo; cancellation policy.
                    </p>
                </div>
            </div>
        ),
    },
    {
        id: "safety",
        number: "8",
        title: "Safety and guest responsibility",
        body: (
            <div className="space-y-4">
                <p>Guests must:</p>
                <ul className="list-inside list-disc space-y-1 pl-1">
                    <li>Follow all safety instructions provided by Rohitha Boat Tours staff.</li>
                    <li>Wear safety equipment when required.</li>
                    <li>
                        Inform the operator of medical conditions, mobility limitations, or special
                        requirements before departure.
                    </li>
                    <li>Behave responsibly throughout the activity.</li>
                </ul>
                <p>
                    Rohitha Boat Tours reserves the right to refuse participation to any guest whose behaviour
                    may endanger themselves, other passengers, staff, or property.
                </p>
            </div>
        ),
    },
    {
        id: "liability",
        number: "9",
        title: "Liability",
        body: (
            <div className="space-y-4">
                <p>Lanka Lagoon Tours acts only as a booking intermediary.</p>
                <p>The responsibility for conducting the tour, including:</p>
                <ul className="list-inside list-disc space-y-1 pl-1">
                    <li>Boat operation.</li>
                    <li>Crew management.</li>
                    <li>Safety procedures.</li>
                    <li>Equipment condition.</li>
                    <li>Passenger handling.</li>
                    <li>Compliance with tourism regulations.</li>
                </ul>
                <p>belongs to Rohitha Boat Tours.</p>
                <p>
                    To the maximum extent permitted by Sri Lankan law, Lanka Lagoon Tours is not
                    responsible for injuries, losses, damages, delays, cancellations, or service issues
                    arising from the operation of tours by Rohitha Boat Tours.
                </p>
            </div>
        ),
    },
    {
        id: "insurance",
        number: "10",
        title: "Travel insurance",
        body: (
            <div className="space-y-4">
                <p>
                    Guests are responsible for obtaining appropriate travel insurance before
                    participating in any activity.
                </p>
                <p>Insurance should cover:</p>
                <ul className="list-inside list-disc space-y-1 pl-1">
                    <li>Travel interruptions.</li>
                    <li>Personal accidents.</li>
                    <li>Medical expenses.</li>
                    <li>Lost belongings.</li>
                    <li>Activity-related risks.</li>
                </ul>
            </div>
        ),
    },
    {
        id: "media",
        number: "11",
        title: "Photography and marketing",
        body: (
            <p>
                Photographs and videos may be taken during tours by Rohitha Boat Tours or Lanka Lagoon Tours
                for promotional purposes. Guests who do not wish to appear in promotional materials
                should inform the tour operator before the activity begins.
            </p>
        ),
    },
    {
        id: "third-party",
        number: "12",
        title: "Third-party services",
        body: (
            <p>
                Tours booked through Lanka Lagoon Tours are provided by independent third-party
                operators. Lanka Lagoon Tours does not control or supervise the daily operations of
                Rohitha Boat Tours but works to connect guests with reliable tourism providers.
            </p>
        ),
    },
    {
        id: "governing-law",
        number: "13",
        title: "Governing law",
        body: (
            <div className="space-y-4">
                <p>
                    These Terms and Conditions are governed by the laws of Sri Lanka.
                </p>
                <p>
                    Any disputes relating to booking services provided by Lanka Lagoon Tours shall first
                    be addressed through good-faith communication.
                </p>
                <p>
                    Operational disputes regarding the delivery of tours shall be handled between the
                    guest and Rohitha Boat Tours.
                </p>
            </div>
        ),
    },
];

export default function TermsAndConditions() {
    const [activeId, setActiveId] = useState(SECTIONS[0].id);

    useEffect(() => {
        const sectionElements = SECTIONS.map((section) => document.getElementById(section.id)).filter(
            (el): el is HTMLElement => el !== null
        );

        if (sectionElements.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntry = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => Number(b.intersectionRatio) - Number(a.intersectionRatio))[0];

                if (visibleEntry) {
                    setActiveId(visibleEntry.target.id);
                }
            },
            {
                root: null,
                rootMargin: "-30% 0px -60% 0px",
                threshold: [0.1, 0.25, 0.5, 0.75, 1],
            }
        );

        sectionElements.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, []);

    return (
        <div className="min-h-screen">
            <PageHero
                eyebrow="Before You Board"
                heading={[
                    "Booking Terms & Partner",
                    <><span className="text-[#c9862f]">Conditions</span></>,
                ]}
                description="The agreement between you and Lanka Lagoon Tours for every tour and activity booked through our platform."
                imageSrc="/images/hero1.webp"
            />

            <div className="mx-auto max-w-3xl text-center py-10 px-6">
                <span className={`${oswald.className} text-xs font-medium tracking-[0.35em] text-[#a86c1f]`}>
                    THE FINE PRINT
                </span>
                <h1 className={`${oswald.className} mt-4 text-4xl font-bold tracking-tight text-[#0f2e2c] sm:text-5xl`}>
                    Terms and Conditions
                </h1>
                <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#0f2e2c]/60">
                    Terms and conditions for guests booking tours through the Lanka Lagoon Tours platform.
                </p>
            </div>

            <div className="mx-auto mb-24 grid max-w-6xl gap-10 px-6 sm:px-10 md:px-16 lg:grid-cols-[220px_1fr] lg:gap-16">
                {/* Table of contents */}
                <nav className="hidden lg:sticky lg:top-24 lg:block lg:h-fit">
                    <p className={`${oswald.className} mb-4 text-[11px] font-medium tracking-[0.25em] text-[#0f2e2c]/40`}>
                        ON THIS PAGE
                    </p>
                    <ul className="space-y-1 border-l border-[#0f2e2c]/10">
                        {SECTIONS.map((s) => (
                            <li key={s.id}>

                                <a href={`#${s.id}`}
                                    onClick={() => setActiveId(s.id)}
                                    className={`-ml-px block border-l-2 py-1.5 pl-4 text-sm transition-colors ${activeId === s.id
                                            ? "border-[#c9862f] text-[#a86c1f] font-medium"
                                            : "border-transparent text-[#0f2e2c]/50 hover:text-[#0f2e2c]"
                                        }`}
                                >
                                    {s.number}. {s.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Sections */}
                <div className="min-w-0">
                    {SECTIONS.map((s, i) => (
                        <section
                            key={s.id}
                            id={s.id}
                            className={`scroll-mt-24 py-8 text-sm leading-relaxed text-[#0f2e2c]/75 ${i !== 0 ? "border-t border-[#0f2e2c]/10" : ""
                                }`}
                        >
                            <h2 className={`${oswald.className} mb-4 flex items-baseline gap-3 text-xl font-semibold text-[#0f2e2c]`}>
                                <span className="text-[#c9862f]">{s.number}</span>
                                {s.title}
                            </h2>
                            {s.body}
                        </section>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
}