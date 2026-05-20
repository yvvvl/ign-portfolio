import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Github, Copy, Check, Send, Loader2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import type { FormEvent } from "react";

export function Contact() {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "sent">("idle");

  const copyEmail = async () => {
    await navigator.clipboard.writeText("contacto.ignsilva@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => setStatus("sent"), 1200);
  };

  return (
    <section id="contacto" className="py-28 md:py-36 px-6 md:px-10">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-xs tracking-[0.3em] text-primary mb-4 uppercase">{t.contact.kicker}</p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground leading-tight mb-6">
            {t.contact.title} <em className="italic text-primary font-normal">{t.contact.titleEm}</em>{t.contact.titleEnd}
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-10 max-w-md">{t.contact.body}</p>

          <ul className="space-y-5">
            <li className="flex items-start gap-4 group">
              <span className="mt-0.5 w-10 h-10 rounded-xl bg-card border border-card-border flex items-center justify-center text-primary">
                <Mail className="w-4 h-4" />
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{t.contact.email}</p>
                <div className="flex items-center gap-2">
                  <a href="mailto:contacto.ignsilva@gmail.com" className="text-foreground hover:text-primary transition-colors truncate">
                    contacto.ignsilva@gmail.com
                  </a>
                  <button onClick={copyEmail} className="p-1.5 rounded-md text-muted-foreground hover:text-primary hover:bg-card transition-all" aria-label="Copy email">
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="mt-0.5 w-10 h-10 rounded-xl bg-card border border-card-border flex items-center justify-center text-primary">
                <Phone className="w-4 h-4" />
              </span>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{t.contact.whatsapp}</p>
                <a href="https://wa.me/56922343666" target="_blank" rel="noreferrer" className="text-foreground hover:text-primary transition-colors">
                  +56 9 2234 3666
                </a>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="mt-0.5 w-10 h-10 rounded-xl bg-card border border-card-border flex items-center justify-center text-primary">
                <Github className="w-4 h-4" />
              </span>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{t.contact.github}</p>
                <a href="https://github.com/yvvvl" target="_blank" rel="noreferrer" className="text-foreground hover:text-primary transition-colors">
                  github.com/yvvvl
                </a>
              </div>
            </li>
          </ul>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="rounded-2xl bg-card border border-card-border p-7 md:p-9 shadow-sm space-y-5"
        >
          <Field label={t.contact.name} id="name" type="text" placeholder={t.contact.namePh} />
          <Field label={t.contact.email} id="email" type="email" placeholder={t.contact.emailPh} />
          <div>
            <label htmlFor="msg" className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
              {t.contact.message}
            </label>
            <textarea
              id="msg"
              required
              rows={5}
              placeholder={t.contact.msgPh}
              className="w-full rounded-xl bg-background border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={status !== "idle"}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 disabled:opacity-80"
          >
            {status === "idle" && (<><Send className="w-4 h-4" /> {t.contact.send}</>)}
            {status === "loading" && (<><Loader2 className="w-4 h-4 animate-spin" /> {t.contact.sending}</>)}
            {status === "sent" && (<><Check className="w-4 h-4" /> {t.contact.sent}</>)}
          </button>
        </motion.form>
      </div>
    </section>
  );
}

function Field({ label, id, type, placeholder }: { label: string; id: string; type: string; placeholder: string }) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
        {label}
      </label>
      <input
        id={id}
        type={type}
        required
        placeholder={placeholder}
        className="w-full rounded-xl bg-background border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
      />
    </div>
  );
}
