"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { resume } from "@/data/resume";
import { GlowCard } from "@/components/GlowCard";
import { SectionHeading } from "@/components/SectionHeading";
import { gsap, prefersReducedMotion, registerGsap } from "@/lib/gsap";

export function Projects() {
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid || prefersReducedMotion()) return;
    registerGsap();
    const cards = grid.querySelectorAll<HTMLElement>("[data-project]");
    gsap.set(cards, { clipPath: "inset(12% 0% 12% 0%)", autoAlpha: 0, rotateX: 18, transformPerspective: 900 });
    const tween = gsap.to(cards, {
      clipPath: "inset(0% 0% 0% 0%)",
      rotateX: 0,
      autoAlpha: 1,
      duration: 0.9,
      stagger: 0.14,
      ease: "power3.out",
      scrollTrigger: { trigger: grid, start: "top 78%", once: true },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      gsap.set(cards, { clearProps: "opacity,visibility,transform,clipPath" });
    };
  }, []);

  return (
    <section id="projects" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-12">
        <SectionHeading index="04" title="Projects" label="Selected Work" />
        <div ref={gridRef} className="flex flex-col gap-6 [perspective:1200px]">
          {resume.projects.map((project, index) => {
            const flipped = index % 2 === 1;
            return (
              <article
                key={project.title}
                data-project
                className={flipped ? "lg:ml-[10%]" : "lg:mr-[10%]"}
              >
                <GlowCard className="p-0">
                  <div className="grid lg:grid-cols-12">
                    <div
                      className={`flex min-w-0 flex-col justify-between gap-4 border-b border-accent/15 bg-[#202522] p-4 sm:gap-6 sm:p-8 lg:border-b-0 lg:border-r lg:border-accent/15 ${flipped ? "lg:order-2 lg:col-span-5" : "lg:col-span-5"} 2xl:col-span-4`}
                    >
                      <p className="font-mono text-4xl font-black tracking-tight text-accent sm:text-5xl">{project.index}</p>
                      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-white/10 bg-[#141816] lg:aspect-square">
                        <Image
                          src={`/project${index + 1}.png`}
                          alt={`${project.title} project image`}
                          fill
                          sizes="(min-width: 1280px) 320px, (min-width: 1024px) 35vw, (min-width: 640px) 80vw, 100vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <p className="font-mono text-[10px] font-bold tracking-[0.22em] text-white/70">{project.code}</p>
                    </div>
                    <div className={`min-w-0 p-4 sm:p-8 ${flipped ? "lg:order-1 lg:col-span-7 2xl:col-span-8" : "lg:col-span-7 2xl:col-span-8"}`}>
                      <h3 className="max-w-3xl text-xl font-bold tracking-tight transition-transform duration-300 group-hover:translate-x-1 sm:text-2xl md:text-3xl">
                        {project.title}
                      </h3>
                      <ul className="mt-6 space-y-3">
                        {project.highlights.map((item) => (
                          <li key={item} className="point flex gap-3 text-sm leading-relaxed text-white/75">
                            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </GlowCard>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
