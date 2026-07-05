"use client";

import { MouseEvent } from "react";

export type Project = {
  title: string;
  year: string;
  kind: string;
  description: string;
  tags: string[];
  image: string;
  domain?: string;
  live?: string;
  github?: string;
  note?: string;
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

function CardFoot({
  project,
  compact = false,
}: {
  project: Project;
  compact?: boolean;
}) {
  return (
    <div className="card-foot">
      <span className="card-tags">
        {project.tags.slice(0, compact ? 2 : 3).join(" · ")}
      </span>
      {(project.live || project.github || project.note) && (
        <span className="card-links">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="card-link"
            >
              Site <ExternalIcon />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="card-link"
            >
              Code <ExternalIcon />
            </a>
          )}
          {project.note && <span className="card-note">{project.note}</span>}
        </span>
      )}
    </div>
  );
}

export default function ProjectCard({
  project,
  compact = false,
  wide = false,
  flip = false,
}: {
  project: Project;
  compact?: boolean;
  wide?: boolean;
  flip?: boolean;
}) {
  const onMouseMove = (e: MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);

    // gentle 3D tilt, rotating away from the cursor like a plate being pressed
    const px = x / rect.width - 0.5;
    const py = y / rect.height - 0.5;
    const maxTilt = 1.6;
    el.style.setProperty("--ry", `${(px * maxTilt * 2).toFixed(2)}deg`);
    el.style.setProperty("--rx", `${(-py * maxTilt * 2).toFixed(2)}deg`);
  };

  const primaryHref = project.live ?? project.github;

  const cardProps = {
    onMouseMove,
    ...(primaryHref
      ? {
          "data-cursor": project.live ? "view" : "code",
          onClick: (e: MouseEvent<HTMLElement>) => {
            // make the whole card clickable without nesting anchors
            if ((e.target as Element).closest("a")) return;
            window.open(primaryHref, "_blank", "noopener,noreferrer");
          },
        }
      : {}),
  };

  if (wide) {
    return (
      <article className="project-card wide" {...cardProps}>
        <div className="grid md:grid-cols-2">
          <div className={`preview-fill ${flip ? "md:order-2" : ""}`}>
            <img
              src={project.image}
              alt={`Preview of ${project.title}`}
              loading="lazy"
            />
          </div>
          <div className="p-7 sm:p-10 flex flex-col justify-center">
            <p
              className="font-mono text-[0.65rem] tracking-widest uppercase mb-3"
              style={{ color: "var(--faint)" }}
            >
              {project.kind} · {project.year}
            </p>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-[-0.02em] mb-4">
              {project.title}
            </h3>
            <p
              className="text-sm leading-[1.8] mb-6"
              style={{ color: "var(--muted)" }}
            >
              {project.description}
            </p>
            <CardFoot project={project} />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="project-card" {...cardProps}>
      <div className="preview-img-wrap">
        {/* static export, plain img keeps it simple and fast */}
        <img
          src={project.image}
          alt={`Preview of ${project.title}`}
          loading="lazy"
        />
      </div>

      <div
        className={`flex flex-col flex-1 ${compact ? "p-7 sm:p-6" : "p-7 sm:p-8"}`}
      >
        <p
          className="font-mono text-[0.65rem] tracking-widest uppercase mb-3"
          style={{ color: "var(--faint)" }}
        >
          {project.kind} · {project.year}
        </p>
        <h3
          className={`font-semibold tracking-tight mb-3 ${
            compact ? "text-lg" : "text-xl"
          }`}
        >
          {project.title}
        </h3>

        <p
          className={`leading-[1.75] mb-5 ${
            compact ? "text-[0.8125rem]" : "text-sm"
          }`}
          style={{ color: "var(--muted)" }}
        >
          {project.description}
        </p>

        <CardFoot project={project} compact={compact} />
      </div>
    </article>
  );
}
