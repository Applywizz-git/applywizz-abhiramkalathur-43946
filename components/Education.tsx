"use client";

import { useLayoutEffect, useRef } from "react";
import { resume } from "@/data/resume";
import { GlowCard } from "@/components/GlowCard";
import { Icon3D } from "@/components/Icon3D";
import { SectionHeading } from "@/components/SectionHeading";
import { LuGraduationCap } from "react-icons/lu";
import { playScrollReveal, prefersReducedMotion } from "@/lib/gsap";

export function Education() {
  const listRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list || prefersReducedMotion()) return;
    const cards = list.querySelectorAll<HTMLElement>("[data-school]");
    return playScrollReveal(
      cards,
      list,
      { autoAlpha: 0, y: 36, rotateX: 16, transformPerspective: 900 },
      { autoAlpha: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.16, ease: "power3.out" },
    );
  }, []);

  return (
    <section id="education" className="relative py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-12">
        <SectionHeading index="05" title="Education" label="Academic Background" />
        <div ref={listRef} className="relative space-y-6 [perspective:1200px] md:space-y-8">
          <div
            aria-hidden="true"
            className="absolute bottom-6 left-5 top-6 w-px bg-gradient-to-b from-transparent via-accent/60 to-transparent lg:left-1/2"
          />
          {resume.education.map((school, index) => (
            <article
              key={school.degree}
              data-school
              className="relative grid grid-cols-[2.5rem_minmax(0,1fr)] items-center gap-x-3 lg:grid-cols-[minmax(0,1fr)_4rem_minmax(0,1fr)] lg:gap-x-0"
            >
              <div className="relative z-10 col-start-1 row-start-1 flex justify-center lg:col-start-2">
                <span className="grid h-10 w-10 place-items-center rounded-full border border-accent/50 bg-[#1b201e] font-mono text-xs font-bold text-accent shadow-[0_0_24px_rgba(231,168,62,0.18)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div className={`col-start-2 row-start-1 ${index % 2 === 0 ? "lg:col-start-1" : "lg:col-start-3"}`}>
                <GlowCard className="h-full p-5 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <p className="inline-flex items-center rounded-full border border-accent/25 bg-accent/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-accent sm:text-xs">
                      {school.dates}
                    </p>
                    <Icon3D icon={LuGraduationCap} className="shrink-0" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold leading-snug tracking-tight sm:text-2xl">{school.degree}</h3>
                  <p className="mt-3 font-semibold text-white/80">{school.school}</p>
                  <p className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-muted">
                    {school.location}
                  </p>
                </GlowCard>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
