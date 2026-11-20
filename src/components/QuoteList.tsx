"use client";

import { createContext, useContext, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, Trash2, Minus, Plus, ClipboardList, Send } from "lucide-react";
import { whatsappLink } from "@/lib/site";

// Lista de cotización: el cliente arma su pedido (sin precios) y lo envía por WhatsApp.
export type QuoteItem = { c: string; d: string; l: string; qty: number };

type Ctx = {
  items: QuoteItem[];
  add: (item: Omit<QuoteItem, "qty">) => void;
  remove: (code: string) => void;
  setQty: (code: string, qty: number) => void;
  clear: () => void;
  has: (code: string) => boolean;
  open: boolean;
  setOpen: (v: boolean) => void;
};

const QuoteCtx = createContext<Ctx | null>(null);
// v2: los códigos ETH se regeneraron; se descartan las listas guardadas con códigos anteriores.
const KEY = "ethos-cotizacion-v2";

// Pequeño store sobre localStorage para que la lista sobreviva recargas y cambios de página.
const listeners = new Set<() => void>();
let cache: string | null = null;

function read() {
  if (cache === null) {
    try {
      cache = localStorage.getItem(KEY) ?? "[]";
    } catch {
      cache = "[]";
    }
  }
  return cache;
}

// El contenido de localStorage no es de confianza: se valida la forma y se limitan textos y cantidades.
function parseItems(raw: string): QuoteItem[] {
  try {
    const data: unknown = JSON.parse(raw);
    if (!Array.isArray(data)) return [];
    return data
      .filter((x): x is QuoteItem => !!x && typeof x.c === "string" && typeof x.d === "string" && typeof x.l === "string")
      .slice(0, 200)
      .map((x) => ({
        c: x.c.slice(0, 20),
        d: x.d.slice(0, 300),
        l: x.l.slice(0, 80),
        qty: Number.isFinite(x.qty) ? Math.min(99999, Math.max(1, Math.floor(x.qty))) : 1,
      }));
  } catch {
    return [];
  }
}

function setItems(fn: (xs: QuoteItem[]) => QuoteItem[]) {
  cache = JSON.stringify(fn(parseItems(read())));
  try {
    localStorage.setItem(KEY, cache);
  } catch {}
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function QuoteProvider({ children }: { children: ReactNode }) {
  const raw = useSyncExternalStore(subscribe, read, () => "[]");
  const items = useMemo<QuoteItem[]>(() => parseItems(raw), [raw]);
  const [open, setOpen] = useState(false);

  const value: Ctx = {
    items,
    add: (item) =>
      setItems((xs) =>
        xs.some((x) => x.c === item.c)
          ? xs.map((x) => (x.c === item.c ? { ...x, qty: x.qty + 1 } : x))
          : [...xs, { ...item, qty: 1 }],
      ),
    remove: (code) => setItems((xs) => xs.filter((x) => x.c !== code)),
    setQty: (code, qty) => setItems((xs) => xs.map((x) => (x.c === code ? { ...x, qty: Number.isFinite(qty) ? Math.min(99999, Math.max(1, Math.floor(qty))) : 1 } : x))),
    clear: () => setItems(() => []),
    has: (code) => items.some((x) => x.c === code),
    open,
    setOpen,
  };

  return (
    <QuoteCtx.Provider value={value}>
      {children}
      <QuoteDrawer />
    </QuoteCtx.Provider>
  );
}

export function useQuote() {
  const ctx = useContext(QuoteCtx);
  if (!ctx) throw new Error("useQuote fuera de QuoteProvider");
  return ctx;
}

export function QuoteButton({ light = false }: { light?: boolean }) {
  const { items, setOpen } = useQuote();
  const count = items.length;
  return (
    <button
      onClick={() => setOpen(true)}
      className={`relative flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold whitespace-nowrap transition ${
        light ? "border-white/30 text-white hover:bg-white/10" : "border-line text-ethos hover:border-ethos"
      }`}
    >
      <ClipboardList className="h-4 w-4" />
      <span className="hidden sm:inline">Mi cotización</span>
      <AnimatePresence>
        {count > 0 && (
          <motion.span
            key={count}
            initial={{ scale: 0.4 }}
            animate={{ scale: 1 }}
            className="grid h-5 min-w-5 place-items-center rounded-full bg-teal px-1 text-[0.7rem] text-white"
          >
            {count}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

function QuoteDrawer() {
  const { items, open, setOpen, remove, setQty, clear } = useQuote();

  const message =
    "Hola Ethos, quiero cotizar los siguientes productos:\n\n" +
    items.map((x) => `• ${x.c} — ${x.d} (${x.l}) × ${x.qty}`).join("\n") +
    "\n\nQuedo atento. Gracias.";

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-ethos-ink/40 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.aside
            role="dialog"
            aria-label="Mi cotización"
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            <header className="flex items-start justify-between border-b border-line p-6">
              <div>
                <p className="eyebrow text-teal">Lista de pedido</p>
                <h2 className="mt-1 text-2xl font-bold text-ethos">Mi cotización</h2>
                <p className="mt-1 text-sm text-ethos-ink/60">
                  Arma tu lista y envíala. Te respondemos con precios y disponibilidad.
                </p>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Cerrar" className="rounded-full p-2 hover:bg-mist">
                <X className="h-5 w-5" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="grid h-full place-items-center text-center">
                  <div>
                    <ClipboardList className="mx-auto h-10 w-10 text-line" />
                    <p className="mt-3 font-semibold text-ethos">Tu lista está vacía</p>
                    <p className="mt-1 text-sm text-ethos-ink/60">Agrega productos desde el catálogo.</p>
                  </div>
                </div>
              ) : (
                <ul className="space-y-3">
                  {items.map((x) => (
                    <li key={x.c} className="rounded-xl border border-line p-4">
                      <div className="flex justify-between gap-3">
                        <div>
                          <p className="font-mono text-xs text-teal">{x.c}</p>
                          <p className="mt-1 text-sm font-semibold leading-snug text-ethos-ink">{x.d}</p>
                          <p className="mt-0.5 text-xs text-ethos-ink/50">{x.l}</p>
                        </div>
                        <button onClick={() => remove(x.c)} aria-label="Quitar" className="self-start p-1 text-ethos-ink/40 hover:text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-3 inline-flex items-center rounded-full border border-line">
                        <button onClick={() => setQty(x.c, x.qty - 1)} className="p-2" aria-label="Menos">
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-8 text-center font-mono text-sm">{x.qty}</span>
                        <button onClick={() => setQty(x.c, x.qty + 1)} className="p-2" aria-label="Más">
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <footer className="space-y-3 border-t border-line p-6">
                <a
                  href={whatsappLink(message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-teal px-6 py-3.5 font-semibold text-white transition hover:bg-teal-dark"
                >
                  <Send className="h-4 w-4" /> Enviar por WhatsApp
                </a>
                <button onClick={clear} className="w-full text-sm text-ethos-ink/50 hover:text-ethos">
                  Vaciar lista
                </button>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
