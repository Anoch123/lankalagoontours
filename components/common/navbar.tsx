"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "../../app/css/navbar.css";
import { Oswald } from "next/font/google";
import { MENU } from "@/lib/constants/navbar";
import { app_text_constants } from "@/lib/constants/text_const";
import { Package } from "@/lib/types/api/tour_packages";
import { useBoatTours } from "@/hooks/admin/useBoatTours";

const oswald = Oswald({
    weight: "700",
    subsets: ["latin"]
});

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openDesktopMenu, setOpenDesktopMenu] = useState<string | null>(null);
    const [openMobileMenu, setOpenMobileMenu] = useState<string | null>(null);
    const closeMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [tours, setTours] = useState<Package[]>([]);
    const { listTour } = useBoatTours();
    const pathname = usePathname();

    useEffect(() => {
        if (typeof document === "undefined") return;

        const originalBodyOverflow = document.body.style.overflow;
        const originalHtmlOverflow = document.documentElement.style.overflow;

        document.body.style.overflow = mobileOpen ? "hidden" : originalBodyOverflow;
        document.documentElement.style.overflow = mobileOpen ? "hidden" : originalHtmlOverflow;

        return () => {
            document.body.style.overflow = originalBodyOverflow;
            document.documentElement.style.overflow = originalHtmlOverflow;
        };
    }, [mobileOpen]);

    useEffect(() => {

        const loadBoatTours = async () => {
            const response = await listTour();

            if (response) {
                setTours(response as Package[]);
            }
        }

        loadBoatTours();

    }, [])

    const menuItems = useMemo(() => {

        return MENU.map((item) => {

            if (item.label === "BOAT TOURS") {

                return {
                    ...item,
                    children: tours.map((tour) => ({
                        label: tour.title,
                        href: `/boat-tours/${tour.id}`,
                    }))
                };

            }

            return item;

        });

    }, [tours]);

    useEffect(() => {
        if (!mobileOpen) setOpenMobileMenu(null);
    }, [mobileOpen]);

    useEffect(() => {
        return () => {
            if (closeMenuTimeoutRef.current) {
                clearTimeout(closeMenuTimeoutRef.current);
            }
        };
    }, []);

    const navItems = menuItems.map(({ label, href, children }) => {
        const isActive = pathname === href || children?.some((c) => c.href === pathname);

        if (children?.length) {
            const isOpen = openDesktopMenu === label;
            return (
                <div
                    key={label}
                    className={`nav-dropdown ${isOpen ? "open" : ""}`}
                    onMouseEnter={() => {
                        if (closeMenuTimeoutRef.current) {
                            clearTimeout(closeMenuTimeoutRef.current);
                            closeMenuTimeoutRef.current = null;
                        }
                        setOpenDesktopMenu(label);
                    }}
                    onMouseLeave={() => {
                        closeMenuTimeoutRef.current = setTimeout(() => {
                            setOpenDesktopMenu(null);
                            closeMenuTimeoutRef.current = null;
                        }, 120);
                    }}
                >
                    <button
                        type="button"
                        className={`nav-dropdown-trigger ${isActive ? "active" : ""}`}
                        onClick={() => setOpenDesktopMenu(isOpen ? null : label)}
                        aria-expanded={isOpen}
                    >
                        <span className={`${oswald.className} textcolor text-[18px]`}>{label}</span>
                    </button>

                    <div className="nav-dropdown-menu">
                        {children.map((child) => (
                            <Link key={child.label} href={child.href} onClick={() => setOpenDesktopMenu(null)} className="uppercase">
                                {child.label}
                            </Link>
                        ))}
                    </div>
                </div>
            );
        }

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

    const mobileNavItems = menuItems.map(({ label, href, children }, i) => {
        const isActive = pathname === href || children?.some((c) => c.href === pathname);
        const index = String(i + 1).padStart(2, "0");

        if (children?.length) {
            const isOpen = openMobileMenu === label;
            return (
                <div key={label} className={`mobile-nav-dropdown ${isOpen ? "open" : ""}`}>
                    <button
                        type="button"
                        className="mobile-nav-dropdown-trigger"
                        onClick={() => setOpenMobileMenu(isOpen ? null : label)}
                        aria-expanded={isOpen}
                    >
                        <span style={{ display: "flex", alignItems: "baseline", gap: 0 }}>
                            <span className="mobile-nav-index">{index}</span>
                            <span className={`${oswald.className} text-[#0f2e2c]`}>{label}</span>
                        </span>
                        <span className="mobile-nav-dropdown-caret" />
                    </button>

                    <div className="mobile-nav-submenu ml-4">
                        {children.map((child) => (
                            <Link
                                key={child.label}
                                href={child.href}
                                onClick={() => {
                                    setMobileOpen(false);
                                    setOpenMobileMenu(null);
                                }}
                                className="uppercase"
                            >
                                {child.label}
                            </Link>
                        ))}
                    </div>
                </div>
            );
        }

        return (
            <Link
                key={label}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={isActive ? "active" : ""}
            >
                <span className="mobile-nav-index">{index}</span>
                <span className={`${oswald.className} textcolor`}>{label}</span>
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
                <div>
                    <a className="booktour" href="/book_tour">BOOK TOUR</a>
                </div>
            </nav>

            <button
                className="hamburger"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Open menu"
            >
                ☰
            </button>

            <nav className={`mobile-nav app-shell ${mobileOpen ? "open" : ""}`}>
                <div className="mobile-nav-header">
                    <Link href="/" onClick={() => setMobileOpen(false)}>
                        <img src="/images/web_logo.png" alt={app_text_constants.APP_NAME} />
                    </Link>
                    <button className="close-btn" onClick={() => setMobileOpen(false)} aria-label="Close menu">✕</button>
                </div>

                <div className="mobile-nav-list">
                    {mobileNavItems}
                </div>

                <div className="mobile-nav-footer">
                    <p>Ready to explore the lagoon?</p>
                    <a
                        className={`${oswald.className} mobile-booktour`}
                        href="/book_tour"
                    >
                        BOOK TOUR
                    </a>
                </div>
            </nav>

            {mobileOpen && (
                <div className="nav-overlay" onClick={() => setMobileOpen(false)} />
            )}
        </header>
    );
}