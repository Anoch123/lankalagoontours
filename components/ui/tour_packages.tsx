"use client";

import { packages, waveClip } from "@/lib/constants/tour_packages";
import "../../app/css/tour_package.css";

export default function TourPackages() {
  return (
    <section className="py-14 sm:px-8 px-4">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-6">
          <div>
            <span className="lg-body inline-block text-[11px] font-semibold tracking-[0.28em] uppercase text-[#C99A3E] mb-3">
              Lanka Lagoon Tours
            </span>
            <h2 className="lg-display text-[#0E4A45] text-4xl sm:text-5xl font-medium leading-[1.05]">
              Tour Packages
            </h2>
          </div>
          <p className="lg-body text-[#12231F]/70 text-base leading-relaxed max-w-sm">
            From still mangrove lagoons to hill-country temples — every route
            is guided, small-group, and built around Sri Lanka's water.
          </p>
        </div>

        {/* Ripple divider */}
        <svg
          viewBox="0 0 1200 24"
          className="w-full h-4 mb-14"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 12 Q 50 2 100 12 T 200 12 T 300 12 T 400 12 T 500 12 T 600 12 T 700 12 T 800 12 T 900 12 T 1000 12 T 1100 12 T 1200 12"
            fill="none"
            stroke="#C99A3E"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>

        {/* Package grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <article
              key={pkg.id}
              className="group relative bg-white rounded-[4px] overflow-hidden shadow-[0_1px_2px_rgba(14,74,69,0.08)] hover:shadow-[0_16px_32px_-12px_rgba(14,74,69,0.28)] transition-shadow duration-300"
            >
              {/* Image with shoreline clip */}
              <div
                className="relative h-52 overflow-hidden"
                style={{ clipPath: waveClip }}
              >
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E4A45]/40 via-transparent to-transparent" />

                {pkg.tag && (
                  <span className="lg-body absolute top-3 left-3 bg-[#C99A3E] text-white text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-[2px]">
                    {pkg.tag}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="px-6 pt-5 pb-6">
                <span className="lg-body text-[10px] font-semibold tracking-[0.2em] uppercase text-[#1C6E63]">
                  {pkg.tagline}
                </span>
                <h3 className="lg-display text-[#0E4A45] text-xl font-medium mt-1.5 mb-2 leading-snug">
                  {pkg.title}
                </h3>
                <p className="lg-body text-[#12231F]/70 text-sm leading-relaxed mb-5">
                  {pkg.description}
                </p>

                <div className="flex items-center justify-between border-t border-[#0E4A45]/10 pt-4">
                  <div className="lg-body">
                    <p className="text-[11px] text-[#12231F]/50 uppercase tracking-wide">
                      {pkg.duration} Trip
                    </p>
                    <p className="text-[#0E4A45] font-semibold text-sm">
                      From {pkg.currency}{pkg.price}
                    </p>
                  </div>
                  <a
                    href={`/boat-tours/${pkg.id}`}
                    className="lg-body inline-flex items-center gap-1.5 text-sm font-semibold text-[#0E4A45] group/link"
                  >
                    View itinerary
                    <svg
                      viewBox="0 0 16 16"
                      className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 8h10M9 4l4 4-4 4" />
                    </svg>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}