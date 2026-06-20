import { AnimatePresence, motion } from "framer-motion";
import { Languages, Moon, Sun } from "lucide-react";

import { useI18n } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";

export type PortfolioView = "home" | "about" | "skills" | "projects" | "case" | "contact";

type NavbarProps = {
  activeView: PortfolioView;
  onViewChange: (view: PortfolioView) => void;
};

export function Navbar({ activeView, onViewChange }: NavbarProps) {
  const { theme, toggle } = useTheme();
  const { lang, setLang, t } = useI18n();

  const links: { view: PortfolioView; label: string }[] = [
    { view: "home", label: t.nav.home },
    { view: "about", label: t.nav.about },
    { view: "skills", label: t.nav.skills },
    { view: "projects", label: t.nav.projects },
    {
      view: "case",
      label: lang === "es" ? "Proyecto destacado" : "Case Study",
    },
    { view: "contact", label: t.nav.contact },
  ];

  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/86 backdrop-blur-xl"
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6 md:px-10">
        <button
          type="button"
          onClick={() => onViewChange("home")}
          className="group flex items-center gap-2 text-left"
        >
          <span className="grid h-8 w-8 place-items-center rounded-lg border border-primary/30 bg-primary/12 font-mono text-xs text-primary transition group-hover:border-primary">
            IS
          </span>
          <span className="font-mono text-sm tracking-tight text-foreground">
            Ignacio Silva<span className="text-primary">.</span>
          </span>
        </button>

        <ul className="hidden items-center gap-1 rounded-full border border-border/70 bg-card/70 p-1 md:flex">
          {links.map((link) => {
            const active = activeView === link.view;

            return (
              <li key={link.view}>
                <button
                  type="button"
                  onClick={() => onViewChange(link.view)}
                  className={`relative rounded-full px-3.5 py-1.5 text-xs transition-colors ${
                    active
                      ? "text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {active ? (
                    <motion.span
                      layoutId="active-nav-pill"
                      className="absolute inset-0 rounded-full bg-primary"
                      transition={{
                        type: "spring",
                        bounce: 0.18,
                        duration: 0.45,
                      }}
                    />
                  ) : null}
                  <span className="relative">{link.label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <LangSwitch lang={lang} setLang={setLang} />

          <button
            type="button"
            onClick={toggle}
            aria-label="Toggle theme"
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-foreground/15 text-foreground transition-all duration-300 hover:border-primary hover:text-primary"
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
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </motion.span>
            </AnimatePresence>
          </button>

          <button
            type="button"
            onClick={() => onViewChange("contact")}
            className="hidden items-center rounded-full border border-foreground/20 px-4 py-2 text-sm text-foreground transition-all duration-300 hover:border-primary hover:text-primary sm:inline-flex"
          >
            {t.nav.cta}
          </button>
        </div>
      </nav>

      <div className="border-t border-border/60 bg-background/88 px-4 py-2 md:hidden">
        <div className="flex gap-2 overflow-x-auto">
          {links.map((link) => {
            const active = activeView === link.view;

            return (
              <button
                key={link.view}
                type="button"
                onClick={() => onViewChange(link.view)}
                className={`shrink-0 rounded-full border px-3 py-1.5 text-xs transition-colors ${
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground"
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </div>
      </div>
    </motion.header>
  );
}

function LangSwitch({ lang, setLang }: { lang: "es" | "en"; setLang: (l: "es" | "en") => void }) {
  return (
    <div className="relative inline-flex items-center rounded-full border border-foreground/15 p-0.5 font-mono text-xs">
      <Languages className="mx-2 h-3.5 w-3.5 text-muted-foreground" />

      {(["es", "en"] as const).map((code) => {
        const active = lang === code;

        return (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            className={`relative rounded-full px-2.5 py-1 uppercase tracking-widest transition-colors ${
              active ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {active ? (
              <motion.span
                layoutId="lang-pill"
                className="absolute inset-0 rounded-full bg-primary"
                transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
              />
            ) : null}

            <span className="relative">{code}</span>
          </button>
        );
      })}
    </div>
  );
}
