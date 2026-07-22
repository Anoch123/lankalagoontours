import Image from "next/image";
import Navbar from "../common/navbar";

type CTA = {
  label: string;
  href?: string;
  onClick?: () => void;
  variant: "primary" | "outline";
};

type AllPageHeroProps = {
  eyebrow?: string;
  heading: React.ReactNode[];
  description: string;
  ctas?: CTA[];
  imageSrc?: string;
};

export default function PageHero({
  eyebrow,
  heading,
  description,
  ctas,
  imageSrc = "/images/img1.png",
}: AllPageHeroProps) {
  return (
    <section
      className="relative isolate flex min-h-[85vh] w-screen items-center overflow-hidden bg-[#0b0b0c]"
      style={{ marginLeft: "calc(50% - 50vw)", marginRight: "calc(50% - 50vw)" }}
    >
      <Image
        src={imageSrc}
        alt=""
        fill
        priority
        className="object-cover object-center"
      />
      <Navbar />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"
      />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-24 lg:px-8">
        <div className="max-w-2xl">
          {eyebrow && (
            <p className="font-display text-[13px] font-bold italic tracking-[0.08em] text-[#c9862f]">
              {eyebrow}
            </p>
          )}

          <h1 className="font-display mt-4 text-[35px] font-black italic uppercase leading-[0.98] tracking-tight text-[#f5f4f1] sm:text-[56px] lg:text-[64px]">
            {heading.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h1>

          <p className="font-body mt-6 max-w-lg text-[16px] leading-relaxed text-[#c9c9cc]">
            {description}
          </p>

          {ctas && ctas.length > 0 && (
            <div className="mt-9 flex flex-wrap items-center gap-4">
              {ctas.map((cta) =>
                cta.variant === "primary" ? (
                  cta.onClick ? (
                    <button
                      key={cta.label}
                      onClick={cta.onClick}
                      className="font-body inline-flex items-center justify-center bg-[#e30613] px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.06em] text-white transition-colors hover:bg-[#c90512]"
                    >
                      {cta.label}
                    </button>
                  ) : (
                    <a
                      key={cta.label}
                      href={cta.href || "#"}
                      className="font-body inline-flex items-center justify-center bg-[#e30613] px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.06em] text-white transition-colors hover:bg-[#c90512]"
                    >
                      {cta.label}
                    </a>
                  )
                ) : cta.onClick ? (
                  <button
                    key={cta.label}
                    onClick={cta.onClick}
                    className="font-body inline-flex items-center justify-center border border-white/70 px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.06em] text-white transition-colors hover:border-white hover:bg-white/10"
                  >
                    {cta.label}
                  </button>
                ) : (
                  <a
                    key={cta.label}
                    href={cta.href || "#"}
                    className="font-body inline-flex items-center justify-center border border-white/70 px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.06em] text-white transition-colors hover:border-white hover:bg-white/10"
                  >
                    {cta.label}
                  </a>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}