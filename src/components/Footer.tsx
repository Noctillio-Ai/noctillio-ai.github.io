import Image from "next/image";
import Link from "next/link";
import { nav, site, projects } from "@/lib/site";
import { GitHubIcon, LinkedInIcon, MailIcon } from "./icons";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src="/logo/noctillio-mark-white.png"
                alt="Noctillio AI owl mark"
                width={30}
                height={22}
                className="h-6 w-auto"
              />
              <span className="text-base font-semibold tracking-tight">
                {site.name}
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              {site.description}
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href={site.githubOrg}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Noctillio AI on GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border-strong text-muted transition-colors hover:border-accent/60 hover:text-foreground"
              >
                <GitHubIcon className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${site.email}`}
                aria-label="Email Noctillio AI"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border-strong text-muted transition-colors hover:border-accent/60 hover:text-foreground"
              >
                <MailIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-2">
              Site
            </p>
            <ul className="mt-4 space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-muted transition-colors hover:text-foreground">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-2">
              Projects
            </p>
            <ul className="mt-4 space-y-2.5">
              {projects.map((p) => (
                <li key={p.slug}>
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {p.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-2">
              Leadership
            </p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href="https://theja-vanka.github.io/"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  Krishnatheja Vanka
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/krishnatheja-vanka/"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
                >
                  <LinkedInIcon className="h-3.5 w-3.5" />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-2 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Noctillio AI. Open source under each project&apos;s own license.</p>
          <p>Founded &amp; led by Krishnatheja Vanka.</p>
        </div>
      </div>
    </footer>
  );
}
