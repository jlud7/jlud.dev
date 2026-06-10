import ShaderBackground from "./components/ShaderBackground";
import Cursor from "./components/Cursor";
import ScrollReveal from "./components/ScrollReveal";
import ProjectCard, { Project } from "./components/ProjectCard";

const proudOf: Project[] = [
  {
    title: "Garamond Goods",
    year: "2026",
    kind: "Product",
    description:
      "Twelve-season menswear color analysis. The analyzer reads a few photos and places you in a season; a curated catalog of solid-color basics filters to your palette. ΔE2000 color math, built in Miami.",
    tags: ["Color science", "Vanilla JS", "Vercel", "Supabase"],
    image: "/previews/garamond-goods.webp",
    domain: "garamond-goods.vercel.app",
    live: "https://garamond-goods.vercel.app",
    github: "https://github.com/jlud7/GaramondGoods",
  },
  {
    title: "War Zones",
    year: "2026",
    kind: "Game",
    description:
      "Battleship, if it had four layers: space, sky, sea, and underwater. Strategic AI, treasure power-ups, local two-player, and its own domain.",
    tags: ["JavaScript", "Canvas", "Game AI"],
    image: "/previews/warzones.webp",
    domain: "warzones.io",
    live: "https://warzones.io",
    github: "https://github.com/jlud7/WarZones",
  },
  {
    title: "Diptych",
    year: "2026",
    kind: "Game",
    description:
      "A dual-world, 1-bit puzzle game about two halves of one figure. 81 rooms, 15 shards, two worlds walked at once, and nothing in it explains itself. It also runs on a real e-ink handheld.",
    tags: ["JavaScript", "Pixel art", "E-ink port"],
    image: "/previews/diptych.webp",
    domain: "jlud7.github.io/Diptych",
    live: "https://jlud7.github.io/Diptych/",
    github: "https://github.com/jlud7/Diptych",
  },
  {
    title: "Soul Searcher",
    year: "2026",
    kind: "Game",
    description:
      "A browser action RPG where you guide lost souls to their final rest. Quests, crafting, farming, leveling, and the occasional sword swing, all in a cozy little overworld.",
    tags: ["JavaScript", "Game design", "Firebase"],
    image: "/previews/soul-searcher.webp",
    domain: "soulsearcher-ai.web.app",
    live: "https://soulsearcher-ai.web.app",
  },
];

const withFire: Project = {
  title: "With Fire",
  year: "2026",
  kind: "Game · In playtest",
  description:
    "A Skull-family bluffing card game of flowers and flames. Every card you place is a Flower, except the one Fire in your hand. Real online multiplayer with shareable room keys, or solo against four AI opponents. The server is authoritative, so a modified client can never peek at your cards.",
  tags: ["TypeScript", "React", "WebSockets", "Node"],
  image: "/previews/withfire.webp",
  domain: "localhost:3001 · unreleased",
  github: "https://github.com/jlud7/withfire",
};

const cooking: Project[] = [
  {
    title: "Hemingway's Desk",
    year: "2025",
    kind: "Product",
    description:
      "An AI essay-editing companion that cuts, refines, and de-em-dashes your prose, Hemingway style. Multi-user with Google OAuth, real-time sync across devices, powered by Claude.",
    tags: ["React", "Supabase", "Claude API"],
    image: "/previews/hemingways-desk.webp",
    domain: "on-essays.vercel.app",
    live: "https://on-essays.vercel.app",
    github: "https://github.com/jlud7/OnEssays",
  },
  {
    title: "Chesspar",
    year: "2026",
    kind: "Tool",
    description:
      "Play chess over the board while your phone keeps score. Set it above the board, tap once per move, and it writes a clean PGN. An openings coach is next on the roadmap.",
    tags: ["Next.js", "TypeScript", "Computer vision"],
    image: "/previews/chesspar.webp",
    domain: "jlud7.github.io/Chesspar",
    live: "https://jlud7.github.io/Chesspar/",
    github: "https://github.com/jlud7/Chesspar",
  },
  {
    title: "KeyViz Piano",
    year: "2025",
    kind: "Toy",
    description:
      "A falling-note piano visualizer playing the Zelda title theme, with real-time Web Audio synthesis and a playable three-octave keyboard.",
    tags: ["Web Audio", "Canvas"],
    image: "/previews/keyvizpiano.webp",
    domain: "jlud7.github.io/KeyVizPiano",
    live: "https://jlud7.github.io/KeyVizPiano/",
    github: "https://github.com/jlud7/KeyVizPiano",
  },
  {
    title: "Flippy Bord",
    year: "2026",
    kind: "Toy",
    description:
      "A digital split-flap display à la Vestaboard. Compose a message, copy the display link, and throw it up on a TV.",
    tags: ["React", "Vite"],
    image: "/previews/flippybord.webp",
    domain: "jlud7.github.io/flippybord",
    live: "https://jlud7.github.io/flippybord/",
    github: "https://github.com/jlud7/flippybord",
  },
  {
    title: "Goddard Display",
    year: "2026",
    kind: "Hardware",
    description:
      "A full-stack LED matrix system: ESP32-S3 firmware with DMA-driven effects, a Python render service, and a React dashboard for a 64×32 HUB75 panel.",
    tags: ["ESP32", "C++", "FastAPI", "React"],
    image: "/previews/goddard-display.svg",
    domain: "64×32 HUB75 · ESP32-S3",
    github: "https://github.com/jlud7/Goddard_Display_1",
  },
];

