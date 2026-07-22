"use client";

import { useEffect, useRef, useState } from "react";

import { destinations } from "@/lib/constants/tour_booking_bar";
import { DOW } from "@/lib/constants/tour_booking_bar";

import { Destination, type OpenPanel } from "@/lib/types/tour_booking_bar";
import { startOfDay, getMonthGrid } from "@/lib/utils/date";

import "../../app/css/tour_booking_bar.css";

export default function TourBookingBar() {
  const [open, setOpen] = useState<OpenPanel>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [destination, setDestination] = useState<Destination | null>(null);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [viewMonth, setViewMonth] = useState<Date>(startOfDay(new Date()));

  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const today = startOfDay(new Date());
  const monthCells = getMonthGrid(viewMonth);
  const canGoPrevMonth =
    viewMonth.getFullYear() > today.getFullYear() ||
    (viewMonth.getFullYear() === today.getFullYear() && viewMonth.getMonth() > today.getMonth());

  const dateLabel = selectedDate
    ? selectedDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : "Add dates";

  const travelersLabel = `${adults + children} traveler${adults + children === 1 ? "" : "s"}`;

  function toggle(panel: OpenPanel) {
    setOpen((current) => (current === panel ? null : panel));
  }

  function handleSubmit() {
    const params = new URLSearchParams();
    if (destination) params.set("destination", destination.id);
    if (selectedDate) params.set("date", selectedDate.toISOString().slice(0, 10));
    params.set("adults", String(adults));
    params.set("children", String(children));
    window.location.href = `/tours?${params.toString()}`;
  }

  return (
    <div className="tour-booking" ref={containerRef}>
      <div className="booking-card">
        {/* ---------- destination ---------- */}
        <div className="booking-field">
          <button
            type="button"
            className="booking-field-trigger"
            data-open={open === "destination"}
            onClick={() => toggle("destination")}
          >
            <span className="booking-field-icon">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 1.5c-2.5 0-4.5 2-4.5 4.5 0 3.4 4.5 8.5 4.5 8.5s4.5-5.1 4.5-8.5c0-2.5-2-4.5-4.5-4.5Z"
                  stroke="currentColor"
                  strokeWidth="1.3"
                />
                <circle cx="8" cy="6" r="1.6" stroke="currentColor" strokeWidth="1.3" />
              </svg>
            </span>
            <span className="booking-field-copy">
              <span className="booking-field-label">Destination</span>
              <span className="booking-field-value" data-placeholder={!destination}>
                {destination ? destination.name : "Where to?"}
              </span>
            </span>
          </button>

          {open === "destination" && (
            <div className="booking-panel">
              {destinations.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  className="booking-option"
                  data-active={destination?.id === d.id}
                  onClick={() => {
                    setDestination(d);
                    setOpen(null);
                  }}
                >
                  <span className="booking-option-dot" />
                  {d.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ---------- date ---------- */}
        <div className="booking-field">
          <button
            type="button"
            className="booking-field-trigger"
            data-open={open === "date"}
            onClick={() => toggle("date")}
          >
            <span className="booking-field-icon">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="2" y="3.5" width="12" height="10.5" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
                <path d="M2 6.5h12M5 2v3M11 2v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            </span>
            <span className="booking-field-copy">
              <span className="booking-field-label">Tour Date</span>
              <span className="booking-field-value" data-placeholder={!selectedDate}>
                {dateLabel}
              </span>
            </span>
          </button>

          {open === "date" && (
            <div className="booking-panel">
              <div className="booking-calendar-head">
                <span className="booking-calendar-month">
                  {viewMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </span>
                <div className="booking-calendar-nav">
                  <button
                    type="button"
                    disabled={!canGoPrevMonth}
                    onClick={() =>
                      setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1))
                    }
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1))
                    }
                  >
                    ›
                  </button>
                </div>
              </div>

              <div className="booking-calendar-grid">
                {DOW.map((d, i) => (
                  <span className="booking-calendar-dow" key={i}>
                    {d}
                  </span>
                ))}
                {monthCells.map((cell, i) => {
                  if (!cell) return <span key={i} />;
                  const disabled = cell < today;
                  const isSelected =
                    selectedDate && startOfDay(cell).getTime() === startOfDay(selectedDate).getTime();
                  return (
                    <button
                      key={i}
                      type="button"
                      className="booking-calendar-day"
                      data-selected={isSelected}
                      data-disabled={disabled}
                      disabled={disabled}
                      onClick={() => {
                        setSelectedDate(cell);
                        setOpen(null);
                      }}
                    >
                      {cell.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* ---------- travelers ---------- */}
        <div className="booking-field">
          <button
            type="button"
            className="booking-field-trigger"
            data-open={open === "travelers"}
            onClick={() => toggle("travelers")}
          >
            <span className="booking-field-icon">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="6" cy="5.5" r="2.2" stroke="currentColor" strokeWidth="1.3" />
                <path d="M1.8 14c.4-2.6 2.1-4 4.2-4s3.8 1.4 4.2 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                <circle cx="11.2" cy="5.8" r="1.7" stroke="currentColor" strokeWidth="1.1" />
                <path d="M10.6 10.2c1.7.15 2.9 1.4 3.2 3.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
              </svg>
            </span>
            <span className="booking-field-copy">
              <span className="booking-field-label">Travelers</span>
              <span className="booking-field-value">{travelersLabel}</span>
            </span>
          </button>

          {open === "travelers" && (
            <div className="booking-panel">
              <div className="booking-stepper-row">
                <span className="booking-stepper-copy">
                  <span className="booking-stepper-label">Adults</span>
                  <span className="booking-stepper-hint">Age 13+</span>
                </span>
                <div className="booking-stepper-controls">
                  <button
                    type="button"
                    className="booking-stepper-btn"
                    disabled={adults <= 1}
                    onClick={() => setAdults((n) => Math.max(1, n - 1))}
                  >
                    −
                  </button>
                  <span className="booking-stepper-count">{adults}</span>
                  <button
                    type="button"
                    className="booking-stepper-btn"
                    disabled={adults >= 12}
                    onClick={() => setAdults((n) => Math.min(12, n + 1))}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="booking-stepper-row">
                <span className="booking-stepper-copy">
                  <span className="booking-stepper-label">Children</span>
                  <span className="booking-stepper-hint">Age 2–12</span>
                </span>
                <div className="booking-stepper-controls">
                  <button
                    type="button"
                    className="booking-stepper-btn"
                    disabled={children <= 0}
                    onClick={() => setChildren((n) => Math.max(0, n - 1))}
                  >
                    −
                  </button>
                  <span className="booking-stepper-count">{children}</span>
                  <button
                    type="button"
                    className="booking-stepper-btn"
                    disabled={children >= 6}
                    onClick={() => setChildren((n) => Math.min(6, n + 1))}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <button type="button" className="booking-submit" onClick={handleSubmit}>
          View Availability
        </button>
      </div>

      {/* <div className="booking-trust">
        <span className="booking-trust-dot" />
        Free cancellation up to 48hrs before departure
      </div> */}
    </div>
  );
}