"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Edit the clips here. Files live in /public/videos/.
 * `title` and `category` are optional — leave them empty ("") to hide the label.
 * `color` is the paint splatter around the card (colours from the logo and soundwave).
 */
const videos = [
  { src: "/videos/clip-01.mp4", poster: "/videos/clip-01.jpg", title: "", category: "", color: "#F1AC91" },
  { src: "/videos/clip-02.mp4", poster: "/videos/clip-02.jpg", title: "", category: "", color: "#D4246F" },
  { src: "/videos/clip-03.mp4", poster: "/videos/clip-03.jpg", title: "", category: "", color: "#B9B3AD" },
  { src: "/videos/clip-04.mp4", poster: "/videos/clip-04.jpg", title: "", category: "", color: "#8A48AE" },
  { src: "/videos/clip-05.mp4", poster: "/videos/clip-05.jpg", title: "", category: "", color: "#4466C4" },
  { src: "/videos/clip-06.mp4", poster: "/videos/clip-06.jpg", title: "", category: "", color: "#E9A0BD" },
  { src: "/videos/clip-07.mp4", poster: "/videos/clip-07.jpg", title: "", category: "", color: "#5EB3E4" },
];

const clipName = (i: number) => videos[i].title || `Clip ${i + 1}`;

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Showreel() {
  const trackRef = useRef<HTMLUListElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  // Once the visitor presses play on any clip, muted previews stop auto-playing
  const hasInteracted = useRef(false);

  const [soundIndex, setSoundIndex] = useState<number | null>(null);
  const [playing, setPlaying] = useState<boolean[]>(() => videos.map(() => false));
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  // Until the visitor picks a clip, play muted previews of cards in view; always pause cards that scroll out
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const i = Number((entry.target as HTMLElement).dataset.index);
          const video = videoRefs.current[i];
          if (!video) continue;
          if (entry.isIntersecting) {
            if (!hasInteracted.current && !prefersReducedMotion()) {
              void video.play().catch(() => {});
            }
          } else {
            video.pause();
          }
        }
      },
      { root: track, threshold: 0.35 }
    );
    videoRefs.current.forEach((video) => video && observer.observe(video));
    return () => observer.disconnect();
  }, []);

  // Only one clip may have sound at a time
  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (video) video.muted = i !== soundIndex;
    });
  }, [soundIndex]);

  const updateArrows = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setCanPrev(track.scrollLeft > 4);
    setCanNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateArrows();
    window.addEventListener("resize", updateArrows);
    return () => window.removeEventListener("resize", updateArrows);
  }, [updateArrows]);

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    const card = track?.querySelector("li");
    if (!track || !card) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollBy({
      left: direction * (card.getBoundingClientRect().width + gap),
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  // Play one clip with sound and stop all the others.
  // Runs inside the click itself so mobile browsers allow the audio.
  const playWithSound = (i: number) => {
    const video = videoRefs.current[i];
    if (!video) return;
    hasInteracted.current = true;
    videoRefs.current.forEach((v, j) => {
      if (v && j !== i) {
        v.pause();
        v.muted = true;
      }
    });
    video.muted = false;
    setSoundIndex(i);
    void video.play().catch(() => {});
  };

  const togglePlay = (i: number) => {
    const video = videoRefs.current[i];
    if (!video) return;
    if (video.paused || soundIndex !== i) {
      playWithSound(i);
    } else {
      video.pause();
    }
  };

  // Sound button: turns this clip's sound on (same as play), or mutes it while it keeps playing
  const toggleSound = (i: number) => {
    if (soundIndex === i) {
      setSoundIndex(null);
    } else {
      playWithSound(i);
    }
  };

  const setPlayingAt = (i: number, value: boolean) =>
    setPlaying((prev) => (prev[i] === value ? prev : prev.map((p, j) => (j === i ? value : p))));

  const arrowClass =
    "flex size-12 items-center justify-center rounded-full border-[1.5px] border-ink transition enabled:hover:bg-ink enabled:hover:text-cream disabled:cursor-default disabled:opacity-25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

  const arrow = (direction: 1 | -1) => (
    <button
      type="button"
      aria-label={direction === -1 ? "Previous videos" : "Next videos"}
      aria-controls="showreel-track"
      disabled={direction === -1 ? !canPrev : !canNext}
      onClick={() => scrollByCard(direction)}
      className={`${arrowClass} absolute top-1/2 z-10 hidden -translate-y-1/2 bg-sand md:flex ${
        direction === -1 ? "left-2 lg:left-4" : "right-2 lg:right-4"
      }`}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
        <path
          d={direction === -1 ? "M11 3 L5 9 L11 15" : "M7 3 L13 9 L7 15"}
          stroke="currentColor"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );

  return (
    <section id="showreel" aria-label="Showreel" className="scroll-mt-4 bg-sand pt-4 pb-16 md:pt-10 md:pb-[120px]">
      {/* Side gutters hold the arrows; the track shows 2 cards on tablet and 3 on desktop */}
      <div className="relative mx-auto max-w-[1440px] md:px-16 lg:px-20">
        {arrow(-1)}
        <ul
          id="showreel-track"
          ref={trackRef}
          onScroll={updateArrows}
          className="flex snap-x snap-mandatory scroll-px-9 gap-10 overflow-x-auto overscroll-x-contain px-9 py-12 [scrollbar-width:none] md:scroll-px-12 md:gap-16 md:px-12 [&::-webkit-scrollbar]:hidden"
        >
          {videos.map((video, i) => {
            const hasSound = soundIndex === i;
            // Muted previews show "play" — pressing it starts this clip with sound
            const isActive = hasSound && playing[i];
            const name = clipName(i);
            return (
              <li
                key={video.src}
                aria-label={`${name}, ${i + 1} of ${videos.length}`}
                className="relative w-[70vw] max-w-[330px] shrink-0 snap-start md:w-[calc((100%-4rem)/2)] md:max-w-none lg:w-[calc((100%-8rem)/3)]"
              >
                <div className="relative aspect-[9/16] overflow-hidden bg-ink/10">
                  <video
                    ref={(el) => {
                      videoRefs.current[i] = el;
                    }}
                    data-index={i}
                    src={video.src}
                    poster={video.poster}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-label={name}
                    onPlay={() => setPlayingAt(i, true)}
                    onPause={() => setPlayingAt(i, false)}
                    className="absolute inset-0 size-full object-cover"
                  />

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/55 to-transparent"
                  />

                  <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-3 md:inset-x-4 md:bottom-4">
                    <div className="min-w-0 text-cream">
                      {video.category && (
                        <p className="text-[11px] font-semibold tracking-[0.18em] uppercase opacity-85">{video.category}</p>
                      )}
                      {video.title && <p className="truncate text-sm font-medium">{video.title}</p>}
                    </div>

                    <div className="flex shrink-0 gap-2">
                      <button
                        type="button"
                        onClick={() => togglePlay(i)}
                        aria-label={`${isActive ? "Pause" : "Play"} ${name}`}
                        className="flex size-10 items-center justify-center rounded-full bg-cream/90 text-ink transition hover:bg-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
                      >
                        {isActive ? (
                          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                            <rect x="2.5" y="2" width="3" height="10" rx="1" fill="currentColor" />
                            <rect x="8.5" y="2" width="3" height="10" rx="1" fill="currentColor" />
                          </svg>
                        ) : (
                          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                            <path d="M4 2 L12 7 L4 12 Z" fill="currentColor" />
                          </svg>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleSound(i)}
                        aria-pressed={hasSound}
                        aria-label={`Sound for ${name}`}
                        className={`flex size-10 items-center justify-center rounded-full transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream ${
                          hasSound ? "bg-magenta text-cream" : "bg-cream/90 text-ink hover:bg-cream"
                        }`}
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                          <path d="M2 6 H5 L9 2.5 V13.5 L5 10 H2 Z" fill="currentColor" />
                          {hasSound ? (
                            <path d="M11.5 5 C13 6.5 13 9.5 11.5 11" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                          ) : (
                            <path d="M11 6 L15 10 M15 6 L11 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                          )}
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        {arrow(1)}
      </div>
    </section>
  );
}
