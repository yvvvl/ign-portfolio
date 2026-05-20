import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const meta = [
  { stack: ["React", "Tailwind", "Framer Motion"], demo: "#", github: "https://github.com/yvvvl", gradient: "from-[#8D6E63] via-[#A88578] to-[#E6DCD3]" },
  { stack: ["Next.js", "TypeScript", "GSAP"], demo: "#", github: "https://github.com/yvvvl", gradient: "from-[#5D4037] via-[#8D6E63] to-[#F5EFEB]" },
  { stack: ["React", "TanStack", "Recharts"], demo: "#", github: "https://github.com/yvvvl", gradient: "from-[#2F1F17] via-[#5D4037] to-[#8D6E63]" },
  { stack: ["Next.js", "Stripe", "Tailwind"], demo: "#", github: "https://github.com/yvvvl", gradient: "from-[#A88578] via-[#E6DCD3] to-[#FAF6EE]" },
];

export function Projects() {
  const { t } = useI18n();
  return (
    <section id="proyectos" className="py-28 md:py-36 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20 max-w-2xl"
        >
          <p className="font-mono text-xs tracking-[0.3em] text-primary mb-4 uppercase">{t.projects.kicker}</p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground leading-tight">
            {t.projects.title} <em className="italic text-primary font-normal">{t.projects.titleEm}</em>.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {t.projects.items.map((p, i) => {
            const m = meta[i];
            return (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="group rounded-2xl bg-card border border-card-border overflow-hidden shadow-sm hover:shadow-xl hover:shadow-foreground/5 hover:-translate-y-2 transition-all duration-300"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${m.gradient} transition-transform duration-500 group-hover:scale-105`} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-serif text-3xl text-background/90 italic">{p.title.split(" ")[0]}</span>
                  </div>
                </div>
                <div className="p-7">
                  <h3 className="font-serif text-2xl text-foreground mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">{p.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {m.stack.map((s) => (
                      <span key={s} className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-background border border-border text-muted-foreground">
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 pt-4 border-t border-border">
                    <a href={m.demo} className="inline-flex items-center gap-1.5 text-sm text-foreground hover:text-primary transition-colors">
                      <ExternalLink className="w-4 h-4" /> {t.projects.demo}
                    </a>
                    <a href={m.github} className="inline-flex items-center gap-1.5 text-sm text-foreground hover:text-primary transition-colors">
                      <Github className="w-4 h-4" /> {t.projects.code}
                    </a>
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
