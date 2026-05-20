import { motion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

export function Hero() {
  const { t, lang } = useI18n();
  return (
    <section id="inicio" className="relative pt-36 pb-28 md:pt-48 md:pb-40 px-6 md:px-10 overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-60 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-3xl" />
      </div>
      <DataFlowGraphic />
      <motion.div
        key={lang}
        variants={container}
        initial="hidden"
        animate="show"
        className="relative max-w-4xl mx-auto text-center"
      >
        <motion.p variants={item} className="font-mono text-[0.7rem] md:text-xs tracking-[0.25em] text-primary mb-6 uppercase">
          — {t.hero.role}
        </motion.p>
        <motion.h1
          variants={item}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[1.05] text-foreground"
        >
          {t.hero.title}{" "}
          <em className="italic text-primary font-normal">{t.hero.titleEm}</em>.
        </motion.h1>

        <motion.div
          variants={item}
          className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
        >
          {t.hero.tags.map((tag, i) => (
            <span
              key={tag}
              className="group relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-foreground/15 bg-card/60 backdrop-blur-sm text-[0.7rem] md:text-xs font-mono tracking-wider text-foreground/80 hover:border-primary/60 hover:text-primary transition-all duration-300"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary/70 group-hover:bg-primary transition-colors" />
              {tag}
              {i < t.hero.tags.length - 1 && (
                <span className="absolute -right-2.5 sm:-right-3.5 top-1/2 -translate-y-1/2 text-foreground/20 select-none hidden sm:inline">
                  /
                </span>
              )}
            </span>
          ))}
        </motion.div>

        <motion.p
          variants={item}
          className="mt-8 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          {t.hero.subtitle}
        </motion.p>
        <motion.div variants={item} className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#proyectos"
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 transition-all duration-300"
          >
            {t.hero.ctaProjects}
            <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-foreground/20 text-sm text-foreground hover:border-primary hover:text-primary transition-all duration-300"
          >
            <Download className="w-4 h-4" />
            {t.hero.ctaCv}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

function DataFlowGraphic() {
  // Abstract data-flow / node network in coffee tones.
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
    [0, 1], [1, 2], [2, 3], [0, 4], [4, 5], [5, 2], [5, 6], [6, 7], [3, 7], [2, 6],
  ];
  return (
    <div
      aria-hidden
      className="absolute inset-0 -z-10 pointer-events-none flex items-center justify-center opacity-[0.35] dark:opacity-25"
    >
      <svg
        viewBox="0 0 480 320"
        className="w-[120%] max-w-[1100px] h-auto text-primary"
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
            transition={{ duration: 1.4, delay: 0.4 + i * 0.08, ease: "easeOut" }}
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
