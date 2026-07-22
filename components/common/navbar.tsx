"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "../../app/css/navbar.css";
import { Oswald } from "next/font/google";
import { MENU } from "@/lib/constants/navbar";
import { app_text_constants } from "@/lib/constants/text_const";
import BookTestRideModal from "../models/bookTourModal";

const oswald = Oswald({
    weight: "700",
    subsets: ["latin"]
});

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [bookOpen, setBookOpen] = useState(false);
    const pathname = usePathname();

    const navItems = MENU.map(({ label, href }) => {
        const isActive = pathname === href;
        return (
            <Link
                key={label}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={isActive ? "active" : ""}
            >
                <span className={`${oswald.className} textcolor text-[18px] hover:text-[#c9862f] duration-300`}>{label}</span>
            </Link>
        );
    });

    return (
        <header className="navbar">
            <div className="logo">
                <Link href="/">
                    <img src="/images/web_logo.png" className="text-white" alt={app_text_constants.APP_NAME} />
                </Link>
            </div>

            <nav className="desktop-nav">
                {navItems}
                <div onClick={() => setBookOpen(true)}>
                    <button className="booktour">BOOK TOUR</button>
                </div>
            </nav>

            <button
                className="hamburger"
                onClick={() => setMobileOpen(!mobileOpen)}
            >
                ☰
            </button>

            <nav className={`mobile-nav app-shell ${mobileOpen ? "open" : ""}`}>
                <button className="close-btn" onClick={() => setMobileOpen(false)}>✕</button>
                {navItems}
                <Link href="/contact-us" onClick={() => setMobileOpen(false)}>
                    <button className={`${oswald.className} text-[18px] hover:text-[#01e044] bg-[#f5610c] text-white p-2 rounded w-full`}>BOOK TOUR</button>
                </Link>
            </nav>

            {mobileOpen && (
                <div className="nav-overlay" onClick={() => setMobileOpen(false)} />
            )}
            <BookTestRideModal isOpen={bookOpen} onClose={() => setBookOpen(false)} />
        </header>
    );
}