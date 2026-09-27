import Image from "next/image";
import Link from "next/link";

// Same destinations as the main navigation (+ FAQ, which lives on the booking page)
const links = [
  { label: "Home", href: "/" },
  { label: "Our sound", href: "/our-sound" },
  { label: "Weddings", href: "/weddings" },
  { label: "Events", href: "/events" },
  { label: "Watch", href: "/watch" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/book#faq" },
];

// Contact details from the business card
const contact = {
  email: "peachnpicklemusic@gmail.com",
  phones: [
    { name: "Simona", display: "0489 51 22 47", tel: "+32489512247" },
    { name: "Xavier", display: "0478 63 28 26", tel: "+32478632826" },
  ],
  instagram: { handle: "@peachnpicklemusic", href: "https://www.instagram.com/peachnpicklemusic/" },
};

const legal = [
  { label: "Privacy policy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Legal notice", href: "#" },
];

const socials = [
  {
    label: "Instagram",
    href: contact.instagram.href,
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17.3" cy="6.7" r="1.2" fill="currentColor" />
      </>
    ),
  },
];

const heading = "mb-4 text-xs font-semibold tracking-[0.22em] text-peach uppercase";
const footerLink =
  "flex min-h-11 items-center hover:text-peach focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream md:min-h-8";

export default function Footer() {
  return (
    <footer className="bg-ink px-5 pt-[52px] pb-8 text-[15px] text-cream sm:px-10 md:px-16 md:pt-20 md:pb-9">
      <div className="mx-auto flex max-w-[1120px] flex-col gap-9 md:gap-14">
        <div className="grid gap-9 md:grid-cols-[1.4fr_0.8fr_1.2fr] md:gap-12">
          {/* Brand */}
          <div className="flex flex-col">
            <Link href="/" aria-label="Peach & Pickle — home" className="self-start">
              <Image
                src="/peach-pickle-wordmark.png"
                alt="Peach & Pickle"
                width={900}
                height={298}
                className="h-[58px] w-auto invert md:h-[72px]"
              />
            </Link>
            <p className="mt-[18px] text-xs leading-[1.7] font-semibold tracking-[0.24em] uppercase">
              Fancy stuff for your ears
              <br />
              and events
            </p>
            <ul className="mt-6 flex gap-2.5">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${s.label} (opens in a new tab)`}
                    className="flex size-11 items-center justify-center rounded-full border border-cream/35 hover:border-peach hover:text-peach focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                      {s.icon}
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-5 md:contents">
            <nav aria-label="Footer" className="flex flex-col">
              <p className={heading}>Explore</p>
              <ul>
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={footerLink}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex flex-col text-sm [overflow-wrap:anywhere] md:text-[15px]">
              <p className={heading}>Contact</p>
              <a href={`mailto:${contact.email}`} className={footerLink}>
                {contact.email}
              </a>
              {contact.phones.map((p) => (
                <a key={p.tel} href={`tel:${p.tel}`} className={footerLink}>
                  {p.name} · {p.display}
                </a>
              ))}
              <a
                href={contact.instagram.href}
                target="_blank"
                rel="noopener noreferrer"
                className={footerLink}
              >
                Instagram · {contact.instagram.handle}
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-cream/15 pt-5 text-xs leading-relaxed text-[#cfc7c0] md:flex-row md:justify-between md:gap-6 md:pt-[22px] md:text-[13px]">
          <span>© 2026 Peach &amp; Pickle · [Company name] · VAT/BCE [number]</span>
          <span className="flex flex-wrap gap-x-[22px] gap-y-2">
            {legal.map((l) => (
              <a key={l.label} href={l.href} className="hover:text-peach">
                {l.label}
              </a>
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
}
