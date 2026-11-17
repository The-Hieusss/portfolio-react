import { cn } from "@/lib/utils";

const C = 200; // center of the 400×400 viewBox
const origin = { transformOrigin: `${C}px ${C}px` };

const ticks = Array.from({ length: 72 }, (_, i) => {
  const a = (i * 5 * Math.PI) / 180;
  const major = i % 6 === 0;
  const r1 = major ? 146 : 151;
  const r2 = 158;
  return {
    x1: C + r1 * Math.cos(a),
    y1: C + r1 * Math.sin(a),
    x2: C + r2 * Math.cos(a),
    y2: C + r2 * Math.sin(a),
    major,
  };
});

const glyphs = ["Α", "Θ", "Σ", "Ω"];

/** Rotating orange HUD ring with a Spartan helmet at its core. */
export default function MechaHalo({
  className,
  charged = false,
  compact = false,
}: {
  className?: string;
  charged?: boolean;
  /** Small dock version: drops fine text and tick detail that would be illegible. */
  compact?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={cn(
        "overflow-visible [&_.animate-spin-rev]:[animation-duration:var(--halo-rev)] [&_.animate-spin-slow]:[animation-duration:var(--halo-slow)]",
        className,
      )}
      style={{
        ["--halo-slow" as string]: charged ? "3s" : "60s",
        ["--halo-rev" as string]: charged ? "2s" : "40s",
      }}
      aria-hidden
    >
      <defs>
        <radialGradient id="halo-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fa7636" stopOpacity="0.55" />
          <stop offset="55%" stopColor="#fa7636" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#fa7636" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="halo-arc" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffb48a" />
          <stop offset="100%" stopColor="#fa7636" />
        </linearGradient>
      </defs>

      {/* glow */}
      <circle
        cx={C}
        cy={C}
        r="190"
        fill="url(#halo-core)"
        style={{ opacity: charged ? 1 : 0.75, transition: "opacity 400ms" }}
      />
      {charged ? (
        <circle
          cx={C}
          cy={C}
          r="110"
          fill="none"
          stroke="#ffb48a"
          strokeWidth="2"
          className="halo-pulse"
          style={origin}
        />
      ) : null}

      {/* outer dotted orbit */}
      <g className="animate-spin-slow" style={origin}>
        <circle
          cx={C}
          cy={C}
          r="192"
          fill="none"
          stroke="#fa7636"
          strokeOpacity="0.45"
          strokeWidth="1"
          strokeDasharray="2 7"
        />
        <rect
          x={C - 4}
          y="4"
          width="8"
          height="8"
          fill="#fa7636"
          transform={`rotate(45 ${C} 8)`}
        />
      </g>

      {/* segmented armor ring */}
      <g className="animate-spin-rev" style={origin}>
        <circle
          cx={C}
          cy={C}
          r="174"
          fill="none"
          stroke="url(#halo-arc)"
          strokeWidth="5"
          strokeDasharray="200 73"
          strokeLinecap="butt"
        />
        {!compact &&
          glyphs.map((g, i) => {
            const a = ((i * 90 + 25) * Math.PI) / 180;
            return (
              <text
                key={g}
                x={C + 174 * Math.cos(a)}
                y={C + 174 * Math.sin(a) + 4}
                textAnchor="middle"
                fontFamily="Cinzel, serif"
                fontSize="13"
                fill="#ffb48a"
              >
                {g}
              </text>
            );
          })}
      </g>

      {/* tick dial */}
      <g opacity={compact ? 0.6 : 1}>
        {ticks.map((t, i) => (
          <line
            key={i}
            x1={t.x1}
            y1={t.y1}
            x2={t.x2}
            y2={t.y2}
            stroke="#fa7636"
            strokeOpacity={t.major ? 0.95 : 0.4}
            strokeWidth={t.major ? 2 : 1}
          />
        ))}
      </g>

      {/* meander ring (Greek key as a dash pattern) */}
      <g className="animate-spin-slow" style={origin}>
        <circle
          cx={C}
          cy={C}
          r="132"
          fill="none"
          stroke="#fa7636"
          strokeOpacity="0.8"
          strokeWidth="6"
          strokeDasharray="10 4 3 4"
        />
      </g>

      {/* crosshair */}
      <g stroke="#ffb48a" strokeOpacity="0.5" strokeWidth="1">
        <line x1={C} y1="58" x2={C} y2="98" />
        <line x1={C} y1="302" x2={C} y2="342" />
        <line x1="58" y1={C} x2="98" y2={C} />
        <line x1="302" y1={C} x2="342" y2={C} />
      </g>

      {/* inner plate */}
      <circle
        cx={C}
        cy={C}
        r="104"
        fill="#0b0705"
        stroke="#fa7636"
        strokeOpacity="0.6"
        strokeWidth="1.5"
      />
      <circle
        cx={C}
        cy={C}
        r="96"
        fill="none"
        stroke="#fa7636"
        strokeOpacity="0.25"
        strokeWidth="1"
        strokeDasharray="1 4"
      />

      {/* Spartan helmet core */}
      <image
        href="/images/favicon.svg"
        x={C - 62}
        y={C - 62}
        width="124"
        height="124"
        className="animate-flicker"
        style={{
          ...origin,
          transform: charged ? "scale(1.08)" : "scale(1)",
          transition: "transform 300ms",
        }}
      />

      {/* readouts */}
      {!compact && (
        <text
          x={C}
          y="384"
          textAnchor="middle"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10"
          letterSpacing="3"
          fill="#fa7636"
          fillOpacity="0.85"
        >
          {charged ? "OVERCLOCK ▲▲▲ ENGAGED" : "UNIT H.THAN-01 · ONLINE"}
        </text>
      )}
    </svg>
  );
}
