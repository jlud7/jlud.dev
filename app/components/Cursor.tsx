"use client";

import { useEffect, useRef } from "react";

const PARTICLE_COLORS = ["#b4543a", "#3f5a3c", "#e0a33e", "#1c1813"];

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.classList.add("has-cursor");
    document.body.classList.add("cursor-hidden");

    const pos = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };
    let raf = 0;
    let seen = false;

    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (!seen) {
        seen = true;
        ringPos.x = pos.x;
        ringPos.y = pos.y;
        document.body.classList.remove("cursor-hidden");
      }
    };

    const loop = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.16;
      ringPos.y += (pos.y - ringPos.y) * 0.16;
      dot.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    const onOver = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.(
        "a, button, [data-cursor]"
      );
      const body = document.body;
      if (el) {
        const label = el.getAttribute("data-cursor");
        if (label) {
          ring.textContent = label;
          body.classList.add("cursor-label");
          body.classList.remove("cursor-link");
        } else {
          ring.textContent = "";
          body.classList.add("cursor-link");
          body.classList.remove("cursor-label");
        }
      } else {
        ring.textContent = "";
        body.classList.remove("cursor-link", "cursor-label");
      }
    };

    const burst = (x: number, y: number) => {
      for (let i = 0; i < 8; i++) {
        const p = document.createElement("span");
        p.className = "cursor-particle";
        const angle = (Math.PI * 2 * i) / 8 + Math.random() * 0.6;
        const dist = 26 + Math.random() * 34;
        p.style.left = `${x}px`;
        p.style.top = `${y}px`;
        p.style.background =
          PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
        p.style.setProperty("--px", `${Math.cos(angle) * dist}px`);
        p.style.setProperty("--py", `${Math.sin(angle) * dist}px`);
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 700);
      }
    };

    const onDown = (e: PointerEvent) => {
      document.body.classList.add("cursor-down");
      burst(e.clientX, e.clientY);
    };
    const onUp = () => document.body.classList.remove("cursor-down");
    const onLeave = () => document.body.classList.add("cursor-hidden");
    const onEnter = () => {
      if (seen) document.body.classList.remove("cursor-hidden");
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.documentElement.addEventListener("pointerleave", onLeave);
    document.documentElement.addEventListener("pointerenter", onEnter);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.documentElement.removeEventListener("pointerenter", onEnter);
      document.documentElement.classList.remove("has-cursor");
      document.body.classList.remove(
        "cursor-hidden",
        "cursor-link",
        "cursor-label",
        "cursor-down"
      );
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
