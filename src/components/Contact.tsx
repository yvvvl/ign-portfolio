import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Github, Copy, Check, Send, Loader2 } from "lucide-react";

import { useI18n } from "@/lib/i18n";

type SubmitStatus = "idle" | "loading" | "sent" | "error";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

export function Contact() {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const copyEmail = async () => {
    await navigator.clipboard.writeText("contacto.ignsilva@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!WEB3FORMS_ACCESS_KEY) {
      setStatus("error");
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("loading");

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      const result = (await response.json()) as { success?: boolean };

      if (!response.ok || !result.success) {
        throw new Error("Web3Forms submission failed");
      }

      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contacto" className="px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-2 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-primary">
            {t.contact.kicker}
          </p>

          <h2 className="mb-6 font-serif text-4xl leading-tight text-foreground md:text-5xl">
            {t.contact.title}{" "}
            <em className="font-normal italic text-primary">
              {t.contact.titleEm}
            </em>
            {t.contact.titleEnd}
          </h2>

          <p className="mb-10 max-w-md leading-relaxed text-muted-foreground">
            {t.contact.body}
          </p>

          <ul className="space-y-5">
            <li className="group flex items-start gap-4">
              <span className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl border border-card-border bg-card text-primary">
                <Mail className="h-4 w-4" />
              </span>

              <div className="min-w-0 flex-1">
                <p className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">
                  {t.contact.email}
                </p>

                <div className="flex items-center gap-2">
                  <a
                    href="mailto:contacto.ignsilva@gmail.com"
                    className="truncate text-foreground transition-colors hover:text-primary"
                  >
                    contacto.ignsilva@gmail.com
                  </a>

                  <button
                    type="button"
                    onClick={copyEmail}
                    className="rounded-md p-1.5 text-muted-foreground transition-all hover:bg-card hover:text-primary"
                    aria-label="Copy email"
                  >
                    {copied ? (
                      <Check className="h-3.5 w-3.5" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </li>

            <li className="flex items-start gap-4">
              <span className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl border border-card-border bg-card text-primary">
                <Phone className="h-4 w-4" />
              </span>

              <div>
                <p className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">
                  {t.contact.whatsapp}
                </p>

                <a
                  href="https://wa.me/56922343666"
                  target="_blank"
                  rel="noreferrer"
                  className="text-foreground transition-colors hover:text-primary"
                >
                  +56 9 2234 3666
                </a>
              </div>
            </li>

            <li className="flex items-start gap-4">
              <span className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl border border-card-border bg-card text-primary">
                <Github className="h-4 w-4" />
              </span>

              <div>
                <p className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">
                  {t.contact.github}
                </p>

                <a
                  href="https://github.com/yvvvl"
                  target="_blank"
                  rel="noreferrer"
                  className="text-foreground transition-colors hover:text-primary"
                >
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
          className="space-y-5 rounded-2xl border border-card-border bg-card p-7 shadow-sm md:p-9"
        >
          <input
            type="hidden"
            name="access_key"
            value={WEB3FORMS_ACCESS_KEY ?? ""}
          />
          <input
            type="hidden"
            name="subject"
            value="Nuevo mensaje desde el portafolio de Ignacio Silva"
          />
          <input
            type="checkbox"
            name="botcheck"
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          <Field
            label={t.contact.name}
            id="name"
            name="name"
            type="text"
            placeholder={t.contact.namePh}
          />

          <Field
            label={t.contact.email}
            id="email"
            name="email"
            type="email"
            placeholder={t.contact.emailPh}
          />

          <div>
            <label
              htmlFor="message"
              className="mb-2 block font-mono text-xs uppercase tracking-wider text-muted-foreground"
            >
              {t.contact.message}
            </label>

            <textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder={t.contact.msgPh}
              className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition-all placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {status === "error" ? (
            <p className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              No se pudo enviar el mensaje. Inténtalo nuevamente o escríbeme a
              mi correo directamente.
            </p>
          ) : null}

          <button
            type="submit"
            disabled={status === "loading" || status === "sent"}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 disabled:opacity-80"
          >
            {status === "idle" || status === "error" ? (
              <>
                <Send className="h-4 w-4" /> {t.contact.send}
              </>
            ) : null}

            {status === "loading" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />{" "}
                {t.contact.sending}
              </>
            ) : null}

            {status === "sent" ? (
              <>
                <Check className="h-4 w-4" /> {t.contact.sent}
              </>
            ) : null}
          </button>
        </motion.form>
      </div>
    </section>
  );
}

function Field({
  label,
  id,
  name,
  type,
  placeholder,
}: {
  label: string;
  id: string;
  name: string;
  type: string;
  placeholder: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block font-mono text-xs uppercase tracking-wider text-muted-foreground"
      >
        {label}
      </label>

      <input
        id={id}
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition-all placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}