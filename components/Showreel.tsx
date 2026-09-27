"use client";

import { useState } from "react";
import Image from "next/image";

const VIDEO_ID = "yQZKB6inr90";
const VIDEO_TITLE = "Peach & Pickle — live teaser";
// Privacy-enhanced embed; autoplay only kicks in after the visitor presses play
const EMBED_URL = `https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0&playsinline=1`;

/**
 * One featured performance video. Shows a light poster first and only loads the YouTube
 * player when the visitor presses play, so it doesn't slow down the page.
 */
export default function Showreel() {
  const [playing, setPlaying] = useState(false);

  return (
    <section
      id="showreel"
      aria-label="See us in action"
      className="relative scroll-mt-4 bg-sand px-5 py-12 sm:px-10 md:py-20 lg:px-16 lg:py-24"
    >
      <div className="mx-auto flex max-w-[1240px] flex-col items-center">
        {/* Light grey mat around the video */}
        <div className="relative w-full bg-[#dcd7d2] p-2 shadow-[0_30px_50px_-30px_rgb(70_45_35/0.35)] md:p-3.5">
          <div className="relative aspect-video overflow-hidden bg-ink">
            {playing ? (
              <iframe
                src={EMBED_URL}
                title={VIDEO_TITLE}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute inset-0 size-full"
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label={`Play video: ${VIDEO_TITLE}`}
                className="group absolute inset-0 size-full cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
              >
                <Image
                  src="/videos/showreel-poster-simona.jpg"
                  alt=""
                  fill
                  sizes="(min-width: 1400px) 1240px, 100vw"
                  className="object-cover"
                />
                <span className="absolute top-1/2 left-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ink/45 text-cream ring-1 ring-cream/40 backdrop-blur-sm transition group-hover:scale-105 group-hover:bg-ink/65 md:size-[72px]">
                  <svg viewBox="0 0 14 14" aria-hidden="true" className="ml-0.5 size-4 md:size-6">
                    <path d="M3 1 L13 7 L3 13 Z" fill="currentColor" />
                  </svg>
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
