import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import { Button } from "@/components/Button";
import { ArrowRightIcon } from "@/components/icons";
import { projects } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "AutoTimm and NightFlow — open-source tools for computer vision training and deep learning experiment management, built by NoctillioAi.",
};

export default function ProjectsPage() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Our projects"
          title="Tools we're building in the open"
          description="Every project here is real, actively maintained, and open for contributions. Start with an existing project, or bring an idea for the next one."
        />

        <div className="mt-14 flex flex-col gap-10">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>

        <div className="mt-16 rounded-3xl border border-border bg-background-elevated p-10 text-center sm:p-14">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Have an idea for the next NoctillioAi tool?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted">
            Video processing pipelines, VLM fine-tuning utilities, dataset tooling —
            if it removes friction from a deep learning workflow, we want to hear
            about it.
          </p>
          <div className="mt-7 flex justify-center">
            <Button href="/contribute" variant="primary">
              Propose a project
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
