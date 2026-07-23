import Image from "next/image";
import Link from "next/link";
import { fraunces, workSans, jetbrainsMono } from "@/lib/constants/home_about_us";
import { CERT_POINTS, GALLERY, SAFETY_POINTS, STATS, TIMELINE, REVIEWS } from "@/lib/constants/about_us";
import PageHero from "@/components/ui/pageHero";
import Footer from "@/components/common/footer";

export default function AboutUs() {
  return (
    <section
      className={`${fraunces.variable} ${workSans.variable} ${jetbrainsMono.variable} bg-[#fbfaf6]`}
    >
      <PageHero
        eyebrow="Our Story"
        heading={[
          "Story behind",
          <><span className="text-[#c9862f]">Lanka Lagoon</span></>,
        ]}
        description="Boat tours through the Negombo lagoon, led by the families who've fished and guided these waters for generations."
        imageSrc="/images/hero1.webp"
      />

      <div className="relative z-10 mx-auto -mt-10 max-w-6xl px-6 sm:-mt-14 lg:px-8">
        <div className="grid grid-cols-2 gap-4 rounded-2xl bg-[#0d2b28] p-4 shadow-xl shadow-[#0d2b28]/20 sm:grid-cols-4 sm:gap-0 sm:p-0">
          {STATS.map((stat, i) => (
            <div key={stat.label} className="relative flex flex-col items-center justify-center px-4 py-6 text-center">
              {i > 0 && (
                <span
                  className="absolute left-0 top-1/2 hidden h-12 -translate-y-1/2 border-l border-dashed border-[#f6f1e4]/20 sm:block"
                  aria-hidden="true"
                />
              )}
              <p
                className="text-[26px] font-semibold text-[#e7c16f] sm:text-[32px]"
                style={{ fontFamily: "var(--font-fraunces)" }}
              >
                {stat.value}
              </p>
              <p
                className="mt-1 text-[11px] uppercase tracking-[0.12em] text-[#f6f1e4]/60"
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-24 lg:px-8">
        <div className="text-center">
          <span
            className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#c99a3e]"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            How we got here
          </span>
          <h2
            className="mt-3 text-[28px] font-semibold text-[#0f2e2c] sm:text-[32px]"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            Our story
          </h2>
        </div>

        <div className="relative mt-16 pl-10 sm:pl-14">
          {/* the waterline */}
          <span
            className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-[#c99a3e] via-[#1f6f6b]/40 to-[#c99a3e] sm:left-[11px]"
            aria-hidden="true"
          />
          <div className="space-y-12">
            {TIMELINE.map((step) => (
              <div key={step.title} className="relative">
                <span
                  className="absolute -left-10 top-1 h-3.5 w-3.5 rounded-full border-2 border-[#c99a3e] bg-[#fbfaf6] sm:-left-14"
                  aria-hidden="true"
                />
                <span
                  className="block text-[13px] font-semibold uppercase tracking-[0.08em] text-[#c99a3e]"
                  style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                >
                  {step.year}
                </span>
                <p
                  className="mt-2 text-[16px] leading-[1.85] text-[#0f2e2c]/75 sm:text-[17px]"
                  style={{ fontFamily: "var(--font-work-sans)" }}
                >
                  {step.copy}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p
          className="mt-12 border-l-2 border-[#c99a3e]/40 pl-6 text-[16px] italic leading-[1.9] text-[#0f2e2c]/75 sm:text-[17px]"
          style={{ fontFamily: "var(--font-work-sans)" }}
        >
          Today, Lanka Lagoon is still run the way it started — by people who
          know these waters personally, not just professionally. Every tour
          we lead carries the same idea forward: growth here moves at the
          pace the lagoon can handle, not the other way around.
        </p>
      </div>

      {/* ------------------------------------------------------------ */}
      {/* Environmental commitment                                     */}
      {/* ------------------------------------------------------------ */}
      <div className="border-y border-[#0f2e2c]/[0.08] bg-[#0f2e2c]/[0.03]">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
          <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-lg shadow-[#0f2e2c]/10">
            <Image
              src="/images/mangroove_plants.png"
              alt="Mangrove ecosystem in the Negombo lagoon"
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f2e2c]/40 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 rounded-full bg-[#092826]/80 px-4 py-2 backdrop-blur-sm">
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#c99a3e]"
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
              >
                Mangrove replanting, ongoing
              </span>
            </div>
            <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full border border-[#c99a3e]/40" aria-hidden="true" />
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
              Mangroves aren&apos;t just scenery — they&apos;re the nursery
              for the fish stocks local families depend on and the buffer
              that keeps the shoreline from washing away. Every seedling we
              plant is part of keeping that balance intact for the next
              generation of guides who&apos;ll take over these boats.
            </p>

            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
              {["Native species only", "Community-led planting", "No single-use plastic"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#c99a3e]" aria-hidden="true" />
                  <span
                    className="text-[13px] text-[#0f2e2c]/60"
                    style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

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
      {/* Gallery strip — with a "book this" hover prompt               */}
      {/* ------------------------------------------------------------ */}
      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
        <div className="text-center">
          <span
            className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#c99a3e]"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            A taste of the tour
          </span>
          <h2
            className="mt-3 text-[28px] font-semibold text-[#0f2e2c] sm:text-[32px]"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            What you'll see out there
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {GALLERY.map((src, i) => (
            <div
              key={src}
              className={`group relative overflow-hidden rounded-xl ${i === 0 ? "col-span-2 row-span-2 aspect-square sm:aspect-auto" : "aspect-square"
                }`}
            >
              <Image
                src={src}
                alt="On tour with us"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-[#0d2b28]/70 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <Link
                  href="/tours"
                  className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#e7c16f]"
                  style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                >
                  Book this tour →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative overflow-hidden border-y border-[#0f2e2c]/[0.08] bg-[#0f2e2c]/[0.03] py-24">
        {/* ambient wave texture behind the whole section */}
        <svg
          className="pointer-events-none absolute inset-x-0 top-0 h-full w-full opacity-[0.05]"
          viewBox="0 0 1200 600"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 80 C 150 20, 300 140, 450 80 S 750 20, 900 80 1050 140 1200 80"
            fill="none"
            stroke="#0f2e2c"
            strokeWidth="2"
          />
          <path
            d="M0 520 C 150 460, 300 580, 450 520 S 750 460, 900 520 1050 580 1200 520"
            fill="none"
            stroke="#0f2e2c"
            strokeWidth="2"
          />
        </svg>

        <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
          <div className="text-center">
            <span
              className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#c99a3e]"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              What guests say
            </span>
            <h2
              className="mt-3 text-[28px] font-semibold text-[#0f2e2c] sm:text-[32px]"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              Postcards from the lagoon
            </h2>
            <p
              className="mx-auto mt-3 max-w-md text-[14px] leading-relaxed text-[#0f2e2c]/55"
              style={{ fontFamily: "var(--font-work-sans)" }}
            >
              A few notes guests have mailed back after a day on the water.
            </p>
          </div>

          {/* dotted boat-route connector, desktop only */}
          <svg
            className="pointer-events-none absolute left-0 right-0 top-[210px] hidden h-16 w-full sm:block"
            viewBox="0 0 1000 60"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M40 30 C 250 -10, 350 70, 500 30 S 750 -10, 960 30"
              fill="none"
              stroke="#c99a3e"
              strokeWidth="2"
              strokeDasharray="1 10"
              strokeLinecap="round"
            />
          </svg>

          <div className="relative mt-16 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-3">
            {REVIEWS.map((review, i) => {
              const tilt = i % 3 === 0 ? "-rotate-3" : i % 3 === 1 ? "rotate-2" : "-rotate-2";
              const tapeSide = i % 2 === 0 ? "left-8 -rotate-6" : "right-8 rotate-6";
              return (
                <div
                  key={review.name}
                  className={`group relative bg-[#fbfaf6] shadow-lg shadow-[#0f2e2c]/15 transition-all duration-300 hover:-translate-y-2 hover:rotate-0 hover:shadow-xl ${tilt}`}
                  style={{
                    clipPath:
                      "polygon(0 8px, 8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px))",
                  }}
                >
                  {/* washi tape */}
                  <div
                    className={`absolute -top-3 h-6 w-16 bg-[#c99a3e]/35 shadow-sm ${tapeSide}`}
                    aria-hidden="true"
                  />

                  {/* header strip: destination + stamp */}
                  <div className="flex items-start justify-between border-b border-dashed border-[#0f2e2c]/15 px-5 pb-3 pt-6">
                    <div>
                      <span
                        className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#1f6f6b]"
                        style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                      >
                        <svg viewBox="0 0 24 24" className="h-3 w-3" aria-hidden="true">
                          <path
                            d="M12 22s7-6.5 7-12A7 7 0 1 0 5 10c0 5.5 7 12 7 12Z"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.6"
                          />
                          <circle cx="12" cy="10" r="2.2" fill="currentColor" />
                        </svg>
                        Negombo Lagoon
                      </span>
                      {/* star rating */}
                      <div className="mt-2 flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, s) => (
                          <svg key={s} viewBox="0 0 20 20" className="h-3 w-3 fill-[#c99a3e]" aria-hidden="true">
                            <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.2-5.4 3.2 1.3-6-4.6-4.1 6.1-.6z" />
                          </svg>
                        ))}
                      </div>
                    </div>

                    {/* postage stamp */}
                    <div className="flex h-11 w-9 flex-shrink-0 rotate-3 flex-col items-center justify-center border border-dashed border-[#0f2e2c]/25 bg-[#0f2e2c]/[0.04]">
                      <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#1f6f6b]" aria-hidden="true">
                        <path
                          d="M2 17c2-3 4-3 6 0s4 3 6 0 4-3 6 0"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                        <path
                          d="M2 12c2-3 4-3 6 0s4 3 6 0 4-3 6 0"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          opacity="0.5"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* quote */}
                  <div className="px-5 py-5">
                    <span
                      className="text-[36px] leading-none text-[#c99a3e]/25"
                      style={{ fontFamily: "var(--font-fraunces)" }}
                      aria-hidden="true"
                    >
                      “
                    </span>
                    <p
                      className="-mt-3 text-[15px] italic leading-relaxed text-[#0f2e2c]/75"
                      style={{ fontFamily: "var(--font-work-sans)" }}
                    >
                      {review.quote}
                    </p>
                  </div>

                  {/* signature footer */}
                  <div className="flex items-center gap-3 border-t border-dashed border-[#0f2e2c]/15 px-5 py-4">
                    <span
                      className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#c99a3e] to-[#e7c16f] text-[11px] font-semibold text-[#0d2b28]"
                      style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                    >
                      {review.name.charAt(0)}
                    </span>
                    <div>
                      <p
                        className="text-[13px] font-semibold text-[#0f2e2c]"
                        style={{ fontFamily: "var(--font-work-sans)" }}
                      >
                        {review.name}
                      </p>
                      <p
                        className="text-[11px] uppercase tracking-[0.06em] text-[#0f2e2c]/50"
                        style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                      >
                        {review.trip}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------ */}
      {/* Certification                                                */}
      {/* ------------------------------------------------------------ */}
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
            <div className="rounded-full bg-gradient-to-br from-[#c99a3e] to-[#e7c16f] p-1 shadow-2xl">
              <div className="relative h-38 w-38 overflow-hidden rounded-full bg-white sm:h-56 sm:w-56">
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
    </section>
  );
}