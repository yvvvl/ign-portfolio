import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Languages } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { useI18n } from "@/lib/i18n";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggle } = useTheme();
  const { lang, setLang, t } = useI18n();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#inicio", label: t.nav.home },
    { href: "#sobre-mi", label: t.nav.about },
    { href: "#skills", label: t.nav.skills },
    { href: "#proyectos", label: t.nav.projects },
    { href: "#contacto", label: t.nav.contact },
  ];

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-md bg-background/80 border-b border-border/60" : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between gap-4">
        <a href="#inicio" className="font-serif text-lg tracking-tight text-foreground">
          Ignacio Silva<span className="text-primary">.</span>
        </a>

        <ul className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative text-sm text-muted-foreground hover:text-foreground transition-colors group py-1"
              >
                {l.label}
                <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <LangSwitch lang={lang} setLang={setLang} />
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="relative w-9 h-9 inline-flex items-center justify-center rounded-full border border-foreground/15 text-foreground hover:border-primary hover:text-primary transition-all duration-300"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 inline-flex items-center justify-center"
              >
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </motion.span>
            </AnimatePresence>
          </button>
          <a
            href="#contacto"
            className="hidden sm:inline-flex items-center px-4 py-2 rounded-full border border-foreground/20 text-sm text-foreground hover:border-primary hover:text-primary transition-all duration-300"
          >
            {t.nav.cta}
          </a>
        </div>
      </nav>
    </motion.header>
  );
}

function LangSwitch({ lang, setLang }: { lang: "es" | "en"; setLang: (l: "es" | "en") => void }) {
  return (
    <div className="relative inline-flex items-center rounded-full border border-foreground/15 p-0.5 text-xs font-mono">
      <Languages className="w-3.5 h-3.5 mx-2 text-muted-foreground" />
      {(["es", "en"] as const).map((code) => {
        const active = lang === code;
        return (
          <button
            key={code}
            onClick={() => setLang(code)}
            className={`relative px-2.5 py-1 rounded-full uppercase tracking-widest transition-colors ${
              active ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {active && (
              <motion.span
                layoutId="lang-pill"
                className="absolute inset-0 bg-primary rounded-full"
                transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
              />
            )}
            <span className="relative">{code}</span>
          </button>
        );
      })}
    </div>
  );
}
