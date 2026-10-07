"use client";

import { useLayoutEffect, useRef } from "react";
import { resume } from "@/data/resume";
import { GlowCard } from "@/components/GlowCard";
import { Icon3D } from "@/components/Icon3D";
import { SectionHeading } from "@/components/SectionHeading";
import { LuAward } from "react-icons/lu";
import { playScrollReveal, prefersReducedMotion } from "@/lib/gsap";

const certIcons = [
  { icon: LuAward, tone: "#e7a83e" },
  { icon: LuAward, tone: "#8cae96" },
  { icon: LuAward, tone: "#d99a3d" },
  { icon: LuAward, tone: "#789b82" },
  { icon: LuAward, tone: "#f2c36c" },
  { icon: LuAward, tone: "#9bad8e" },
] as const;

export function Certifications() {
  const listRef = useRef<HTMLUListElement>(null);

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list || prefersReducedMotion()) return;
    const rows = list.querySelectorAll<HTMLElement>("[data-cert]");
    return playScrollReveal(
      rows,
      list,
      { autoAlpha: 0, y: 28, rotateY: -12, transformPerspective: 900 },
      { autoAlpha: 1, y: 0, rotateY: 0, duration: 0.7, stagger: 0.1, ease: "power3.out" },
    );
  }, []);

  return (
    <section id="certifications" className="relative py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-12">
        <SectionHeading index="06" title="Certifications" label="Credentials" />
        <ul ref={listRef} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 [perspective:1200px]">
          {resume.certifications.map((item, index) => (
            <li
              key={item.name}
              data-cert
              className={["lg:col-span-8", "lg:col-span-4", "lg:col-span-4", "lg:col-span-8", "lg:col-span-6", "lg:col-span-6"][index]}
            >
              <GlowCard className="h-full p-5 sm:p-6">
                <div className="flex items-start gap-4">
                  <span
                    className="icon-plate"
                    style={{ ["--tone" as string]: certIcons[index].tone, animationDelay: `${index * 0.35}s` }}
                  >
                    <Icon3D icon={certIcons[index].icon} />
                  </span>
                  <div className="min-w-0">
                    <p className="font-mono text-[10px] font-bold tracking-[0.22em] text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-2 text-base font-bold tracking-tight sm:text-lg">{item.name}</h3>
                    <p className="mt-2 font-mono text-xs uppercase tracking-[0.16em] text-muted">{item.issuer}</p>
                  </div>
                </div>
              </GlowCard>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
