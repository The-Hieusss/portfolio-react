import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  id,
  children,
  className,
  labelledBy,
}: {
  id: string;
  children: ReactNode;
  className?: string;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("relative scroll-mt-20 py-20 md:py-28", className)}
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">{children}</div>
    </section>
  );
}

/** Small monospace HUD label, e.g. "// 01 — ABOUT". */
export function HudLabel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-ember",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function SectionHeader({
  id,
  index,
  eyebrow,
  title,
  description,
  action,
  className,
}: {
  id?: string;
  index?: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-12 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className="max-w-2xl">
        <div className="flex items-center gap-3">
          <span aria-hidden className="h-2 w-2 rotate-45 bg-ember shadow-[0_0_12px_rgba(250,118,54,0.9)]" />
          <HudLabel>
            {index ? <span className="text-peach/60">{index} // </span> : null}
            {eyebrow}
          </HudLabel>
          <span aria-hidden className="h-px w-16 bg-gradient-to-r from-ember/70 to-transparent" />
        </div>
        <h2
          id={id}
          className="mt-4 font-display text-3xl font-semibold leading-tight text-cream sm:text-4xl md:text-5xl"
        >
          {title}
        </h2>
        {description ? (
          <p className="mt-4 text-base leading-7 text-sand md:text-lg">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

/** Orange bracket corners that make any `relative` box look like a HUD frame. */
export function HudCorners({ className, size = "h-3 w-3" }: { className?: string; size?: string }) {
  const base = cn("pointer-events-none absolute border-ember", size, className);
  return (
    <>
      <span aria-hidden className={cn(base, "left-0 top-0 border-l-2 border-t-2")} />
      <span aria-hidden className={cn(base, "right-0 top-0 border-r-2 border-t-2")} />
      <span aria-hidden className={cn(base, "bottom-0 left-0 border-b-2 border-l-2")} />
      <span aria-hidden className={cn(base, "bottom-0 right-0 border-b-2 border-r-2")} />
    </>
  );
}

/**
 * Armor-plate panel: chamfered corners with a 1px orange edge.
 * The outer layer paints the edge; the inner layer paints the surface.
 */
export function Panel({
  children,
  className,
  innerClassName,
  interactive = false,
}: {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        "chamfer bg-ember/25 p-px transition duration-300",
        interactive &&
          "hover:bg-ember/70 hover:drop-shadow-[0_0_24px_rgba(250,118,54,0.25)]",
        className,
      )}
    >
      <div className={cn("chamfer h-full bg-surface", innerClassName)}>{children}</div>
    </div>
  );
}

/** Circuit Greek-key band used between sections. */
export function GreekDivider({ className, label }: { className?: string; label?: string }) {
  return (
    <div aria-hidden className={cn("relative", className)}>
      <div className="greek-band h-6 w-full opacity-50" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#0b0705,transparent_20%,transparent_80%,#0b0705)]" />
      {label ? (
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-ink px-3 font-mono text-[10px] tracking-[0.3em] text-peach">
          {label}
        </span>
      ) : null}
    </div>
  );
}

export const buttonStyles = {
  primary:
    "chamfer-sm inline-flex items-center justify-center gap-2 bg-gold-gradient px-5 py-3 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-ink transition hover:brightness-110 hover:drop-shadow-[0_0_18px_rgba(250,118,54,0.6)] active:scale-[0.98]",
  secondary:
    "chamfer-sm inline-flex items-center justify-center gap-2 bg-ember/12 px-5 py-3 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-peach transition hover:bg-ember/25 hover:text-cream active:scale-[0.98]",
  icon: "chamfer-sm inline-flex h-10 w-10 items-center justify-center bg-ember/10 text-peach transition hover:bg-ember hover:text-ink",
};
