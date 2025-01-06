"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function TextReveal({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className={className}>
      <div
        style={{
          transform: isInView ? "none" : "translateY(20px)",
          opacity: isInView ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
        }}
      >
        {children}
      </div>
    </div>
  );
}
