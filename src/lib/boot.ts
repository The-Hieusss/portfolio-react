import { useSyncExternalStore } from "react";

/** Tiny global flag: has the boot screen finished opening? */
let booted = false;
const listeners = new Set<() => void>();

export function markBooted() {
  if (booted) return;
  booted = true;
  listeners.forEach((l) => l());
}

export function useBooted() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => booted,
    () => booted,
  );
}
