import Image from "next/image";
import Link from "next/link";

// Same destinations as the main navigation
const links = [
  { label: "Music", href: "/music" },
  { label: "Weddings", href: "/weddings" },
  { label: "Events", href: "/events" },
  { label: "Watch", href: "/watch" },
  { label: "About", href: "/about" },
];

export default function Footer() {
  return (
    <footer className="bg-ink px-5 pt-12 pb-9 text-cream sm:px-10 md:pt-16 md:pb-10 lg:px-16">
      <div className="mx-auto flex max-w-[1312px] flex-col gap-10 md:gap-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <Link href="/" aria-label="Peach & Pickle — home" className="self-start">
            <Image
              src="/peach-pickle-wordmark.png"
              alt="Peach & Pickle"
              width={900}
              height={298}
              className="h-[60px] w-auto invert md:h-[90px]"
            />
          </Link>

          <div className="flex flex-col gap-6 md:items-end">
            <nav aria-label="Footer">
              <ul className="grid grid-cols-2 text-[17px] md:flex md:gap-9 md:text-base">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="flex min-h-12 items-center hover:text-peach focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream md:min-h-0"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <Link
              href="/book"
              className="inline-flex h-12 items-center justify-center self-start rounded-full bg-cream px-[22px] text-[15px] font-semibold text-ink transition hover:bg-peach focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream md:self-end"
            >
              Check availability
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-cream/15 pt-6 text-sm text-[#cfc7c0] md:flex-row md:items-center md:justify-between">
          <p className="text-[13px] leading-relaxed font-semibold tracking-[0.2em] text-cream uppercase">
            Fancy stuff for your ears and events
          </p>
          <p>
            <a href="mailto:peachnpicklemusic@gmail.com" className="hover:text-peach">
              peachnpicklemusic@gmail.com
            </a>{" "}
            · © 2026 Peach &amp; Pickle
          </p>
        </div>
      </div>
    </footer>
  );
}
