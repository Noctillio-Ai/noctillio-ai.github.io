import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/Button";
import { ArrowRightIcon, GitHubIcon, MailIcon } from "@/components/icons";
import { projects, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contribute",
  description:
    "How to get involved with NoctillioAi — code, ideas, docs, testing, and how to reach the team.",
};

const ways = [
  {
    title: "Ship code",
    body:
      "Pick up an open issue on AutoTimm or NightFlow, or fix something that's bugging you. PRs of any size — a new backbone wrapper, a bug fix, a perf tweak — are welcome.",
  },
  {
    title: "Propose ideas",
    body:
      "Have a feature in mind, or an idea for a whole new tool — a video-processing pipeline, a VLM fine-tuning helper? Open a discussion or issue and let's shape it together.",
  },
  {
    title: "Improve docs & tutorials",
    body:
      "Docs age faster than code. Clarifying a setup step, adding an example notebook, or writing a walkthrough is as valuable as a feature PR.",
  },
  {
    title: "Test on your setup",
    body:
      "Different GPUs, OSes, and datasets surface different bugs. Running AutoTimm or NightFlow on your own hardware and reporting what breaks is genuinely useful contribution.",
  },
];

const steps = [
  {
    step: "01",
    title: "Pick a project",
    body: "Start with AutoTimm or NightFlow, or bring a new idea to the org.",
  },
  {
    step: "02",
    title: "Find or file an issue",
    body: "Browse open issues for a good first contribution, or open one describing what you'd like to work on.",
  },
  {
    step: "03",
    title: "Fork, build, and open a PR",
    body: "Fork the repo, make your change, and open a pull request — small, focused PRs get reviewed fastest.",
  },
  {
    step: "04",
    title: "Iterate with the maintainers",
    body: "Expect review feedback, not silence. We'll work through it with you until it's ready to merge.",
  },
];

export default function ContributePage() {
  return (
    <>
      <section className="pt-20 pb-16 sm:pt-28">
        <Container>
          <SectionHeading
            eyebrow="Get involved"
            title="NoctillioAi runs on contributors"
            description="There's no paid team behind this — just people who use these tools and want them to be better. Here's how to jump in."
          />
        </Container>
      </section>

      <section className="border-y border-border bg-background-elevated/40 py-20">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2">
            {ways.map((w) => (
              <div
                key={w.title}
                className="card-glow rounded-2xl border border-border bg-background-elevated p-6"
              >
                <h3 className="text-base font-semibold">{w.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{w.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeading title="How a contribution usually goes" />
          <div className="mt-10 grid gap-8 sm:grid-cols-4">
            {steps.map((s) => (
              <div key={s.step}>
                <span className="text-sm font-mono text-accent">{s.step}</span>
                <h3 className="mt-2 text-base font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-background-elevated/40 py-20">
        <Container>
          <SectionHeading title="Jump straight into a repo" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {projects.map((p) => (
              <div
                key={p.slug}
                className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-background-elevated p-6"
              >
                <div>
                  <h3 className="text-base font-semibold">{p.name}</h3>
                  <p className="mt-1 text-sm text-muted">{p.tagline}</p>
                </div>
                <Button href={p.repoUrl} external variant="secondary" className="!px-4 !py-2">
                  <GitHubIcon className="h-4 w-4" />
                  Repo
                </Button>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="card-glow relative overflow-hidden rounded-3xl border border-border bg-background-elevated px-8 py-14 text-center sm:px-16">
            <div className="animate-pulse-glow pointer-events-none absolute left-1/2 top-0 h-64 w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/25 blur-3xl" />
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Not sure where to start? Just say hi.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted">
              Reach out directly and we&apos;ll point you at something that fits
              what you&apos;re interested in.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
              <Button href={`mailto:${site.email}`} variant="primary">
                <MailIcon className="h-4 w-4" />
                {site.email}
              </Button>
              <Button href={site.githubOrg} external variant="secondary">
                <GitHubIcon className="h-4 w-4" />
                NoctillioAi on GitHub
                <ArrowRightIcon className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
