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

function PreviewChrome({ domain }: { domain: string }) {
  return (
    <div className="preview-chrome">
      <span className="dot" />
      <span className="dot" />
      <span className="dot" />
      <span className="domain">{domain}</span>
    </div>
  );
}

function CardFoot({ project }: { project: Project }) {
  if (!project.live && !project.github && !project.note) return null;
  return (
    <div className="card-foot">
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
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="card-link secondary"
        >
          GitHub <ExternalIcon />
        </a>
      )}
      {project.note && <span className="card-note">{project.note}</span>}
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
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
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
          <div
            className={`preview-frame md:!m-2.5 flex flex-col ${
              flip ? "md:order-2" : ""
            }`}
          >
            <PreviewChrome domain={project.domain} />
            <div className="preview-fill">
              <img
                src={project.image}
                alt={`Preview of ${project.title}`}
                loading="lazy"
              />
            </div>
          </div>
          <div className="p-7 sm:p-10 flex flex-col justify-center">
            <p
              className="font-mono text-[0.65rem] tracking-widest uppercase mb-3"
              style={{ color: "var(--faint)" }}
            >
              {project.kind} · {project.year}
            </p>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
              {project.title}
            </h3>
            <p
              className="text-sm leading-[1.8] mb-6"
              style={{ color: "var(--muted)" }}
            >
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
            <CardFoot project={project} />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="project-card" {...cardProps}>
      <div className="preview-frame">
        <PreviewChrome domain={project.domain} />
        <div className="preview-img-wrap">
          {/* static export — plain img keeps it simple and fast */}
          <img
            src={project.image}
            alt={`Preview of ${project.title}`}
            loading="lazy"
          />
        </div>
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

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>

        <CardFoot project={project} />
      </div>
    </article>
  );
}
