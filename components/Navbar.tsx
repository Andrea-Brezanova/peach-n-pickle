"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Music", href: "/our-sound" },
  { label: "Weddings", href: "/weddings" },
  { label: "Events", href: "/events" },
  { label: "About", href: "/about" },
];

const CTA = { label: "Check availability", href: "/book" };

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Close the mobile menu with Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-30 bg-cream">
      <div className="flex h-[68px] items-center justify-between gap-4 px-5 md:h-[88px] md:px-10 lg:px-16">
        <Link href="/" aria-label="Peach & Pickle — home" className="shrink-0">
          <Image
            src="/peach-pickle-wordmark.png"
            alt="Peach & Pickle"
            width={900}
            height={298}
            loading="eager"
            className="h-9 w-auto md:h-11"
          />
        </Link>

        {/* Desktop links */}
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-[15px] font-medium xl:gap-9">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-magenta focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={CTA.href}
            className="inline-flex h-11 items-center rounded-full bg-ink px-4 text-[13px] font-semibold whitespace-nowrap text-cream transition hover:-translate-y-0.5 hover:bg-magenta focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink md:h-12 md:px-[22px] md:text-[15px]"
          >
            {CTA.label}
          </Link>

          {/* Menu toggle (below 1024px) */}
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="flex size-11 items-center justify-center rounded-full border-[1.5px] border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink lg:hidden"
          >
            {open ? (
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3 3 L13 13 M13 3 L3 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="18" height="14" viewBox="0 0 18 14" aria-hidden="true">
                <path d="M1 2 H17 M1 7 H17 M1 12 H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Menu panel (below 1024px) */}
      <nav
        id="mobile-menu"
        aria-label="Main"
        hidden={!open}
        className="absolute inset-x-0 top-full border-t border-ink/10 bg-cream px-5 pb-8 shadow-[0_24px_40px_-24px_rgb(20_20_20/0.25)] lg:hidden"
      >
        <ul className="flex flex-col">
          {NAV_LINKS.map((link) => (
            <li key={link.href} className="border-b border-ink/10">
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex min-h-14 items-center text-2xl font-semibold tracking-[-0.03em]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href={CTA.href}
          onClick={() => setOpen(false)}
          className="mt-6 flex h-14 w-full items-center justify-center rounded-full bg-ink text-base font-semibold text-cream"
        >
          {CTA.label}
        </Link>
      </nav>
    </header>
  );
}
