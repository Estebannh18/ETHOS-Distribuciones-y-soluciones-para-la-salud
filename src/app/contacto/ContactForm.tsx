"use client";

import Link from "next/link";
import { useState } from "react";
import { Send } from "lucide-react";
import { whatsappLink } from "@/lib/site";

const REASONS = ["Cotización", "Quiero ser cliente", "Disponibilidad de un producto", "Otro"];

// Sin backend por ahora: el formulario arma el mensaje y lo abre en WhatsApp.
export function ContactForm() {
  const [reason, setReason] = useState(REASONS[0]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const text =
          `Hola Ethos, soy ${data.get("name")} de ${data.get("company")}.\n` +
          `Motivo: ${reason}\nCiudad: ${data.get("city")}\nTeléfono: ${data.get("phone")}\n\n${data.get("message")}`;
        window.open(whatsappLink(text), "_blank", "noopener,noreferrer");
      }}
      className="rounded-3xl border border-line bg-white p-6 shadow-[0_30px_80px_-30px_rgb(11_79_138/0.3)] sm:p-10"
    >
      <p className="eyebrow text-ethos-ink/50">¿En qué te ayudamos?</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {REASONS.map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setReason(r)}
            aria-pressed={reason === r}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              reason === r ? "border-ethos bg-ethos text-white" : "border-line text-ethos-ink/70 hover:border-ethos/40"
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <Field name="name" label="Nombre" required />
        <Field name="company" label="Empresa o droguería" required />
        <Field name="phone" label="Teléfono" type="tel" required />
        <Field name="city" label="Ciudad" required />
      </div>
      <label className="mt-5 block">
        <span className="text-sm font-semibold text-ethos">Mensaje</span>
        <textarea
          name="message"
          rows={4}
          maxLength={1000}
          placeholder="Cuéntanos qué productos necesitas o tu pregunta"
          className="mt-2 w-full resize-none rounded-xl border border-line px-4 py-3 placeholder:text-ethos-ink/35 focus:border-teal focus:outline-none"
        />
      </label>

      <label className="mt-5 flex items-start gap-3 text-sm text-ethos-ink/60">
        <input type="checkbox" required className="mt-0.5 h-4 w-4 accent-teal" />
        <span>
          Autorizo el tratamiento de mis datos personales según la{" "}
          <Link href="/legal/privacidad" className="font-semibold text-teal underline-offset-2 hover:underline">
            política de tratamiento de datos
          </Link>
          .
        </span>
      </label>

      <button
        type="submit"
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-teal px-6 py-4 font-semibold text-white transition hover:bg-teal-dark"
      >
        <Send className="h-4 w-4" /> Enviar por WhatsApp
      </button>
    </form>
  );
}

function Field({ name, label, type = "text", required }: { name: string; label: string; type?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-ethos">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        maxLength={80}
        autoComplete="off"
        className="mt-2 w-full rounded-xl border border-line px-4 py-3 focus:border-teal focus:outline-none"
      />
    </label>
  );
}
