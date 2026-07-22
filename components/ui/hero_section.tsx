"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, Parallax } from "swiper/modules";
import { slides } from "@/lib/constants/hero";
import Navbar from "../common/navbar";
import TourBookingBar from "../ui/tour_booking_bar";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "../../app/css/hero_section.css";

const AUTOPLAY_DELAY = parseInt(process.env.AUTOPLAY_DELAY || "6500");

function ArrowIcon({ direction = "right" }: { direction?: "left" | "right" }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      style={{ transform: direction === "left" ? "scaleX(-1)" : undefined }}
    >
      <path
        d="M2 8h11.5M9 3.5 13.5 8 9 12.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="creative-showcase--slider">
      <Navbar />
      <Swiper
        modules={[Autoplay, Navigation, Pagination, Parallax]}
        className="swiper-container-h"
        speed={1600}
        loop
        effect="slide"
        parallax={{ enabled: true }}
        grabCursor
        autoplay={{
          delay: AUTOPLAY_DELAY,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          el: ".slider-pagination",
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className={`slide-bg ${
                slide.dark ? "overlay-dark" : "overlay-light"
              }`}
              style={
                !slide.video
                  ? { backgroundImage: `url(${slide.background})` }
                  : undefined
              }
            >
              {slide.video && (
                <video
                  className="slide-video-bg"
                  src={slide.video}
                  poster={slide.background}
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              )}

              <div className="slide-container">
                <div className="slide-row">
                  <div className="slider-content">
                    <div className="slide-eyebrow" data-swiper-parallax="-500">
                      <span className="ripple-mark" aria-hidden="true">
                        <span className="ripple-ring" />
                        <span className="ripple-ring" />
                        <span className="ripple-dot" />
                      </span>
                      <span className="eyebrow-text">
                        {String(index + 1).padStart(2, "0")} —{" "}
                        {slide.heading}
                      </span>
                    </div>

                    <h1 className="slide-heading" data-swiper-parallax="-700">
                      <span className="heading-sweep">{slide.heading}</span>
                    </h1>

                    <p className="slide-description" data-swiper-parallax="-500">
                      {slide.description}
                    </p>

                    <div className="slide-buttons" data-swiper-parallax="-400">
                      <button
                        className="slide-btn"
                        onClick={() => {
                          window.location.href = slide.ctaPrimary.href;
                        }}
                      >
                        {slide.ctaPrimary.label}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div className="slider-footer">
          <div className="slider-counter">
            <span className="counter-current">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <span className="counter-divider" />
            <span className="counter-total">
              {String(slides.length).padStart(2, "0")}
            </span>
          </div>

          <div className="slider-pagination" />

          <div className="slider-nav hidden md:flex">
            <button className="swiper-button-prev" aria-label="Previous slide">
              <ArrowIcon direction="left" />
            </button>
            <span className="tide-track hidden md:flex">
              <span className="tide-bar hidden md:flex" key={activeIndex} />
            </span>
            <button className="swiper-button-next" aria-label="Next slide">
              <ArrowIcon direction="right" />
            </button>
          </div>
        </div>
      </Swiper>

      <div className="hero-booking-overlay">
        <div className="hero-booking-inner">
          <TourBookingBar />
        </div>
      </div>
    </section>
  );
}