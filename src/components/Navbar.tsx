"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav, site } from "@/lib/site";
import { GitHubIcon } from "./icons";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="glass border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
            <Image
              src="/logo/noctillio-mark-white.png"
              alt="Noctillio-Ai owl mark"
              width={30}
              height={22}
              className="h-6 w-auto"
              priority
            />
            <span className="text-base font-semibold tracking-tight">
              {site.name}
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((item) => {
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

          <div className="hidden items-center gap-3 md:flex">
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
              className="rounded-full bg-gradient-to-r from-accent to-accent-2 px-4 py-2 text-sm font-medium text-white shadow-[0_0_20px_-6px_rgba(168,85,247,0.8)] transition-transform hover:-translate-y-0.5"
            >
              Contribute
            </Link>
          </div>

          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border-strong text-foreground md:hidden"
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
          <div className="border-t border-border px-6 pb-6 md:hidden">
            <nav className="flex flex-col gap-1 pt-4">
              {nav.map((item) => (
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
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
