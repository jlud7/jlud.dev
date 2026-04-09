import ScrollReveal from "./components/ScrollReveal";
import ProjectCard from "./components/ProjectCard";

const projects = [
  {
    title: "Project One",
    description:
      "A brief description of this project. What it does, why you built it, and what makes it interesting.",
    tags: ["React", "TypeScript", "Node.js"],
    link: "https://example.com",
    github: "https://github.com/jlud7",
  },
  {
    title: "Project Two",
    description:
      "Another cool project. Describe the problem it solves and the tech decisions you made along the way.",
    tags: ["Python", "FastAPI", "PostgreSQL"],
    link: "https://example.com",
    github: "https://github.com/jlud7",
  },
  {
    title: "Project Three",
    description:
      "One more project to showcase your range. This could be a side project, open source contribution, or experiment.",
    tags: ["Next.js", "Tailwind", "Vercel"],
    link: "https://example.com",
  },
];

export default function Home() {
  return (
    <>
      {/* Video Background */}
      <video
        className="video-bg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/palm-shadow.mp4" type="video/mp4" />
      </video>

      {/* Hero Section */}
      <section className="hero">
        <div className="max-w-2xl mx-auto w-full px-4 sm:px-6">
          <div className="fade-in-up delay-1">
            <p
              className="text-sm font-mono tracking-widest uppercase mb-4"
              style={{ color: "var(--muted)" }}
            >
              jlud.dev
            </p>
          </div>
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-[1.05] mb-6 fade-in-up delay-2">
            Hi, I&apos;m{" "}
            <span className="relative">
              James
              <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-foreground/20 rounded-full" />
            </span>
          </h1>
          <p
            className="text-lg sm:text-xl leading-relaxed max-w-lg mb-10 fade-in-up delay-3"
            style={{ color: "var(--muted)" }}
          >
            Developer building things for the web. I like clean code,
            thoughtful design, and shipping products that people enjoy using.
          </p>
          <div className="fade-in-up delay-4 flex gap-6 items-center">
            <a
              href="#projects"
              className="arrow-link text-base"
            >
              See my work
              <svg
                width="14"
                height="14"
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
            <a
              href="https://github.com/jlud7"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm transition-colors hover:text-foreground"
              style={{ color: "var(--muted)" }}
            >
              GitHub
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 fade-in-up delay-5">
          <div className="scroll-indicator" style={{ color: "var(--muted)" }}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 3V17M10 17L4 11M10 17L16 11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="relative z-10 min-h-screen py-24 sm:py-32"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="mb-16">
              <p
                className="text-sm font-mono tracking-widest uppercase mb-3"
                style={{ color: "var(--muted)" }}
              >
                Selected Work
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Projects
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 sm:grid-cols-2">
            {projects.map((project, i) => (
              <ScrollReveal key={project.title}>
                <div style={{ transitionDelay: `${i * 100}ms` }}>
                  <ProjectCard project={project} />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t" style={{ borderColor: "var(--card-border)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            &copy; {new Date().getFullYear()} JLUD
          </p>
          <div className="flex gap-6">
            <a
              href="https://github.com/jlud7"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm transition-colors hover:text-foreground"
              style={{ color: "var(--muted)" }}
            >
              GitHub
            </a>
            <a
              href="mailto:hello@jlud.dev"
              className="text-sm transition-colors hover:text-foreground"
              style={{ color: "var(--muted)" }}
            >
              Email
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
