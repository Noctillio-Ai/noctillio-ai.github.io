"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav, site } from "@/lib/site";
import { DiscordIcon, GitHubIcon } from "./icons";

// The "Get involved" pill already links to /contribute, so the plain tab
// would just repeat it — keep it out of the nav bar (it still appears in
// the footer and sitemap via the shared `nav` list).
const navTabs = nav.filter((item) => item.href !== "/contribute");

// The site is exported with trailingSlash: true, so a statically-loaded
// route's pathname comes back as e.g. "/about/" while nav hrefs are
// written as "/about" — strip the trailing slash before comparing so the
// active tab actually highlights on every page, not just "/".
const stripTrailingSlash = (path: string) => (path.length > 1 ? path.replace(/\/$/, "") : path);

export function Navbar() {
  const pathname = stripTrailingSlash(usePathname());
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-3 z-50 px-4 sm:top-5">
      <div className="mx-auto flex max-w-5xl items-center gap-2 rounded-full border border-border-strong bg-background-elevated/90 py-2 pl-4 pr-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_12px_32px_-12px_rgba(0,0,0,0.65)] backdrop-blur-xl sm:gap-4 sm:pr-3">
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/"
            className="group flex items-center gap-2.5"
            onClick={() => setOpen(false)}
          >
            <Image
              src="/logo/noctillio-mark-white.png"
              alt="Noctillio AI owl mark"
              width={30}
              height={22}
              className="h-6 w-auto transition-transform duration-300 group-hover:scale-110"
              priority
            />
            <span className="hidden text-base font-semibold tracking-tight transition-colors sm:inline group-hover:text-accent">
              {site.name}
            </span>
          </Link>
          <span className="hidden h-6 w-px bg-border-strong md:block" aria-hidden="true" />
        </div>

        <div className="hidden flex-1 items-center justify-center md:flex">
          <nav className="flex items-center gap-1">
            {navTabs.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "text-foreground"
                      : "text-muted hover:text-foreground hover:bg-background-elevated-2/60"
                  }`}
                >
                  {active && (
                    <span className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_6px_rgba(95,145,251,0.9)]" />
                  )}
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <span className="mr-1 h-6 w-px bg-border-strong" aria-hidden="true" />
          <a
            href={site.githubOrg}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Noctillio AI on GitHub"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border-strong text-muted transition-colors hover:border-accent/60 hover:bg-background-elevated-2 hover:text-foreground"
          >
            <GitHubIcon className="h-4 w-4" />
          </a>
          <a
            href={site.discord}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Noctillio AI on Discord"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border-strong text-muted transition-colors hover:border-accent/60 hover:bg-background-elevated-2 hover:text-foreground"
          >
            <DiscordIcon className="h-4 w-4" />
          </a>
          <Link
            href="/contribute"
            className="rounded-full bg-gradient-to-r from-accent to-accent-3 px-4 py-2 text-sm font-medium text-background shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_0_20px_-6px_rgba(95,145,251,0.85)] transition-transform hover:-translate-y-0.5"
          >
            Get involved
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="ml-auto flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-border-strong text-foreground transition-colors hover:border-accent/60 md:hidden"
        >
          <span className="relative block h-3.5 w-4">
            <span
              className={`absolute left-0 top-0 block h-[1.5px] w-full bg-current transition-transform ${open ? "translate-y-[6px] rotate-45" : ""}`}
            />
            <span
              className={`absolute left-0 top-[6px] block h-[1.5px] w-full bg-current transition-opacity ${open ? "opacity-0" : "opacity-100"}`}
            />
            <span
              className={`absolute left-0 top-[12px] block h-[1.5px] w-full bg-current transition-transform ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>

      {open && (
        <div className="mx-auto mt-2 max-w-5xl rounded-3xl border border-border-strong bg-background-elevated/95 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_12px_32px_-12px_rgba(0,0,0,0.65)] backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-1">
            {navTabs.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? "text-foreground"
                    : "text-muted hover:text-foreground"
                }`}
              >
                <span
                  className={`h-1 w-1 flex-shrink-0 rounded-full bg-accent shadow-[0_0_6px_rgba(95,145,251,0.9)] transition-opacity ${
                    pathname === item.href ? "opacity-100" : "opacity-0"
                  }`}
                  aria-hidden="true"
                />
                {item.label}
              </Link>
            ))}
            <div className="mt-3 border-t border-border pt-3">
              <div className="flex items-center justify-center gap-3">
                <a
                  href={site.githubOrg}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Noctillio AI on GitHub"
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-border-strong text-muted transition-colors hover:border-accent/60 hover:text-foreground"
                >
                  <GitHubIcon className="h-4 w-4" />
                </a>
                <a
                  href={site.discord}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Noctillio AI on Discord"
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-border-strong text-muted transition-colors hover:border-accent/60 hover:text-foreground"
                >
                  <DiscordIcon className="h-4 w-4" />
                </a>
              </div>
              <Link
                href="/contribute"
                onClick={() => setOpen(false)}
                className="mt-3 flex items-center justify-center rounded-full bg-gradient-to-r from-accent to-accent-3 px-3 py-2.5 text-sm font-medium text-background shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]"
              >
                Get involved
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
