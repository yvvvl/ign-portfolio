import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

import aboutBrentImage from "@/assets/projects/about-brent.png";
import edaSpotifyImage from "@/assets/projects/eda-spotify.png";
import techJobMarketImage from "@/assets/projects/tech-job-market.png";
import { useI18n } from "@/lib/i18n";

const meta = [
  {
    stack: ["React", "Vite", "Tailwind", "Vercel"],
    demo: "https://aboutbrent.vercel.app/",
    github: "https://github.com/yvvvl/brentfaiyaz-chronicles",
    image: aboutBrentImage,
    gradient: "from-[#8D6E63] via-[#A88578] to-[#E6DCD3]",
  },
  {
    stack: ["Python", "Pandas", "EDA", "Spotify"],
    demo: "https://eda-spotify-tracks.vercel.app/",
    github: "https://github.com/yvvvl/eda-spotify-tracks",
    image: edaSpotifyImage,
    gradient: "from-[#1DB954] via-[#191414] to-[#535353]",
  },
  {
    stack: ["FastAPI", "PostgreSQL", "React", "TypeScript", "CI/CD"],
    demo: "https://tech-job-market-chile-demo.silva-ignacio-696.workers.dev/",
    github: "https://github.com/yvvvl/tech-job-market-chile",
    image: techJobMarketImage,
    gradient: "from-[#2F1F17] via-[#5D4037] to-[#E6DCD3]",
  },
];

export function Projects() {
  const { t } = useI18n();

  return (
    <section id="proyectos" className="px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-2xl md:mb-20"
        >
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-primary">
            {t.projects.kicker}
          </p>

          <h2 className="font-serif text-4xl leading-tight text-foreground md:text-5xl">
            {t.projects.title}{" "}
            <em className="font-normal italic text-primary">{t.projects.titleEm}</em>.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {t.projects.items.map((p, i) => {
            const m = meta[i];

            return (
              <motion.article
                key={p.title}
                role="link"
                tabIndex={0}
                aria-label={`Abrir ${p.title}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                onClick={() => window.open(m.demo, "_blank", "noreferrer")}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    window.open(m.demo, "_blank", "noreferrer");
                  }
                }}
                className="group cursor-pointer overflow-hidden rounded-2xl border border-card-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-foreground/5 focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-background">
                  <div className={`absolute inset-0 bg-gradient-to-br ${m.gradient}`} />

                  <img
                    src={m.image}
                    alt={`Captura del proyecto ${p.title}`}
                    loading="lazy"
                    className="relative h-full w-full object-cover object-top opacity-95 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent opacity-80" />

                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-flex rounded-full border border-white/20 bg-black/35 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-white backdrop-blur">
                      {p.title}
                    </span>
                  </div>
                </div>

                <div className="p-7">
                  <h3 className="mb-2 font-serif text-2xl text-foreground">{p.title}</h3>

                  <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
                    {p.description}
                  </p>

                  <div className="mb-6 flex flex-wrap gap-2">
                    {m.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-md border border-border bg-background px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 border-t border-border pt-4">
                    <a
                      href={m.demo}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(event) => event.stopPropagation()}
                      className="inline-flex items-center gap-1.5 text-sm text-foreground transition-colors hover:text-primary"
                    >
                      <ExternalLink className="h-4 w-4" /> {t.projects.demo}
                    </a>

                    {m.github ? (
                      <a
                        href={m.github}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(event) => event.stopPropagation()}
                        className="inline-flex items-center gap-1.5 text-sm text-foreground transition-colors hover:text-primary"
                      >
                        <Github className="h-4 w-4" /> {t.projects.code}
                      </a>
                    ) : null}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
