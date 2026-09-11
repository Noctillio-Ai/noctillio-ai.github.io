import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import { ArrowRightIcon, GitHubIcon, SparkleIcon } from "@/components/icons";
import { projects, site } from "@/lib/site";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-20 pb-24 sm:pt-28 sm:pb-32">
        <Container className="relative z-10">
          <div className="flex flex-col items-center text-center">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-border-strong bg-background-elevated px-4 py-1.5 text-xs font-medium text-muted">
              <SparkleIcon className="h-3.5 w-3.5 text-accent" />
              An open-source deep learning collective
            </span>

            <div className="animate-float-slow relative mb-8">
              <div className="animate-pulse-glow absolute inset-0 -z-10 rounded-full bg-accent/30 blur-3xl" />
              <Image
                src="/logo/noctillio-mark-white.png"
                alt="Noctillio-Ai owl mark"
                width={140}
                height={100}
                className="h-24 w-auto sm:h-28"
                priority
              />
            </div>

            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
              We build the tools that make{" "}
              <span className="text-gradient">deep learning</span> less tedious.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              {site.name} is a free, open-source community building practical tooling
              for image processing, video processing, model training, and VLM
              fine-tuning — so the next great CV pipeline doesn&apos;t start from zero.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button href="/projects" variant="primary">
                Explore our projects
                <ArrowRightIcon className="h-4 w-4" />
              </Button>
              <Button href={site.githubOrg} external variant="secondary">
                <GitHubIcon className="h-4 w-4" />
                View on GitHub
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* What / Why / Who strip */}
      <section className="border-y border-border bg-background-elevated/40">
        <Container className="grid gap-10 py-16 sm:grid-cols-3">
          {[
            {
              title: "What we build",
              body:
                "Focused, well-engineered tools across the deep learning workflow — from training frameworks like AutoTimm to experiment tooling like NightFlow.",
              href: "/projects",
              cta: "See the projects",
            },
            {
              title: "Why open source",
              body:
                "Research tooling should be inspectable, reproducible, and free to build on — not locked behind a product. Every line ships in the open.",
              href: "/about",
              cta: "Read our mission",
            },
            {
              title: "Why we need you",
              body:
                "Deep learning moves across too many fronts — vision, video, systems, UX — for one person to cover alone. We're looking for collaborators.",
              href: "/contribute",
              cta: "Get involved",
            },
          ].map((item) => (
            <div key={item.title}>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
              <Link
                href={item.href}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-transform hover:translate-x-0.5"
              >
                {item.cta}
                <ArrowRightIcon className="h-3.5 w-3.5" />
              </Link>
            </div>
          ))}
        </Container>
      </section>

      {/* Project highlights */}
      <section className="py-24">
        <Container>
          <SectionHeading
            eyebrow="Highlighted projects"
            title="Two tools. One workflow — from training to inspection."
            description="Both projects are live, open-source, and actively looking for contributors — good first issues included."
          />

          <div className="mt-14 flex flex-col gap-10">
            {projects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Button href="/projects" variant="ghost">
              See full project details
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </Container>
      </section>

      {/* Collaborator CTA */}
      <section className="pb-28">
        <Container>
          <div className="card-glow relative overflow-hidden rounded-3xl border border-border bg-background-elevated px-8 py-16 text-center sm:px-16">
            <div className="animate-pulse-glow pointer-events-none absolute left-1/2 top-0 h-64 w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/25 blur-3xl" />
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Deep learning at night needs more hands.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted">
              Whether it&apos;s a new backbone, a bug fix, a UI polish, or docs —
              there&apos;s a good first issue with your name on it.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button href="/contribute" variant="primary">
                Start contributing
                <ArrowRightIcon className="h-4 w-4" />
              </Button>
              <Button href="/about" variant="secondary">
                Meet the founder
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
