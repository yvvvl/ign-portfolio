import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { createFileRoute } from "@tanstack/react-router";

import { About } from "@/components/About";
import { CaseStudy } from "@/components/CaseStudy";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { Navbar, type PortfolioView } from "@/components/Navbar";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { LanguageProvider, useI18n } from "@/lib/i18n";
import { ThemeProvider } from "@/lib/theme";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Ignacio Silva — Software Engineering Student" },
      {
        name: "description",
        content:
          "Portafolio de Ignacio Silva. Estudiante de Ingeniería en Informática con mención en Ciencia de Datos.",
      },
    ],
  }),
});

function Index() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Shell />
      </LanguageProvider>
    </ThemeProvider>
  );
}

function Shell() {
  const { t } = useI18n();
  const [activeView, setActiveView] = useState<PortfolioView>("home");

  const views: Record<PortfolioView, ReactNode> = {
    home: <Hero onProjectsClick={() => setActiveView("projects")} />,
    about: <About />,
    skills: <Skills />,
    projects: <Projects />,
    case: <CaseStudy />,
    contact: <Contact />,
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar activeView={activeView} onViewChange={setActiveView} />

      <main className="min-h-screen pt-24 md:pt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -12, filter: "blur(8px)" }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            {views[activeView]}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="border-t border-border px-6 py-8 md:px-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
          <p className="font-mono">
            Ignacio Silva<span className="text-primary">.</span>
          </p>

          <p className="font-mono text-xs">
            © {new Date().getFullYear()} — {t.footer}
          </p>
        </div>
      </footer>
    </div>
  );
}
