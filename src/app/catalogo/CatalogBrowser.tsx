"use client";

import { useSearchParams } from "next/navigation";
import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Search, Snowflake, Plus, Check, SlidersHorizontal, X } from "lucide-react";
import { products, labList, categoryCounts, routes, normalize, toTitle, type Product } from "@/lib/catalog";
import { useQuote } from "@/components/QuoteList";

const PAGE = 40;
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

// Índice de búsqueda precalculado una sola vez
const index = products.map((p) => normalize(`${p.c} ${p.d} ${p.b} ${p.l} ${p.m}`));

type Filters = { q: string; lab: string; cat: string; via: string; frio: boolean; letter: string };

export function CatalogBrowser() {
  const params = useSearchParams();
  const [f, setF] = useState<Filters>(() => ({
    q: params.get("q") ?? "",
    lab: params.get("lab") ?? "",
    cat: params.get("cat") ?? "",
    via: params.get("via") ?? "",
    frio: params.get("frio") === "1",
    letter: params.get("letra") ?? "",
  }));
  const [limit, setLimit] = useState(PAGE);
  const [sheet, setSheet] = useState(false);
  const q = useDeferredValue(f.q);

  const set = (patch: Partial<Filters>) => {
    setF((prev) => ({ ...prev, ...patch }));
    setLimit(PAGE);
  };

  // Mantiene la URL compartible sin recargar
  useEffect(() => {
    const u = new URLSearchParams();
    if (f.q) u.set("q", f.q);
    if (f.lab) u.set("lab", f.lab);
    if (f.cat) u.set("cat", f.cat);
    if (f.via) u.set("via", f.via);
    if (f.frio) u.set("frio", "1");
    if (f.letter) u.set("letra", f.letter);
    const s = u.toString();
    window.history.replaceState(null, "", s ? `?${s}` : window.location.pathname);
  }, [f]);

  const results = useMemo(() => {
    const terms = normalize(q).split(/\s+/).filter(Boolean);
    return products.filter(
      (p, i) =>
        (!f.lab || p.l === f.lab) &&
        (!f.cat || p.k === f.cat) &&
        (!f.via || p.v === f.via) &&
        (!f.frio || p.f) &&
        (!f.letter || normalize(p.d[0]) === f.letter.toLowerCase()) &&
        terms.every((t) => index[i].includes(t)),
    );
  }, [q, f.lab, f.cat, f.via, f.frio, f.letter]);

  const available = useMemo(() => new Set(products.map((p) => normalize(p.d[0]).toUpperCase())), []);

  // Carga progresiva al hacer scroll
  const sentinel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setLimit((l) => l + PAGE), {
      rootMargin: "600px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, [results]);

  const active = [
    f.lab && { key: "lab", label: f.lab },
    f.cat && { key: "cat", label: f.cat },
    f.via && { key: "via", label: `Vía ${f.via.toLowerCase()}` },
    f.frio && { key: "frio", label: "Cadena de frío" },
    f.letter && { key: "letter", label: `Letra ${f.letter}` },
  ].filter(Boolean) as { key: keyof Filters; label: string }[];

  const clearAll = () => set({ lab: "", cat: "", via: "", frio: false, letter: "", q: "" });

  const filters = (
    <FilterPanel f={f} set={set} />
  );

  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      {/* Barra de búsqueda */}
      <div className="sticky top-18 z-20 -mx-4 border-b border-line bg-white/90 px-4 py-4 backdrop-blur-md sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="flex gap-3">
          <label className="flex flex-1 items-center gap-3 rounded-xl border border-line bg-white px-4 transition focus-within:border-teal">
            <Search className="h-5 w-5 shrink-0 text-ethos/40" />
            <input
              value={f.q}
              onChange={(e) => set({ q: e.target.value })}
              placeholder="Principio activo, marca, laboratorio o código ETH…"
              aria-label="Buscar productos"
              className="min-w-0 flex-1 bg-transparent py-3 focus:outline-none"
            />
            {f.q && (
              <button onClick={() => set({ q: "" })} aria-label="Borrar búsqueda" className="text-ethos-ink/40 hover:text-ethos">
                <X className="h-4 w-4" />
              </button>
            )}
          </label>
          <button
            onClick={() => setSheet(true)}
            className="flex items-center gap-2 rounded-xl border border-line px-4 font-semibold text-ethos lg:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span className="hidden sm:inline">Filtros</span>
            {active.length > 0 && (
              <span className="grid h-5 w-5 place-items-center rounded-full bg-teal text-xs text-white">{active.length}</span>
            )}
          </button>
        </div>

        {/* Índice alfabético */}
        <div className="mt-3 flex gap-1 overflow-x-auto pb-1 [scrollbar-width:none]">
          <LetterButton active={!f.letter} onClick={() => set({ letter: "" })}>
            Todo
          </LetterButton>
          {LETTERS.map((l) => (
            <LetterButton
              key={l}
              active={f.letter === l}
              disabled={!available.has(l)}
              onClick={() => set({ letter: f.letter === l ? "" : l })}
            >
              {l}
            </LetterButton>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[16rem_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-52">{filters}</div>
        </aside>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="mr-2 text-sm text-ethos-ink/60">
              <strong className="text-ethos">{results.length.toLocaleString("es-CO")}</strong>{" "}
              {results.length === 1 ? "producto" : "productos"}
            </p>
            {active.map((a) => (
              <button
                key={a.key}
                onClick={() => set({ [a.key]: a.key === "frio" ? false : "" } as Partial<Filters>)}
                className="flex items-center gap-1.5 rounded-full bg-ethos/5 px-3 py-1 text-sm font-medium text-ethos hover:bg-ethos/10"
              >
                {a.label} <X className="h-3.5 w-3.5" />
              </button>
            ))}
            {(active.length > 0 || f.q) && (
              <button onClick={clearAll} className="text-sm text-teal hover:underline">
                Limpiar todo
              </button>
            )}
          </div>

          {results.length === 0 ? (
            <div className="mt-10 rounded-3xl border border-dashed border-line p-12 text-center">
              <p className="text-xl font-bold text-ethos">No encontramos ese producto</p>
              <p className="mx-auto mt-2 max-w-md text-ethos-ink/60">
                Prueba con otro término o escríbenos: si no está en el catálogo, lo buscamos con nuestros laboratorios
                aliados.
              </p>
              <button onClick={clearAll} className="mt-6 rounded-full bg-ethos px-5 py-2.5 text-sm font-semibold text-white">
                Ver todo el catálogo
              </button>
            </div>
          ) : (
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {results.slice(0, limit).map((p, i, arr) => {
                const letter = normalize(p.d[0]).toUpperCase();
                const showLetter = !q && (i === 0 || normalize(arr[i - 1].d[0]).toUpperCase() !== letter);
                return (
                  <li key={p.c}>
                    {showLetter && (
                      <div className="flex items-center gap-4 bg-white pt-8 pb-3">
                        <span className="text-ring text-4xl font-bold">{letter}</span>
                        <span className="h-px flex-1 bg-line" />
                      </div>
                    )}
                    <ProductRow p={p} />
                  </li>
                );
              })}
            </ul>
          )}
          {limit < results.length && <div ref={sentinel} className="h-20" />}

          <p className="mt-10 text-center text-xs text-ethos-ink/50">
            Portafolio sujeto a disponibilidad. Las descripciones son de referencia; consulta con tu asesor.
          </p>
        </div>
      </div>

      {/* Filtros en móvil */}
      <AnimatePresence>
        {sheet && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-ethos-ink/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSheet(false)}
            />
            <motion.div
              className="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-white p-6"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 32, stiffness: 320 }}
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold text-ethos">Filtros</h2>
                <button onClick={() => setSheet(false)} aria-label="Cerrar" className="rounded-full p-2 hover:bg-mist">
                  <X className="h-5 w-5" />
                </button>
              </div>
              {filters}
              <button
                onClick={() => setSheet(false)}
                className="sticky bottom-0 mt-6 w-full rounded-full bg-ethos py-3.5 font-semibold text-white"
              >
                Ver {results.length.toLocaleString("es-CO")} productos
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function LetterButton({
  children,
  active,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`h-8 min-w-8 shrink-0 rounded-lg px-2 font-mono text-xs font-medium transition ${
        active ? "bg-ethos text-white" : disabled ? "text-ethos-ink/20" : "text-ethos-ink/60 hover:bg-mist hover:text-ethos"
      }`}
    >
      {children}
    </button>
  );
}

function FilterPanel({ f, set }: { f: Filters; set: (p: Partial<Filters>) => void }) {
  return (
    <div className="space-y-8">
      <button
        onClick={() => set({ frio: !f.frio })}
        aria-pressed={f.frio}
        className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left transition ${
          f.frio ? "border-sky bg-sky/5" : "border-line hover:border-sky/50"
        }`}
      >
        <span className="flex items-center gap-3">
          <Snowflake className="h-5 w-5 text-sky" />
          <span className="text-sm font-semibold text-ethos">Solo cadena de frío</span>
        </span>
        <span className={`relative h-6 w-10 rounded-full transition ${f.frio ? "bg-sky" : "bg-line"}`}>
          <span className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-all ${f.frio ? "left-5" : "left-1"}`} />
        </span>
      </button>

      <FilterGroup title="Línea">
        {categoryCounts.map(([name, count]) => (
          <Chip key={name} active={f.cat === name} onClick={() => set({ cat: f.cat === name ? "" : name })}>
            {name} <span className="font-mono text-[0.68rem] opacity-50">{count}</span>
          </Chip>
        ))}
      </FilterGroup>

      <FilterGroup title="Vía de administración">
        {routes.map((r) => (
          <Chip key={r} active={f.via === r} onClick={() => set({ via: f.via === r ? "" : r })}>
            {r}
          </Chip>
        ))}
      </FilterGroup>

      <div>
        <p className="eyebrow mb-3 text-ethos-ink/50">Laboratorio</p>
        <LabPicker value={f.lab} onChange={(lab) => set({ lab })} />
      </div>
    </div>
  );
}

// Selector de laboratorio: busca por nombre y muestra pocas opciones a la vez (hay cientos).
const LAB_SHOWN = 8;
function LabPicker({ value, onChange }: { value: string; onChange: (lab: string) => void }) {
  const [q, setQ] = useState("");
  const nq = normalize(q.trim());

  if (value) {
    return (
      <button
        onClick={() => onChange("")}
        className="flex w-full items-center justify-between rounded-xl border border-ethos bg-ethos px-4 py-3 text-left text-sm font-semibold text-white"
        aria-label={`Quitar filtro de laboratorio ${value}`}
      >
        <span className="truncate">{value}</span>
        <X className="h-4 w-4 shrink-0" />
      </button>
    );
  }

  const matches = nq ? labList.filter((l) => normalize(l.name).includes(nq)) : labList;
  const shown = matches.slice(0, LAB_SHOWN);

  return (
    <div>
      <label className="flex items-center gap-2 rounded-xl border border-line bg-white px-4 transition focus-within:border-teal">
        <Search className="h-4 w-4 shrink-0 text-ethos/40" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value.slice(0, 60))}
          placeholder="Buscar laboratorio…"
          aria-label="Buscar laboratorio"
          className="min-w-0 flex-1 bg-transparent py-3 text-sm text-ethos-ink placeholder:text-ethos-ink/40 focus:outline-none"
        />
      </label>
      <ul className="mt-2 space-y-1">
        {shown.map((l) => (
          <li key={l.name}>
            <button
              onClick={() => {
                onChange(l.name);
                setQ("");
              }}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-ethos-ink/75 transition hover:bg-mist hover:text-ethos"
            >
              <span className="truncate">{l.name}</span>
              <span className="ml-3 shrink-0 font-mono text-[0.68rem] opacity-50">{l.count}</span>
            </button>
          </li>
        ))}
      </ul>
      <p className="mt-2 px-1 text-xs text-ethos-ink/45">
        {matches.length === 0
          ? "Ningún laboratorio coincide."
          : nq
            ? matches.length > LAB_SHOWN
              ? `y ${matches.length - LAB_SHOWN} más: sigue escribiendo para filtrar`
              : ""
            : `Los ${LAB_SHOWN} con más productos. Escribe para buscar entre ${labList.length}.`}
      </p>
    </div>
  );
}
function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="eyebrow mb-3 text-ethos-ink/50">{title}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition ${
        active ? "border-ethos bg-ethos text-white" : "border-line text-ethos-ink/70 hover:border-ethos/40"
      }`}
    >
      {children}
    </button>
  );
}

function ProductRow({ p }: { p: Product }) {
  const { add, has, setOpen } = useQuote();
  const added = has(p.c);
  // La descripción incluye la marca entre paréntesis al final; se muestra aparte.
  const detail = p.b ? p.d.replace(` (${p.b})`, "") : p.d;

  return (
    <div className="group grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 py-5 sm:grid-cols-[7.5rem_1fr_auto]">
      <span className="col-start-1 row-start-1 font-mono text-xs text-teal sm:pt-0.5">{p.c}</span>
      <div className="col-span-2 row-start-2 min-w-0 sm:col-span-1 sm:row-start-auto">
        <p className="font-bold leading-snug text-ethos-ink">
          {toTitle(p.n)}
          {p.b && <span className="ml-2 font-semibold text-ethos/60">{toTitle(p.b)}</span>}
        </p>
        <p className="mt-1 text-sm text-ethos-ink/55">{detail}</p>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
          <span className="font-semibold text-ethos/80">{p.l}</span>
          <span className="text-ethos-ink/30">·</span>
          <span className="text-ethos-ink/55">{p.k}</span>
          {p.f === 1 && (
            <span className="flex items-center gap-1 rounded-full bg-sky/10 px-2 py-0.5 font-semibold text-sky">
              <Snowflake className="h-3 w-3" /> Cadena de frío
            </span>
          )}
        </div>
      </div>
      <button
        onClick={() => (added ? setOpen(true) : add({ c: p.c, d: p.d, l: p.l }))}
        className={`col-start-2 row-start-1 flex items-center gap-1.5 justify-self-end rounded-full px-4 py-2 text-sm font-semibold transition sm:col-start-3 ${
          added ? "bg-leaf/10 text-leaf" : "border border-line text-ethos hover:border-teal hover:bg-teal hover:text-white"
        }`}
      >
        {added ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        {added ? "En lista" : "Cotizar"}
      </button>
    </div>
  );
}
