import Image from "next/image";
import { Project } from "@/lib/site";
import { Button } from "./Button";
import { ExternalLinkIcon, GitHubIcon } from "./icons";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reversed = index % 2 === 1;
  return (
    <div className="card-glow relative overflow-hidden rounded-3xl border border-border bg-background-elevated p-8 sm:p-10">
      <div
        className={`grid items-center gap-10 md:grid-cols-2 ${
          reversed ? "md:[&>*:first-child]:order-2" : ""
        }`}
      >
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border-strong bg-background-elevated-2 p-2">
              <Image
                src={project.logo}
                alt={`${project.name} logo`}
                width={40}
                height={40}
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <h3 className="text-2xl font-semibold tracking-tight">{project.name}</h3>
              <p className="text-sm text-accent">{project.tagline}</p>
            </div>
          </div>

          <p className="mt-5 text-sm leading-relaxed text-muted">{project.description}</p>

          <ul className="mt-5 space-y-2">
            {project.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-muted">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-r from-accent to-accent-2" />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border-strong bg-background-elevated-2 px-3 py-1 text-xs font-medium text-muted-2"
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

        <div className="relative flex items-center justify-center">
          <div className="animate-pulse-glow absolute h-56 w-56 rounded-full bg-accent/25 blur-3xl" />
          <div className="animate-float-slow relative flex h-64 w-full max-w-sm items-center justify-center rounded-2xl border border-border-strong bg-background-elevated-2 p-8">
            <Image
              src={project.banner ?? project.logo}
              alt={`${project.name} illustration`}
              width={320}
              height={200}
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
