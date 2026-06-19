import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { ThemeProvider } from "@/lib/theme";
import { LanguageProvider, useI18n } from "@/lib/i18n";
import { CaseStudy } from "@/components/CaseStudy";

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
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <CaseStudy />
        <Contact />
      </main>
      <footer className="border-t border-border py-10 px-6 md:px-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p className="font-serif">
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
