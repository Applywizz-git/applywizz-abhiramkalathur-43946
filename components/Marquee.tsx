"use client";

import { useEffect, useRef } from "react";
import { Icon3D } from "@/components/Icon3D";
import { skillIcon } from "@/components/skillIcons";
import { prefersReducedMotion } from "@/lib/gsap";

type MarqueeProps = {
  items: readonly string[];
  direction?: 1 | -1;
  speed?: number;
};

export function Marquee({ items, direction = -1, speed = 0.65 }: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || prefersReducedMotion()) return;

    const firstSet = track.querySelector<HTMLElement>("[data-set='0']");
    if (!firstSet) return;

    let frame = 0;
    let x = direction === -1 ? 0 : -firstSet.offsetWidth;
    let paused = false;
    const width = () => firstSet.offsetWidth;

    const tick = () => {
      if (!paused) {
        x += speed * direction;
        const span = width();
        if (direction === -1 && x <= -span) x += span;
        if (direction === 1 && x >= 0) x -= span;
        track.style.transform = `translate3d(${x}px,0,0)`;
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    const pause = () => {
      paused = true;
    };
    const resume = () => {
      paused = false;
    };
    track.parentElement?.addEventListener("pointerenter", pause);
    track.parentElement?.addEventListener("pointerleave", resume);

    return () => {
      cancelAnimationFrame(frame);
      track.parentElement?.removeEventListener("pointerenter", pause);
      track.parentElement?.removeEventListener("pointerleave", resume);
    };
  }, [direction, speed, items]);

  const copies = [0, 1, 2, 3];

  return (
    <div className="relative overflow-hidden py-2 [perspective:800px]">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-surface to-transparent sm:w-16" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-surface to-transparent sm:w-16" />
      <div ref={trackRef} className="flex w-max will-change-transform">
        {copies.map((copy) => (
          <div key={copy} data-set={copy} className="flex items-center gap-3 pr-3 md:gap-4">
            {items.map((item) => (
              <span key={`${copy}-${item}`} className="skill-pill" data-cursor="link">
                <Icon3D icon={skillIcon(item)} className="icon-3d-sm" />
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
