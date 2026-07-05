"use client";

import { useEffect, useRef, ReactNode, PointerEvent } from "react";

export default function Magnetic({
  children,
  strength = 0.3,
}: {
  children: ReactNode;
  strength?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const enabledRef = useRef(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      enabledRef.current = fine.matches && !reduced.matches;
      if (!enabledRef.current && ref.current) {
        ref.current.style.transition = "none";
        ref.current.style.transform = "translate(0px, 0px)";
      }
    };
    update();

    fine.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  const handlePointerMove = (e: PointerEvent<HTMLSpanElement>) => {
    if (!enabledRef.current) return;
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const offsetX = e.clientX - (rect.left + rect.width / 2);
    const offsetY = e.clientY - (rect.top + rect.height / 2);
    const max = 4;
    const x = Math.max(-max, Math.min(max, offsetX * strength));
    const y = Math.max(-max, Math.min(max, offsetY * strength));

    el.style.transition = "transform 0.1s linear";
    el.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handlePointerLeave = () => {
    if (!enabledRef.current) return;
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)";
    el.style.transform = "translate(0px, 0px)";
  };

  return (
    <span
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ display: "inline-block" }}
    >
      {children}
    </span>
  );
}
