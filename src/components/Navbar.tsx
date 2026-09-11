"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav, site } from "@/lib/site";
import { GitHubIcon } from "./icons";

// The "Get involved" pill already links to /contribute, so the plain tab
// would just repeat it — keep it out of the nav bar (it still appears in
// the footer and sitemap via the shared `nav` list).
const navTabs = nav.filter((item) => item.href !== "/contribute");

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-3 z-50 px-4 sm:top-5">
      <div className="mx-auto flex max-w-5xl items-center gap-2 rounded-full border border-border-strong bg-background-elevated/90 py-2 pl-4 pr-2 shadow-[0_12px_32px_-12px_rgba(0,0,0,0.65)] backdrop-blur-xl sm:gap-4 sm:pr-3">
        <Link
          href="/"
          className="flex items-center gap-2.5"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/logo/noctillio-mark-white.png"
            alt="Noctillio AI owl mark"
            width={30}
            height={22}
            className="h-6 w-auto"
            priority
          />
          <span className="hidden text-base font-semibold tracking-tight sm:inline">
            {site.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navTabs.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "text-foreground bg-background-elevated-2"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto hidden items-center gap-2 md:flex">
          <a
            href={site.githubOrg}
            target="_blank"
            rel="noreferrer noopener"
            className="flex items-center gap-2 rounded-full border border-border-strong px-4 py-2 text-sm font-medium text-muted transition-colors hover:border-accent/60 hover:text-foreground"
          >
            <GitHubIcon className="h-4 w-4" />
            GitHub
          </a>
          <Link
            href="/contribute"
            className="rounded-full bg-gradient-to-r from-accent to-accent-3 px-4 py-2 text-sm font-medium text-background shadow-[0_0_20px_-6px_rgba(95,145,251,0.85)] transition-transform hover:-translate-y-0.5"
          >
            Get involved
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="ml-auto flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-border-strong text-foreground md:hidden"
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
        <div className="mx-auto mt-2 max-w-5xl rounded-3xl border border-border-strong bg-background-elevated/95 px-4 py-4 shadow-[0_12px_32px_-12px_rgba(0,0,0,0.65)] backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-1">
            {navTabs.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-3 py-2.5 text-sm font-medium ${
                  pathname === item.href
                    ? "bg-background-elevated-2 text-foreground"
                    : "text-muted"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={site.githubOrg}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-2 flex items-center gap-2 rounded-lg border border-border-strong px-3 py-2.5 text-sm font-medium text-muted"
            >
              <GitHubIcon className="h-4 w-4" />
              GitHub
            </a>
            <Link
              href="/contribute"
              onClick={() => setOpen(false)}
              className="mt-1 flex items-center justify-center rounded-lg bg-gradient-to-r from-accent to-accent-3 px-3 py-2.5 text-sm font-medium text-background"
            >
              Get involved
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
