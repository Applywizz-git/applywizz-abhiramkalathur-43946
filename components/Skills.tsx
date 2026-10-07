import { resume } from "@/data/resume";
import { GlowCard } from "@/components/GlowCard";
import { Icon3D } from "@/components/Icon3D";
import { SectionHeading } from "@/components/SectionHeading";
import { skillIcon } from "@/components/skillIcons";

const labels: Record<string, string> = {
  manufacturing: "Manufacturing & Process Engineering",
  cad: "Mechanical Design & CAD",
  lean: "Lean & Quality",
  analytics: "Production Analytics",
  systems: "Engineering Systems",
  simulation: "Manufacturing Simulation",
  ai: "AI-Assisted Engineering",
};

const spans = [
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-7",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
];

export function Skills() {
  return (
    <section id="skills" className="relative py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-12">
        <SectionHeading index="02" title="Skills" label="Technical Skills" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-12">
          {resume.skillGroups.map((group, index) => (
            <article key={group.id} className={spans[index] ?? "lg:col-span-6"}>
              <GlowCard className="h-full p-5 sm:p-6">
                <div className="flex items-center justify-between gap-4">
                  <p className="min-w-0 font-mono text-[11px] font-bold uppercase leading-snug tracking-[0.08em] text-accent sm:text-xs sm:tracking-[0.12em]">
                    {String(index + 1).padStart(2, "0")} / {labels[group.id] ?? group.id}
                  </p>
                  <Icon3D icon={skillIcon(group.items[0] ?? "")} className="icon-3d-sm" />
                </div>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item} className="chip rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-white/75">
                      {item}
                    </li>
                  ))}
                </ul>
              </GlowCard>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
