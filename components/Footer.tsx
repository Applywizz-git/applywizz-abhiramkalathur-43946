import { resume } from "@/data/resume";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#101312] px-4 py-8 sm:px-6 lg:px-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono">© {year} {resume.personal.fullName}</p>
        <div className="flex flex-wrap gap-x-5 gap-y-2 font-mono">
          <a className="footer-link break-all" href={`mailto:${resume.personal.email}`} data-cursor="link">
            {resume.personal.email}
          </a>
          <a className="footer-link" href={resume.personal.phoneHref} data-cursor="link">
            {resume.personal.phone}
          </a>
          <a className="footer-link" href={resume.personal.linkedin} target="_blank" rel="noopener noreferrer" data-cursor="link">
            LinkedIn
          </a>
          <span>{resume.personal.availability}</span>
        </div>
      </div>
    </footer>
  );
}
