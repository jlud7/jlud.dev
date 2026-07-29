import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Arcade · JLUD.dev",
  description:
    "The JLUD Arcade: original browser games built for the phone in your hand — a loot-grinding side-scroller, a barrel-rolling rail shooter, and a torch-lit dungeon crawler.",
};

type Game = {
  slug: string;
  title: string;
  kind: string;
  hook: string;
  description: string;
  tags: string[];
  accent: string;
  image: string;
};

const games: Game[] = [
  {
    slug: "sporefall",
    title: "Sporefall",
    kind: "Grind RPG",
    hook: "One more level. One more star.",
    description:
      "A side-scrolling grind RPG about hunting cute critters across six increasingly dangerous zones. Vacuum up glimmer, chase rare loot beams, and push your luck star-forcing your gear — it can shine, or it can go boom.",
    tags: ["Loot", "Star force", "6 zones"],
    accent: "#3f8a4f",
    image: "/previews/games/sporefall.jpg",
  },
  {
    slug: "voidlance",
    title: "Voidlance",
    kind: "Rail shooter",
    hook: "Do a barrel roll.",
    description:
      "An into-the-screen arcade rail shooter. Weave wreckage at speed, shred enemy squadrons, deflect bolts with a barrel roll, and drop three bosses — then grind medals and challenges to unlock all eight hull skins.",
    tags: ["3 sectors", "Bosses", "Hull skins"],
    accent: "#4456c7",
    image: "/previews/games/voidlance.jpg",
  },
  {
    slug: "emberdelve",
    title: "Emberdelve",
    kind: "Roguelite crawler",
    hook: "Always one more floor.",
    description:
      "A torch-lit dungeon crawler that rearranges itself every run. Sword combos, dodge rolls, shrines offering one relic of three — and when you fall, spend your embers on permanent upgrades and go again.",
    tags: ["Procedural", "Relics", "Ember forge"],
    accent: "#b4543a",
    image: "/previews/games/emberdelve.jpg",
  },
];

function ExternalIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
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

function GameCard({ game }: { game: Game }) {
  return (
    <a
      href={`/games/${game.slug}/`}
      className="project-card"
      style={{ display: "flex", flexDirection: "column", textDecoration: "none" }}
    >
      <div
        className="preview-img-wrap"
        style={{ background: `linear-gradient(160deg, ${game.accent}22, ${game.accent}08)` }}
      >
        <img src={game.image} alt={`${game.title} gameplay`} loading="lazy" />
      </div>
      <div className="flex flex-col flex-1 p-7 sm:p-8">
        <p
          className="font-mono text-[0.65rem] tracking-widest uppercase mb-3"
          style={{ color: "var(--faint)" }}
        >
          {game.kind} · 2026
        </p>
        <h3 className="text-xl font-semibold tracking-tight mb-1">{game.title}</h3>
        <p className="serif-accent text-[0.95rem] mb-3" style={{ color: game.accent }}>
          {game.hook}
        </p>
        <p className="text-sm leading-[1.75] mb-5" style={{ color: "var(--muted)" }}>
          {game.description}
        </p>
        <div className="card-foot">
          <span className="card-tags">{game.tags.join(" · ")}</span>
          <span className="card-links">
            <span className="card-link">Play →</span>
          </span>
        </div>
      </div>
    </a>
  );
}

export default function Arcade() {
  return (
    <>
      <nav className="nav-bar nav-scrolled">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 h-14 flex items-center justify-between">
          <a href="/" className="font-mono text-sm font-bold tracking-widest">
            JLUD<span style={{ color: "var(--accent)" }}>.</span>DEV
          </a>
          <div className="flex items-center gap-5 sm:gap-7">
            <a href="/" className="nav-link">
              Home
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

      <section className="relative z-10 pt-32 sm:pt-40 pb-14 sm:pb-20">
        <div className="max-w-5xl mx-auto px-5 sm:px-6">
          <p
            className="font-mono text-xs tracking-[0.25em] uppercase mb-6"
            style={{ color: "var(--muted)" }}
          >
            The arcade · built for thumbs
          </p>
          <h1 className="text-[2.5rem] sm:text-6xl font-bold tracking-[-0.02em] leading-[1.05] mb-6">
            Insert{" "}
            <span className="serif-accent" style={{ color: "var(--accent)" }}>
              coin
            </span>
            .
          </h1>
          <p
            className="text-[1.0625rem] sm:text-lg leading-[1.75] max-w-[58ch]"
            style={{ color: "var(--muted)" }}
          >
            Original games that run entirely in your browser — no installs, no
            servers, no ads. Each one is a single file, saves on your device,
            and plays best held in one hand. Sound on.
          </p>
        </div>
      </section>

      <section className="relative z-10 pb-16 sm:pb-24">
        <div className="max-w-5xl mx-auto px-5 sm:px-6">
          <div className="grid gap-7 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {games.map((g) => (
              <GameCard key={g.slug} game={g} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 pb-24 sm:pb-36">
        <div className="max-w-5xl mx-auto px-5 sm:px-6">
          <div
            className="rounded-2xl border p-7 sm:p-9 flex flex-wrap items-center justify-between gap-5"
            style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}
          >
            <div className="max-w-[52ch]">
              <p
                className="font-mono text-[0.65rem] tracking-widest uppercase mb-2"
                style={{ color: "var(--faint)" }}
              >
                Also in the cabinet
              </p>
              <h3 className="text-lg font-semibold tracking-tight mb-2">Rock Hopper</h3>
              <p className="text-sm leading-[1.75]" style={{ color: "var(--muted)" }}>
                A one-finger space prospector, built with my brother. Clamp on,
                drill ore, and launch — the raiders come to you.
              </p>
            </div>
            <a
              href="https://rockhopper-trq.pages.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="card-link"
            >
              Play <ExternalIcon />
            </a>
          </div>
        </div>
      </section>

      <footer className="relative z-10 pb-12">
        <div className="max-w-5xl mx-auto px-5 sm:px-6">
          <p className="font-mono text-[0.65rem] tracking-wider" style={{ color: "var(--faint)" }}>
            JLUD Designs, LLC · progress saves in your browser · built to be
            wrapped as iOS apps someday
          </p>
        </div>
      </footer>
    </>
  );
}
