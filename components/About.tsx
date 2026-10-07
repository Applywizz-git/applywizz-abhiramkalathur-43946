"use client";

import { useLayoutEffect, useRef } from "react";
import { resume } from "@/data/resume";
import { GlowCard } from "@/components/GlowCard";
import { Icon3D } from "@/components/Icon3D";
import { LuLayers, LuMail } from "react-icons/lu";
import { SectionHeading } from "@/components/SectionHeading";
import { gsap, playScrollReveal, prefersReducedMotion, registerGsap } from "@/lib/gsap";

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion()) return;
    registerGsap();
    const counter = { value: 0 };
    const tween = gsap.to(counter, {
      value,
      duration: 1.35,
      ease: "power2.out",
      scrollTrigger: { trigger: node, start: "top 88%", once: true },
      onUpdate: () => {
        node.textContent = `${Math.round(counter.value).toLocaleString()}${suffix}`;
      },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      node.textContent = `${value.toLocaleString()}${suffix}`;
    };
  }, [suffix, value]);

  return (
    <div className="flex flex-col items-center justify-center px-3 py-8 text-center">
      <span ref={ref} className="stat-value text-4xl font-black tracking-tight md:text-5xl">
        {value.toLocaleString()}
        {suffix}
      </span>
      <span className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted sm:text-xs">
        {label}
      </span>
    </div>
  );
}

export function About() {
  const copyRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const node = copyRef.current;
    if (!node || prefersReducedMotion()) return;
    return playScrollReveal(node, node, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out" });
  }, []);

  return (
    <section id="about" className="relative overflow-hidden py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-12">
        <SectionHeading index="01" title="About Me" label="Professional Summary" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
          {resume.stats.map((stat) => (
            <div key={stat.label} className="md:col-span-4">
              <GlowCard className="h-full">
                <Stat value={stat.value} suffix={stat.suffix} label={stat.label} />
              </GlowCard>
            </div>
          ))}
          <div ref={copyRef} className="md:col-span-7">
            <GlowCard className="h-full p-5 sm:p-8">
              <h3 className="mb-6 text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl">
                From engineering release to efficient, dependable production.
              </h3>
              <p className="leading-relaxed text-muted">{resume.summary}</p>
              <p className="mt-6 font-mono text-xs uppercase tracking-[0.18em] text-accent">
                {resume.personal.availability}
              </p>
            </GlowCard>
          </div>
          <div className="grid gap-4 md:col-span-5">
            <GlowCard className="p-5" cursor="project">
              <div className="flex items-center justify-between gap-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">Contact</p>
                <Icon3D icon={LuMail} />
              </div>
              <a className="mt-3 block break-all text-sm text-white/80 transition-colors hover:text-white" href={`mailto:${resume.personal.email}`} data-cursor="link">
                {resume.personal.email}
              </a>
              <a className="mt-2 block text-sm text-white/80 transition-colors hover:text-white" href={resume.personal.phoneHref} data-cursor="link">
                {resume.personal.phone}
              </a>
            </GlowCard>
            <GlowCard className="p-5" cursor="project">
              <div className="flex items-center justify-between gap-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">Domains</p>
                <Icon3D icon={LuLayers} />
              </div>
              <ul className="mt-4 grid grid-cols-2 gap-2">
                {resume.domains.map((domain) => (
                  <li key={domain} className="chip rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3 text-sm text-white/80">
                    {domain}
                  </li>
                ))}
              </ul>
            </GlowCard>
          </div>
        </div>
      </div>
    </section>
  );
}
