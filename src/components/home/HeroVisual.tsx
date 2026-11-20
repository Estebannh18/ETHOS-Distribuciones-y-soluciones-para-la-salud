"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Search, Snowflake, Plus, Check, ClipboardList } from "lucide-react";
import { Isotipo } from "../Logo";
import type { DemoScene } from "@/lib/catalog";

type Stats = { products: number; labs: number; cold: number; categories: number };

// Demo en bucle del catálogo: escribe una búsqueda, aparecen productos reales y uno se agrega a la cotización.
type Phase = "typing" | "results" | "added";

export function HeroVisual({ stats, scenes }: { stats: Stats; scenes: DemoScene[] }) {
  const reduce = useReducedMotion();
  const [scene, setScene] = useState(0);
  const [typed, setTyped] = useState(reduce ? scenes[0].term.length : 0);
  const [phase, setPhase] = useState<Phase>(reduce ? "added" : "typing");
  const [count, setCount] = useState(reduce ? 1 : 0);

  const s = scenes[scene];

  useEffect(() => {
    if (reduce) return;
    let t: ReturnType<typeof setTimeout>;
    if (phase === "typing") {
      t =
        typed < s.term.length
          ? setTimeout(() => setTyped((n) => n + 1), 110)
          : setTimeout(() => setPhase("results"), 350);
    } else if (phase === "results") {
      t = setTimeout(() => {
        setPhase("added");
        setCount((c) => c + 1);
      }, 1600);
    } else {
      t = setTimeout(() => {
        const next = (scene + 1) % scenes.length;
        if (next === 0) setCount(0);
        setScene(next);
        setTyped(0);
        setPhase("typing");
      }, 2400);
    }
    return () => clearTimeout(t);
  }, [phase, typed, scene, s.term.length, scenes.length, reduce]);

  const showResults = phase !== "typing";

  return (
    <div className="relative isolate overflow-hidden rounded-[2rem] bg-ethos-deep p-6 text-white sm:p-8">
      <div className="bg-ring pointer-events-none absolute -top-[35%] -right-[55%] -z-10 aspect-square w-[120%] animate-spin-slow rounded-full opacity-40 [mask:radial-gradient(farthest-side,transparent_calc(100%-40px),#000_calc(100%-39px))]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(70%_50%_at_0%_100%,rgb(15_163_155/0.3),transparent)]" />

      {/* Barra superior */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-white p-1.5">
            <Isotipo className="h-full w-full" />
          </span>
          <span className="eyebrow whitespace-nowrap text-white/60">Catálogo Ethos</span>
        </div>
        <span className="flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold">
          <ClipboardList className="h-3.5 w-3.5" /> <span className="hidden whitespace-nowrap sm:inline">Mi cotización</span>
          <motion.span
            key={count}
            initial={{ scale: 0.3 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 18 }}
            className="grid h-5 min-w-5 place-items-center rounded-full bg-teal px-1 text-[0.7rem]"
          >
            {count}
          </motion.span>
        </span>
      </div>

      {/* Buscador */}
      <div className="mt-6 flex items-center gap-3 rounded-2xl bg-white px-4 py-3.5 text-ethos-ink">
        <Search className="h-4 w-4 shrink-0 text-ethos/50" />
        <span className="font-medium">
          {s.term.slice(0, typed)}
          <span className="ml-px inline-block h-4 w-0.5 translate-y-0.5 animate-pulse bg-teal" />
        </span>
        <AnimatePresence>
          {showResults && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="ml-auto font-mono text-[0.68rem] text-ethos-ink/45"
            >
              {s.total} resultados
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Resultados */}
      <ul className="mt-4 min-h-[16.5rem] space-y-2.5">
        <AnimatePresence mode="popLayout">
          {showResults &&
            s.items.map((p, i) => {
              const added = phase === "added" && i === 0;
              return (
                <motion.li
                  key={`${scene}-${p.c}`}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
                  transition={{ delay: i * 0.12, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className={`flex items-center gap-3 rounded-2xl border p-3.5 transition-colors duration-500 ${
                    added ? "border-teal/60 bg-teal/15" : "border-white/10 bg-white/[0.06]"
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[0.65rem] text-teal">{p.c}</span>
                      {p.f === 1 && (
                        <span className="flex items-center gap-1 rounded-full bg-sky/20 px-1.5 py-px text-[0.6rem] font-semibold text-sky">
                          <Snowflake className="h-2.5 w-2.5" /> Frío
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 truncate text-sm font-semibold">
                      {p.n}
                      {p.b && <span className="font-normal text-white/50"> · {p.b}</span>}
                    </p>
                    <p className="truncate text-xs text-white/45">
                      {p.s} · {p.l}
                    </p>
                  </div>
                  <span
                    className={`flex shrink-0 items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors duration-300 ${
                      added ? "bg-leaf text-white" : "border border-white/20 text-white/80"
                    }`}
                  >
                    {added ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                    {added ? "En lista" : "Cotizar"}
                  </span>
                </motion.li>
              );
            })}
        </AnimatePresence>
      </ul>

      {/* Cifras */}
      <dl className="mt-6 grid grid-cols-2 gap-3 border-t border-white/15 pt-5 sm:grid-cols-4">
        {[
          ["Referencias", stats.products],
          ["Laboratorios", stats.labs],
          ["Cadena de frío", stats.cold],
          ["Líneas", stats.categories],
        ].map(([label, n]) => (
          <div key={label}>
            <dt className="text-[0.68rem] leading-tight text-white/50">{label}</dt>
            <dd className="mt-1 text-xl font-bold sm:text-2xl">{n.toLocaleString("es-CO")}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
