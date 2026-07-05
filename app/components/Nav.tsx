"use client";

import { useEffect, useState } from "react";
import Magnetic from "./Magnetic";

const SECTIONS = ["work", "lab", "about"];

// observed section id -> nav link that lights up
const SECTION_TO_LINK: Record<string, string> = {
  work: "work",
  lab: "work",
  about: "about",
};

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(SECTION_TO_LINK[entry.target.id] ?? null);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    const els = SECTIONS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );
    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const linkClass = (id: string) =>
    `nav-link${active === id ? " nav-link-active" : ""}`;

  return (
    <nav className={`nav-bar${scrolled ? " nav-scrolled" : ""}`}>
      <div className="max-w-5xl mx-auto px-5 sm:px-6 h-14 flex items-center justify-between">
        <div className="flex items-baseline gap-2.5">
          <a
            href="#"
            className="font-mono text-sm font-bold tracking-widest"
            aria-label="JLUD.dev, operated by JLUD Designs, LLC"
          >
            JLUD<span style={{ color: "var(--accent)" }}>.</span>DEV
          </a>
          <span
            className="hidden md:inline font-mono text-[0.65rem] tracking-wider"
            style={{ color: "var(--faint)" }}
          >
            JLUD Designs, LLC
          </span>
        </div>
        <div className="flex items-center gap-5 sm:gap-7">
          <Magnetic strength={0.3}>
            <a href="#work" className={linkClass("work")}>
              Work
            </a>
          </Magnetic>
          <Magnetic strength={0.3}>
            <a href="#writing" className="nav-link">
              Writing
            </a>
          </Magnetic>
          <Magnetic strength={0.3}>
            <a href="#about" className={linkClass("about")}>
              About
            </a>
          </Magnetic>
          <Magnetic strength={0.3}>
            <a
              href="https://github.com/jlud7"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
            >
              GitHub
            </a>
          </Magnetic>
        </div>
      </div>
    </nav>
  );
}
