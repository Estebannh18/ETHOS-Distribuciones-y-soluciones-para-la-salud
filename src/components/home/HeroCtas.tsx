"use client";

import { ClipboardList, MessageCircle } from "lucide-react";
import { useQuote } from "@/components/QuoteList";
import { whatsappLink } from "@/lib/site";

// Acciones principales del inicio: cotizar o hablar con un asesor.
export function HeroCtas() {
  const { setOpen, items } = useQuote();
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2.5 rounded-full bg-teal px-7 py-4 text-base font-bold text-white shadow-lg shadow-teal/30 transition hover:-translate-y-0.5 hover:bg-teal-dark"
      >
        <ClipboardList className="h-5 w-5" />
        Solicitar cotización
        {items.length > 0 && (
          <span className="grid h-6 min-w-6 place-items-center rounded-full bg-white px-1.5 text-xs font-bold text-teal">
            {items.length}
          </span>
        )}
      </button>
      <a
        href={whatsappLink("Hola Ethos, quiero hablar con un asesor.")}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2.5 rounded-full bg-ethos px-7 py-4 text-base font-bold text-white shadow-lg shadow-ethos/25 transition hover:-translate-y-0.5 hover:bg-ethos-deep"
      >
        <MessageCircle className="h-5 w-5" />
        Hablar con un asesor
      </a>
    </div>
  );
}
