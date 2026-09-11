export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  level = "h2",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** Use "h1" for the single, page-defining heading (one per page); "h2" for section headings. */
  level?: "h1" | "h2";
}) {
  const Heading = level;
  return (
    <div className={align === "center" ? "text-center" : ""}>
      {eyebrow && (
        <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-border-strong bg-background-elevated px-3 py-1 text-xs font-medium uppercase tracking-wider text-accent">
          {eyebrow}
        </p>
      )}
      <Heading className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</Heading>
      {description && (
        <p
          className={`mt-4 max-w-2xl text-base leading-relaxed text-muted ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
