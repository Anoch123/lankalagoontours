"use client";

import { useEffect, useRef, useState } from "react";
import PageHero from "@/components/ui/pageHero";
import Footer from "@/components/common/footer";
import { oswald, COUNTRIES } from "@/lib/constants/contact_us";

const MOORINGS = [
    {
        label: "Call",
        value: "+94 77 123 4567",
        href: "tel:+94771234567",
        icon: (
            <path d="M6 3h3l2 5-2.5 1.5a11 11 0 0 0 5 5L15 12l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 4 5a2 2 0 0 1 2-2Z" />
        ),
    },
    {
        label: "Email",
        value: "hello@lankalagoontours.com",
        href: "mailto:hello@lankalagoontours.com",
        icon: (
            <>
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
            </>
        ),
    },
    {
        label: "Find us",
        value: "Lagoon Jetty Road, Negombo",
        href: "https://maps.google.com/?q=Negombo+Lagoon",
        icon: (
            <>
                <path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z" />
                <circle cx="12" cy="9" r="2.5" />
            </>
        ),
    },
    {
        label: "Hours",
        value: "Daily, 6:00 AM – 6:30 PM",
        icon: (
            <>
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
            </>
        ),
    },
];

export default function ContactUs() {
    const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
    const [interest, setInterest] = useState<(typeof COUNTRIES)[number] | null>(null);
    const [selectCountryOpen, setSelectCountryOpen] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const countryDropdownRef = useRef<HTMLDivElement>(null);

    const handleChange = (field: keyof typeof form) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => setForm((f) => ({ ...f, [field]: e.target.value }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    phone: form.phone,
                    country: interest,
                    message: form.message,
                }),
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || "Something went wrong. Please try again.");
            }
            setSubmitted(true);
            setForm({ name: "", email: "", phone: "", message: "" });
            setInterest(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!selectCountryOpen) return;

        const handleClickOutside = (e: MouseEvent) => {
            if (
                countryDropdownRef.current &&
                !countryDropdownRef.current.contains(e.target as Node)
            ) {
                setSelectCountryOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [selectCountryOpen]);

    return (
        <div className="min-h-screen">
            <PageHero
                eyebrow="Get In Touch"
                heading={[
                    "Plan your",
                    <><span className="text-[#c9862f]">next tour</span></>,
                ]}
                description="Questions about routes, timings, or a custom charter? Send us a note and we'll get back to you within a day."
                imageSrc="/images/hero1.webp"
            />

            <div className="mx-auto max-w-3xl text-center py-10 px-6">
                <span className={`${oswald.className} text-xs font-medium tracking-[0.35em] text-[#a86c1f]`}>
                    REACH THE LAGOON
                </span>
                <h1 className={`${oswald.className} mt-4 text-5xl font-bold tracking-tight text-[#0f2e2c] sm:text-6xl`}>
                    Contact Us
                </h1>
                <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#0f2e2c]/60">
                    Whether it's your first mangrove tour or a private charter for a group,
                    we're here to help you find the right route.
                </p>
            </div>

            <div className="mx-auto mt-6 mb-24 grid max-w-6xl gap-10 px-6 sm:px-10 md:px-16 lg:grid-cols-[1.3fr_1fr] lg:gap-6">
                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="rounded-2xl border border-[#0f2e2c]/10 p-6 sm:p-8"
                >
                    <div className="grid gap-5 sm:grid-cols-2">
                        <label className="flex flex-col gap-2">
                            <span className={`${oswald.className} text-xs font-medium tracking-wide text-[#0f2e2c]/70`}>
                                Name
                            </span>
                            <input
                                required
                                value={form.name}
                                onChange={handleChange("name")}
                                placeholder="Your full name"
                                className="rounded-lg border border-[#0f2e2c]/15 bg-transparent px-4 py-3 text-sm text-[#0f2e2c] outline-none transition-colors placeholder:text-[#0f2e2c]/35 focus:border-[#c9862f]"
                            />
                        </label>

                        <label className="flex flex-col gap-2">
                            <span className={`${oswald.className} text-xs font-medium tracking-wide text-[#0f2e2c]/70`}>
                                Phone
                            </span>
                            <input
                                type="tel"
                                value={form.phone}
                                onChange={handleChange("phone")}
                                placeholder="Optional"
                                className="rounded-lg border border-[#0f2e2c]/15 bg-transparent px-4 py-3 text-sm text-[#0f2e2c] outline-none transition-colors placeholder:text-[#0f2e2c]/35 focus:border-[#c9862f]"
                            />
                        </label>
                    </div>

                    <label className="mt-5 flex flex-col gap-2">
                        <span className={`${oswald.className} text-xs font-medium tracking-wide text-[#0f2e2c]/70`}>
                            Email
                        </span>
                        <input
                            required
                            type="email"
                            value={form.email}
                            onChange={handleChange("email")}
                            placeholder="you@example.com"
                            className="rounded-lg border border-[#0f2e2c]/15 bg-transparent px-4 py-3 text-sm text-[#0f2e2c] outline-none transition-colors placeholder:text-[#0f2e2c]/35 focus:border-[#c9862f]"
                        />
                    </label>

                    {/* Custom dropdown — not a native select */}
                    <div ref={countryDropdownRef} className="relative mt-5 flex flex-col gap-2">
                        <span className={`${oswald.className} text-xs font-medium tracking-wide text-[#0f2e2c]/70`}>
                            Country From
                        </span>
                        <button
                            type="button"
                            onClick={() => setSelectCountryOpen((v) => !v)}
                            aria-expanded={selectCountryOpen}
                            className="flex items-center justify-between rounded-lg border border-[#0f2e2c]/15 bg-transparent px-4 py-3 text-left text-sm text-[#0f2e2c] transition-colors hover:border-[#c9862f]/60"
                        >
                            <span className={interest ? "text-[#0f2e2c]" : "text-[#0f2e2c]/35"}>
                                {interest ?? "Select a country"}
                            </span>
                            <span
                                className={`h-2 w-2 border-b-2 border-r-2 border-[#0f2e2c]/50 transition-transform ${selectCountryOpen ? "-translate-y-0.5 -rotate-135" : "rotate-45"
                                    }`}
                            />
                        </button>

                        {selectCountryOpen && (
                            <div className="absolute top-full z-20 mt-2 max-h-60 w-full overflow-y-auto rounded-lg border border-[#0f2e2c]/10 bg-[#faf8f3] shadow-lg">
                                {COUNTRIES.map((opt) => (
                                    <button
                                        key={opt}
                                        type="button"
                                        onClick={() => {
                                            setInterest(opt);
                                            setSelectCountryOpen(false);
                                        }}
                                        className={`${oswald.className} block w-full px-4 py-3 text-left text-sm font-medium text-[#0f2e2c] transition-colors hover:bg-[#c9862f]/10 hover:text-[#a86c1f]`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <label className="mt-5 flex flex-col gap-2">
                        <span className={`${oswald.className} text-xs font-medium tracking-wide text-[#0f2e2c]/70`}>
                            Message
                        </span>
                        <textarea
                            required
                            rows={5}
                            value={form.message}
                            onChange={handleChange("message")}
                            placeholder="Tell us about the group size, dates, or anything else"
                            className="resize-none rounded-lg border border-[#0f2e2c]/15 bg-transparent px-4 py-3 text-sm text-[#0f2e2c] outline-none transition-colors placeholder:text-[#0f2e2c]/35 focus:border-[#c9862f]"
                        />
                    </label>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`${oswald.className} mt-6 inline-flex items-center gap-2 rounded-full bg-[#c9862f] px-7 py-3 text-sm font-semibold text-[#0f2e2c] transition-transform hover:-translate-y-0.5 hover:bg-[#e7c16f] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
                    >
                        {loading ? "Sending..." : "Send Message"}
                    </button>

                    {error && (
                        <p className="mt-4 text-sm text-red-500">{error}</p>
                    )}

                    {submitted && !error && (
                        <p className="mt-4 text-sm text-[#a86c1f]">
                            Thanks — your message has been sent successfully. We'll be in touch shortly.
                        </p>
                    )}
                </form>

                {/* Contact info */}
                <div className="flex flex-col gap-4">
                    <span className={`${oswald.className} text-xs font-medium tracking-[0.3em] text-[#a86c1f]`}>
                        MOORINGS
                    </span>

                    {MOORINGS.map((item) => {
                        const Wrapper = item.href ? "a" : "div";
                        return (
                            <Wrapper
                                key={item.label}
                                {...(item.href ? { href: item.href } : {})}
                                className="flex items-start gap-4 rounded-2xl border border-[#0f2e2c]/10 p-5 transition-colors hover:border-[#c9862f]/50"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#c9862f"
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="mt-0.5 h-5 w-5 shrink-0"
                                >
                                    {item.icon}
                                </svg>
                                <div>
                                    <p className={`${oswald.className} text-xs font-medium tracking-wide text-[#0f2e2c]/50`}>
                                        {item.label}
                                    </p>
                                    <p className="mt-1 text-sm font-medium text-[#0f2e2c]">{item.value}</p>
                                </div>
                            </Wrapper>
                        );
                    })}
                </div>
            </div>

            <Footer />
        </div>
    );
}