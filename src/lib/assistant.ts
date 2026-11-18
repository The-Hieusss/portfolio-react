import { useSyncExternalStore } from "react";

/** Shared open/closed state for the ΑΘΗΝΑ chat, so the dock and the navbar camera drive the same panel. */
let open = false;
const listeners = new Set<() => void>();

export function setAssistantOpen(next: boolean) {
  if (open === next) return;
  open = next;
  listeners.forEach((l) => l());
}

export function useAssistantOpen() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => open,
    () => open,
  );
}
