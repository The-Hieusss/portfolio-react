import { useEffect, useState } from "react";

/** True while a meaningful part of the hero (#home-section) is on screen. */
export function useHeroInView(threshold = 0.3) {
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = document.getElementById("home-section");
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.intersectionRatio >= threshold), {
      threshold: [0, threshold, 1],
    });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return inView;
}
