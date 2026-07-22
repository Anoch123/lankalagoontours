"use client";

import { fraunces, workSans, jetbrainsMono, credentials, stats, route } from "@/lib/constants/home_about_us";
import "../../app/css/home_about_us.css"

export default function AboutUs() {
  return (
    <section className={`${fraunces.variable} ${workSans.variable} ${jetbrainsMono.variable} about py-14 sm:px-8 px-4`}>
      <div className="mx-auto max-w-7xl">
        <div className="divider" aria-hidden="true">
          <span className="divider-line" />
          <svg className="divider-boat" viewBox="0 0 48 30" fill="none">
            <path
              d="M4 20h40l-6 8H10l-6-8Z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            <path
              d="M24 20V4M24 4l10 6-10 4M24 8l-8 4"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
          <span className="divider-line" />
        </div>

        <div className="wrap">
          <div className="copy">
            <div className="eyebrow">Negombo, Sri Lanka</div>

            <div className="heading-row">
              <h2>
                Local hands, <em>local waters</em>
              </h2>
              <div className="stamp" aria-hidden="true">
                <svg viewBox="0 0 90 90">
                  <circle
                    cx="45"
                    cy="45"
                    r="41"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeDasharray="3 3"
                  />
                  <path
                    id="stamp-curve"
                    d="M 45 12 A 33 33 0 0 1 78 45"
                    fill="none"
                  />
                  <text className="stamp-text-top">
                    <textPath href="#stamp-curve" startOffset="0%">
                      EST. 2010 · NEGOMBO
                    </textPath>
                  </text>
                  <text x="45" y="49" textAnchor="middle" className="stamp-num">
                    15
                  </text>
                  <text x="45" y="61" textAnchor="middle" className="stamp-sub">
                    YEARS
                  </text>
                </svg>
              </div>
            </div>

            <p>
              Welcome to Lanka Lagoon Tours, where unforgettable journeys
              begin on the calm waters of Sri Lanka's breathtaking lagoons.
              We connect travelers with experienced local boat guides who share
              their passion, stories, and knowledge of the places they call home.
            </p>
            <p>
              Cruise through peaceful waterways surrounded by lush mangrove forests,
              tropical birds, colorful fishing boats, and the natural beauty of Sri Lanka's
              coastal ecosystems. Experience the authentic lifestyle of local fishing communities,
              discover hidden islands, and learn about the traditions and cultural heritage that
              make each destination unique.
            </p>
            <p>
              Whether you are looking for a relaxing sunset cruise, a nature adventure, or
              a memorable cultural experience, our carefully selected local boat operators
              are ready to show you the true spirit of Sri Lanka from the water.
            </p>
            <p>
              Relax, explore, and create unforgettable memories with Lanka Lagoon
              Tours — your gateway to authentic lagoon experiences.
            </p>

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

            <div className="stats">
              {stats.map((s) => (
                <div className="stat" key={s.label}>
                  <span className="stat-value">{s.value}</span>
                  <span className="stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="log-card">
            <span className="log-tag">Our route, roughly</span>

            <svg className="log-map" viewBox="0 0 300 180" aria-hidden="true">
              <path
                d="M40 150 Q95 70 150 60 Q210 50 260 130"
                fill="none"
                stroke="var(--gold)"
                strokeWidth="1.6"
                strokeDasharray="1 7"
                strokeLinecap="round"
              />
              {route.map((p, i) => (
                <g key={p.label}>
                  <circle cx={p.x} cy={p.y} r="5" fill="var(--coral)" />
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r="9"
                    fill="none"
                    stroke="var(--coral)"
                    strokeWidth="1"
                    opacity="0.5"
                  />
                  <text
                    x={p.x}
                    y={i === 1 ? p.y - 16 : p.y + 22}
                    textAnchor="middle"
                    className="log-map-label"
                  >
                    {p.label}
                  </text>
                </g>
              ))}
              <g transform="translate(255,25)" opacity="0.55">
                <circle
                  cx="0"
                  cy="0"
                  r="17"
                  fill="none"
                  stroke="var(--ink)"
                  strokeWidth="1"
                />
                <path d="M0 -13 L4 0 L0 13 L-4 0 Z" fill="var(--ink)" />
                <path d="M-13 0 L0 4 L13 0 L0 -4 Z" fill="var(--ink-soft)" />
              </g>
            </svg>

            <div className="log-divider" />

            <svg className="quote-mark" viewBox="0 0 32 24" aria-hidden="true">
              <path
                d="M0 24V13.6C0 5.4 4.9 0.6 12.4 0L13 3.4C8.6 4.3 6.6 7 6.4 10.4H12V24H0ZM19 24V13.6C19 5.4 23.9 0.6 31.4 0L32 3.4C27.6 4.3 25.6 7 25.4 10.4H31V24H19Z"
                fill="currentColor"
              />
            </svg>
            <p className="quote">
              People don&apos;t come back for the boat. They come back for the
              hour just before sunset, when the water goes flat and gold and
              the whole canal goes quiet.
            </p>
            <div className="quote-attr">
              <span className="quote-name">Rohitha Fernando</span>
              <span className="quote-role">Founder &amp; head boatman</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}