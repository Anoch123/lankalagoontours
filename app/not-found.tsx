import Link from "next/link";
import { Oswald } from "next/font/google";

const oswald = Oswald({
  weight: ["500", "700"],
  subsets: ["latin"],
});

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0f2e2c] px-6 text-[#f5efe3]">
      <div className="relative flex w-full max-w-md flex-col items-center text-center">

        {/* Compass rose */}
        <div className="relative mb-8 h-28 w-28">
          <svg
            viewBox="0 0 100 100"
            className="h-full w-full motion-safe:animate-[drift_6s_ease-in-out_infinite]"
          >
            <circle cx="50" cy="50" r="46" fill="none" stroke="#e7c16f" strokeOpacity="0.35" strokeWidth="1" />
            <circle cx="50" cy="50" r="2" fill="#e7c16f" />
            {/* cardinal ticks */}
            {[0, 90, 180, 270].map((deg) => (
              <line
                key={deg}
                x1="50"
                y1="6"
                x2="50"
                y2="14"
                stroke="#e7c16f"
                strokeWidth="1.5"
                transform={`rotate(${deg} 50 50)`}
              />
            ))}
            {/* needle */}
            <g transform="rotate(28 50 50)">
              <polygon points="50,14 55,50 50,58 45,50" fill="#c9862f" />
              <polygon points="50,86 55,50 50,42 45,50" fill="#f5efe3" fillOpacity="0.5" />
            </g>
          </svg>
        </div>

        <span
          className={`${oswald.className} text-xs font-medium tracking-[0.35em] text-[#e7c16f]`}
        >
          OFF COURSE
        </span>

        <h1
          className={`${oswald.className} mt-4 text-7xl font-bold leading-none tracking-tight text-[#f5efe3]`}
        >
          404<span className="align-super text-2xl text-[#c9862f]">°</span>
        </h1>

        <h2 className={`${oswald.className} mt-3 text-xl font-medium tracking-wide`}>
          Lost Bearings
        </h2>

        <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#f5efe3]/60">
          This channel isn&apos;t on our charts. The page you&apos;re looking for has drifted
          past the mapped waters.
        </p>

        <Link
          href="/"
          className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#c9862f] px-7 py-3 text-sm font-semibold text-[#0f2e2c] transition-transform hover:-translate-y-0.5 hover:bg-[#e7c16f]"
        >
          Back to Home Port
        </Link>

        {/* wake line */}
        <svg
          viewBox="0 0 300 40"
          className="mt-12 w-64 text-[#e7c16f]/30"
          fill="none"
        >
          <path
            d="M0 20 Q 40 5, 80 20 T 160 20 T 240 20 T 300 20"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="1 8"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <style>{`
        @keyframes drift {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
      `}</style>
    </div>
  );
}