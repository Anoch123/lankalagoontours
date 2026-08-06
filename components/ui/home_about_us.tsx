"use client";

import { fraunces, workSans, jetbrainsMono } from "@/lib/constants/home_about_us";
import "../../app/css/home_about_us.css";

const credentials = [
  "Licensed local operators",
  "English-speaking guides",
  "Small-group boats",
  "Fair-trade partnerships",
];

const stats = [
  { value: "12+", label: "Partner boats" },
  { value: "9,000+", label: "Travellers guided" },
  { value: "4.9", label: "Average rating" },
];

const route = [
  { x: 40, y: 145, label: "Duwa Jetty" },
  { x: 150, y: 55, label: "Mangrove Channel" },
  { x: 260, y: 125, label: "Dutch Fort Point" },
];

export default function AboutUs() {
  return (
    <section className={`${fraunces.variable} ${workSans.variable} ${jetbrainsMono.variable} about py-14 sm:px-8 px-4`}>
      <div className="mx-auto max-w-7xl">
        <div className="wave" aria-hidden="true">
          <svg viewBox="0 0 400 34" preserveAspectRatio="none">
            <path
              d="M0 20 Q20 8 40 20 T80 20 T120 20 T160 20 T200 20 T240 20 T280 20 T320 20 T360 20 T400 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
            />
          </svg>
          <svg className="wave-boat" viewBox="0 0 48 30" fill="none">
            <path d="M4 20h40l-6 8H10l-6-8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            <path
              d="M24 20V4M24 4l10 6-10 4M24 8l-8 4"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
          <svg viewBox="0 0 400 34" preserveAspectRatio="none">
            <path
              d="M0 20 Q20 8 40 20 T80 20 T120 20 T160 20 T200 20 T240 20 T280 20 T320 20 T360 20 T400 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
            />
          </svg>
        </div>

        <div className="about-grid">
          <div className="about-copy">
            <span className="eyebrow">Negombo Lagoon &middot; Sri Lanka</span>

            <h2 className="headline">
              Authentic journeys, <em>trusted local partners</em>
            </h2>

            <div className="lede">
              <p>
                Welcome to Lanka Lagoon Tours, your gateway to authentic lagoon
                experiences in Negombo. We help travellers discover and book carefully
                selected boat tours operated by experienced local tourism partners who
                know these waters better than anyone.
              </p>
              <p>
                From peaceful mangrove cruises and vibrant fishing villages to incredible
                birdlife and breathtaking sunsets, every experience offers a genuine look
                at one of Sri Lanka's most beautiful coastal environments. Our partner
                operators share their local knowledge, culture, and passion with every
                journey.
              </p>
              <p>
                Whether you're looking for a relaxing lagoon cruise, a wildlife adventure,
                or a memorable day exploring Negombo's waterways, we make it easy to find
                trusted local operators and book the experience that's right for you.
              </p>
              <p>
                At Lanka Lagoon Tours, our goal is simple: connect travellers with
                authentic local experiences while supporting the communities and tourism
                operators that make Negombo Lagoon such a special destination.
              </p>
            </div>

            <ul className="credentials">
              {credentials.map((c) => (
                <li key={c}>
                  <svg viewBox="0 0 16 16" aria-hidden="true">
                    <path
                      d="M2 8.5 6 12l8-8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {c}
                </li>
              ))}
            </ul>

            <div className="log-strip">
              {stats.map((s) => (
                <div className="log-stat" key={s.label}>
                  <span className="stat-value">{s.value}</span>
                  <span className="stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <aside className="ticket">
            <div className="ticket-tag">Our route, roughly</div>

            <svg className="route-map" viewBox="0 0 300 170" aria-hidden="true">
              <path
                d="M40 145 Q95 65 150 55 Q210 45 260 125"
                fill="none"
                stroke="var(--gold)"
                strokeWidth="1.6"
                strokeDasharray="1 7"
                strokeLinecap="round"
              />
              {route.map((p, i) => (
                <g key={p.label}>
                  <circle cx={p.x} cy={p.y} r="5" fill="var(--coral)" />
                  <circle cx={p.x} cy={p.y} r="9" fill="none" stroke="var(--coral)" strokeWidth="1" opacity="0.45" />
                  <text x={p.x} y={i === 1 ? p.y - 16 : p.y + 18} className="route-map-label">
                    {p.label}
                  </text>
                </g>
              ))}
              <g transform="translate(255,22)" opacity="0.6">
                <circle cx="0" cy="0" r="16" fill="none" stroke="var(--lagoon)" strokeWidth="1" />
                <path d="M0 -12 L4 0 L0 12 L-4 0 Z" fill="var(--lagoon)" />
                <path d="M-12 0 L0 4 L12 0 L0 -4 Z" fill="var(--ink-soft)" />
              </g>
            </svg>

            <div className="stitch" aria-hidden="true" />

            <div className="quote-block">
              <span className="pin" aria-hidden="true" />
              <blockquote>
                People don&apos;t come back for the boat. They come back for the
                hour just before sunset, when the water goes flat and gold and
                the whole canal goes quiet.
              </blockquote>
              <div className="quote-attr">
                <span className="quote-name">Rohitha Prince</span>
                <span className="quote-role">Founder &amp; head boatman</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}