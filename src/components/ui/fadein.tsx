import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface FadeInSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
}

/** Reveals its children once as they scroll into view. */
const FadeInEffect = ({ children, className, id, delay = 0 }: FadeInSectionProps) => {
  const reduce = useReducedMotion();

  return (
    <motion.div
      id={id}
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
};

export default FadeInEffect;
