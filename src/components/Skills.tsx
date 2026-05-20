import type { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  Code2, Globe, Network, Sparkles, Palette, Briefcase,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";

type Category = {
  key: "core" | "web" | "arch" | "data" | "uiux" | "other";
  icon: ReactNode;
  items?: string[];
  descKey?: "uiuxDesc" | "otherDesc";
};

const categories: Category[] = [
  {
    key: "core",
    icon: <Code2 className="w-5 h-5" />,
    items: ["JavaScript", "Python", "React", "TypeScript", "HTML5", "CSS3", "SQL", "Java"],
  },
  {
    key: "web",
    icon: <Globe className="w-5 h-5" />,
    items: ["React", "Vite", "Tailwind CSS", "Firebase"],
  },
  {
    key: "arch",
    icon: <Network className="w-5 h-5" />,
    items: ["Microservices Architecture", "API Gateway", "Vercel", "Cloudinary", "Firebase"],
  },
  {
    key: "data",
    icon: <Sparkles className="w-5 h-5" />,
    items: ["Pandas", "NumPy", "Scikit-Learn", "Jupyter Notebooks", "Data Analysis"],
  },
  {
    key: "uiux",
    icon: <Palette className="w-5 h-5" />,
    descKey: "uiuxDesc",
  },
  {
    key: "other",
    icon: <Briefcase className="w-5 h-5" />,
    descKey: "otherDesc",
  },
];

export function Skills() {
  const { t } = useI18n();
  return (
    <section id="skills" className="relative py-28 md:py-36 px-6 md:px-10 overflow-hidden">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-[420px] h-[420px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 -right-20 w-[380px] h-[380px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20 max-w-2xl"
        >
          <p className="font-mono text-xs tracking-[0.3em] text-primary mb-4 uppercase">
            {t.skills.kicker}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground leading-tight">
            {t.skills.title} <em className="italic text-primary font-normal">{t.skills.titleEm}</em>.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {categories.map((c, i) => (
            <motion.div
              key={c.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="group relative glass-card rounded-2xl p-6 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_color-mix(in_oklab,var(--color-primary)_45%,transparent)] hover:border-primary/40 transition-all duration-300"
            >
              {/* glossy top highlight */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
              {/* perimeter glow on hover */}
              <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "radial-gradient(120% 80% at 50% 0%, color-mix(in oklab, var(--color-primary) 22%, transparent), transparent 60%)" }} />

              <div className="relative">
                <div className="flex items-center gap-3 mb-5">
                  <span className="inline-flex w-10 h-10 rounded-xl items-center justify-center bg-primary/10 text-primary border border-primary/20">
                    {c.icon}
                  </span>
                  <h3 className="font-serif text-xl text-foreground">{t.skills.categories[c.key]}</h3>
                </div>

                {c.items && (
                  <div className="flex flex-wrap gap-2">
                    {c.items.map((it) => (
                      <span
                        key={it}
                        className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-background/60 border border-card-border text-muted-foreground"
                      >
                        {it}
                      </span>
                    ))}
                  </div>
                )}
                {c.descKey && (
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t.skills[c.descKey]}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
