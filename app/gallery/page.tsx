"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Oswald } from "next/font/google";
import { CATEGORIES, PHOTOS } from "@/lib/constants/gallery";
import { Category, Photo } from "@/lib/types/gallery";
import PageHero from "@/components/ui/pageHero";
import Footer from "@/components/common/footer";

const oswald = Oswald({
    weight: ["500", "700"],
    subsets: ["latin"],
});

export default function Gallery() {
    const [active, setActive] = useState<"All" | Category>("All");
    const [lightbox, setLightbox] = useState<number | null>(null);

    const filtered = useMemo(
        () => (active === "All" ? PHOTOS : PHOTOS.filter((p) => p.category === active)),
        [active]
    );

    const openAt = (photo: Photo) => {
        const idx = filtered.findIndex((p) => p.id === photo.id);
        setLightbox(idx);
    };

    const step = (dir: 1 | -1) => {
        if (lightbox === null) return;
        const next = (lightbox + dir + filtered.length) % filtered.length;
        setLightbox(next);
    };

    return (
        <div className="min-h-screen">

            <PageHero
                eyebrow="Gallery"
                heading={[
                    "Explore Our",
                    <><span className="text-[#c9862f]">Gallery</span></>,
                ]}
                description="Discover the beauty of Negombo Lagoon through our collection of unforgettable moments. From peaceful mangrove cruises and breathtaking sunsets to vibrant wildlife and memorable guest experiences, every photo captures the spirit of Lanka Lagoon Boat Tours."
                imageSrc="/images/hero1.webp"
            />
            {/* Header */}
            <div className="mx-auto max-w-3xl text-center py-10 sm:p-0 p-4 mt-10">
                <span className={`${oswald.className} text-xs font-medium tracking-[0.35em] text-[#a86c1f]`}>
                    THE LAGOON, UNSCRIPTED
                </span>
                <h1 className={`${oswald.className} mt-4 text-5xl font-bold tracking-tight text-[#0f2e2c] sm:text-6xl`}>
                    Gallery
                </h1>
                <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#0f2e2c]/60">
                    Mangrove channels at first light, sunsets over open water, and the everyday moments
                    of life on the lagoon — captured on tour.
                </p>
            </div>

            {/* Filter pills */}
            <div className="mx-auto sm: mt-10 mt-0 flex max-w-3xl flex-wrap items-center justify-center gap-2">
                {(["All", ...CATEGORIES] as const).map((cat) => {
                    const isActive = active === cat;
                    return (
                        <button
                            key={cat}
                            onClick={() => setActive(cat)}
                            className={`${oswald.className} rounded-full border px-4 py-2 text-xs font-medium tracking-wide transition-colors ${isActive
                                ? "border-[#c9862f] bg-[#c9862f] text-[#0f2e2c]"
                                : "border-[#0f2e2c]/15 text-[#0f2e2c]/60 hover:border-[#c9862f]/60 hover:text-[#a86c1f]"
                                }`}
                        >
                            {cat}
                        </button>
                    );
                })}
            </div>

            {/* Masonry grid */}
            <div className="mx-auto mt-14 max-w-6xl columns-1 gap-4 sm:columns-2 lg:columns-3 mb-20 px-6 sm:px-10 md:px-16">
                {filtered.map((photo) => (
                    <button
                        key={photo.id}
                        onClick={() => openAt(photo)}
                        className={`group relative mb-4 block w-full overflow-hidden rounded-xl border border-[#0f2e2c]/10 break-inside-avoid ${photo.tall ? "aspect-[3/4]" : "aspect-[4/3]"
                            }`}
                    >
                        <Image
                            src={photo.src}
                            alt={photo.title}
                            fill
                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f2e2c]/85 via-[#0f2e2c]/0 to-[#0f2e2c]/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        <div className="absolute inset-x-0 bottom-0 translate-y-2 p-4 text-left opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                            <span className={`${oswald.className} text-[10px] font-medium tracking-[0.2em] text-[#e7c16f]`}>
                                {photo.category.toUpperCase()}
                            </span>
                            <p className="mt-1 text-sm font-medium text-[#f5efe3]">{photo.title}</p>
                            <p className="mt-0.5 text-xs text-[#f5efe3]/70">{photo.tourName}</p>
                        </div>
                    </button>
                ))}
            </div>

            {/* Lightbox */}
            {lightbox !== null && filtered[lightbox] && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0f2e2c]/95 p-6 backdrop-blur-sm"
                    onClick={() => setLightbox(null)}
                >
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setLightbox(null);
                        }}
                        aria-label="Close"
                        className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-[#f5efe3]/20 text-[#f5efe3] transition-colors hover:border-[#c9862f] hover:text-[#c9862f]"
                    >
                        ✕
                    </button>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            step(-1);
                        }}
                        aria-label="Previous"
                        className="absolute left-4 flex h-10 w-10 items-center justify-center rounded-full border border-[#f5efe3]/20 text-[#f5efe3] transition-colors hover:border-[#c9862f] hover:text-[#c9862f] sm:left-8"
                    >
                        ‹
                    </button>

                    <div
                        className="relative max-h-[80vh] w-full max-w-3xl overflow-hidden rounded-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative aspect-[4/3] w-full sm:aspect-[16/10]">
                            <Image
                                src={filtered[lightbox].src}
                                alt={filtered[lightbox].title}
                                fill
                                sizes="100vw"
                                className="object-cover"
                            />
                        </div>
                        <div className="bg-[#0f2e2c] p-5 text-center">
                            <span className={`${oswald.className} text-[10px] font-medium tracking-[0.2em] text-[#e7c16f]`}>
                                {filtered[lightbox].category.toUpperCase()}
                            </span>
                            <p className="mt-1 text-sm font-medium text-[#f5efe3]">{filtered[lightbox].title}</p>
                            <p className="mt-0.5 text-xs text-[#f5efe3]/60">{filtered[lightbox].tourName}</p>
                        </div>
                    </div>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            step(1);
                        }}
                        aria-label="Next"
                        className="absolute right-4 flex h-10 w-10 items-center justify-center rounded-full border border-[#f5efe3]/20 text-[#f5efe3] transition-colors hover:border-[#c9862f] hover:text-[#c9862f] sm:right-8"
                    >
                        ›
                    </button>
                </div>
            )}

            <Footer />
        </div>
    );
}