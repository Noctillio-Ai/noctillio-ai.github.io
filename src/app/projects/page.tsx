import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import { Button } from "@/components/Button";
import { ArrowRightIcon } from "@/components/icons";
import { projects } from "@/lib/site";

const title = "Projects";
const description =
  "AutoTimm and NightFlow: open-source tools for computer vision training and deep learning experiment management, built by Noctillio AI.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/projects/" },
  openGraph: { title, description, url: "/projects/" },
  twitter: { title, description },
};

const projectsJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: projects.map((project, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "SoftwareApplication",
      name: project.name,
      description: project.description,
      url: project.liveUrl,
      codeRepository: project.repoUrl,
      applicationCategory: "DeveloperApplication",
      operatingSystem: project.tags.includes("Desktop App") ? "macOS, Linux" : "Cross-platform",
      isAccessibleForFree: true,
    },
  })),
};

export default function ProjectsPage() {
  return (
    <section className="py-20 sm:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsJsonLd) }}
      />
      <Container>
        <SectionHeading
          level="h1"
          eyebrow="Our projects"
          title="Tools we're building in the open"
          description="Every project here is real, actively maintained, and open for contributions. Start with an existing project, or bring an idea for the next one."
        />

        <div className="mt-14 flex flex-col gap-10">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>

        <div className="card-glow surface-gradient mt-16 rounded-3xl border border-border p-10 text-center sm:p-14">
          <h2 className="text-2xl font-semibold tracking-tight text-[color:var(--card-heading)] sm:text-3xl">
            Have an idea for the next Noctillio AI tool?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[color:var(--card-body)]">
            Video processing pipelines, VLM fine-tuning utilities, dataset tooling:
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
