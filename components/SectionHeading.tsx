"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, prefersReducedMotion, registerGsap, ScrollTrigger } from "@/lib/gsap";
import { scrambleTo } from "@/lib/scramble";

type SectionHeadingProps = {
  index: string;
  title: string;
  label: string;
};

export function SectionHeading({ index, title, label }: SectionHeadingProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const heading = titleRef.current;
    if (!root || !heading || prefersReducedMotion()) return;

    registerGsap();
    let cancelScramble = () => {};
    const finalTitle = title.toUpperCase();
    const playScramble = () => {
      cancelScramble();
      cancelScramble = scrambleTo(heading, finalTitle);
    };

    const tween = gsap.fromTo(
      root,
      { autoAlpha: 0, y: 16 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root,
          start: "top 84%",
          toggleActions: "restart reset restart reset",
          onEnter: playScramble,
          onEnterBack: playScramble,
          onLeave: () => cancelScramble(),
          onLeaveBack: () => cancelScramble(),
        },
      },
    );

    return () => {
      cancelScramble();
      heading.textContent = title.toUpperCase();
      tween.scrollTrigger?.kill();
      tween.kill();
      gsap.set(root, { clearProps: "opacity,visibility,transform" });
      ScrollTrigger.refresh();
    };
  }, [title]);

  return (
    <div ref={rootRef} className="section-heading relative mb-12 select-none md:mb-16">
      <span aria-hidden="true" className="section-index pointer-events-none mb-1 block">
        {index}
      </span>
      <div className="heading-mark relative border-l-2 border-accent pl-4">
        <h2 className="max-w-full font-black uppercase tracking-tight text-foreground">
          <span ref={titleRef}>{title}</span>
        </h2>
        <p className="mt-2 block font-mono text-xs uppercase tracking-[0.28em] text-muted">
          [ {label} ]
        </p>
      </div>
    </div>
  );
}
