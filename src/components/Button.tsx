import Link from "next/link";
import { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  external?: boolean;
  className?: string;
};

const base =
  "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 whitespace-nowrap";

const variants: Record<string, string> = {
  primary:
    "bg-gradient-to-r from-accent to-accent-2 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_8px_24px_-8px_rgba(168,85,247,0.6)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_12px_32px_-8px_rgba(168,85,247,0.8)] hover:-translate-y-0.5",
  secondary:
    "border border-border-strong bg-background-elevated text-foreground hover:border-accent/60 hover:bg-background-elevated-2 hover:-translate-y-0.5",
  ghost:
    "text-muted hover:text-foreground",
};

export function Button({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" className={classes}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
