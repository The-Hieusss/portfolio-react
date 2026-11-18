import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import MechaHalo from "./ui/mecha-halo";
import { cn } from "@/lib/utils";
import { setAssistantOpen, useAssistantOpen } from "@/lib/assistant";
import { playMechaClose, playMechaOpen } from "@/lib/mecha-sfx";

/**
 * Phone-only ΑΘΗΝΑ: a surveillance camera hung from the sticky navbar.
 * The eye tracks touches and glances around, a scan cone sweeps the page now and then,
 * and tapping it opens the ΑΘΗΝΑ chat with the overclock spin.
 */
export default function NavCamera({ hidden = false }: { hidden?: boolean }) {
  const reduce = useReducedMotion();
  const open = useAssistantOpen();
  const [surge, setSurge] = useState(0);

  const toggle = () => {
    if (open) {
      playMechaClose();
    } else {
      playMechaOpen();
      setSurge((n) => n + 1);
    }
    setAssistantOpen(!open);
  };

  return (
    <div
      className={cn(
        // centered on the navbar's bottom edge (h-16), between the name and the menu button
        "absolute right-[5.75rem] top-8 z-10 h-16 w-16 transition-opacity duration-300 md:hidden",
        hidden && "pointer-events-none opacity-0",
      )}
    >
      {/* scan cone: sweeps the page every so often */}
      {!reduce ? (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[16rem] w-[11rem] -translate-x-1/2 origin-top [clip-path:polygon(50%_0,0_100%,100%_100%)] bg-[linear-gradient(to_bottom,rgba(250,118,54,0.22),rgba(250,118,54,0.05)_60%,transparent)]"
          animate={{ rotate: [-26, 26, -26], opacity: [0, 0.9, 0.9, 0] }}
          transition={{
            rotate: { duration: 6, repeat: Infinity, ease: "easeInOut", repeatDelay: 5 },
            opacity: { duration: 6, times: [0, 0.15, 0.85, 1], repeat: Infinity, repeatDelay: 5 },
          }}
        />
      ) : null}

      {/* ceiling rail the camera hangs from */}
      <span
        aria-hidden
        className="chamfer-sm pointer-events-none absolute left-1/2 top-[calc(50%-3px)] h-1.5 w-24 -translate-x-1/2 bg-ember/45"
      />
      {/* cradle hugging the lower housing */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-x-1.5 -bottom-1.5 top-1/2 rounded-b-full border-2 border-t-0 border-ember/45 bg-ink/85"
      />
      {/* REC light */}
      <span aria-hidden className="pointer-events-none absolute -left-9 top-[calc(50%+6px)] flex items-center gap-1">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,1)]" />
        <span className="font-mono text-[7px] tracking-[0.15em] text-peach/80">REC</span>
      </span>

      <button
        type="button"
        onClick={toggle}
        aria-label={open ? "Close ΑΘΗΝΑ assistant" : "Open ΑΘΗΝΑ assistant"}
        aria-expanded={open}
        className="relative block h-full w-full rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember"
      >
        <MechaHalo
          compact
          charged={open}
          surge={surge}
          className="h-full w-full drop-shadow-[0_0_14px_rgba(250,118,54,0.55)]"
        />
      </button>
    </div>
  );
}
