"use client";

import Image from "next/image";
import "../../app/css/home_promo_banner.css";
import { fraunces, workSans, jetbrainsMono } from "@/lib/constants/home_about_us";

export default function PromoBanner() {
  return (
    <section
      className={`${fraunces.variable} ${workSans.variable} ${jetbrainsMono.variable} promo`}
    >
      <div className="banner">
        <Image
          src="/images/hero1.webp"
          alt="Traditional boat gliding through the Negombo lagoon mangroves"
          fill
          priority
          sizes="100vw"
          className="banner-img"
        />

        <div className="banner-scrim" />

        <div className="banner-content">
          <span className="eyebrow">Negombo, Sri Lanka</span>

          <h2>
            See Sri Lanka from the <em>water.</em>
          </h2>

          <p>
            Guided lagoon &amp; mangrove tours with local boatmen.
          </p>

          {/* Discount Badge */}
          <div className="discount">
            <span className="discount-percent">20% OFF</span>
            <span className="discount-text">
              Special seasonal offer for your lagoon adventure
            </span>
          </div>

          <div className="banner-footer">
            <div className="price">
              <span className="price-label">Tours from</span>

              <div className="price-row">
                <span className="old-price">$40</span>
                <span className="price-value">$30</span>
              </div>
            </div>

            <a href="/tours" className="cta">
              Book your tour

              <svg viewBox="0 0 16 16" aria-hidden="true">
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
      </div>
    </section>
  );
}