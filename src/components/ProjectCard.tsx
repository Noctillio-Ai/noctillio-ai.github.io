import Image from "next/image";
import { Project } from "@/lib/site";
import { Button } from "./Button";
import { ExternalLinkIcon, GitHubIcon } from "./icons";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reversed = index % 2 === 1;
  return (
    <div className="card-glow surface-gradient relative overflow-hidden rounded-3xl border border-border p-8 sm:p-10">
      <div
        className={`grid gap-10 md:grid-cols-2 md:items-stretch ${
          reversed ? "md:[&>*:first-child]:order-2" : ""
        }`}
      >
        <div>
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-border-strong bg-background-elevated-2 p-2">
                <Image
                  src={project.logo}
                  alt={`${project.name} logo`}
                  width={40}
                  height={40}
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-2xl font-semibold tracking-tight text-[color:var(--card-heading)]">{project.name}</h3>
                <p className="text-sm font-medium text-[color:var(--card-tagline)]">{project.tagline}</p>
              </div>
            </div>

            <span className="mt-1 hidden flex-shrink-0 items-center gap-1.5 rounded-full border border-border-strong bg-background-elevated px-2.5 py-1 text-[11px] font-medium text-muted-2 sm:inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
              {project.status}
            </span>
          </div>

          <p className="mt-5 text-sm leading-relaxed text-[color:var(--card-body)]">{project.description}</p>

          <ul className="mt-5 space-y-2.5">
            {project.features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm text-[color:var(--card-body)]">
                <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-accent-soft">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border-strong bg-background-elevated-2 px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-muted-2"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button href={project.liveUrl} external variant="primary" className="!px-4 !py-2">
              Visit {project.name}
              <ExternalLinkIcon className="h-3.5 w-3.5" />
            </Button>
            <Button href={project.repoUrl} external variant="secondary" className="!px-4 !py-2">
              <GitHubIcon className="h-3.5 w-3.5" />
              Source
            </Button>
          </div>
        </div>

        <div className="relative min-h-[280px]">
          <div className="animate-pulse-glow absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-3xl" />
          <div className="animate-float-slow relative flex h-full min-h-[280px] items-center justify-center p-8">
            <Image
              src={project.banner ?? project.logo}
              alt={`${project.name} illustration`}
              width={320}
              height={200}
              className="relative h-full w-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
