"use client";

import { ClipboardList, MessageCircle } from "lucide-react";
import { useQuote } from "./QuoteList";
import { whatsappLink } from "@/lib/site";

// Barra fija en celulares: cotización y asesor siempre a un toque.
export function MobileCtaBar() {
  const { setOpen, items } = useQuote();
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 gap-2 border-t border-line bg-white/95 p-3 backdrop-blur-md md:hidden">
      <button
        onClick={() => setOpen(true)}
        className="flex items-center justify-center gap-2 rounded-full bg-teal px-4 py-3 text-sm font-bold text-white shadow-md shadow-teal/30"
      >
        <ClipboardList className="h-4 w-4" />
        Cotizar{items.length > 0 ? ` (${items.length})` : ""}
      </button>
      <a
        href={whatsappLink("Hola Ethos, quiero hablar con un asesor.")}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 rounded-full bg-ethos px-4 py-3 text-sm font-bold text-white shadow-md shadow-ethos/25"
      >
        <MessageCircle className="h-4 w-4" />
        Asesor
      </a>
    </div>
  );
}
