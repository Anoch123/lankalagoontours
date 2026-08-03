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
        id: "introduction",
        number: "1",
        title: "Introduction",
        body: (
            <div className="space-y-4">
                <p>
                    Welcome to Lanka Lagoon Tours. We are committed to protecting your privacy and
                    ensuring that your personal information is handled securely and responsibly.
                </p>
                <p>
                    This Privacy Policy explains how we collect, use, store, and protect your
                    information when you visit our website, submit an enquiry, make a booking, or
                    communicate with us.
                </p>
                <p>
                    By using our website or services, you agree to the practices described in this
                    Privacy Policy.
                </p>
            </div>
        ),
    },
    {
        id: "information-we-collect",
        number: "2",
        title: "Information we collect",
        body: (
            <div className="space-y-5">
                <div>
                    <h4 className="font-semibold text-[#0f2e2c]">Personal information</h4>
                    <ul className="mt-2 list-inside list-disc space-y-1 pl-1">
                        <li>Full name.</li>
                        <li>Email address.</li>
                        <li>Phone or WhatsApp number.</li>
                        <li>Country of residence.</li>
                        <li>Number of guests.</li>
                        <li>Preferred tour date and time.</li>
                        <li>Special requests or dietary requirements.</li>
                        <li>Emergency contact information (if required).</li>
                        <li>Any information you voluntarily provide.</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-[#0f2e2c]">Booking information</h4>
                    <p className="mt-2">When making a reservation, we may collect:</p>
                    <ul className="mt-2 list-inside list-disc space-y-1 pl-1">
                        <li>Tour selected.</li>
                        <li>Booking reference.</li>
                        <li>Passenger details.</li>
                        <li>Booking status.</li>
                        <li>Payment status.</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-[#0f2e2c]">Payment information</h4>
                    <p className="mt-2">
                        If payment is requested, we may collect payment-related information through
                        our payment providers. We do not store your complete credit or debit card
                        details on our servers.
                    </p>
                </div>
                <div>
                    <h4 className="font-semibold text-[#0f2e2c]">Technical information</h4>
                    <p className="mt-2">When you browse our website, we may automatically collect:</p>
                    <ul className="mt-2 list-inside list-disc space-y-1 pl-1">
                        <li>IP address.</li>
                        <li>Browser type.</li>
                        <li>Device information.</li>
                        <li>Pages visited.</li>
                        <li>Date and time of access.</li>
                        <li>Cookies and analytics data.</li>
                    </ul>
                </div>
            </div>
        ),
    },
    {
        id: "how-we-use-it",
        number: "3",
        title: "How we use your information",
        body: (
            <div className="space-y-3">
                <p>We use your information to:</p>
                <ul className="list-inside list-disc space-y-1 pl-1">
                    <li>Respond to enquiries.</li>
                    <li>Process tour bookings.</li>
                    <li>Confirm reservations.</li>
                    <li>Contact you regarding your booking.</li>
                    <li>Arrange tours with our local guides.</li>
                    <li>Improve our website and services.</li>
                    <li>Prevent fraud or misuse.</li>
                    <li>Meet legal obligations.</li>
                    <li>Send promotional emails only where permitted or with your consent.</li>
                </ul>
            </div>
        ),
    },
    {
        id: "sharing-your-information",
        number: "4",
        title: "Sharing your information",
        body: (
            <div className="space-y-3">
                <p>We value your privacy and do not sell your personal information.</p>
                <p>We may share your information only when necessary with:</p>
                <ul className="list-inside list-disc space-y-1 pl-1">
                    <li>Boat operators and tour guides providing your booked experience.</li>
                    <li>Payment service providers.</li>
                    <li>Email service providers.</li>
                    <li>Website hosting providers.</li>
                    <li>Government authorities where required by law.</li>
                </ul>
                <p>Information shared is limited to what is necessary to provide the requested service.</p>
            </div>
        ),
    },
    {
        id: "cookies",
        number: "5",
        title: "Cookies",
        body: (
            <div className="space-y-3">
                <p>Our website may use cookies to:</p>
                <ul className="list-inside list-disc space-y-1 pl-1">
                    <li>Improve website performance.</li>
                    <li>Remember your preferences.</li>
                    <li>Measure website traffic.</li>
                    <li>Understand how visitors use our website.</li>
                </ul>
                <p>
                    You can disable cookies through your browser settings, although some website
                    features may not function correctly.
                </p>
            </div>
        ),
    },
    {
        id: "analytics",
        number: "6",
        title: "Analytics",
        body: (
            <p>
                We may use analytics tools such as Google Analytics or similar services to
                understand website usage and improve user experience. These services may collect
                anonymous usage information through cookies.
            </p>
        ),
    },
    {
        id: "marketing-communications",
        number: "7",
        title: "Marketing communications",
        body: (
            <p>
                If you subscribe to our newsletter or request updates, we may send occasional
                promotional emails. You may unsubscribe at any time using the unsubscribe link
                included in our emails or by contacting us directly.
            </p>
        ),
    },
    {
        id: "data-retention",
        number: "8",
        title: "Data retention",
        body: (
            <div className="space-y-3">
                <p>We retain your information only for as long as necessary to:</p>
                <ul className="list-inside list-disc space-y-1 pl-1">
                    <li>Manage bookings.</li>
                    <li>Provide customer support.</li>
                    <li>Meet accounting requirements.</li>
                    <li>Comply with legal obligations.</li>
                    <li>Resolve disputes.</li>
                </ul>
                <p>When your information is no longer required, it is securely deleted or anonymized.</p>
            </div>
        ),
    },
    {
        id: "data-security",
        number: "9",
        title: "Data security",
        body: (
            <div className="space-y-3">
                <p>
                    We implement reasonable technical and organizational measures to protect your
                    information from:
                </p>
                <ul className="list-inside list-disc space-y-1 pl-1">
                    <li>Unauthorized access.</li>
                    <li>Loss.</li>
                    <li>Misuse.</li>
                    <li>Alteration.</li>
                    <li>Disclosure.</li>
                </ul>
                <p>
                    Although we strive to protect your data, no method of internet transmission or
                    electronic storage is completely secure.
                </p>
            </div>
        ),
    },
    {
        id: "your-rights",
        number: "10",
        title: "Your rights",
        body: (
            <div className="space-y-3">
                <p>Depending on your location, you may have the right to:</p>
                <ul className="list-inside list-disc space-y-1 pl-1">
                    <li>Request access to your personal information.</li>
                    <li>Correct inaccurate information.</li>
                    <li>Request deletion of your information.</li>
                    <li>Restrict certain processing.</li>
                    <li>Withdraw consent where applicable.</li>
                    <li>Request a copy of your data.</li>
                </ul>
                <p>To exercise these rights, please contact us using the details below.</p>
            </div>
        ),
    },
    {
        id: "childrens-privacy",
        number: "11",
        title: "Children's privacy",
        body: (
            <p>
                Our website and services are not intended for children under the age of 18 without
                the involvement of a parent or legal guardian. We do not knowingly collect personal
                information from children.
            </p>
        ),
    },
    {
        id: "third-party-links",
        number: "12",
        title: "Third-party links",
        body: (
            <p>
                Our website may contain links to third-party websites. We are not responsible for
                the privacy practices or content of those websites. We encourage you to review their
                privacy policies before providing any personal information.
            </p>
        ),
    },
    {
        id: "international-visitors",
        number: "13",
        title: "International visitors",
        body: (
            <p>
                If you access our website from outside Sri Lanka, your information may be processed
                and stored in Sri Lanka or in countries where our service providers operate. By
                using our services, you consent to this transfer where permitted by law.
            </p>
        ),
    },
    {
        id: "changes-to-this-policy",
        number: "14",
        title: "Changes to this policy",
        body: (
            <p>
                We may update this Privacy Policy from time to time. Changes become effective
                immediately upon posting the updated version on this page. We encourage you to
                review this page periodically.
            </p>
        ),
    },
    {
        id: "contact",
        number: "15",
        title: "Contact us",
        body: (
            <div className="space-y-3">
                <p>
                    If you have any questions regarding this Privacy Policy or how your information
                    is handled, please contact us.
                </p>
                <p className="font-semibold text-[#0f2e2c]">
                    Lanka Lagoon Tours
                    <span className="block font-normal text-[#0f2e2c]/60">
                        Email: info@lankalagoon.com
                    </span>
                    <span className="block font-normal text-[#0f2e2c]/60">
                        Website: www.lankalagoon.com
                    </span>
                </p>
                <p>If your contact details change, this Privacy Policy will be updated accordingly.</p>
            </div>
        ),
    },
];

export default function PrivacyPolicy() {
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
                eyebrow="Your Data, Handled Carefully"
                heading={[
                    "Privacy",
                    <><span className="text-[#c9862f]">Policy</span></>,
                ]}
                description="How Lanka Lagoon Tours collects, uses, and protects your information."
                imageSrc="/images/hero1.webp"
            />

            <div className="mx-auto max-w-3xl text-center py-10 px-6">
                <span className={`${oswald.className} text-xs font-medium tracking-[0.35em] text-[#a86c1f]`}>
                    THE FINE PRINT
                </span>
                <h1 className={`${oswald.className} mt-4 text-4xl font-bold tracking-tight text-[#0f2e2c] sm:text-5xl`}>
                    Privacy Policy
                </h1>
                <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#0f2e2c]/60">
                    How we collect, use, store, and protect your information across the Lanka Lagoon
                    Tours platform.
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
                                <a
                                    href={`#${s.id}`}
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