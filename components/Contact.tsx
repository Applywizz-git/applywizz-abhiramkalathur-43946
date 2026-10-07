"use client";

import { useLayoutEffect, useRef } from "react";
import { resume } from "@/data/resume";
import { GlowCard } from "@/components/GlowCard";
import { Icon3D } from "@/components/Icon3D";
import { SectionHeading } from "@/components/SectionHeading";
import { LuLinkedin, LuMail, LuMapPin, LuPhone } from "react-icons/lu";
import { gsap, prefersReducedMotion, registerGsap } from "@/lib/gsap";

export function Contact() {
  const headingRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const heading = headingRef.current;
    if (!heading || prefersReducedMotion()) return;
    registerGsap();
    const lines = heading.querySelectorAll<HTMLElement>("[data-line]");
    gsap.set(lines, { yPercent: 110 });
    const tween = gsap.to(lines, {
      yPercent: 0,
      duration: 0.9,
      stagger: 0.08,
      ease: "power4.out",
      scrollTrigger: { trigger: heading, start: "top 80%", once: true },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      gsap.set(lines, { clearProps: "transform" });
    };
  }, []);

  const { personal } = resume;

  return (
    <section id="contact" className="relative overflow-hidden py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-12">
        <SectionHeading index="07" title="Contact" label="Get In Touch" />
        <div className="grid items-start gap-8 xl:grid-cols-12">
          <div className="min-w-0 xl:col-span-7">
            <div ref={headingRef}>
              <div className="overflow-hidden">
                <p data-line className="text-[clamp(2rem,10vw,3.75rem)] font-black uppercase tracking-tight">
                  {personal.firstName}
                </p>
              </div>
              <div className="overflow-hidden">
                <p data-line className="text-[clamp(2rem,10vw,3.75rem)] font-black uppercase tracking-tight">
                  <span className="gradient-text">{personal.lastName}</span>
                </p>
              </div>
            </div>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted">
              {personal.availability}. Reach Abhiram directly by email, phone, or LinkedIn.
            </p>
          </div>
          <div className="grid min-w-0 gap-4 xl:col-span-5 [perspective:1100px]">
            <GlowCard>
              <a className="flex items-center gap-4 p-5" href={`mailto:${personal.email}`} data-cursor="link">
                <Icon3D icon={LuMail} />
                <span className="min-w-0">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">Email</span>
                  <span className="mt-1 block break-all text-sm text-white/75 sm:text-base">{personal.email}</span>
                </span>
              </a>
            </GlowCard>
            <GlowCard>
              <a
                className="flex items-center gap-4 p-5"
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="link"
              >
                <Icon3D icon={LuLinkedin} />
                <span className="min-w-0">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">LinkedIn</span>
                  <span className="mt-1 block break-all text-sm text-white/75 sm:text-base">linkedin.com/in/abhiram-kalathur</span>
                </span>
              </a>
            </GlowCard>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2">
            <GlowCard>
              <a className="flex h-full items-center gap-4 p-5" href={personal.phoneHref} data-cursor="link">
                <Icon3D icon={LuPhone} />
                <span className="min-w-0">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">Phone</span>
                  <span className="mt-1 block text-sm text-white/75 sm:text-base">{personal.phone}</span>
                </span>
              </a>
            </GlowCard>
            <GlowCard>
              <div className="flex items-center gap-4 p-5">
                <Icon3D icon={LuMapPin} />
                <span className="min-w-0">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">Availability</span>
                  <span className="mt-1 block text-sm text-white/75 sm:text-base">{personal.availability}</span>
                </span>
              </div>
            </GlowCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