const marqueeItems = [
  "TypeScript",
  "WebGL",
  "React",
  "Next.js",
  "WebSockets",
  "C++",
  "Python",
  "Supabase",
  "ESP32",
  "Claude API",
  "Canvas",
  "Color science",
  "Weekly essays",
];

function MarqueeRow() {
  return (
    <span className="marquee-item">
      {marqueeItems.map((item) => (
        <span key={item} className="flex items-center gap-7">
          {item} <span className="spark">✺</span>
        </span>
      ))}
    </span>
  );
}

function ExternalIcon() {
  return (
    <svg
      width="11"
      height="11"
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

export default function Home() {
  return (
    <>
      <ShaderBackground />
      <Cursor />

      {/* Nav */}
      <nav className="nav-bar">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <a href="#" className="font-mono text-sm font-bold tracking-widest">
            JLUD<span style={{ color: "var(--accent)" }}>.</span>DEV
          </a>
          <div className="flex items-center gap-6">
            <a href="#work" className="nav-link">
              Work
            </a>
            <a href="#writing" className="nav-link">
              Writing
            </a>
            <a href="#about" className="nav-link">
              About
            </a>
            <a
              href="https://github.com/jlud7"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
            >
              GitHub
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="max-w-5xl mx-auto w-full px-4 sm:px-6">
          <p
            className="font-mono text-xs tracking-[0.25em] uppercase mb-6 fade-in-up delay-1"
            style={{ color: "var(--muted)" }}
          >
            James Luddy · developer
          </p>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.02] mb-8 fade-in-up delay-2">
            Software with a<br />
            little{" "}
            <span className="serif-accent" style={{ color: "var(--accent)" }}>
              sunshine
            </span>{" "}
            in it.
          </h1>
          <p
            className="text-lg sm:text-xl leading-relaxed max-w-xl mb-10 fade-in-up delay-3"
            style={{ color: "var(--muted)" }}
          >
            I build games, tools, and odd little machines for the web, and
            I&apos;ve shipped a philosophy essay every single week for two-plus
            years. Eleven projects below. All real, all alive.
          </p>
          <div className="fade-in-up delay-4 flex flex-wrap gap-4 items-center">
            <a href="#work" className="btn-primary">
              See the work
              <svg
                width="13"
                height="13"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 1V13M7 13L1 7M7 13L13 7"
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
              className="btn-ghost"
            >
              @jlud7 on GitHub
            </a>
          </div>
        </div>

        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 fade-in-up delay-5">
          <div className="scroll-indicator" style={{ color: "var(--faint)" }}>
            <svg
              width="18"
              height="18"
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

      {/* Marquee */}
      <div className="marquee relative z-10 py-3.5">
        <div className="marquee-track">
          <MarqueeRow />
          <MarqueeRow />
        </div>
      </div>

      {/* Things I'm proud of */}
      <section id="work" className="relative z-10 py-24 sm:py-36">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="mb-16">
              <p
                className="font-mono text-xs tracking-[0.25em] uppercase mb-3"
                style={{ color: "var(--muted)" }}
              >
                01 · Things I&apos;m proud of
              </p>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
                The{" "}
                <span className="serif-accent" style={{ color: "var(--palm)" }}>
                  good
                </span>{" "}
                stuff
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid gap-7 sm:grid-cols-2">
            {/* Logic & Levity, first and widest */}
            <ScrollReveal className="sm:col-span-2">
              <a
                id="writing"
                href="https://logicandlevity.com"
                target="_blank"
                rel="noopener noreferrer"
                className="project-card wide-card"
                data-cursor="read"
                style={{ display: "block", scrollMarginTop: "5rem" }}
              >
                <div className="grid md:grid-cols-2">
                  <div className="preview-frame md:!m-2.5 flex flex-col">
                    <div className="preview-chrome">
                      <span className="dot" />
                      <span className="dot" />
                      <span className="dot" />
                      <span className="domain">logicandlevity.com</span>
                    </div>
                    <div className="preview-fill">
                      <img
                        src="/previews/logic-and-levity.webp"
                        alt="Preview of Logic & Levity"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="p-7 sm:p-10 flex flex-col justify-center">
                    <p
                      className="font-mono text-[0.65rem] tracking-widest uppercase mb-3"
                      style={{ color: "var(--faint)" }}
                    >
                      Substack · Philosophy, weekly
                    </p>
                    <h3 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                      Logic{" "}
                      <span
                        className="serif-accent"
                        style={{ color: "var(--accent)" }}
                      >
                        &amp;
                      </span>{" "}
                      Levity
                    </h3>
                    <p
                      className="text-sm leading-[1.8] mb-8"
                      style={{ color: "var(--muted)" }}
                    >
                      Bite-sized philosophical explorations, published weekly.
                      Every Sunday, without fail, for over two years now. The
                      streak is the thing I&apos;m proudest of.
                    </p>
                    <div className="flex gap-12 mb-8">
                      <div>
                        <p className="text-3xl font-bold tracking-tight mb-1">
                          100+
                        </p>
                        <p
                          className="font-mono text-[0.65rem] tracking-widest uppercase"
                          style={{ color: "var(--faint)" }}
                        >
                          Essays shipped
                        </p>
                      </div>
                      <div>
                        <p className="text-3xl font-bold tracking-tight mb-1">
                          2<span style={{ color: "var(--accent)" }}>+</span> yrs
                        </p>
                        <p
                          className="font-mono text-[0.65rem] tracking-widest uppercase"
                          style={{ color: "var(--faint)" }}
                        >
                          Without missing a week
                        </p>
                      </div>
                    </div>
                    <span className="card-link">
                      Read on Substack <ExternalIcon />
                    </span>
                  </div>
                </div>
              </a>
            </ScrollReveal>

            {proudOf.map((project, i) => (
              <ScrollReveal key={project.title}>
                <div
                  style={{ transitionDelay: `${(i % 2) * 90}ms` }}
                  className="h-full"
                >
                  <ProjectCard project={project} />
                </div>
              </ScrollReveal>
            ))}

            {/* With Fire closes the section, full width */}
            <ScrollReveal className="sm:col-span-2">
              <ProjectCard project={withFire} wide />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Works in progress */}
      <section id="lab" className="relative z-10 pb-24 sm:pb-36">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="mb-16">
              <p
                className="font-mono text-xs tracking-[0.25em] uppercase mb-3"
                style={{ color: "var(--muted)" }}
              >
                02 · Works in progress
              </p>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
                Still{" "}
                <span
                  className="serif-accent"
                  style={{ color: "var(--accent)" }}
                >
                  cooking
                </span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cooking.map((project, i) => (
              <ScrollReveal key={project.title}>
                <div
                  style={{ transitionDelay: `${(i % 3) * 80}ms` }}
                  className="h-full"
                >
                  <ProjectCard project={project} compact />
                </div>
              </ScrollReveal>
            ))}
            <ScrollReveal>
              <a
                href="mailto:hello@jlud.dev"
                className="idea-card"
                style={{ transitionDelay: "160ms" }}
              >
                <span
                  className="font-mono text-[0.65rem] tracking-widest uppercase mb-3"
                  style={{ color: "var(--faint)" }}
                >
                  Slot open · {new Date().getFullYear()}
                </span>
                <span className="text-lg font-semibold tracking-tight mb-1.5">
                  Your idea here<span style={{ color: "var(--accent)" }}>?</span>
                </span>
                <span className="text-sm" style={{ color: "var(--muted)" }}>
                  Got something fun to build, say hi.
                </span>
              </a>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="relative z-10 pb-28 sm:pb-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div
              className="rounded-3xl border p-9 sm:p-16"
              style={{
                background: "var(--card-bg)",
                borderColor: "var(--card-border)",
                backdropFilter: "blur(18px)",
              }}
            >
              <p
                className="font-mono text-xs tracking-[0.25em] uppercase mb-6"
                style={{ color: "var(--muted)" }}
              >
                03 · About
              </p>
              <p className="text-2xl sm:text-3xl leading-snug tracking-tight font-medium max-w-3xl mb-10">
                I&apos;m James. Mostly{" "}
                <span
                  className="serif-accent"
                  style={{ color: "var(--accent)" }}
                >
                  dragon energy
                </span>{" "}
                and a love of creative work: building little worlds, chasing
                color, making machines blink. If it makes someone{" "}
                <span className="serif-accent" style={{ color: "var(--palm)" }}>
                  smile
                </span>
                , it ships.
              </p>
              <div className="flex flex-wrap gap-8 items-center">
                <a href="mailto:hello@jlud.dev" className="arrow-link text-sm">
                  hello@jlud.dev
                  <svg
                    width="13"
                    height="13"
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
                  className="arrow-link text-sm"
                >
                  github.com/jlud7
                  <svg
                    width="13"
                    height="13"
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
                </a>
                <a
                  href="https://logicandlevity.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="arrow-link text-sm"
                >
                  logicandlevity.com
                  <svg
                    width="13"
                    height="13"
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
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="relative z-10 py-16 border-t"
        style={{ borderColor: "var(--line)" }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs" style={{ color: "var(--faint)" }}>
            © {new Date().getFullYear()} James Luddy
          </p>
          <p className="font-mono text-xs" style={{ color: "var(--faint)" }}>
            palm shadows rendered live in WebGL ✺ no video files were harmed
          </p>
        </div>
      </footer>
    </>
  );
}
