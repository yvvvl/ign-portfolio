import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

export function About() {
  const { t } = useI18n();
  return (
    <section id="sobre-mi" className="py-24 md:py-32 px-6 md:px-10">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-xs tracking-[0.3em] text-primary mb-4 uppercase">
            {t.about.kicker}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground leading-tight mb-8">
            {t.about.title} <em className="italic text-primary font-normal">{t.about.titleEm}</em>.
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
            {t.about.body}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
