"use client";

import { MouseEvent } from "react";

export type Project = {
  title: string;
  year: string;
  kind: string;
  description: string;
  tags: string[];
  image: string;
  domain: string;
  live?: string;
  github: string;
};

function ExternalIcon({ size = 11 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 13L13 1M13 1H4M13 1V10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ProjectCard({
  project,
  compact = false,
}: {
  project: Project;
  compact?: boolean;
}) {
  const onMouseMove = (e: MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  const primaryHref = project.live ?? project.github;

  return (
    <article
      className="project-card"
      onMouseMove={onMouseMove}
      data-cursor={project.live ? "view" : "code"}
      onClick={(e) => {
        // make the whole card clickable without nesting anchors
        if ((e.target as Element).closest("a")) return;
        window.open(primaryHref, "_blank", "noopener,noreferrer");
      }}
    >
      <div className="preview-frame">
        <div className="preview-chrome">
          <span className="dot" />
          <span className="dot" />
          <span className="dot" />
          <span className="domain">{project.domain}</span>
        </div>
        <div className="preview-img-wrap">
          {/* static export — plain img keeps it simple and fast */}
          <img
            src={project.image}
            alt={`Preview of ${project.title}`}
            loading="lazy"
          />
        </div>
      </div>

      <div className={`flex flex-col flex-1 ${compact ? "p-5" : "p-6 sm:p-7"}`}>
        <div className="flex items-baseline justify-between gap-3 mb-2">
          <h3
            className={`font-semibold tracking-tight ${
              compact ? "text-base" : "text-xl"
            }`}
          >
            {project.title}
          </h3>
          <span
            className="font-mono text-[0.65rem] tracking-widest uppercase shrink-0"
            style={{ color: "var(--faint)" }}
          >
            {project.kind} · {project.year}
          </span>
        </div>

        <p
          className={`leading-relaxed mb-4 ${compact ? "text-[0.8rem]" : "text-sm"}`}
          style={{ color: "var(--muted)" }}
        >
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-5">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="card-link"
            >
              Live site <ExternalIcon />
            </a>
          )}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="card-link secondary"
          >
            GitHub <ExternalIcon />
          </a>
        </div>
      </div>
    </article>
  );
}
