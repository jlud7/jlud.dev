"use client";

type Project = {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  image?: string;
};

function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 13L13 1M13 1H3M13 1V11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ProjectCard({ project }: { project: Project }) {
  const Wrapper = project.link ? "a" : "div";
  const wrapperProps = project.link
    ? { href: project.link, target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  return (
    <Wrapper {...wrapperProps} className="project-card block cursor-pointer group">
      {project.image && (
        <div className="mb-4 rounded-lg overflow-hidden bg-gray-100 aspect-video">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="text-lg font-semibold tracking-tight">{project.title}</h3>
        {project.link && (
          <span className="mt-1 opacity-40 group-hover:opacity-100 transition-opacity">
            <ArrowIcon />
          </span>
        )}
      </div>
      <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--muted)" }}>
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="arrow-link mt-4 text-xs"
          style={{ color: "var(--muted)" }}
          onClick={(e) => e.stopPropagation()}
        >
          View Source
          <svg
            width="12"
            height="12"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 7H13M13 7L7 1M13 7L7 13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      )}
    </Wrapper>
  );
}
