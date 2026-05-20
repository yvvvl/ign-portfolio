import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Lang = "es" | "en";

type Dict = (typeof translations)["es"];

export const translations = {
  es: {
    nav: { home: "Inicio", about: "Sobre mí", skills: "Skills", projects: "Proyectos", contact: "Contacto", cta: "Hablemos" },
    hero: {
      role: "Estudiante de Ingeniería en Informática con mención en Ciencia de Datos · Desarrollador Full-Stack & Data Science",
      title: "Conectando software y datos con",
      titleEm: "precisión analítica",
      subtitle:
        "Construyo aplicaciones web robustas de extremo a extremo (Frontend & Backend) y transformo datos en decisiones e insights mediante analítica avanzada y automatización.",
      ctaProjects: "Ver Proyectos",
      ctaCv: "Descargar CV",
      tags: ["Full-Stack Development", "Data Science", "Automation"],
    },
    about: {
      kicker: "— Sobre mí",
      title: "Full-Stack, datos y",
      titleEm: "automatización con propósito",
      body: "Soy Estudiante de Ingeniería en Informática con mención en Ciencia de Datos, con un perfil híbrido entre Desarrollador Full-Stack y Data Scientist. Diseño y construyo aplicaciones web completas —desde la interfaz hasta la base de datos— y, a la vez, transformo datos crudos en insights accionables a través de modelos analíticos, pipelines y automatizaciones que ayudan a tomar mejores decisiones.",
    },
    skills: {
      kicker: "— Stack técnico",
      title: "Herramientas con las que",
      titleEm: "construyo",
      categories: {
        core: "Core Languages",
        web: "Web Development",
        arch: "Architecture & Tools",
        data: "Ciencia de Datos",
        uiux: "UI/UX Design",
        other: "Otros",
      },
      uiuxDesc: "Implementación de interfaces interactivas y estéticas personalizadas (Glassmorphism, texturas glossy).",
      otherDesc: "Usuario avanzado de Microsoft Office.",
    },
    projects: {
      kicker: "— Proyectos seleccionados",
      title: "Trabajo reciente, hecho con",
      titleEm: "intención",
      demo: "Live Demo",
      code: "GitHub",
      items: [
        { title: "Coffee House Brand", description: "Sitio corporativo para una cafetería boutique, enfocado en storytelling visual y conversión de reservas." },
        { title: "Portfolio Arquitecto", description: "Galería editorial para un estudio de arquitectura con navegación inmersiva y carga progresiva de imágenes." },
        { title: "Dashboard SaaS", description: "Panel analítico para una plataforma de gestión, priorizando claridad de datos y micro-interacciones." },
        { title: "E-commerce Artesanal", description: "Tienda online para productos hechos a mano con checkout optimizado y catálogo dinámico." },
      ],
    },
    contact: {
      kicker: "— Contacto",
      title: "¿Tienes un proyecto",
      titleEm: "en mente",
      titleEnd: "?",
      body: "Conversemos sobre tu idea. Respondo cada mensaje personalmente, normalmente dentro de las próximas 24 horas.",
      email: "Email",
      whatsapp: "WhatsApp",
      github: "GitHub",
      name: "Nombre",
      message: "Mensaje",
      namePh: "Tu nombre",
      emailPh: "tu@email.com",
      msgPh: "Cuéntame sobre tu proyecto...",
      send: "Enviar Mensaje",
      sending: "Enviando...",
      sent: "¡Mensaje enviado!",
    },
    footer: "Hecho con cuidado.",
  },
  en: {
    nav: { home: "Home", about: "About", skills: "Skills", projects: "Projects", contact: "Contact", cta: "Let's talk" },
    hero: {
      role: "Software Engineering Student specializing in Data Science · Full-Stack & Data Science Developer",
      title: "Bridging software and data with",
      titleEm: "analytical precision",
      subtitle:
        "I build robust end-to-end web applications (Frontend & Backend) and turn data into decisions and insights through advanced analytics and automation.",
      ctaProjects: "View Projects",
      ctaCv: "Download CV",
      tags: ["Full-Stack Development", "Data Science", "Automation"],
    },
    about: {
      kicker: "— About me",
      title: "Full-Stack, data and",
      titleEm: "automation with purpose",
      body: "I'm a Software Engineering Student specializing in Data Science, with a hybrid profile as Full-Stack Developer and Data Scientist. I design and build complete web applications —from the interface to the database— while also turning raw data into actionable insights through analytical models, pipelines and automations that drive better decisions.",
    },
    skills: {
      kicker: "— Technical stack",
      title: "Tools I build",
      titleEm: "with",
      categories: {
        core: "Core Languages",
        web: "Web Development",
        arch: "Architecture & Tools",
        data: "Data Science",
        uiux: "UI/UX Design",
        other: "Other",
      },
      uiuxDesc: "Implementation of interactive interfaces and custom aesthetics (Glassmorphism, glossy textures).",
      otherDesc: "Advanced Microsoft Office user.",
    },
    projects: {
      kicker: "— Selected projects",
      title: "Recent work, made with",
      titleEm: "intention",
      demo: "Live Demo",
      code: "GitHub",
      items: [
        { title: "Coffee House Brand", description: "Corporate site for a boutique coffee shop, focused on visual storytelling and reservation conversion." },
        { title: "Architect Portfolio", description: "Editorial gallery for an architecture studio with immersive navigation and progressive image loading." },
        { title: "SaaS Dashboard", description: "Analytics panel for a management platform, prioritizing data clarity and micro-interactions." },
        { title: "Handcrafted E-commerce", description: "Online store for handmade products with optimized checkout and dynamic catalog." },
      ],
    },
    contact: {
      kicker: "— Contact",
      title: "Got a project",
      titleEm: "in mind",
      titleEnd: "?",
      body: "Let's talk about your idea. I reply to every message personally, usually within 24 hours.",
      email: "Email",
      whatsapp: "WhatsApp",
      github: "GitHub",
      name: "Name",
      message: "Message",
      namePh: "Your name",
      emailPh: "you@email.com",
      msgPh: "Tell me about your project...",
      send: "Send Message",
      sending: "Sending...",
      sent: "Message sent!",
    },
    footer: "Made with care.",
  },
} as const;

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Dict };
const LangCtx = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");
  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("lang")) as Lang | null;
    if (saved === "es" || saved === "en") setLangState(saved);
  }, []);
  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("lang", l);
    if (typeof document !== "undefined") document.documentElement.lang = l;
  };
  return <LangCtx.Provider value={{ lang, setLang, t: translations[lang] as Dict }}>{children}</LangCtx.Provider>;
}

export function useI18n() {
  const ctx = useContext(LangCtx);
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider");
  return ctx;
}
