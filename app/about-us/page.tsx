import Image from "next/image";
import { fraunces, workSans, jetbrainsMono } from "@/lib/constants/home_about_us";
import { CERT_POINTS, GALLERY, SAFETY_POINTS, STATS, TIMELINE } from "@/lib/constants/about_us";
import PageHero from "@/components/ui/pageHero";
import Footer from "@/components/common/footer";


export default function AboutUs() {
  return (
    <section
      className={`${fraunces.variable} ${workSans.variable} ${jetbrainsMono.variable}`}
    >
      <PageHero
        eyebrow="Our Story"
        heading={[
          "Story behind",
          <><span className="text-[#c9862f]">Lanka Lagoon</span></>,
        ]}
        description="Our Battery Swapping Station (BSS) network is designed to provide fast, reliable, and convenient battery exchange services for electric vehicle riders across Sri Lanka."
        imageSrc="/images/hero1.webp"
      />

      {/* ------------------------------------------------------------ */}
      {/* Stats strip                                                  */}
      {/* ------------------------------------------------------------ */}
      <div className="border-b border-[#0f2e2c]/[0.08]">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-8 px-6 py-12 sm:grid-cols-4 lg:px-8">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center ${i > 0 ? "sm:border-l sm:border-[#0f2e2c]/10" : ""}`}
            >
              <p
                className="text-[30px] font-semibold text-[#c99a3e] sm:text-[36px]"
                style={{ fontFamily: "var(--font-fraunces)" }}
              >
                {stat.value}
              </p>
              <p
                className="mt-1 text-[12px] uppercase tracking-[0.1em] text-[#0f2e2c]/55"
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ------------------------------------------------------------ */}
      {/* Our story — timeline                                         */}
      {/* ------------------------------------------------------------ */}
      <div className="mx-auto max-w-4xl px-6 py-20 lg:px-8">
        <div className="text-center">
          <h2
            className="text-[28px] font-semibold text-[#0f2e2c] sm:text-[32px]"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            Our story
          </h2>
          <p
            className="mx-auto mt-3 max-w-lg text-[15px] leading-relaxed text-[#0f2e2c]/60"
            style={{ fontFamily: "var(--font-work-sans)" }}
          >
            From one small boat to a proper fleet, without ever leaving the
            lagoon we grew up on.
          </p>
        </div>

        <div className="relative mt-14">
          <div className="absolute left-[15px] top-2 bottom-2 w-px bg-[#0f2e2c]/15 sm:left-1/2" />
          <div className="space-y-12">
            {TIMELINE.map((step, i) => (
              <div
                key={step.title}
                className={`relative flex flex-col gap-4 sm:flex-row sm:items-start ${
                  i % 2 === 1 ? "sm:flex-row-reverse sm:text-right" : ""
                }`}
              >
                <div className="flex-1" />
                <span className="absolute left-0 top-1 z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-[#c99a3e] bg-white sm:relative sm:left-auto sm:top-auto">
                  <span className="h-2 w-2 rounded-full bg-[#c99a3e]" />
                </span>
                <div className="flex-1 pl-12 sm:pl-0">
                  <span
                    className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#c99a3e]"
                    style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                  >
                    {step.year}
                  </span>
                  <h3
                    className="mt-1 text-[19px] font-semibold text-[#0f2e2c]"
                    style={{ fontFamily: "var(--font-fraunces)" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="mt-2 text-[14px] leading-relaxed text-[#0f2e2c]/60"
                    style={{ fontFamily: "var(--font-work-sans)" }}
                  >
                    {step.copy}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------ */}
      {/* Environmental commitment                                     */}
      {/* ------------------------------------------------------------ */}
      <div className="border-y border-[#0f2e2c]/[0.08] bg-[#0f2e2c]/[0.03]">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
            <Image
              src="/images/about/mangroves.jpg"
              alt="Mangrove ecosystem in the Negombo lagoon"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-4 left-4 rounded-full bg-[#092826]/80 px-4 py-2 backdrop-blur-sm">
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#c99a3e]"
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
              >
                Mangrove replanting, ongoing
              </span>
            </div>
          </div>
          <div>
            <span
              className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#c99a3e]"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              Conservation
            </span>
            <h2
              className="mt-3 text-[26px] font-semibold text-[#0f2e2c] sm:text-[30px]"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              Our commitment to the lagoon
            </h2>
            <p
              className="mt-4 text-[15px] leading-relaxed text-[#0f2e2c]/65"
              style={{ fontFamily: "var(--font-work-sans)" }}
            >
              The lagoon is our livelihood, so protecting it isn&apos;t
              optional. We work alongside local conservation groups on
              mangrove planting and clean-up days, and make sure our guests
              understand why this ecosystem matters — not just what it looks
              like from a boat.
            </p>
            <p
              className="mt-4 text-[15px] leading-relaxed text-[#0f2e2c]/65"
              style={{ fontFamily: "var(--font-work-sans)" }}
            >
              Low-impact boats, minimal plastic on tour, and a crew that
              treats the waterways like home — because they are.
            </p>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------ */}
      {/* Safety — card grid                                           */}
      {/* ------------------------------------------------------------ */}
      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
        <div className="text-center">
          <span
            className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#c99a3e]"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            On the water
          </span>
          <h2
            className="mt-3 text-[28px] font-semibold text-[#0f2e2c] sm:text-[32px]"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            Safe, professional tours
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SAFETY_POINTS.map((point, i) => (
            <div
              key={point.title}
              className="rounded-2xl border border-[#0f2e2c]/[0.08] bg-[#0f2e2c]/[0.02] p-6 transition-colors hover:border-[#c99a3e]/30"
            >
              <span
                className="text-[11px] font-semibold text-[#c99a3e]"
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3
                className="mt-3 text-[17px] font-semibold text-[#0f2e2c]"
                style={{ fontFamily: "var(--font-fraunces)" }}
              >
                {point.title}
              </h3>
              <p
                className="mt-2 text-[14px] leading-relaxed text-[#0f2e2c]/60"
                style={{ fontFamily: "var(--font-work-sans)" }}
              >
                {point.copy}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ------------------------------------------------------------ */}
      {/* Gallery strip                                                */}
      {/* ------------------------------------------------------------ */}
      <div className="mx-auto max-w-6xl px-6 pb-20 lg:px-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {GALLERY.map((src, i) => (
            <div
              key={src}
              className={`relative overflow-hidden rounded-xl ${
                i === 0 ? "col-span-2 row-span-2 aspect-square sm:aspect-auto" : "aspect-square"
              }`}
            >
              <Image src={src} alt="On tour with us" fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* ------------------------------------------------------------ */}
      {/* Quote                                                        */}
      {/* ------------------------------------------------------------ */}
      <div className="border-y border-[#0f2e2c]/[0.08] bg-[#0f2e2c]/[0.03]">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center lg:px-8">
          <svg
            viewBox="0 0 32 24"
            className="mx-auto h-8 w-8 text-[#c99a3e]/50"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M0 24V14.4Q0 7.2 3.6 3.6 7.2 0 13.2 0v4.8q-3.6 0-5.4 2.1-1.8 2.1-1.8 5.7h6v11.4H0Zm18.4 0V14.4q0-7.2 3.6-10.8Q25.6 0 31.6 0v4.8q-3.6 0-5.4 2.1-1.8 2.1-1.8 5.7h6v11.4H18.4Z" />
          </svg>
          <p
            className="mt-6 text-[20px] italic leading-relaxed text-[#0f2e2c] sm:text-[24px]"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            &ldquo;This lagoon raised us. Every tour we run is our way of
            introducing you to the place we call home.&rdquo;
          </p>
          <p
            className="mt-5 text-[12px] uppercase tracking-[0.14em] text-[#c99a3e]"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            Founder
          </p>
        </div>
      </div>

      {/* ------------------------------------------------------------ */}
      {/* Certification                                                */}
      {/* ------------------------------------------------------------ */}
      <div className="mx-auto max-w-4xl px-6 py-20 text-center lg:px-8">
        <span
          className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#c99a3e]"
          style={{ fontFamily: "var(--font-jetbrains-mono)" }}
        >
          Certified operator
        </span>
        <h2
          className="mt-3 text-[26px] font-semibold text-[#0f2e2c] sm:text-[30px]"
          style={{ fontFamily: "var(--font-fraunces)" }}
        >
          Registered as a marine eco-tourism operator
        </h2>
        <ul className="mx-auto mt-8 max-w-2xl space-y-3 text-left">
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
      <Footer />
    </section>
  );
}