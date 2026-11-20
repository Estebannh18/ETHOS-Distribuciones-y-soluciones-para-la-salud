"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search, ArrowRight } from "lucide-react";

const SUGGESTIONS = ["Acetaminofén", "Losartán", "Omeprazol", "Ibuprofeno", "Dolex"];

export function HeroSearch() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const go = (term: string) => router.push(`/catalogo${term.trim() ? `?q=${encodeURIComponent(term.trim())}` : ""}`);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          go(q);
        }}
        className="group flex items-center gap-2 rounded-2xl border border-line bg-white p-2 pl-5 shadow-[0_12px_40px_-12px_rgb(11_79_138/0.25)] transition focus-within:border-teal"
      >
        <Search className="h-5 w-5 shrink-0 text-ethos/50" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Busca por principio activo, marca o código ETH"
          aria-label="Buscar en el catálogo"
          className="min-w-0 flex-1 bg-transparent py-3 text-base text-ethos-ink placeholder:text-ethos-ink/40 focus:outline-none"
        />
        <button
          type="submit"
          className="flex items-center gap-2 rounded-xl bg-ethos px-5 py-3 text-sm font-semibold text-white transition hover:bg-ethos-deep"
        >
          <span className="hidden sm:inline">Buscar</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>
      <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
        <span className="text-ethos-ink/50">Populares:</span>
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => go(s)}
            className="rounded-full border border-line px-3 py-1 text-ethos-ink/70 transition hover:border-teal hover:text-teal"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
