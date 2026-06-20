import { motion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";

import { useI18n } from "@/lib/i18n";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Hero({ onProjectsClick }: { onProjectsClick?: () => void }) {
  const { t, lang } = useI18n();

  return (
    <section
      id="inicio"
      className="relative overflow-hidden px-6 pb-24 pt-24 md:px-10 md:pb-32 md:pt-36"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
        <div className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <DataFlowGraphic />

      <motion.div
        key={lang}
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto max-w-4xl text-center"
      >
        <motion.p
          variants={item}
          className="mb-6 font-mono text-[0.7rem] uppercase tracking-[0.25em] text-primary md:text-xs"
        >
          — {t.hero.role}
        </motion.p>

        <motion.h1
          variants={item}
          className="font-serif text-5xl leading-[1.05] text-foreground sm:text-6xl md:text-7xl lg:text-[5.5rem]"
        >
          {t.hero.title} <em className="font-normal italic text-primary">{t.hero.titleEm}</em>.
        </motion.h1>

        <motion.div
          variants={item}
          className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
        >
          {t.hero.tags.map((tag, i) => (
            <span
              key={tag}
              className="group relative inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-card/60 px-3.5 py-1.5 font-mono text-[0.7rem] tracking-wider text-foreground/80 backdrop-blur-sm transition-all duration-300 hover:border-primary/60 hover:text-primary md:text-xs"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary/70 transition-colors group-hover:bg-primary" />
              {tag}
              {i < t.hero.tags.length - 1 ? (
                <span className="absolute -right-2.5 top-1/2 hidden -translate-y-1/2 select-none text-foreground/20 sm:-right-3.5 sm:inline">
                  /
                </span>
              ) : null}
            </span>
          ))}
        </motion.div>

        <motion.p
          variants={item}
          className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.div
          variants={item}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <button
            type="button"
            onClick={onProjectsClick}
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20"
          >
            {t.hero.ctaProjects}
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </button>

          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-7 py-3.5 text-sm text-foreground transition-all duration-300 hover:border-primary hover:text-primary"
          >
            <Download className="h-4 w-4" />
            {t.hero.ctaCv}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

function DataFlowGraphic() {
  const nodes = [
    { cx: 80, cy: 120, r: 3 },
    { cx: 180, cy: 70, r: 2.5 },
    { cx: 260, cy: 160, r: 3.5 },
    { cx: 360, cy: 90, r: 2.5 },
    { cx: 60, cy: 240, r: 2.5 },
    { cx: 200, cy: 280, r: 3 },
    { cx: 340, cy: 240, r: 2.5 },
    { cx: 420, cy: 180, r: 3 },
  ];

  const lines = [
    [0, 1],
    [1, 2],
    [2, 3],
    [0, 4],
    [4, 5],
    [5, 2],
    [5, 6],
    [6, 7],
    [3, 7],
    [2, 6],
  ];

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center opacity-[0.35] dark:opacity-25"
    >
      <svg
        viewBox="0 0 480 320"
        className="h-auto w-[120%] max-w-[1100px] text-primary"
        fill="none"
      >
        <defs>
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
        </defs>

        {lines.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={nodes[a].cx}
            y1={nodes[a].cy}
            x2={nodes[b].cx}
            y2={nodes[b].cy}
            stroke="currentColor"
            strokeWidth="0.6"
            strokeOpacity="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{
              duration: 1.4,
              delay: 0.4 + i * 0.08,
              ease: "easeOut",
            }}
          />
        ))}

        {nodes.map((n, i) => (
          <g key={i}>
            <circle cx={n.cx} cy={n.cy} r={n.r * 4} fill="url(#nodeGlow)" opacity="0.35" />
            <motion.circle
              cx={n.cx}
              cy={n.cy}
              r={n.r}
              fill="currentColor"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.07 }}
              style={{ transformOrigin: `${n.cx}px ${n.cy}px` }}
            />
          </g>
        ))}

        {lines.slice(0, 5).map(([a, b], i) => (
          <motion.circle
            key={`p-${i}`}
            r="1.6"
            fill="currentColor"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              cx: [nodes[a].cx, nodes[b].cx],
              cy: [nodes[a].cy, nodes[b].cy],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: 1.5 + i * 0.6,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>
    </div>
  );
}
