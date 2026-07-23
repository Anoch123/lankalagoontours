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
            <p>
                Lanka Lagoon Tours is a Sri Lankan tourism operator offering lagoon cruises,
                mangrove adventures, and private boat charters on Negombo Lagoon.
            </p>
        ),
    },
    {
        id: "contact",
        number: "2",
        title: "Contact details",
        body: (
            <ul className="space-y-1">
                <li>Telephone and WhatsApp: +94 77 123 4567</li>
                <li>Email: hello@lankalagoontours.com</li>
                <li>Post: Lagoon Jetty Road, Negombo 11500, Sri Lanka</li>
                <li>Website: www.lankalagoontours.com</li>
            </ul>
        ),
    },
    {
        id: "definitions",
        number: "3",
        title: "Within this Terms and Conditions (T&Cs)",
        body: (
            <p>
                Any use of &lsquo;Our&rsquo;, &lsquo;We&rsquo;, &lsquo;Lanka Lagoon Tours&rsquo; or &lsquo;LLT&rsquo; refers to
                Lanka Lagoon Tours. Any use of &lsquo;you&rsquo;, &lsquo;your&rsquo;, &lsquo;the guest&rsquo; or
                &lsquo;the agent&rsquo; refers to any persons or organisations named in a booking or purchase,
                including any persons added later. These T&amp;Cs constitute the agreement between you
                and us.
            </p>
        ),
    },
    {
        id: "date-changes",
        number: "4",
        title: "Tour time and date changes policy",
        body: (
            <div className="space-y-4">
                <p>
                    For all changes to tour times and dates, communications between you and us shall be
                    made through your telephone number (WhatsApp and SMS) and email address provided by
                    you in the booking process. This is required for confirming your identity at the
                    time of communication. The contact details of LLT are shown in Section 2 of this
                    document. All communications must quote the LLT booking confirmation number and
                    emails must have the tour confirmation document attached.
                </p>
                <div>
                    <h4 className="font-semibold text-[#0f2e2c]">4.1 Change requests by you</h4>
                    <p className="mt-2">
                        Changes or transfers of bookings by you to another date or time may be made up to
                        24 hours prior to the tour time, subject to availability. Each change request
                        incurs a transfer fee of 10% of the tour value. Changes or transfers will only be
                        granted to the same tour type or category. Where a booking change or transfer is
                        applied to a special offer or promotional price tour, you must pay any difference
                        between the original price and the transferred booking&rsquo;s price if the
                        conditions or timing of the offer are no longer valid. Any change made less than
                        24 hours prior to the tour time will be treated in accordance with our
                        cancellation policy (Section 5). Exceptions are at the discretion of Lanka Lagoon
                        Tours.
                    </p>
                </div>
                <div>
                    <h4 className="font-semibold text-[#0f2e2c]">4.2 Changes made by us</h4>
                    <p className="mt-2">
                        Lanka Lagoon Tours reserves the right to make changes to tour dates and times where
                        unforeseen safety or logistical issues require it (e.g. heavy rain or strong
                        winds). There will be no charge to you in such cases, and where a new date or
                        time cannot be agreed, the cancellation policy in Section 5 will apply.
                    </p>
                </div>
            </div>
        ),
    },
    {
        id: "cancellation",
        number: "5",
        title: "Tour cancellation and refund policy",
        body: (
            <div className="space-y-5">
                <p>
                    For all cancellation and refund requests, communications between you and us shall be
                    made through the telephone number (WhatsApp and SMS) and email address provided by
                    you in the booking process, quoting your booking confirmation number with the tour
                    confirmation document attached to any email.
                </p>
                <div>
                    <h4 className="font-semibold text-[#0f2e2c]">5.1 Cancellations made by you</h4>
                    <div className="mt-3 overflow-hidden rounded-xl border border-[#0f2e2c]/10">
                        <table className="w-full border-collapse text-left text-sm">
                            <thead>
                                <tr className="bg-[#0f2e2c]/[0.04]">
                                    <th className="px-4 py-3 font-medium text-[#0f2e2c]/70">Timing</th>
                                    <th className="px-4 py-3 font-medium text-[#0f2e2c]/70">Pre-paid tours</th>
                                    <th className="px-4 py-3 font-medium text-[#0f2e2c]/70">Post-paid / account tours</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-t border-[#0f2e2c]/10">
                                    <td className="px-4 py-3">Less than 24 hours prior, or no-show</td>
                                    <td className="px-4 py-3">No refund</td>
                                    <td className="px-4 py-3">Invoiced in full</td>
                                </tr>
                                <tr className="border-t border-[#0f2e2c]/10">
                                    <td className="px-4 py-3">24&ndash;48 hours prior</td>
                                    <td className="px-4 py-3">50% refund</td>
                                    <td className="px-4 py-3">Invoiced for 50%</td>
                                </tr>
                                <tr className="border-t border-[#0f2e2c]/10">
                                    <td className="px-4 py-3">More than 48 hours prior</td>
                                    <td className="px-4 py-3">Refund less 3% bank charges</td>
                                    <td className="px-4 py-3">No cost</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div>
                    <h4 className="font-semibold text-[#0f2e2c]">5.2 Cancellations made by us</h4>
                    <p className="mt-2">
                        Lanka Lagoon Tours reserves the right to cancel tours at any time where unforeseen
                        safety or logistical issues require it (e.g. heavy rain or strong winds). You
                        will receive a full refund unless you opt for an LLT credit note for future use.
                        Credit notes are issued for the full tour value and are valid for 12 months.
                    </p>
                </div>
            </div>
        ),
    },
    {
        id: "variations",
        number: "6",
        title: "Variations in tours or activities",
        body: (
            <p>
                We reserve the right, in unforeseen circumstances (e.g. heavy rain, strong winds,
                extreme tides or currents, mechanical breakdown), to make changes to tours or activities
                to ensure safety and meet our service commitment to you. This may include substitution
                of boats, changes to tour routes, activity locations, or scheduled programs. In such
                circumstances, we are not liable for your direct or indirect loss, and will not refund
                tour charges or portions thereof, nor be liable for any other damage, loss, expense,
                loss of time, disappointment, inconvenience, or consequential loss.
            </p>
        ),
    },
    {
        id: "dietary",
        number: "7",
        title: "Special dietary requests",
        body: (
            <p>
                We are pleased to cater for the special dietary requirements of guests attending LLT
                events. Please inform us of any food preferences or allergies at booking time. While we
                take every care in food preparation, we cannot guarantee the absence of traces of
                certain products, and explicitly accept no liability. You must make your own decisions
                on assessing risk when planning meals and ingredients with the LLT team. We will respect
                your choices or decisions not to consume food prepared by LLT.
            </p>
        ),
    },
    {
        id: "liability",
        number: "8",
        title: "Liability for loss, damage and injury",
        body: (
            <div className="space-y-4">
                <p>
                    <span className="font-semibold text-[#0f2e2c]">8.1</span> Our tours and activities
                    operate on Negombo Lagoon, adjacent streams and near-coastal waterways, and are
                    subject to the risks and perils of boating and water sport activities including
                    loss, damage and injury arising from changing currents, tidal and weather
                    conditions, and the navigation of other craft. To the extent permissible by law, we
                    will not be responsible in tort, contract or otherwise for any loss or damage arising
                    out of injury or death sustained by you or any other passenger, whether or not
                    arising from our negligence. By booking with us, you acknowledge your understanding
                    of and agreement with these terms. Where any guarantee, term, condition or warranty
                    is implied by Sri Lankan law and cannot lawfully be excluded, then to the extent
                    permissible:
                </p>
                <ul className="list-inside list-disc space-y-1 pl-1">
                    <li>we exclude all other guarantees, terms, conditions and warranties; and</li>
                    <li>
                        our liability for breach of such guarantee, term, condition or warranty is
                        limited to re-supplying the relevant tour or activity, or its cost.
                    </li>
                </ul>
                <p>
                    <span className="font-semibold text-[#0f2e2c]">8.2</span> We exclude all liability
                    for any loss or damage to clothing, personal items or belongings, howsoever arising.
                </p>
                <p>
                    <span className="font-semibold text-[#0f2e2c]">8.3</span> We may contract or arrange
                    for third parties to provide the whole or part of the tour or activity and related
                    services. You must not bring any claims or actions against such third parties; if you
                    do so in breach of this agreement, you agree to indemnify us and the third party
                    against the consequences. You agree that in entering this agreement, we act as agent
                    of and trustee for each of our employees, officers, agents and subcontractors, each
                    of whom is deemed a party to the contract for the purpose of enforcing and relying on
                    these Terms and Conditions.
                </p>
            </div>
        ),
    },
    {
        id: "insurance",
        number: "9",
        title: "Guest responsibility for travel insurance",
        body: (
            <p>
                Guests are responsible for taking out valid travel insurance. You must ensure this
                insurance offers acceptable cover for CF tours and activities.
            </p>
        ),
    },
    {
        id: "conduct",
        number: "10",
        title: "Rules regarding conduct and behaviour",
        body: (
            <div className="space-y-4">
                <div>
                    <h4 className="font-semibold text-[#0f2e2c]">10.1 Following instructions of LLT staff</h4>
                    <p className="mt-2">
                        Guests agree to follow all instructions given by LLT staff and crew during their
                        tour or activity, including safety demonstrations, wearing life jackets, and
                        following instructions in emergency situations.
                    </p>
                </div>
                <div>
                    <h4 className="font-semibold text-[#0f2e2c]">10.2 Guest safety information</h4>
                    <p className="mt-2">
                        Guests must notify us of any health issues, special needs or mobility limitations
                        at the time of booking, so we can provide appropriate assistance and ensure
                        safety.
                    </p>
                </div>
                <div>
                    <h4 className="font-semibold text-[#0f2e2c]">10.3 Alcohol and intoxicating substances</h4>
                    <p className="mt-2">
                        At LLT&rsquo;s complete discretion, we may refuse boarding or participation for any
                        guest who appears intoxicated, with no refund provided. No alcohol may be
                        consumed on LLT tours unless arranged with LLT in writing at booking, and never by
                        guests under Sri Lanka&rsquo;s legal drinking age.
                    </p>
                </div>
                <div>
                    <h4 className="font-semibold text-[#0f2e2c]">10.4 Offensive behaviour</h4>
                    <p className="mt-2">
                        Aggressive, quarrelsome or disorderly behaviour is not accepted. Guests may be
                        refused boarding or asked to disembark, with no refund. Instructions from the LLT
                        Captain or staff to de-escalate must be respected by all guests. LLT may call the
                        Sri Lanka Police if required.
                    </p>
                </div>
            </div>
        ),
    },
    {
        id: "media",
        number: "11",
        title: "Photography, social media and marketing",
        body: (
            <p>
                We regularly use photographs and videos taken during our tours and activities on social
                media, the Lanka Lagoon Tours website and other promotional materials. Please let us know
                at the start of your tour if you do not consent to this use.
            </p>
        ),
    },
    {
        id: "conditionality",
        number: "12",
        title: "Conditionality of these terms and conditions",
        body: (
            <p>
                If any provision of these terms is unenforceable, this does not affect the
                enforceability of the rest. In the event of inconsistency between these terms and any
                other terms, these Terms and Conditions prevail to the extent of the inconsistency. No
                waiver or variation of this agreement is binding unless in writing and signed by us.
            </p>
        ),
    },
    {
        id: "disputes",
        number: "13",
        title: "Dispute resolution",
        body: (
            <p>
                This contract, regardless of where it is performed, is governed by and construed in
                accordance with the laws of the Democratic Socialist Republic of Sri Lanka. Disputes
                arising from this contract shall be settled by negotiation between Lanka Lagoon Tours
                and yourself. Where a resolution cannot be reached, you submit to the
                non-exclusive jurisdiction of the Commercial High Court of Western Province, or any
                other competent court in Sri Lanka with jurisdiction over commercial transactions in the
                judicial district of Colombo. The court&rsquo;s decision is final and binding on all
                parties.
            </p>
        ),
    }
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
                    "Terms &",
                    <><span className="text-[#c9862f]">Conditions</span></>,
                ]}
                description="The agreement between you and Lanka Lagoon Tours for every tour and activity we run."
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
                    Terms and conditions for tour guests on Lanka Lagoon Tours.
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
                                    className={`-ml-px block border-l-2 py-1.5 pl-4 text-sm transition-colors ${
                                        activeId === s.id
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
                            className={`scroll-mt-24 py-8 text-sm leading-relaxed text-[#0f2e2c]/75 ${
                                i !== 0 ? "border-t border-[#0f2e2c]/10" : ""
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