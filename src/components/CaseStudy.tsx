import { motion } from "framer-motion";
import {
  CheckCircle2,
  Database,
  GitBranch,
  Layers3,
  LineChart,
  Server,
  TestTube2,
} from "lucide-react";

import { useI18n } from "@/lib/i18n";

const content = {
  es: {
    kicker: "— Proyecto destacado",
    title: "Tech Job Market Chile",
    titleEm: "de dataset a producto full-stack",
    intro:
      "Plataforma orientada a datos para analizar el mercado laboral tecnológico en Chile mediante métricas, visualizaciones y recomendaciones de carrera.",
    problemTitle: "Problema",
    problem:
      "La información del mercado laboral tech suele estar dispersa entre portales, descripciones poco estructuradas y datos difíciles de comparar. El desafío fue convertir ofertas laborales en una experiencia clara para explorar tecnologías demandadas, seniority, ciudades, salarios estimados y rutas de aprendizaje.",
    solutionTitle: "Solución",
    solution:
      "Construí una aplicación full-stack con backend en FastAPI, PostgreSQL, SQLAlchemy y Alembic, junto a un frontend en React, TypeScript, Vite, TanStack Router, React Query y Recharts. La demo pública usa datos simulados para mantenerse disponible gratis, mientras que el repositorio conserva el backend real, migraciones, scripts, tests y CI.",
    validationTitle: "Validación técnica",
    resultTitle: "Resultado",
    result:
      "El resultado es una demo pública navegable y un repositorio técnico listo para revisión, con separación frontend/backend, base de datos relacional, migraciones, pruebas automatizadas y GitHub Actions corriendo en master.",
    demo: "Ver demo",
    code: "Ver código",
    validation: [
      "Ruff lint y format check para backend.",
      "Alembic upgrade head y Alembic check en CI.",
      "Pytest unitarios e integración con base aislada.",
      "ESLint y build de producción con Vite.",
      "Pull Request validado antes de integrar a master.",
    ],
    metrics: [
      { label: "Frontend", value: "React + Vite" },
      { label: "Backend", value: "FastAPI" },
      { label: "Database", value: "PostgreSQL" },
      { label: "CI", value: "GitHub Actions" },
    ],
  },
  en: {
    kicker: "— Featured project",
    title: "Tech Job Market Chile",
    titleEm: "from dataset to full-stack product",
    intro:
      "Data-oriented platform for analyzing Chile's tech job market through metrics, visualizations and career recommendations.",
    problemTitle: "Problem",
    problem:
      "Tech job market information is usually scattered across job boards, unstructured descriptions and data that is hard to compare. The challenge was to turn job postings into a clear experience for exploring technology demand, seniority, cities, estimated salaries and learning paths.",
    solutionTitle: "Solution",
    solution:
      "I built a full-stack application with FastAPI, PostgreSQL, SQLAlchemy and Alembic on the backend, plus React, TypeScript, Vite, TanStack Router, React Query and Recharts on the frontend. The public demo uses sample data to remain freely available, while the repository keeps the real backend, migrations, scripts, tests and CI.",
    validationTitle: "Technical validation",
    resultTitle: "Result",
    result:
      "The result is a public demo and a technical repository ready for review, with frontend/backend separation, relational database modeling, migrations, automated tests and GitHub Actions running on master.",
    demo: "View demo",
    code: "View code",
    validation: [
      "Ruff lint and format check for the backend.",
      "Alembic upgrade head and Alembic check in CI.",
      "Unit and integration tests with an isolated database.",
      "ESLint and production build with Vite.",
      "Pull Request validated before merging into master.",
    ],
    metrics: [
      { label: "Frontend", value: "React + Vite" },
      { label: "Backend", value: "FastAPI" },
      { label: "Database", value: "PostgreSQL" },
      { label: "CI", value: "GitHub Actions" },
    ],
  },
} as const;

const stack = [
  { icon: Layers3, label: "React / TypeScript / Vite" },
  { icon: Server, label: "FastAPI / SQLAlchemy / Pydantic" },
  { icon: Database, label: "PostgreSQL / Alembic" },
  { icon: TestTube2, label: "Pytest / Ruff / ESLint" },
  { icon: GitBranch, label: "GitHub Actions / Pull Request workflow" },
  { icon: LineChart, label: "Recharts / Data visualization" },
];

export function CaseStudy() {
  const { lang } = useI18n();
  const t = content[lang];

  return (
    <section id="case-study" className="px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-3xl"
        >
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-primary">
            {t.kicker}
          </p>

          <h2 className="font-serif text-4xl leading-tight text-foreground md:text-5xl">
            {t.title}: <em className="font-normal italic text-primary">{t.titleEm}</em>.
          </h2>

          <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            {t.intro}
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-card-border bg-card p-7 shadow-sm"
          >
            <div className="grid gap-7">
              <CaseBlock title={t.problemTitle} body={t.problem} />
              <CaseBlock title={t.solutionTitle} body={t.solution} />
              <CaseBlock title={t.resultTitle} body={t.result} />
            </div>

            <div className="mt-8 flex flex-wrap gap-3 border-t border-border pt-6">
              <a
                href="https://tech-job-market-chile-demo.silva-ignacio-696.workers.dev/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
              >
                {t.demo}
              </a>

              <a
                href="https://github.com/yvvvl/tech-job-market-chile"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition hover:border-primary hover:text-primary"
              >
                {t.code}
              </a>
            </div>
          </motion.article>

          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <div className="rounded-2xl border border-card-border bg-card p-6 shadow-sm">
              <h3 className="font-serif text-2xl text-foreground">{t.validationTitle}</h3>

              <ul className="mt-5 space-y-3">
                {t.validation.map((item) => (
                  <ListItem key={item}>{item}</ListItem>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {t.metrics.map((metric) => (
                <div key={metric.label} className="rounded-xl border border-border bg-card p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    {metric.label}
                  </p>
                  <p className="mt-2 text-sm font-medium text-foreground">{metric.value}</p>
                </div>
              ))}
            </div>
          </motion.aside>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {stack.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 rounded-xl border border-border bg-card/70 px-4 py-3 text-sm text-muted-foreground"
            >
              <item.icon className="h-4 w-4 text-primary" />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseBlock({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h3 className="font-serif text-2xl text-foreground">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}

function ListItem({ children }: { children: string }) {
  return (
    <li className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
      <span>{children}</span>
    </li>
  );
}
