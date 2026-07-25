import { Fraunces, IBM_Plex_Mono } from "next/font/google";

const fraunces = Fraunces({
    subsets: ["latin"],
    weight: ["400", "500", "600"],
    style: ["normal", "italic"],
});

const plexMono = IBM_Plex_Mono({
    subsets: ["latin"],
    weight: ["400", "500"],
});

const ENTRIES = [
    {
        no: "01",
        label: "Owner",
        body: (
            <>
                This website is owned, designed, developed, and maintained by{" "}
                <strong className="text-[#1c2b23]">9X Solutions</strong>, a software
                development and digital solutions studio specialising in modern web
                applications, business websites, and digital experiences.
            </>
        ),
    },
    {
        no: "02",
        label: "Ownership",
        body: (
            <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2">
                <dt className={`${plexMono.className} text-xs uppercase tracking-[0.08em] text-gray-400`}>
                    Company
                </dt>
                <dd className="text-[#1c2b23]">9X Solutions</dd>

                <dt className={`${plexMono.className} text-xs uppercase tracking-[0.08em] text-gray-400`}>
                    Ownership type
                </dt>
                <dd className="text-[#1c2b23]">Website design &amp; development ownership</dd>

                <dt className={`${plexMono.className} text-xs uppercase tracking-[0.08em] text-gray-400`}>
                    Management
                </dt>
                <dd className="text-[#1c2b23]">9X Solutions</dd>

                <dt className={`${plexMono.className} text-xs uppercase tracking-[0.08em] text-gray-400`}>
                    Development
                </dt>
                <dd className="text-[#1c2b23]">9X Solutions</dd>
            </dl>
        ),
    },
    {
        no: "03",
        label: "Purpose",
        body: (
            <>
                This website has been developed for{" "}
                <strong className="text-[#1c2b23]">Lanka Lagoon Tours</strong>, a local
                lagoon tour operator based in Negombo, Sri Lanka. All tour-related
                information, services, and business content belong to the respective
                business owner.
            </>
        ),
    },
    {
        no: "04",
        label: "Intellectual property",
        body: (
            <>
                The website structure, design implementation, user interface, custom
                software components, and development work created by 9X Solutions
                remain the intellectual property of 9X Solutions, unless otherwise
                agreed through a separate written agreement.
            </>
        ),
    },
    {
        no: "05",
        label: "Copyright",
        body: (
            <>
                © {new Date().getFullYear()} 9X Solutions. All rights reserved.
                Unauthorised copying, reproduction, modification, or redistribution of
                the website design, code, or digital assets is prohibited.
            </>
        ),
    },
    {
        no: "06",
        label: "Contact",
        body: (
            <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2">
                <dt className={`${plexMono.className} text-xs uppercase tracking-[0.08em] text-gray-400`}>
                    Company
                </dt>
                <dd className="text-[#1c2b23]">9X Solutions</dd>

                <dt className={`${plexMono.className} text-xs uppercase tracking-[0.08em] text-gray-400`}>
                    Email
                </dt>
                <dd className="text-[#1c2b23]">info@9xsolutions.com</dd>

                <dt className={`${plexMono.className} text-xs uppercase tracking-[0.08em] text-gray-400`}>
                    Website
                </dt>
                <dd className="text-[#1c2b23]">www.9xsolutions.com</dd>
            </dl>
        ),
    },
];

export default function Ownership() {
    return (
        <main className="min-h-screen bg-[#faf8f3] px-6 py-20">
            <div className="mx-auto max-w-3xl">

                {/* Seal + header */}
                <section className="mb-14 flex flex-col items-center text-center">
                    <div className="relative mb-6 flex h-40 w-40 items-center justify-center rounded-full border border-dashed border-[#c9862f]/50">
                        <div className="flex h-[120px] w-[120px] items-center justify-center rounded-full bg-white shadow-sm">
                            <div className="text-center">
                                <img src="/images/9xsolutions.png" alt="9X Solutions" />
                            </div>
                        </div>
                    </div>

                    <p className={`${plexMono.className} text-xs uppercase tracking-[0.3em] text-[#c9862f]`}>
                        Legal Information
                    </p>

                    <h1 className={`${fraunces.className} mt-3 text-4xl text-[#1c2b23] sm:text-5xl`}>
                        Ownership &amp; Imprint
                    </h1>

                    <p className="mt-4 max-w-md text-sm leading-relaxed text-gray-500">
                        A record of who owns, built, and maintains this website.
                    </p>
                </section>

                {/* Ledger */}
                <section className="rounded-3xl border border-[#1c2b23]/10 bg-white shadow-sm">
                    <div className="divide-y divide-[#1c2b23]/10">
                        {ENTRIES.map((entry) => (
                            <div
                                key={entry.no}
                                className="grid grid-cols-[3rem_1fr] gap-x-4 px-6 py-8 sm:grid-cols-[5rem_10rem_1fr] sm:gap-x-8 sm:px-10"
                            >
                                <span className={`${plexMono.className} text-sm text-[#c9862f]`}>
                                    {entry.no}
                                </span>

                                <h2 className={`${fraunces.className} col-start-2 text-lg text-[#1c2b23] sm:col-start-2`}>
                                    {entry.label}
                                </h2>

                                <div className="col-span-2 mt-3 text-sm leading-relaxed text-gray-600 sm:col-span-1 sm:col-start-3 sm:mt-0">
                                    {entry.body}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Footer strip */}
                <p className={`${plexMono.className} mt-8 text-center text-[11px] uppercase tracking-[0.2em] text-gray-400`}>
                    Entry filed {new Date().getFullYear()} · 9X Solutions
                </p>
            </div>
        </main>
    );
}