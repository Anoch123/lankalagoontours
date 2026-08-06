"use client";

import Image from "next/image";
import { fraunces, workSans, jetbrainsMono } from "@/lib/constants/home_about_us";
import { ICONS, LINK_GROUPS, OFFICE_DETAILS, SOCIALS } from "@/lib/constants/footer";
import { useEffect, useMemo, useState } from "react";
import { useBoatTours } from "@/hooks/admin/useBoatTours";
import { Package } from "@/lib/types/api/tour_packages";

export default function Footer() {
  const [tours, setTours] = useState<Package[]>([]);
  const { listTour } = useBoatTours();

  useEffect(() => {
    const loadBoatTours = async () => {
      const response = await listTour();

      if (response) {
        setTours(response as Package[]);
      }
    }

    loadBoatTours();

  }, [])

  const linkGroups = useMemo(() => {
    return LINK_GROUPS.map((group) => {
      if (group.heading === "Our Tours") {
        return {
          ...group,
          links: tours.map((tour) => ({
            label: tour.title,
            href: `/boat-tours/${tour.id}`,
          })),
        };
      }

      return group;
    });
  }, [tours]);

  return (
    <footer
      className={`${fraunces.variable} ${workSans.variable} ${jetbrainsMono.variable} bg-[#092826]`}
    >
      <div className="border-b border-[#f6efde]/[0.08]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-12 text-center sm:flex-row sm:text-left lg:px-8">
          <h3
            className="text-[26px] font-semibold leading-tight text-[#f6efde] sm:text-[32px]"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            Ready to see Sri Lanka
            <span className="italic text-[#c99a3e]"> from the water?</span>
          </h3>
          <a
            href="/book_tour"
            className="inline-flex flex-shrink-0 items-center gap-2 rounded-full bg-[#c99a3e] px-7 py-3 text-[14px] font-semibold text-[#092826] transition-colors hover:bg-[#e0b452]"
            style={{ fontFamily: "var(--font-work-sans)" }}
          >
            Book your tour
            <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* ------------------------------------------------------------ */}
      {/* Main content                                                 */}
      {/* ------------------------------------------------------------ */}
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-0">
          {/* Brand block */}
          <div className="lg:w-[34%] lg:pr-12">
            <Image
              src="/images/lankalagoontours_white_logo.png"
              alt="Site logo"
              width={100}
              height={30}
              className="h-20 w-auto"
            />
            <p
              className="mt-5 max-w-xs text-[14px] leading-relaxed text-[#f6efde]/60"
              style={{ fontFamily: "var(--font-work-sans)" }}
            >
              Connecting travellers with authentic lagoon & mangrove experiences through trusted local boat operators in Negombo.
            </p>

            <div className="mt-7 flex items-center gap-3">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#f6efde]/15 text-[#f6efde]/60 transition-colors hover:border-[#c99a3e]/60 hover:text-[#c99a3e]"
                >
                  <span className="sr-only">{social.label}</span>
                  <svg
                    className="h-4 w-4"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Dashed divider, echoes the ticket-stub motif used site-wide */}
          <div className="hidden border-l border-dashed border-[#f6efde]/15 lg:block" />

          {/* Link groups + office details, laid out as an even row */}
          <div className="grid flex-1 grid-cols-2 gap-10 sm:grid-cols-3 lg:pl-12">
            {linkGroups.map((group) => (
              <div key={group.heading}>
                <p
                  className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#c99a3e]"
                  style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                >
                  {group.heading}
                </p>

                <ul className="mt-5 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-[14px] text-[#f6efde]/70 transition-colors hover:text-[#c99a3e]"
                        style={{ fontFamily: "var(--font-work-sans)" }}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="col-span-2 sm:col-span-1">
              <p
                className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#c99a3e]"
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
              >
                Office
              </p>
              <ul className="mt-5 space-y-4">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#f6efde]/[0.06] text-[#f6efde]/50">
                    <svg className="h-[14px] w-[14px]" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      {ICONS.pin.map((d) => (
                        <path key={d} d={d} />
                      ))}
                    </svg>
                  </span>
                  <span
                    className="pt-1 text-[14px] leading-relaxed text-[#f6efde]/70"
                    style={{ fontFamily: "var(--font-work-sans)" }}
                  >
                    {OFFICE_DETAILS.address}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#f6efde]/[0.06] text-[#f6efde]/50">
                    <svg className="h-[14px] w-[14px]" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      {ICONS.mail.map((d) => (
                        <path key={d} d={d} />
                      ))}
                    </svg>
                  </span>
                  <a
                    href={`mailto:${OFFICE_DETAILS.email}`}
                    className="pt-1 text-[14px] leading-relaxed text-[#f6efde]/70 transition-colors hover:text-[#c99a3e]"
                    style={{ fontFamily: "var(--font-work-sans)" }}
                  >
                    {OFFICE_DETAILS.email}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#f6efde]/[0.06] text-[#f6efde]/50">
                    <svg className="h-[14px] w-[14px]" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      {ICONS.phone.map((d) => (
                        <path key={d} d={d} />
                      ))}
                    </svg>
                  </span>
                  <a
                    href={`tel:${OFFICE_DETAILS.phone.replace(/\s+/g, "")}`}
                    className="pt-1 text-[14px] leading-relaxed text-[#f6efde]/70 transition-colors hover:text-[#c99a3e]"
                    style={{ fontFamily: "var(--font-work-sans)" }}
                  >
                    {OFFICE_DETAILS.phone}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#f6efde]/[0.08]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-center sm:flex-row sm:text-left lg:px-8">
          <a
            href="https://facebook.com/9xsolutions"
            className="text-[12px] text-[#f6efde]/40"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            © {new Date().getFullYear()} · DEVELOPED BY 9X SOLUTIONS.
          </a>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {["Website Ownership"].map(
              (item) => (
                <a
                  key={item}
                  href={"/admin/ownership"}
                  className="font-body text-[13px] text-[#6b6b70] transition-colors hover:text-[#f5f4f1]"
                >
                  {item}
                </a>
              )
            )}
          </nav>
        </div>
      </div>
    </footer>
  );
}