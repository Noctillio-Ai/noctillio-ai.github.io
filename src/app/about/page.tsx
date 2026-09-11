import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/Button";
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/icons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "What Noctillio-Ai stands for, why it's open source, and why the organization is looking for collaborators.",
};

const openSourceReasons = [
  {
    title: "Transparency over black boxes",
    body:
      "Deep learning already has enough opaque behavior in the models themselves. The tooling around it — training loops, data pipelines, experiment tracking — shouldn't add more. Every line of every Noctillio-Ai project is inspectable, forkable, and yours to audit.",
  },
  {
    title: "Reproducibility by default",
    body:
      "A training framework or experiment tracker that you can't run yourself isn't really a tool, it's a demo. Open source keeps the whole pipeline reproducible, from install to inference.",
  },
  {
    title: "Built on open shoulders",
    body:
      "AutoTimm exists because timm, PyTorch, and PyTorch Lightning were open. NightFlow exists because Netron and Hugging Face were open. Shipping openly is how we pay that forward.",
  },
  {
    title: "Better tools, faster",
    body:
      "The fastest way to find the rough edges in a training framework is to have people outside your own head using it, breaking it, and filing issues. Open source is the review process.",
  },
];

const collaborateReasons = [
  {
    title: "The surface area is too big for one person",
    body:
      "Vision architectures, video pipelines, VLM fine-tuning, desktop app engineering, MLOps, docs — each is its own discipline. No single maintainer can go deep on all of them at once.",
  },
  {
    title: "Different hardware, different bugs",
    body:
      "AutoTimm and NightFlow get tested against the GPUs and setups we have access to. Contributors running different hardware, OSes, and datasets surface issues we'd never catch alone.",
  },
  {
    title: "Fresh problems worth solving",
    body:
      "Good-first-issues, architecture questions, and open feature requests are waiting on both projects — real, useful work, not busywork.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="pt-20 pb-16 sm:pt-28">
        <Container>
          <SectionHeading
            eyebrow="About Noctillio-Ai"
            title="Deep learning research happens at odd hours. We build for that."
            description="Noctillio-Ai is a free, open-source community building tools for deep learning — image processing, video processing, model training, and vision-language model fine-tuning."
          />
        </Container>
      </section>

      {/* The name */}
      <section className="border-y border-border bg-background-elevated/40 py-20">
        <Container className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div className="flex justify-center">
            <div className="relative">
              <div className="animate-pulse-glow absolute inset-0 -z-10 rounded-full bg-accent/25 blur-3xl" />
              <Image
                src="/logo/noctillio-mark-white.png"
                alt="Noctillio-Ai owl mark"
                width={220}
                height={160}
                className="h-40 w-auto sm:h-48"
              />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              What &quot;Noctillio&quot; stands for
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              The name leans on <em>nocturnal</em> — the long, late-night training
              runs, the debugging sessions that stretch past midnight, the quiet
              hours when most real progress on a hard model actually happens. The
              owl in the mark is the through-line: sharp-eyed in low light, patient,
              and always watching the loss curve.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Noctillio-Ai isn&apos;t a company and it isn&apos;t a product — it&apos;s a
              community of people building the tools we personally needed and
              couldn&apos;t find, then deciding to give them away.
            </p>
          </div>
        </Container>
      </section>

      {/* Why open source */}
      <section className="py-20">
        <Container>
          <SectionHeading title="Why everything we build is open source" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {openSourceReasons.map((r) => (
              <div
                key={r.title}
                className="card-glow rounded-2xl border border-border bg-background-elevated p-6"
              >
                <h3 className="text-base font-semibold">{r.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{r.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Why collaborators */}
      <section className="border-t border-border bg-background-elevated/40 py-20">
        <Container>
          <SectionHeading title="Why we're actively looking for collaborators" />
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {collaborateReasons.map((r) => (
              <div key={r.title}>
                <h3 className="text-base font-semibold">{r.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{r.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Button href="/contribute" variant="primary">
              See how to contribute
            </Button>
          </div>
        </Container>
      </section>

      {/* Leadership */}
      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="Leadership" title="Head of Noctillio-Ai" />
          <div className="mt-10 flex flex-col items-center gap-6 rounded-3xl border border-border bg-background-elevated p-8 text-center sm:flex-row sm:items-center sm:gap-8 sm:p-10 sm:text-left">
            {/*
              Swap this initials avatar for a real headshot once you have one:
              drop the file at public/team/krishnatheja-vanka.jpg and replace
              the div below with an <Image src="/team/krishnatheja-vanka.jpg" .../>.
            */}
            <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-2 text-2xl font-semibold text-white">
              KV
            </div>
            <div>
              <h3 className="text-xl font-semibold">Krishnatheja Vanka</h3>
              <p className="mt-1 text-sm text-accent">Founder &amp; Head of Noctillio-Ai</p>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
                Krishnatheja started AutoTimm and NightFlow out of his own need for
                better deep learning tooling, then opened both up and founded
                Noctillio-Ai to build the rest of the toolkit with the community.
              </p>
              <div className="mt-4 flex items-center justify-center gap-3 sm:justify-start">
                <a
                  href="https://theja-vanka.github.io/"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-sm font-medium text-muted transition-colors hover:text-foreground"
                >
                  Portfolio
                </a>
                <a
                  href="https://github.com/theja-vanka"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="GitHub"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-border-strong text-muted transition-colors hover:border-accent/60 hover:text-foreground"
                >
                  <GitHubIcon className="h-4 w-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/krishnatheja-vanka/"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="LinkedIn"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-border-strong text-muted transition-colors hover:border-accent/60 hover:text-foreground"
                >
                  <LinkedInIcon className="h-4 w-4" />
                </a>
                <a
                  href={`mailto:${site.email}`}
                  aria-label="Email"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-border-strong text-muted transition-colors hover:border-accent/60 hover:text-foreground"
                >
                  <MailIcon className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
